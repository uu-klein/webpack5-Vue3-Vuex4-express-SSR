/*
 * @Author: Klien
 * @Date: 2022-02-10 18:52:18
 * @LastEditTime: 2022-02-12 23:20:27
 * @LastEditors: Klien
 */
enum testActionsTypes {
	addCount = 'addCount',
	setCount = 'setCount',
	getCount = 'getCount',
}

export const testActions = {
	[testActionsTypes.getCount]({ commit }: any) {
		return commit('getCount');
	},
	[testActionsTypes.setCount]({ commit }: any, data: any) {
		console.log('setCountsetCountsetCountsetCountsetCount', data);
		commit('setCount', data);
	},
	[testActionsTypes.addCount]({ commit }: any) {
		commit('addCount');
	},
};
