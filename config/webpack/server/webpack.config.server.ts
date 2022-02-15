/*
 * @Author: Klien
 * @Date: 2022-02-09 20:08:38
 * @LastEditTime: 2022-02-10 16:15:57
 * @LastEditors: Klien
 */
export {};

const path = require('path');

const webpack = require('webpack');

const { merge } = require('webpack-merge');

const baseConfig = require('../base/webpack.config.base');

const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

const config = {
	target: 'node',
	output: {
		filename: 'main.[contenthash].js',
		path: path.resolve(__dirname, '../../../', 'dist/server'),
		libraryTarget: 'commonjs2',
	},
	entry: {
		main: './app/client/entry/server.ts',
	},
	module: {
		rules: [
			{
				test: /\.(le|c|sa|sc)ss$/,
				use: ['null-loader'],
			},
		],
	},
	plugins: [
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1,
		}),

		new WebpackManifestPlugin(),
	],
};

module.exports = merge(baseConfig, config);
