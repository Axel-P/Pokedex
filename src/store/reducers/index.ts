import { combineReducers } from 'redux'
import { ActionTypes as DataActionTypes } from '../actions/dataActionCreators'
import { ActionTypes as InterfaceActionTypes } from '../actions/interfaceActionCreators'
import { IStore } from '../types'
import dataReducer from './data'
import interfaceReducer from './interface'

export default combineReducers<IStore, DataActionTypes & InterfaceActionTypes>({
    data: dataReducer,
    interface: interfaceReducer
})