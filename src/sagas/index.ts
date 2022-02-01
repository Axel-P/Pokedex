import { all, fork } from 'redux-saga/effects'
import requestDataWatcher from './requestData'
import requestActivePageWatcher from './interface'

export default function* rootSaga() {
    yield all([fork(requestDataWatcher), fork(requestActivePageWatcher)])
}