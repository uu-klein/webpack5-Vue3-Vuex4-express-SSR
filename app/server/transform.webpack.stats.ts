/*
 * @Author: Klien
 * @Date: 2022-02-09 21:53:06
 * @LastEditTime: 2022-02-22 16:07:46
 * @LastEditors: Klien
 */
const normalizeAssets = (assets: any) => {
	if (Array.isArray(assets)) return assets;

	if (typeof assets === 'object') return Object.values(assets);

	return [assets];
};

const bodyScript = (main: any, publicPath: any) =>
	normalizeAssets(main)
		.filter((path: any) => path.endsWith('.js'))
		.map((path: any) => `<script defer type="text/javascript" src="${publicPath}${path}"></script>`)
		.join('\n');

const bodyStore = (store: any) => `<script>window.__INITIAL_STATE__ = ${JSON.stringify(store)};</script>`;

const commonJs = [
	'//cdn.jsdelivr.net/npm/mockjs@1.1.0/dist/mock.min.js',
	'//cdn.jsdelivr.net/npm/vue@3.2.29/dist/vue.global.min.js',
	'//cdnjs.cloudflare.com/ajax/libs/vuex/4.0.2/vuex.global.prod.min.js',
	'//cdnjs.cloudflare.com/ajax/libs/axios/0.25.0/axios.min.js',
	'//cdnjs.cloudflare.com/ajax/libs/qs/6.10.3/qs.min.js',
];

const css = ['//cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css'];

const normalizeCss = css.map((path) => `<link rel="stylesheet" href="${path}" as="style" >`).join('\n');

const headScript = commonJs.map((path) => `<script defer type="text/javascript" src="${path}"></script>`).join('\n');

const transformDevStats = (stats: any, outputFileSystem: any, store: any) => {
	const {
		assetsByChunkName: { main },
		outputPath,
		publicPath,
	}: any = stats;

	const head: any = `
        <style>
        ${normalizeAssets(main)
					.filter((path) => path.endsWith('.css'))
					.map((path) => outputFileSystem.readFileSync(path.join(outputPath, path)))}
        </style>
      `;

	const body: any = bodyScript(main, publicPath);

	const ssrStore: any = bodyStore(store);

	return { head, body, ssrStore, headScript, normalizeCss };
};

const transformProdStats = ({ stats, publicPath, store }: any) => {
	const head = normalizeAssets(stats)
		.filter((path) => path.endsWith('.css'))
		.map((path) => `<link rel="prefetch" href="${publicPath}${path}">`)
		.join('\n');

	const body: any = bodyScript(stats, publicPath);

	const ssrStore: any = bodyStore(store);

	return { head, body, ssrStore, headScript, normalizeCss };
};

module.exports = {
	transformDevStats,
	transformProdStats,
};
