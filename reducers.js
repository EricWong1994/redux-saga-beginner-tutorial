export default function counter(state = {}, action) {
	console.log('action: ', action);
	return Object.assign({}, state, action);
}

// export default function counter(state = 0, action) {
//   console.log('reducer-action: ', action);
//   switch (action.type) {
// 		case 'INCREMENT':
// 			return state + 1;
// 		case 'INCREMENT_IF_ODD':
// 			return state % 2 !== 0 ? state + 1 : state;
// 		case 'DECREMENT':
// 			return state - 1;
// 		// case 'PRODUCTS_RECEIVED':
// 		// 	return '产品列表';
// 		// case 'REPOS_RECEIVED':
// 		//   return state - 1
// 		default:
// 			return state;
//   }
// }

