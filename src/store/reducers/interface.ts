import { Reducer } from 'react'
import { Actions, ActionTypes } from '../actions/interfaceActionCreators'
import { IStore } from '../types'
import defaultStore from '../defaults'


const store: Reducer<IStore['interface'] | undefined, ActionTypes> = (store: IStore['interface'] = defaultStore.interface, action: ActionTypes) => {
    switch (action.type) {
        case Actions.SetActivePage:
            return {
                ...store,
                pagination: {
                    ...store.pagination,
                    active: action.data
                }
            }
        default:
            return store
    }

}

export default store