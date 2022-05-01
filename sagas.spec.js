import test from 'tape';

import { put, call } from 'redux-saga/effects';
import { incrementAsync, delay, fetchProducts } from './sagas';
import Api from './sagas/apis';

test('incrementAsync Saga test', assert => {
	const gen = incrementAsync();

	assert.deepEqual(
		gen.next().value,
		call(delay, 1000),
		// call(delay, 2000),
		'incrementAsync Saga must call delay(1000)'
	);

	assert.deepEqual(
		gen.next().value,
		put({ type: 'INCREMENT' }),
		'incrementAsync Saga must dispatch an INCREMENT action'
	);

	assert.deepEqual(
		gen.next(),
		{ done: true, value: undefined },
		'incrementAsync Saga must be done'
	);

	assert.end();
});

test('fetchProducts Saga test', assert => {
	const iterator = fetchProducts();
	assert.deepEqual(
		iterator.next().value,
		call(Api.fetch, '/products'),
		"fetchProducts should yield an Effect call(Api.fetch, './products')"
	);
	// 创建一个假的响应对象
	const products = {};
	const error = {};

	// assert.deepEqual(
	// 	iterator.next(products).value,
	// 	put({ type: 'PRODUCTS_RECEIVED', products }),
	// 	"fetchProducts should yield an Effect put({ type: 'PRODUCTS_RECEIVED', products })"
	// );
	assert.deepEqual(
		iterator.throw(error).value,
		put({ type: 'PRODUCTS_REQUEST_FAILED', error }),
		"fetchProducts should yield an Effect put({ type: 'PRODUCTS_REQUEST_FAILED', error })"
	);
	assert.end();
});
