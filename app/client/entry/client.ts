/*
 * @Author: Klien
 * @Date: 2022-02-09 21:56:12
 * @LastEditTime: 2022-07-26 21:07:23
 * @LastEditors: Klien
 */
import { createSSRApp } from 'vue';

import { createWebHistory } from 'vue-router';

import { createAppRouter } from '@/router';

import App from '@/pages/App.vue';

import { store } from '@/store';

import { QueryClient, hydrate, VUE_QUERY_CLIENT } from 'vue-query';

const start = async () => {
	const app = createSSRApp(App);

	const router = createAppRouter({ history: createWebHistory() });

	app.use(router);

	if (window?.__INITIAL_STATE__) {
		store.replaceState(JSON.parse(window.__INITIAL_STATE__));
	}

	app.use(store);

	// const metaManager = createMetaManager();
	// app.use(metaManager);
	// app.use(metaPlugin);

	let a: any = document.querySelector('[data-query-state]')?.textContent;

	const queryState = JSON.parse(a);

	const client = new QueryClient();

	hydrate(client, queryState);

	client.mount();

	app.provide(VUE_QUERY_CLIENT, client);

	await router.isReady();

	app.mount('#app');
};

start();
