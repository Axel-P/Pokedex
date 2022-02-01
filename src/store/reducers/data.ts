import { Reducer } from 'react'
import { Actions, ActionTypes } from '../actions/dataActionCreators'
import { IStore } from '../types'
import defaultStore from '../defaults'


const store: Reducer<IStore['data'] | undefined, ActionTypes> = (store: IStore['data'] = defaultStore.data, action: ActionTypes) => {
    switch (action.type) {
        case Actions.RequestDataSuccess:
            const updatedData = store.slice()
            updatedData.splice(action.data.index, action.data.newRecords.length, ...action.data.newRecords)
            store = updatedData
    }
    return store
}

export default store