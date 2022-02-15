/*
 * @Author: Klien
 * @Date: 2022-02-09 21:59:56
 * @LastEditTime: 2022-02-11 14:46:30
 * @LastEditors: Klien
 */
import { createRouter, Router, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		meta: {
			title: '首页',
			keepAlive: true,
		},
		component: () => import('@/pages/Home/index.vue'),
	},
	{
		path: '/about',
		name: 'About',
		meta: {
			title: 'About',
			keepAlive: true,
		},
		component: () => import('@/pages/About/index.vue'),
	},
];

export const createAppRouter: ({ history }: any) => Router = ({ history }: any) => {
	return createRouter({
		history,
		routes,
	});
};
