import { IPokemon } from '../types'

export enum Actions {
    RequestData = 'REQUEST_DATA',
    RequestDataSuccess = 'REQUEST_DATA_SUCCESS',
    RequestDataError = 'REQUEST_DATA_ERROR'
}

export type ActionTypes =
    { type: Actions.RequestData } |
    { type: Actions.RequestDataSuccess, data: IPokemon[] } |
    { type: Actions.RequestDataError }

function requestData(): ActionTypes {
    return { type: Actions.RequestData }
}
function requestDataSuccess(data: IPokemon[]): ActionTypes {
    return { type: Actions.RequestDataSuccess, data }
}
function requestDataError(): ActionTypes {
    return { type: Actions.RequestDataError }
}

export const actionsGenerators = {
    requestData,
    requestDataSuccess,
    requestDataError
}