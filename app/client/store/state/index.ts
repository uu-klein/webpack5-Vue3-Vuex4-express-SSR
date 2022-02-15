/*
 * @Author: Klien
 * @Date: 2022-02-10 18:53:35
 * @LastEditTime: 2022-02-10 18:53:36
 * @LastEditors: Klien
 */
import { countState } from './test';

export interface stateProps {
	counter: number;

	a: number;

	b: number;

	[propName: string]: any;
}

export const state: stateProps = {
	...countState,
};
