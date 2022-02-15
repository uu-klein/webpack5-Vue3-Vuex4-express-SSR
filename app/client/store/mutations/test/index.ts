/*
 * @Author: Klien
 * @Date: 2022-02-10 18:53:06
 * @LastEditTime: 2022-02-12 23:22:33
 * @LastEditors: Klien
 */
import { mutationProps } from '../index';

import { stateProps } from '@/store/state';

export const testMutations: mutationProps = {
	getCount(state: stateProps) {
		console.log('state.counter;state.counter;state.counter;',state.counter);
		return state.counter;
	},
	setCount(state: stateProps, data: any) {
		state.counter = data;
	},
	addCount(state: stateProps) {
		state.counter += 1;
	},
};
