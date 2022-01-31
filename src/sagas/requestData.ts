import { call } from 'redux-saga/effects'
import {requestData as requestDataApi} from '../api'

export default function* requestData() {
    try {
      yield call(requestDataApi)
    } catch (e) {
      
    }
  }