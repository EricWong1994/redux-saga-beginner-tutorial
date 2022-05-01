const Api = {
	fetch(params) {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve({
					// data: `${params}-假数据`,
					data: 'hello saga',
				});
			});
		});
	},
};
export default Api;
