/*
 * @Author: Klien
 * @Date: 2022-02-09 21:39:16
 * @LastEditTime: 2022-02-22 13:46:26
 * @LastEditors: Klien
 */
const path = require('path');

const express = require('express');

const cookieParser = require('cookie-parser');

const { zdAxiosGet } = require('../axios');

const createServer = async () => {
	const app = express();

	app.use(cookieParser());

	app.use(express.static(path.resolve(__dirname, '../public')));

	app.use('/getUserInfo', (req: any, res: any) => {
		zdAxiosGet('https://suggest.taobao.com/sug?code=utf-8&q=%E5%8D%AB%E8%A1%A3&callback=cb').then((result: any) => res.json(result));
	});

	return app;
};

module.exports = {
	createServer,
};
