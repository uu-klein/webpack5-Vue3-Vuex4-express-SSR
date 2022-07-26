/*
 * @Author: Klien
 * @Date: 2022-02-09 21:39:16
 * @LastEditTime: 2022-07-26 17:34:36
 * @LastEditors: Klien
 */
const path = require('path');

const express = require('express');

const cookieParser = require('cookie-parser');

const { zdAxiosGet } = require('../axios');

const cors = require('cors');

const createServer = async () => {
	const app = express();

	const  corsOptions  = {
		origin: 'http://192.168.254.102:3003',
		credentials: true,
	}

	app.use(cors(corsOptions));

	app.all('*', function (req: any, res: any, next: any) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'X-Requested-With');
		res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
		next();
	});

	app.use(cookieParser());

	app.use(express.static(path.resolve(__dirname, '../public')));

	app.use('/getUserInfo', (req: any, res: any) => {
		// zdAxiosGet('https://suggest.taobao.com/sug?code=utf-8&q=%E5%8D%AB%E8%A1%A3&callback=cb').then((result: any) => res.json(result));
		res.json({ 111111: '11111111' });
	});

	return app;
};

module.exports = {
	createServer,
};
