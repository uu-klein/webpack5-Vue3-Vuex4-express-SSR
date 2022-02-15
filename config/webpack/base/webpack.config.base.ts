/*
 * @Author: Klien
 * @Date: 2022-02-09 20:08:19
 * @LastEditTime: 2022-02-14 15:17:30
 * @LastEditors: Klien
 */
export {};

const path = require('path');

const webpack = require('webpack');

const { VueLoaderPlugin } = require('vue-loader');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const WebpackBar = require('webpackbar');

const zlib = require('zlib');

const CompressionPlugin = require('compression-webpack-plugin');

const CopyPlugin = require('copy-webpack-plugin');

const {
	language,
	axios,
	copy_from,
	copy_to,
	client_pages,
	client_store,
	client_components,
	client_router,
	app,
	client,
	client_template,
	client_entry,
	server,
	server_config,
	server_renderer,
} = require('../../path');

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const performance = {
	hints: false,
	maxEntrypointSize: 512000,
	maxAssetSize: 512000,
};

const rules = [
	{
		test: /\.vue$/,
		use: 'vue-loader',
	},
	{
		test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
		type: 'asset/inline',
	},
	{
		test: /\.m?(t|j)s$/,
		exclude: /node_modules/,
		use: ['babel-loader'],
	},
	{
		test: /\.(jpe?g|png|svg|gif|webp|webm|avif)/i,
		type: 'asset',
		generator: {
			filename: 'img/[hash][ext][query]',
		},
		parser: {
			dataUrlCondition: {
				maxSize: 5 * 1024,
			},
		},
	},
];

const plugins = [
	new CleanWebpackPlugin(),

	new VueLoaderPlugin(),

	new webpack.DefinePlugin({
		__VUE_OPTIONS_API__: true,
		__VUE_PROD_DEVTOOLS__: false,
	}),

	new WebpackBar({
		profile: true,
		name: 'vue3-webpack5-ts-express-ssr',
		color: 'yellowgreen',
	}),

	new CompressionPlugin({
		filename: '[path][base].gz',
		algorithm: 'gzip',
		test: /\.js$|\.css$|\.html$/,
		threshold: 10240,
		minRatio: 0.8,
	}),

	new CompressionPlugin({
		filename: '[path][base].br',
		algorithm: 'brotliCompress',
		test: /\.(js|css|html|svg)$/,
		compressionOptions: {
			params: {
				[zlib.constants.BROTLI_PARAM_QUALITY]: 11,
			},
		},
		threshold: 10240,
		minRatio: 0.8,
	}),

	new CopyPlugin({
		patterns: [{ from: copy_from, to: copy_to }],
		options: { concurrency: 100 },
	}),

	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify(process.env.NODE_ENV),
		},
	}),

];

module.exports = {
	performance,
	mode,
	resolve: {
		extensions: ['.ts', '.js', '.vue', '.json'],
		alias: {
			'@/app': app,
			'@/axios': axios,
			'@/language': language,
			'@/client': client,
			'@/router': client_router,
			'@/store': client_store,
			'@/pages': client_pages,
			'@/template': client_template,
			'@/entry': client_entry,
			'@/components': client_components,
			'@/server': server,
			'@/config': server_config,
			'@/renderer': server_renderer,
		},
	},
	module: {
		rules,
	},
	plugins,
};
