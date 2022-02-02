import { call } from "redux-saga/effects"
import {
    requestRecord as requestRecordApi
} from '../../api'

function* requestSingleRecord(recordName: string) {
    const { data } = yield call(requestRecordApi, recordName)
    return data
}

export {
    requestSingleRecord
}