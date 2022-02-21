/*
 * @Author: Klien
 * @Date: 2022-02-09 20:12:39
 * @LastEditTime: 2022-02-22 03:21:45
 * @LastEditors: Klien
 */
export {};

const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.config.client.common');

const { StatsWriterPlugin } = require('webpack-stats-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin

const entry = {
	main: './app/client/entry/client.ts',
};

const plugins = [
	new StatsWriterPlugin(),

	new MiniCssExtractPlugin({
		filename: '[name].[contenthash:8].css',
		chunkFilename: '[name].[contenthash:8].css',
	}),

	// new BundleAnalyzerPlugin()
];

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
		use: [
			MiniCssExtractPlugin.loader,
			'css-loader',
			postCssConfig,
			'less-loader',
		],
	},
];

const optimization = {
	removeEmptyChunks: true,
	minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
	usedExports: true,
	runtimeChunk: 'single',
	splitChunks: {
		chunks: 'all',
		maxInitialRequests: Infinity,
		minSize: 20000,
		maxSize: 35000,
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

const config = {
	entry,
	plugins,
	optimization,
	module: {
		rules,
	},
};

module.exports = merge(commonConfig, config);
