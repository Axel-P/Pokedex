import { Reducer } from 'react'
import { Actions, ActionTypes } from '../actions/interfaceActionCreators'
import { IStore } from '../types'
import defaultStore from '../defaults'


const store: Reducer<IStore['interface'] | undefined, ActionTypes> = (store: IStore['interface'] = defaultStore.interface, action: ActionTypes) => {
    const updatedStore = { ...store }
    switch (action.type) {
        case Actions.SetActivePage:
            updatedStore.pagination = {
                ...updatedStore.pagination,
                active: action.data
            }
            return updatedStore
        case Actions.RequestSpotlight:
            if (action.data !== undefined) {
                updatedStore.spotlight = {
                    ...updatedStore.spotlight,
                    activeRecordIndex: action.data
                }
            } else {
                updatedStore.spotlight.activeRecordIndex = defaultStore.interface.spotlight.activeRecordIndex
            }
            return updatedStore
        default:
            return store
    }

}

export default store