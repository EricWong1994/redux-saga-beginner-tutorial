import "@babel/polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import Counter from './Counter'
import reducer from './reducers'

// const store = createStore(reducer)

const action = type => store.dispatch({type})

//...
import { helloSaga } from './sagas'


const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(helloSaga)

// const action = type => store.dispatch({type})

const incre = () => {
  action('INCREMENT');
  // console.log(this.props)
}

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      // onIncrement={() => incre()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
