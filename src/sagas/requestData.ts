import { call, fork, put, select, takeLeading } from 'redux-saga/effects'
import {
    requestData as requestDataApi,
    requestRecord as requestRecordApi
} from '../api'
import { Actions, actionsGenerators } from '../store/actions/dataActionCreators'
import { IPokemon } from '../store/types'
import listDataSelector from '../store/selectors/allData'

function* requestSingleRecord(recordName: string) {
    const { data } = yield call(requestRecordApi, recordName)
    return data
}

function* requestData({ data: index }: ReturnType<typeof actionsGenerators.requestData>) {
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
                const record = (yield call(requestSingleRecord, data.results[i].name)) as IPokemon
                if (record) {
                    normalizedData.push(record)
                }
            }
        }

        if (normalizedData.length) {
            if (wasDataUpdated) {
                yield put(actionsGenerators.requestDataSuccess({ newRecords: normalizedData, index }))
            } else {
                yield put(actionsGenerators.requestDataCancelled())
            }
        } else {
            throw 'No data found!'
        }

    } catch (e) {
        yield put(actionsGenerators.requestDataError(e))
    }
}

export default function* requestDataWatcher() {
    yield takeLeading(Actions.RequestData, requestData)
}