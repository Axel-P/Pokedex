import { IPokemon } from '../types'

export enum Actions {
    RequestData = 'REQUEST_DATA',
    RequestDataSuccess = 'REQUEST_DATA_SUCCESS',
    RequestDataError = 'REQUEST_DATA_ERROR',
    RequestDataCancelled = 'REQUEST_DATA_CANCELLED'
}

export type ActionTypes =
    { type: Actions.RequestData, data: number } |
    { type: Actions.RequestDataSuccess, data: { newRecords: IPokemon[], index: number } } |
    { type: Actions.RequestDataError, error: unknown } |
    { type: Actions.RequestDataCancelled }

function requestData(data: number = 0) {
    return { type: Actions.RequestData, data }
}
function requestDataSuccess(data: { newRecords: IPokemon[], index: number }) {
    return { type: Actions.RequestDataSuccess, data }
}
function requestDataError(error: unknown) {
    return { type: Actions.RequestDataError, error }
}
function requestDataCancelled() {
    return { type: Actions.RequestDataCancelled }
}

export const actionsGenerators = {
    requestData,
    requestDataSuccess,
    requestDataError,
    requestDataCancelled
}