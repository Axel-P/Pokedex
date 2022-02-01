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

        const currentData = (yield select(listDataSelector)) as ReturnType<typeof listDataSelector>

        if (!currentData || !currentData[index]) {
            const { data } = yield call(requestDataApi, index)

            const normalizedData: IPokemon[] = []
            for (let i = 0; i < data?.results?.length; i++) {
                const record = (yield call(requestSingleRecord, data.results[i].name)) as IPokemon
                if (record) {
                    normalizedData.push(record)
                }
            }

            if (normalizedData.length) {
                yield put(actionsGenerators.requestDataSuccess({ newRecords: normalizedData, index }))
            } else {
                throw 'No data found!'
            }
        } else {
            console.log('cancelled!')
            yield put(actionsGenerators.requestDataCancelled())
        }

    } catch (e) {
        yield put(actionsGenerators.requestDataError(e))
    }
}

export default function* requestDataWatcher() {
    yield takeLeading(Actions.RequestData, requestData)
}