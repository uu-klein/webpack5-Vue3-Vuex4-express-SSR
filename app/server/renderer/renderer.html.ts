/*
 * @Author: Klien
 * @Date: 2022-02-09 21:48:24
 * @LastEditTime: 2022-02-22 01:15:38
 * @LastEditors: Klien
 */
export {};

const path = require('path');

const Mustache = require('mustache');

const chokidar = require('chokidar');

const {
	promises: { readFile },
} = require('fs');

const templatePath: any = path.join(__dirname, '../../client/template/index.ejs');

let template: any;

const renderHtml = async (stuff:any) => {
	if (!template) {
	  const buffer = await readFile(templatePath);
	  template = buffer.toString();
	}
	return Mustache.render(template, stuff);
  };

const createHtmlRenderer = (onTemplateUpdate: any) => {
	let shouldReload: boolean = true;
	
	let currentTemplate: any;

	chokidar.watch(templatePath).on('change', () => {
		shouldReload = true;
		onTemplateUpdate();
	});

	const loadTemplate: any = async () => {
		if (!shouldReload) return;
		
		const buffer: any = await readFile(templatePath);
		
		currentTemplate = buffer.toString();
		
		shouldReload = false;
	};

	return async (stuff: any) => {
		await loadTemplate();
		
		return Mustache.render(currentTemplate, stuff);
	};
};

module.exports = {
	createHtmlRenderer,
	renderHtml,
};
