import { call, put, select } from 'redux-saga/effects'
import {
    requestData as requestDataApi,
    requestRecord as requestRecordApi
} from '../../api'
import { actionsGenerators } from '../../store/actions/dataActionCreators'
import { IPokemon } from '../../store/types'
import listDataSelector from '../../store/selectors/data'

function* requestRecord(recordName: string) {
    const { data } = yield call(requestRecordApi, recordName)
    return data
}

export function* requestSingleRecord({ data }: ReturnType<typeof actionsGenerators.listData.requestSingleRecord>) {
    try {
        const record = (yield call(requestRecord, data)) as IPokemon
        if (record) {
            yield put(actionsGenerators.listData.requestSingleRecordSuccess(record))
        } else {
            yield put(actionsGenerators.listData.requestSingleRecordError('Missing data'))
        }
    } catch (e) {
        yield put(actionsGenerators.listData.requestSingleRecordError(e))
    }
}

export function* requestData({ data: index }: ReturnType<typeof actionsGenerators.listData.requestData>) {
    try {

        const currentData = (yield select(listDataSelector)) as ReturnType<typeof listDataSelector> || []

        const { data } = yield call(requestDataApi, index)
        const normalizedData: IPokemon[] = []
        let wasDataUpdated = false
        for (let i = 0; i < data?.results?.length; i++) {
            const currentDataExpectedIndex = index + i

            //We're manually validating each record to individually fetch those that could be missing
            //since we could have sporadic singular data that could be present on the empty parts of the array
            if (currentData[currentDataExpectedIndex]) {
                normalizedData.push(currentData[currentDataExpectedIndex])
            } else {
                wasDataUpdated = true
                const record = (yield call(requestRecord, data.results[i].name)) as IPokemon
                if (record) {
                    normalizedData.push(record)
                }
            }
        }

        if (normalizedData.length) {
            if (wasDataUpdated) {
                yield put(actionsGenerators.listData.requestDataSuccess({ newRecords: normalizedData, index }))
            } else {
                yield put(actionsGenerators.listData.requestDataCancelled())
            }
        } else {
            throw 'No data found!'
        }

    } catch (e) {
        yield put(actionsGenerators.listData.requestDataError(e))
    }
}