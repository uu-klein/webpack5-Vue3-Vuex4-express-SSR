/*
 * @Author: Klien
 * @Date: 2022-02-09 20:08:28
 * @LastEditTime: 2022-02-10 15:56:18
 * @LastEditors: Klien
 */
export {};

const path = require('path');

const { merge } = require('webpack-merge');

const baseConfig = require('../base/webpack.config.base');

const output = {
	filename: 'main.[contenthash].js',
	path: path.resolve(__dirname, '../../../', 'dist/client'),
	publicPath: '/',
};

const config = { output };

module.exports = merge(baseConfig, config);
