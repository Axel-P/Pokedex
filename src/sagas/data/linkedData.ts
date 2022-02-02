import { call, put } from 'redux-saga/effects'
import {
    requestLinkedData as requestLinkedDataApi,
    requestURL as requestURLApi
} from '../../api'
import { actionsGenerators } from '../../store/actions/dataActionCreators'
import { IPokemon } from '../../store/types'

export default function* requestLinkedData({ data }: ReturnType<typeof actionsGenerators.linkedData.requestLinkedData>) {
    try {

        if (!data.evolutionTree) {
            const { data: response } = yield call(requestLinkedDataApi, data.id)
            const evolutionTree: IPokemon['evolutionTree'] = {
                hasEvolutionTree: true
            }
            if (response?.evolves_from_species) {
                evolutionTree.previousStageName = response.evolves_from_species.name
            }
            if (response?.evolution_chain) {
                const { data: completeChainLink } = yield call(requestURLApi, response.evolution_chain.url)
                let currentLink = completeChainLink?.chain
                while (currentLink.species.name !== data.name) {
                    currentLink = currentLink.evolves_to[0]
                }
                if (currentLink.evolves_to[0]) {
                    evolutionTree.nextStageName = currentLink.evolves_to[0].species.name
                }
            }

            if (evolutionTree.previousStageName || evolutionTree.nextStageName) {
                yield put(actionsGenerators.linkedData.requestLinkedDataSuccess({
                    ...data,
                    evolutionTree
                }))
            } else {
                yield put(actionsGenerators.linkedData.requestLinkedDataSuccess({
                    ...data,
                    evolutionTree: {
                        hasEvolutionTree: false
                    }
                }))
            }

        } else {
            yield put(actionsGenerators.linkedData.requestLinkedDataSuccess(data))
        }
    } catch (e) {
        yield put(actionsGenerators.linkedData.requestLinkedDataError(e))
    }
}