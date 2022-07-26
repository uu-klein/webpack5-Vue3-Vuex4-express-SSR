/*
 * @Author: Klien
 * @Date: 2022-02-09 21:56:23
 * @LastEditTime: 2022-07-26 21:07:00
 * @LastEditors: Klien
 */
import { createSSRApp } from '@vue/runtime-dom';

import { renderToString } from '@vue/server-renderer';

import { createMemoryHistory } from 'vue-router';

import { createAppRouter } from '@/router';

import App from '@/pages/App.vue';

import { store } from '@/store';

import { QueryClient, dehydrate, VUE_QUERY_CLIENT } from 'vue-query';

export const render = async ({ url, _store }: any) => {
	const app = createSSRApp(App);

	app.provide('store', store);

	if (_store) {
		const { vuex } = _store;

		if (vuex) {
			store.replaceState(JSON.parse(vuex));
		}
	} 

	const router = createAppRouter({ history: createMemoryHistory() });

	app.use(router);

	// const metaManager = createMetaManager(true);
	// app.use(metaManager);
	// app.use(metaPlugin);

	const client = new QueryClient();

	const query = {
		toJSON() {
			return dehydrate(client);
		},
	};

	client.mount();

	app.provide(VUE_QUERY_CLIENT, client);

	await router.push(url);

	await router.isReady();

	const sharedContext = {};

	const html = await renderToString(app, sharedContext);

	// await renderMetaToString(app, sharedContext);

	return { html, state: { query }, store };
};
