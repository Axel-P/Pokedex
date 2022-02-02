import { createSelector } from 'reselect'
import { IStore } from '../types'

const getAllDataSelector = (store: IStore) => store.data

const getRecordByNameSelector = createSelector(getAllDataSelector, (allData) => {
    return (name: string) => allData?.find(data => data?.name === name)
})

export {
    getRecordByNameSelector
}

export default getAllDataSelector