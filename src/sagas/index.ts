import { all, fork } from 'redux-saga/effects'
import requestDataWatcher from './data'
import requestActivePageWatcher from './interface'

export default function* rootSaga() {
    yield all([fork(requestDataWatcher), fork(requestActivePageWatcher)])
}