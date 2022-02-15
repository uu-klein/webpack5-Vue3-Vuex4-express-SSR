/*
 * @Author: Klien
 * @Date: 2022-02-09 21:57:16
 * @LastEditTime: 2022-02-11 23:18:34
 * @LastEditors: Klien
 */
declare module '*.less';
declare module '*.sass';
declare module '*.scss';
declare module '*.json';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';

declare module '*.vue' {
	import { DefineComponent } from 'vue';
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

