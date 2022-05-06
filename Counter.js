import React from 'react'
import { PropTypes } from 'prop-types';

const Counter = ({
	value,
	onIncrement,
	onDecrement,
	onIncrementAsync,
	onLogin,
	onLoginOut,
	onFetchProducts,
}) => (
	<div className='counter-container'>
		<button onClick={onIncrementAsync}>Increment after 1 second</button>{' '}
		<button onClick={onIncrement}>Increment</button>{' '}
		<button onClick={onDecrement}>Decrement</button>
		<hr />
		<div>Clicked: {value} times</div>
		<button onClick={onLogin}>登录</button>
		<button onClick={onLoginOut}>退出</button>
		<hr />
		<button onClick={onFetchProducts}>fetchProducts</button>
		<h3> {value} </h3>
	</div>
);

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired
}

export default Counter
