/*
 * @Author: Klien
 * @Date: 2022-02-09 21:45:22
 * @LastEditTime: 2022-02-22 14:33:55
 * @LastEditors: Klien
 */
export {};

const webpack = require('webpack');

const devMiddleware = require('webpack-dev-middleware');

const hotMiddleware = require('webpack-hot-middleware');

const { createServer } = require('../index');

const clientConfig = require('../../../config/webpack/client/webpack.config.client.dev');

const { createDevRenderer } = require('../renderer/renderer.dev');

const port = 3005;

const setupDevSsr = async () => {
	const app = await createServer();

	const clientCompiler = webpack(clientConfig);

	const { publicPath } = clientConfig.output;

	app.use(devMiddleware(clientCompiler, { publicPath, serverSideRender: true }));

	const hotMiddlewareInstance = hotMiddleware(clientCompiler, {
		heartbeat: 5000,
	});

	app.use(hotMiddlewareInstance);

	const render = createDevRenderer(() => {
		hotMiddlewareInstance.publish({ reload: true });
	});

	app.use('*', async (req: any, res: any) => {
		let length: number = Object.keys(req.cookies).length;

		const _store: any = length > 0 ? req.cookies : undefined;

		const html: any = await render({ url: req.originalUrl, _store }, res.locals.webpack.devMiddleware);

		res.send(html);
	});

	return app;
};

const start = async () => {
	const app: any = await setupDevSsr();

	try {
		await app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
	} catch (err: any) {
		app.log.error(err);
		process.exit(1);
	}
};
start();
