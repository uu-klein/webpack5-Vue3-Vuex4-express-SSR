/*
 * @Author: Klien
 * @Date: 2022-02-09 21:45:36
 * @LastEditTime: 2022-07-26 15:50:51
 * @LastEditors: Klien
 */
export {};

const path = require('path');

const express = require('express');

const { createServer } = require('../index');

const clientStats = require('../../../dist/client/stats.json');

const clientConfig = require('../../../config/webpack/client/webpack.config.client.prod');

const serverConfig = require('../../../config/webpack/server/webpack.config.server');

const serverManifest = require('../../../dist/server/manifest.json');

const { renderHtml } = require('../renderer/renderer.html');

const { transformProdStats } = require('../transform.webpack.stats');

const setupDevSsr = async () => {
	const app = await createServer();

	app.use(clientConfig.output.publicPath, express.static(path.resolve(__dirname, '../../../dist/client')));

	const { render } = require(path.join(serverConfig.output.path, serverManifest['main.js']));

	const { assetsByChunkName } = clientStats;

	const arr: Array<[]> = [];

	Object.keys(assetsByChunkName).forEach((item: any) => arr.push(...assetsByChunkName[item]));

	app.use('/*', async (req: any, res: any) => {
		let length: number = Object.keys(req.cookies).length;

		const _store: any = length > 0 ? req.cookies : undefined;

		const { html, state,store } = await render({
			url: req.originalUrl,
			_store,
		});

		const { head, body, ssrStore,headScript, normalizeCss } = transformProdStats({
			stats: arr,
			publicPath: clientConfig.output.publicPath,
			store: store.state,
		});

		const queryState = JSON.stringify(state.query);

		const completeHtml = await renderHtml({
			appHtml: html,
			head,
			body,
			ssrStore,
			headScript,
			normalizeCss,
			queryState,
		});

		res.send(completeHtml);
	});

	return app;
};

const start = async () => {
	const app = await setupDevSsr();

	try {
		await app.listen(3003, () => console.log(`Server running on http://localhost:3003`));
	} catch (err) {
		app.log.error(err);

		process.exit(1);
	}
};

start();
