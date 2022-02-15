/*
 * @Author: Klien
 * @Date: 2022-02-09 21:56:23
 * @LastEditTime: 2022-02-14 08:59:02
 * @LastEditors: Klien
 */
import { createSSRApp } from '@vue/runtime-dom';

import { renderToString } from '@vue/server-renderer';

import { createMemoryHistory } from 'vue-router';

import { createAppRouter } from '@/router';

import App from '@/pages/App.vue';

import { store } from '@/store';

export const render = async ({ url, state, _store }: any) => {
	const app: any = createSSRApp(App);

	app.provide('store', store);

	if (_store) {
		const { vuex } = _store;

		store.replaceState(JSON.parse(vuex));
	}

	state = store.state;

	const router = createAppRouter({ history: createMemoryHistory() });

	app.use(router);

	await router.push(url);

	await router.isReady();

	// const matchedComponents = router.currentRoute.value.matched.flatMap((record: any) => Object.values(record.components));

	// try {
	// 	await Promise.all(
	// 		matchedComponents.map((component: any) => {
	// 			if (component.asyncData) {
	// 				return component.asyncData({
	// 					store,
	// 					route: router.currentRoute.value,
	// 				});
	// 			}
	// 		})
	// 	);
	// } catch (error) {
	// 	console.log(error);
	// }

	const html = await renderToString(app);

	return { html, state };
};
