/*
 * @Author: Klien
 * @Date: 2022-02-14 14:52:12
 * @LastEditTime: 2022-02-14 15:37:26
 * @LastEditors: Klien
 */
// 统一处理逻辑====统一返回的数据结构
export const data = (response: Record<string, any>) => {
	const { status, data } = response;

	// console.log('response', response);

	if (status === 200) {
		return data;
	}

	// const { code, result } = data;

	// if (status === 200 && code === 200) {
	// 	return result;
	// }
};
