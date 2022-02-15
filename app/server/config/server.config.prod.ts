/*
 * @Author: Klien
 * @Date: 2022-02-09 21:45:36
 * @LastEditTime: 2022-02-10 17:14:52
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

	app.use(clientConfig.output.publicPath, express.static(path.resolve(__dirname, '../dist/client')));

	const { render } = require(path.join(serverConfig.output.path, serverManifest['main.js']));

	const { head, body } = transformProdStats({
		stats: clientStats,
		publicPath: clientConfig.output.publicPath,
	});

	app.use('/*', async (req: any, res: any) => {
		const { html } = await render({
			url: req.originalUrl,
		});

		const completeHtml = await renderHtml({
			appHtml: html,
			head,
			body,
		});
		res.header('Content-Type', 'text/html; charset=utf-8').send(completeHtml);
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
