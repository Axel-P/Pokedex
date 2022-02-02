import { Reducer } from 'react'
import { Actions, ActionTypes } from '../actions/interfaceActionCreators'
import { Actions as DataActions, ActionTypes as DataActionTypes } from '../actions/dataActionCreators'
import { IStore } from '../types'
import defaultStore from '../defaults'


const store: Reducer<IStore['interface'] | undefined, ActionTypes> = (store: IStore['interface'] = defaultStore.interface, action: ActionTypes | DataActionTypes) => {
    const updatedStore = { ...store }
    switch (action.type) {
        case Actions.SetActivePage:
            updatedStore.pagination = {
                ...updatedStore.pagination,
                active: action.data
            }
            return updatedStore
        case Actions.RequestSpotlightSuccess:
            if (action.data !== undefined) {
                updatedStore.spotlight = {
                    ...updatedStore.spotlight,
                    activeRecord: action.data
                }
            } else {
                updatedStore.spotlight.activeRecord = defaultStore.interface.spotlight.activeRecord
            }
            return updatedStore
        case DataActions.RequestData:
            updatedStore.pagination.loading = true
            return updatedStore
        case DataActions.RequestDataCancelled:
        case DataActions.RequestDataError:
        case DataActions.RequestDataSuccess:
            updatedStore.pagination.loading = false
            return updatedStore
        default:
            return store
    }

}

export default store