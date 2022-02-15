/*
 * @Author: Klien
 * @Date: 2022-02-10 18:50:49
 * @LastEditTime: 2022-02-14 05:58:41
 * @LastEditors: Klien
 */
import { createStore, Store } from 'vuex';

import createPersistedState from 'vuex-persistedstate';

import Cookies from 'js-cookie';

import { state, stateProps } from '@/store/state';

import { mutations } from '@/store/mutations';

import { actions } from '@/store/actions';

const plugins: any = [];

typeof window !== 'undefined'
	? plugins.push(
			createPersistedState({
				storage: {
					getItem: (key: string) => Cookies.get(key),
					setItem: (key: string, value: any) => Cookies.set(key, value, { expires: 3, secure: true }),
					removeItem: (key: string) => Cookies.remove(key),
				},
			})
	  )
	: '';

export const store: Store<stateProps> = createStore({
	state,
	mutations,
	actions,
	plugins,
});
