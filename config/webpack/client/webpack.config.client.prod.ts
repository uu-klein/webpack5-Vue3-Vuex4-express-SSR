/*
 * @Author: Klien
 * @Date: 2022-02-09 20:12:39
 * @LastEditTime: 2022-07-22 18:33:33
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
			plugins: [
				'postcss-preset-env',
				'autoprefixer',
				{
					'postcss-px-to-viewport': {
						unitToConvert: 'px', // 需要转换的单位，默认为"px"
						viewportWidth: 1920, // 视窗的宽度，对应pc设计稿的宽度，一般是1920
						// viewportHeight: 1080,// 视窗的高度，对应的是我们设计稿的高度
						unitPrecision: 3, // 单位转换后保留的精度
						propList: ['*'], // 能转化为vw的属性列表
						viewportUnit: 'vw', // 希望使用的视口单位
						fontViewportUnit: 'vw', // 字体使用的视口单位
						selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。cretae
						minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
						mediaQuery: false, // 媒体查询里的单位是否需要转换单位
						replace: true, // 是否直接更换属性值，而不添加备用属性
						exclude: /(\/|\\)(node_modules)(\/|\\)/, // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
					},
				},
			],
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
