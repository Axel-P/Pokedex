import createSagaMiddleware from 'redux-saga'
import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import rootSaga from '../sagas'
import rootStore from './rootStore'
import { IStore } from './types'
import { ActionTypes } from './actions/actionCreators'

const rootReducer = combineReducers<IStore, ActionTypes>({
    data: rootStore
})

const sagaMiddleware = createSagaMiddleware()
const middlewares = applyMiddleware(sagaMiddleware)
const store = createStore(
    rootReducer,
    compose(middlewares)
)

sagaMiddleware.run(rootSaga)

export default store

