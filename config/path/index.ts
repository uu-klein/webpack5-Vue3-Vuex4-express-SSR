/*
 * @Author: Klien
 * @Date: 2022-02-11 14:13:16
 * @LastEditTime: 2022-02-22 15:52:05
 * @LastEditors: Klien
 */
export {};

const path = require('path');

const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = (relativePath: any) => path.resolve(appDirectory, relativePath);

module.exports = {
	dist: resolveApp('dist'),

	node_modules: resolveApp('node_modules'),

	app: resolveApp('app'),

	axios: resolveApp('app/axios'),

	language: resolveApp('app/language'),

	copy_from: resolveApp('robots.txt'),

	copy_to: resolveApp('dist/robots.txt'),

	client: resolveApp('app/client'),

	client_pages: resolveApp('app/client/pages'),

	client_api: resolveApp('app/client/api'),

	client_assets: resolveApp('app/client/assets'),

	client_store: resolveApp('app/client/store'),

	client_components: resolveApp('app/client/components'),

	client_router: resolveApp('app/client/router'),

	client_template: resolveApp('app/client/template/index.ejs'),

	client_entry: resolveApp('app/client/entry'),

	server: resolveApp('app/server'),

	server_config: resolveApp('app/server/config'),

	server_renderer: resolveApp('app/server/renderer'),
};
