import createSagaMiddleware from 'redux-saga'
import { createStore, compose, applyMiddleware } from 'redux'
import rootSaga from '../sagas'
import rootReducer from './reducers'

const sagaMiddleware = createSagaMiddleware()
const middlewares = applyMiddleware(sagaMiddleware)
const store = createStore(
    rootReducer,
    compose(middlewares)
)

sagaMiddleware.run(rootSaga)

export default store

