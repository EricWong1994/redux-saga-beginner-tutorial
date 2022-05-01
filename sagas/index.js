import { put, takeEvery, all, call, takeLatest } from 'redux-saga/effects';
import Api from './apis';
export const delay = ms => new Promise(res => setTimeout(res, ms));
export const createUser = ms =>
	new Promise(res =>
		setTimeout(function () {
			console.log('createUser: ', res);
		}, ms)
	);

export function* helloSaga() {
	console.log('Hello Sagas!');
}

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
	// yield delay(1000);
	yield call(delay, 1000);
	yield put({ type: 'INCREMENT' });
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
	yield takeEvery('INCREMENT_ASYNC', incrementAsync);
	// yield takeLatest('INCREMENT_ASYNC', incrementAsync);
}

export function* fetchProducts() {
	try {
		const products = yield call(Api.fetch, '/products');
		yield put({ type: 'PRODUCTS_RECEIVED', products });
	} catch (error) {
		yield put({ type: 'PRODUCTS_REQUEST_FAILED', error });
	}
}

// export function* createUserAsync() {
// 	yield call(createUser, 1000);
// 	yield put({ type: 'CREATE_USER' });
// }

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
	yield all([helloSaga(), watchIncrementAsync(), fetchProducts]);
	// yield takeEvery('CREATE_USER', createUserAsync);
}

// 错误处理（有错误 todo  ✖ fetchProducts should yield an Effect call(Api.fetch, './products')）
// function fetchProductsApi() {
// 	return Api.fetch('/products')
// 		.then(response => ({ response }))
// 		.catch(error => ({ error }));
// }

// export function* fetchProducts() {
// 	const { response, error } = yield call(fetchProductsApi);
// 	if (response) yield put({ type: 'PRODUCTS_RECEIVED', products: response });
// 	else yield put({ type: 'PRODUCTS_REQUEST_FAILED', error });
// }
