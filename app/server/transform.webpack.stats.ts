/*
 * @Author: Klien
 * @Date: 2022-02-09 21:53:06
 * @LastEditTime: 2022-02-22 03:36:08
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

	return { head, body, ssrStore };
};

const transformProdStats = ({ stats, publicPath, store }: any) => {
	const head = normalizeAssets(stats)
		.filter((path) => path.endsWith('.css'))
		.map((path) => `<link rel="prefetch" href="${publicPath}${path}">`)
		.join('\n');

	const body: any = bodyScript(stats, publicPath);

	const ssrStore: any = bodyStore(store);

	return { head, body, ssrStore };
};

module.exports = {
	transformDevStats,
	transformProdStats,
};
