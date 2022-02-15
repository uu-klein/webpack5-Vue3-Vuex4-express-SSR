/*
 * @Author: Klien
 * @Date: 2022-02-14 14:50:52
 * @LastEditTime: 2022-02-14 14:52:02
 * @LastEditors: Klien
 */
import axios from 'axios';

import QS from 'qs';

import { data } from './data';

export const zdAxiosPost = (url: string, params?: Record<string, any>) => {
	return new Promise((resolve, reject) => {
		axios
			.post(url, QS.stringify(params))
			.then((response: Record<string, any>) => {
				const dataSources: Record<string, any> = data(response);
				resolve(dataSources);
			})
			.catch((error: Record<string, any>) => {
				reject(error);
			});
	});
};
