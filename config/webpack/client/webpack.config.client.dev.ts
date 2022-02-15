/*
 * @Author: Klien
 * @Date: 2022-02-09 20:12:11
 * @LastEditTime: 2022-02-14 08:59:20
 * @LastEditors: Klien
 */
export {};

const webpack = require('webpack');

const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.config.client.common');

const entry = {
	main: ['webpack-hot-middleware/client?noInfo=true&reload=true', './app/client/entry/client.ts'],
};

const optimization = {
	minimize: false,
};

const postCssConfig = {
	loader: 'postcss-loader',
	options: {
		postcssOptions: {
			plugins: ['postcss-preset-env', 'autoprefixer'],
		},
	},
};

const rules = [
	{
		test: /\.(le|c)ss$/,
		use: ['vue-style-loader', 'css-loader', postCssConfig, 'less-loader'],
	},
];

const plugins = [new webpack.HotModuleReplacementPlugin()];

const config = {
	entry,
	optimization,
	plugins,
	module: {
		rules,
	},
};

module.exports = merge(commonConfig, config);
