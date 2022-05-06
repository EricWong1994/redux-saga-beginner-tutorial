import "@babel/polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import Counter from './Counter'
import Learn from './components/learn'
// import reducer from './reducers'
import {listReducer} from './reducers/listReducer'
import {userReducer} from './reducers/userReducer'
import { fetchProducts } from './sagas/index';

// const store = createStore(reducer)

const action = type => store.dispatch({ type });

//...
import rootSaga, { helloSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();
// const store = createStore(reducer, applyMiddleware(sagaMiddleware));
const store = createStore(
	combineReducers({
		user: userReducer,
		list: listReducer
	}),
	{},
	applyMiddleware(sagaMiddleware));
// sagaMiddleware.run(helloSaga)
sagaMiddleware.run(rootSaga);

function render() {
	ReactDOM.render(
		<div>
			{/* <Counter
				value={store.getState()}
				// onIncrement={() => incre()}
				onIncrement={() => action('INCREMENT')}
				onDecrement={() => action('DECREMENT')}
				onIncrementAsync={() => action('INCREMENT_ASYNC')}
				onLogin={() => action('LOGIN_REQUEST')}
				onLoginOut={() => action('LOGOUT')}
				// onFetchProducts={() => action('PRODUCTS_RECEIVED')}
				onFetchProducts={fetchProducts}
			/> */}
			<Learn store={store}></Learn>
		</div>
		,
		document.getElementById('root')
	);
}

render()
store.subscribe(render)
