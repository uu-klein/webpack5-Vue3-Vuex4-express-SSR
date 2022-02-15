/*
 * @Author: Klien
 * @Date: 2022-02-14 14:54:26
 * @LastEditTime: 2022-02-14 14:54:27
 * @LastEditors: Klien
 */
export const httpCode: any = {
	400: '请求参数错误',
	401: '权限不足, 请重新登录',
	403: '服务器拒绝本次访问',
	404: '请求资源未找到',
	500: '内部服务器错误',
	501: '服务器不支持该请求中使用的方法',
	502: '网关错误',
	504: '网关超时',
};

export const timeOut: string = '请求超时, 请刷新重试';
