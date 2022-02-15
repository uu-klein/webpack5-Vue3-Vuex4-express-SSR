/*
 * @Author: Klien
 * @Date: 2022-02-09 21:48:13
 * @LastEditTime: 2022-02-14 08:58:11
 * @LastEditors: Klien
 */
export {};

const path = require('path');

const webpack = require('webpack');

const serverConfig = require('../../../config/webpack/server/webpack.config.server');

const { transformDevStats } = require('../transform.webpack.stats');

const { createHtmlRenderer } = require('./renderer.html');

const createHotReloadingServerRenderer = (config: any) => {
	const serverCompiler = webpack(config);

	let renderApp: any = null;

	let setCompilationDone: any = null;

	let ssrCompilation: any = new Promise((resolve: any) => {
		setCompilationDone = resolve;
	});

	serverCompiler.watch({ 'info-verbosity': 'none' }, (error: any, stats: any) => {
		if (error) {
			console.error('Server critical error');
			throw error;
		}

		const jsonStats = stats.toJson();

		if (stats.hasErrors()) {
			console.error('Server errors');
			jsonStats.errors.forEach((err: any) => console.error(err));
			return;
		}

		const { entrypoints, outputPath } = jsonStats;

		const {
			main: {
				assets: [mainChunkPath],
			},
		} = entrypoints;

		const { render } = require(path.resolve(outputPath, mainChunkPath.name));

		renderApp = render;

		setCompilationDone();
	});

	return async (stuff: any) => {
		await ssrCompilation;

		const result: any = await renderApp(stuff);

		return result;
	};
};

const createDevRenderer = (onUpdate: any) => {
	const renderApp: any = createHotReloadingServerRenderer(serverConfig);

	const renderHtml: any = createHtmlRenderer(onUpdate);

	return async (stuff: any, { stats, outputFileSystem }: any) => {
		const { html, state }: any = await renderApp(stuff);

		const { head, body, ssrStore }: any = transformDevStats(stats.toJson(), outputFileSystem, state);

		const completeHtml: any = await renderHtml({
			appHtml: html,
			head,
			body,
			ssrStore,
		});

		return completeHtml;
	};
};

module.exports = {
	createDevRenderer,
};