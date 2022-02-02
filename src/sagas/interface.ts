import { put, PutEffect, race, RaceEffect, select, take, TakeEffect, takeEvery, takeLeading } from "redux-saga/effects";
import { Actions as DataActions, actionsGenerators as dataActionsGenerators } from "../store/actions/dataActionCreators";
import { Actions, actionsGenerators } from "../store/actions/interfaceActionCreators";
import { getRecordByNameSelector } from "../store/selectors/data";

type generatorType = Generator<PutEffect<{
    type: DataActions;
    data: number;
}> | RaceEffect<TakeEffect> | PutEffect<{
    type: Actions;
    data: number;
}>, void, [
        ReturnType<typeof dataActionsGenerators.listData.requestDataSuccess | typeof dataActionsGenerators.listData.requestDataCancelled>,
        ReturnType<typeof dataActionsGenerators.listData.requestDataSuccess | typeof dataActionsGenerators.listData.requestDataError>
    ]>

function* requestActivePage({ data }: ReturnType<typeof actionsGenerators.activePage.requestActivePage>): generatorType {
    yield put(dataActionsGenerators.listData.requestData(data * Number(process.env.REACT_APP_PAGE_SIZE)))
    const [, failure] = yield race([
        take([DataActions.RequestDataSuccess, DataActions.RequestDataCancelled]),
        take(DataActions.RequestDataError)
    ])
    if (!failure) {
        yield put(actionsGenerators.activePage.setActivePage(data))
    }
}

function* requestSpotlight({ data }: ReturnType<typeof actionsGenerators.spotlight.requestSpotlight>) {
    if (data !== undefined) {
        let requestedRecord = ((yield select(getRecordByNameSelector)) as ReturnType<typeof getRecordByNameSelector>)(data)
        if (!requestedRecord) {
            yield put(dataActionsGenerators.listData.requestSingleRecord(data))
            const [success]: [
                ReturnType<typeof dataActionsGenerators.listData.requestSingleRecordSuccess>,
                ReturnType<typeof dataActionsGenerators.listData.requestSingleRecordError>
            ] = yield race([
                take(DataActions.RequestSingleRecordSuccess),
                take(DataActions.RequestSingleRecordError)
            ])
            requestedRecord = success.data
        }
        if (requestedRecord) {
            yield put(dataActionsGenerators.linkedData.requestLinkedData(requestedRecord))
            const [success, failure]: [
                ReturnType<typeof dataActionsGenerators.linkedData.requestLinkedDataSuccess>,
                ReturnType<typeof dataActionsGenerators.linkedData.requestLinkedDataError>
            ] = yield race([
                take(DataActions.RequestLinkedDataSuccess),
                take(DataActions.RequestLinkedDataError)
            ])
            if (success) {
                yield put(actionsGenerators.spotlight.requestSpotlightSuccess(success.data))
            } else {
                yield put(actionsGenerators.spotlight.requestSpotlightFailure(failure))
            }
        } else {
            yield put(actionsGenerators.spotlight.requestSpotlightFailure('Missing data'))
        }
    } else {
        yield put(actionsGenerators.spotlight.requestSpotlightSuccess())
    }
}

export default function* requestActivePageWatcher() {
    yield takeLeading(Actions.RequestActivePage, requestActivePage)
    yield takeEvery(Actions.RequestSpotlight, requestSpotlight)
}