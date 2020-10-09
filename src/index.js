import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { mainReducer } from './store/reducer'
import createSagaMiddleWare from 'redux-saga'
import { watchLoadData } from './saga/sagas'

const sagaMiddleWare = createSagaMiddleWare()
const store = createStore(
  mainReducer,
  applyMiddleware(sagaMiddleWare)
)
sagaMiddleWare.run(watchLoadData)

ReactDOM.render(<Provider store={store}> <App /> </Provider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
