/*
 * @Author: Klien
 * @Date: 2022-02-14 14:50:36
 * @LastEditTime: 2022-02-14 15:42:19
 * @LastEditors: Klien
 */
import axios from 'axios';

import { ZH, TW, EN } from '../language';

const port = 3003;

const httpCode: any = ZH.httpCode;

axios.defaults.timeout = 10000;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? `http://localhost:${port}` : '/';

axios.interceptors.request.use(
	(config: Record<string, any>) => {
		// config.baseURL =  '/';
		// config.headers['token'] = localStorage.getItem('token') || '';
		return config;
	},
	(error: Record<string, any>) => {
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	(response: Record<string, any>) => {
		return response;
	},
	(error: Record<string, any>) => {
		if (error.response) {
			let tips: string = error.response.status in httpCode ? httpCode[error.response.status] : error.response.data.message;
			return Promise.reject(error);
		} else {
			return Promise.reject(new Error(ZH.timeOut));
		}
	}
);
