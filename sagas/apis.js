const Api = {
	fetch(params) {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve({
					data: `${params}-假数据`,
					// data: 'hello saga',
				});
			}, 3000);
		});
	},
	authorize(params) {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve('test-token');
			}, 2000);
		});
	},
	storeItem(obj) {
		Object.keys(obj).forEach(key => {
			window.localStorage.setItem(key, obj[key]);
		});
	},
	clearItem(key) {
		window.localStorage.removeItem(key);
	},
	clearAll() {
		window.localStorage.clear();
	},
};
export default Api;
