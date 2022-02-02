import { takeEvery, takeLeading } from "redux-saga/effects";
import { Actions } from "../../store/actions/dataActionCreators";
import { requestData, requestSingleRecord } from "./listData";
import requestLinkedData from "./linkedData";

export default function* dataWatcher() {
    yield takeLeading(Actions.RequestData, requestData)
    yield takeEvery(Actions.RequestSingleRecord, requestSingleRecord)
    yield takeEvery(Actions.RequestLinkedData, requestLinkedData)
}