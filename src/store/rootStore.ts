import { Reducer } from 'react'
import { Actions, ActionTypes } from './actions/actionCreators'
import { IStore } from './types'
import defaultStore from './defaults'


const store: Reducer<IStore['data'] | undefined, ActionTypes> = (store: IStore['data'] = defaultStore.data, action: ActionTypes) => {
    switch (action.type) {
        case Actions.RequestDataSuccess:
            store = store.concat(action.data)
    }
    return store
}

export default store