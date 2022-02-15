/*
 * @Author: Klien
 * @Date: 2022-02-14 14:50:44
 * @LastEditTime: 2022-02-14 14:51:48
 * @LastEditors: Klien
 */
import axios from 'axios';

import { data } from './data';

export const zdAxiosGet = (url: string, params?: Record<string, any>) => {
	return new Promise((resolve, reject) => {
		axios
			.get(url, params)
			.then((response: Record<string, any>) => {
				const dataSources: Record<string, any> = data(response);
				resolve(dataSources);
			})
			.catch((error: Record<string, any>) => {
				reject(error);
			});
	});
};
