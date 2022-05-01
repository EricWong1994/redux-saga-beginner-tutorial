import React from 'react'
import { PropTypes } from 'prop-types';

const Counter = ({
	value,
	onIncrement,
	onDecrement,
	onIncrementAsync,
	onLogin,
	onLoginOut,
}) => (
	<div>
		<button onClick={onIncrementAsync}>Increment after 1 second</button>{' '}
		<button onClick={onIncrement}>Increment</button>{' '}
		<button onClick={onDecrement}>Decrement</button>
		<hr />
		<div>Clicked: {value} times</div>
		<button onClick={onLogin}>登录</button>
		<button onClick={onLoginOut}>退出</button>
	</div>
);

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired
}

export default Counter
