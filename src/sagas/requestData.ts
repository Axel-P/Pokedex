import { call, put } from 'redux-saga/effects'
import {
    requestData as requestDataApi,
    requestRecord as requestRecordApi
} from '../api'
import { actionsGenerators } from '../store/actions/actionCreators'
import { IPokemon } from '../store/types'

function* requestSingleRecord(recordName: string) {
    const { data } = yield call(requestRecordApi, recordName)
    return data
}

export default function* requestData() {
    try {
        const { data } = yield call(requestDataApi)

        const normalizedData: IPokemon[] = []
        for (let i = 0; i < data?.results?.length; i++) {
            const record = (yield call(requestSingleRecord, data.results[i].name)) as IPokemon
            if (record) {
                normalizedData.push(record)
            }
        }

        yield put(actionsGenerators.requestDataSuccess(normalizedData))
    } catch (e) {

    }
}