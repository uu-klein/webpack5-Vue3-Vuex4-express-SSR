/*
 * @Author: Klien
 * @Date: 2022-02-09 20:08:38
 * @LastEditTime: 2022-02-22 03:41:23
 * @LastEditors: Klien
 */
export {};

const path = require('path');

const webpack = require('webpack');

const { merge } = require('webpack-merge');

const baseConfig = require('../base/webpack.config.base');

const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

const TerserPlugin = require('terser-webpack-plugin');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const entry = {
	main: './app/client/entry/server.ts',
};

const output = {
	filename: 'main.[contenthash].js',
	path: path.resolve(__dirname, '../../../', 'dist/server'),
	libraryTarget: 'commonjs2',
};

const rules = [
	{
		test: /\.(le|c|sa|sc)ss$/,
		use: ['null-loader'],
	},
];

const optimization = {
	removeEmptyChunks: true,
	minimizer: [new TerserPlugin()],
	usedExports: true,
	runtimeChunk: 'single',
	splitChunks: {
		chunks: 'all',
		maxInitialRequests: Infinity,
		minSize: 1000,
		maxSize: 20000,
		cacheGroups: {
			defaultVendors: {
				test: /[\\/]node_modules[\\/]/,
				priority: -10,
				chunks: 'initial',
			},
			vue: {
				name: 'vue',
				chunks: 'all',
				test: /[\\/]node_modules[\\/]vue/,
				enforce: true,
			},
			commons: {
				chunks: 'initial',
				name: 'commons',
				maxInitialRequests: 5,
				minSize: 0,
			},
			default: {
				priority: -20,
				reuseExistingChunk: true,
			},
		},
	},
};

const plugins = [
	new webpack.optimize.LimitChunkCountPlugin({
		maxChunks: 1,
	}),

	new WebpackManifestPlugin(),

	new BundleAnalyzerPlugin(),
];

const config = {
	target: 'node',
	output,
	entry,
	module: {
		rules,
	},
	plugins,
	optimization,
};

module.exports = merge(baseConfig, config);
