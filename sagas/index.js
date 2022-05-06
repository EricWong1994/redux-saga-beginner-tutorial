import {
	put,
	takeEvery,
	all,
	call,
	takeLatest,
	take,
	cancel,
	cancelled,
	fork,
	select
} from 'redux-saga/effects';
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

export function* incrementAsync() {
	// yield delay(1000);
	yield call(delay, 1000);
	yield put({ type: 'INCREMENT' });
}

export function* watchIncrementAsync() {
	yield takeEvery('INCREMENT_ASYNC', incrementAsync);
	// yield takeLatest('INCREMENT_ASYNC', incrementAsync);
}

export function* fetchProducts() {
	try {
		// const products = yield call(Api.fetch, '/products');
		const products = yield call(Api.authorize, '/products');
		// const [products, repos] = yield [
		// 	call(Api.fetch, '/products'),
		// 	call(Api.fetch, '/repos')
		// ]
		console.log('products: ', products);
		// const repos = yield call(Api.fetch, '/repos');
		yield put({ type: 'PRODUCTS_RECEIVED', products });
		// yield put({ type: 'REPOS_RECEIVED', repos });
	} catch (error) {
		yield put({ type: 'PRODUCTS_REQUEST_FAILED', error });
	}
}

function* authorize(user, password) {
	try {
		const token = yield call(Api.authorize, user, password);
		yield put({ type: 'LOGIN_SUCCESS', token });
		yield call(Api.storeItem, { token });
		return token;
	} catch (error) {
		yield put({ type: 'LOGIN_ERROR', error });
	} finally {
		if (yield cancelled()) {
			console.log('cancel: ');
		}
	}
}

function* loginFlow() {
	while (true) {
		const { user, password } = yield take('LOGIN_REQUEST');
		const task = yield fork(authorize, user, password);
		const action = yield take(['LOGOUT', 'LOGIN_ERROR']);
		if (action.type === 'LOGOUT') {
			yield cancel(task);
		}
		yield call(Api.clearItem, 'token');
	}
}

function* learnSaga() {
	yield takeEvery('INCREMENT', function*() {
		// const state = select()
		// const state = select(state => state.user)
		// 记得加yield，否则拿不到state
		const state = yield select(state => state.user)
		console.log('state: ', state);
	})

	// take只执行一次，需要写在while循环中
	yield take('INCREMENT');
	console.log('take')
}

// export default function* rootSaga() {
// 	yield all([
// 		helloSaga(),
// 		watchIncrementAsync(),
// 		fetchProducts(),
// 		// fetchProducts,
// 		loginFlow(),
// 	]);
// }
export default function* rootSaga() {
	yield all([
		learnSaga()
	]);
}