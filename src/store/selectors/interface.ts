import { createSelector } from 'reselect'
import { IStore } from '../types'
import dataSelector from './data'

const interfaceSelector = (store: IStore) => store.interface

const activeListSelector = createSelector([
    interfaceSelector,
    dataSelector
], (interfaceData, contentData) => {
    const pageSize = Number(process.env.REACT_APP_PAGE_SIZE)
    const startIndex = (interfaceData?.pagination.active || 0) * pageSize
    return contentData?.slice(startIndex, startIndex + pageSize)
})

export {
    activeListSelector
}

export default interfaceSelector