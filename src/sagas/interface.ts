import { put, PutEffect, race, RaceEffect, take, TakeEffect, takeLeading } from "redux-saga/effects";
import { Actions as DataActions, actionsGenerators as dataActionsGenerators } from "../store/actions/dataActionCreators";
import { Actions, actionsGenerators } from "../store/actions/interfaceActionCreators";

type generatorType = Generator<PutEffect<{
    type: DataActions;
    data: number;
}> | RaceEffect<TakeEffect> | PutEffect<{
    type: Actions;
    data: number;
}>, void, [
        ReturnType<typeof dataActionsGenerators.requestDataSuccess | typeof dataActionsGenerators.requestDataCancelled>,
        ReturnType<typeof dataActionsGenerators.requestDataSuccess | typeof dataActionsGenerators.requestDataError>
    ]>

function* requestActivePage({ data }: ReturnType<typeof actionsGenerators.activePage.requestActivePage>): generatorType {
    yield put(dataActionsGenerators.requestData(data * Number(process.env.REACT_APP_PAGE_SIZE)))
    const [, failure] = yield race([
        take([DataActions.RequestDataSuccess, DataActions.RequestDataCancelled]),
        take(DataActions.RequestDataError)
    ])
    if (!failure) {
        yield put(actionsGenerators.activePage.setActivePage(data))
    }
}

export default function* requestActivePageWatcher() {
    yield takeLeading(Actions.RequestActivePage, requestActivePage)
}