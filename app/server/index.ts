/*
 * @Author: Klien
 * @Date: 2022-02-09 21:39:16
 * @LastEditTime: 2022-02-22 03:14:12
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
		zdAxiosGet('https://api.apiopen.top/getJoke?page=1&count=2&type=video').then((result: any) => res.json(result));
	});

	return app;
};

module.exports = {
	createServer,
};
