/*
 * @Author: Klien
 * @Date: 2022-02-10 18:52:38
 * @LastEditTime: 2022-02-10 18:52:39
 * @LastEditors: Klien
 */
import { testMutations } from './test';

export interface mutationProps {
	addCount: Function;

	[propName: string]: any;
}

export const mutations: mutationProps = {
	...testMutations,
};
