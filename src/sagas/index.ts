import { takeLeading } from 'redux-saga/effects'
import { Actions } from '../store/actions/actionCreators';
import requestData from './requestData';

export default function* rootSaga() {
    yield takeLeading(Actions.RequestData, requestData)
  }