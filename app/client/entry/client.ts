/*
 * @Author: Klien
 * @Date: 2022-02-09 21:56:12
 * @LastEditTime: 2022-02-14 06:25:45
 * @LastEditors: Klien
 */
import { createSSRApp } from 'vue';

import { createWebHistory } from 'vue-router';

import { createAppRouter } from '@/router';

import App from '@/pages/App.vue';

import { store } from '@/store';

const start = async () => {
	const app = createSSRApp(App);

	const router = createAppRouter({ history: createWebHistory() });

	app.use(router);

	app.use(store);

	await router.isReady();

	app.mount('#app');
};

start();
