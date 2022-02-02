import { Reducer } from 'react'
import { Actions, ActionTypes } from '../actions/dataActionCreators'
import { IStore } from '../types'
import defaultStore from '../defaults'


const store: Reducer<IStore['data'] | undefined, ActionTypes> = (store: IStore['data'] = defaultStore.data, action: ActionTypes) => {
    switch (action.type) {
        case Actions.RequestSingleRecordSuccess: {
            const affectedIndex = store.findIndex(e => e?.id === action.data.id)
            if (affectedIndex >= 0) {
                store[affectedIndex] = { ...action.data }
            } else {
                store[action.data.id - 1] = action.data
            }
            break
        }
        case Actions.RequestDataSuccess: {
            const updatedData = store.slice()
            updatedData.splice(action.data.index, action.data.newRecords.length, ...action.data.newRecords)
            store = updatedData
            break
        }
        case Actions.RequestLinkedDataSuccess: {
            const affectedIndex = store.findIndex(e => e?.id === action.data.id)
            if (affectedIndex >= 0) {
                store[affectedIndex] = { ...action.data }
            } else {
                store[action.data.id - 1] = action.data
            }
            break
        }
    }
    return store
}

export default store