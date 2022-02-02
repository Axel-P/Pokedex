import { IPokemon } from '../types'

export enum Actions {
    RequestData = 'REQUEST_DATA',
    RequestDataSuccess = 'REQUEST_DATA_SUCCESS',
    RequestDataError = 'REQUEST_DATA_ERROR',
    RequestSingleRecord = 'REQUEST_SINGLE_RECORD',
    RequestSingleRecordSuccess = 'REQUEST_SINGLE_RECORD_SUCCESS',
    RequestSingleRecordError = 'REQUEST_SINGLE_RECORD_ERROR',
    RequestDataCancelled = 'REQUEST_DATA_CANCELLED',
    RequestLinkedData = 'REQUEST_LINKED_DATA',
    RequestLinkedDataSuccess = 'REQUEST_LINKED_DATA_SUCCESS',
    RequestLinkedDataError = 'REQUEST_LINKED_DATA_ERROR',
}

export type ActionTypes =
    { type: Actions.RequestData, data: number } |
    { type: Actions.RequestDataSuccess, data: { newRecords: IPokemon[], index: number } } |
    { type: Actions.RequestDataError, error: unknown } |
    { type: Actions.RequestDataCancelled } |
    { type: Actions.RequestSingleRecord, data: string } |
    { type: Actions.RequestSingleRecordSuccess, data: IPokemon } |
    { type: Actions.RequestSingleRecordError, error: unknown } |
    { type: Actions.RequestLinkedData, data: IPokemon } |
    { type: Actions.RequestLinkedDataSuccess, data: IPokemon } |
    { type: Actions.RequestLinkedDataError, error: unknown }

function requestData(data: number = 0) {
    return { type: Actions.RequestData, data }
}
function requestDataSuccess(data: { newRecords: IPokemon[], index: number }) {
    return { type: Actions.RequestDataSuccess, data }
}
function requestDataError(error: unknown) {
    return { type: Actions.RequestDataError, error }
}
function requestSingleRecord(data: string) {
    return { type: Actions.RequestSingleRecord, data }
}
function requestSingleRecordSuccess(data: IPokemon) {
    return { type: Actions.RequestSingleRecordSuccess, data }
}
function requestSingleRecordError(error: unknown) {
    return { type: Actions.RequestSingleRecordError, error }
}
function requestDataCancelled() {
    return { type: Actions.RequestDataCancelled }
}
function requestLinkedData(data: IPokemon) {
    return { type: Actions.RequestLinkedData, data }
}
function requestLinkedDataSuccess(data: IPokemon) {
    return { type: Actions.RequestLinkedDataSuccess, data }
}
function requestLinkedDataError(error: unknown) {
    return { type: Actions.RequestLinkedDataError, error }
}

export const actionsGenerators = {
    listData: {
        requestData,
        requestDataSuccess,
        requestDataError,
        requestDataCancelled,
        requestSingleRecord,
        requestSingleRecordSuccess,
        requestSingleRecordError
    },
    linkedData: {
        requestLinkedData,
        requestLinkedDataSuccess,
        requestLinkedDataError
    }
}