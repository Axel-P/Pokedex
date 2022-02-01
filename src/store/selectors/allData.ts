import { createSelector } from 'reselect'
import { IStore } from '../types'

const getAllDataSelector = (store: IStore) => store.data

const getRecordByIDSelector = createSelector(getAllDataSelector, (allData) => {
    return (id: number) => {
        const foundData = allData?.find(data => data?.id === id)
        console.log({ foundData })
        return foundData
    }
})

export {
    getRecordByIDSelector
}

export default getAllDataSelector