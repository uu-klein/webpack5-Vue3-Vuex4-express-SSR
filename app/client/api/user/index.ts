/*
 * @Author: Klien
 * @Date: 2022-02-14 14:39:53
 * @LastEditTime: 2022-02-14 15:34:21
 * @LastEditors: Klien
 */

import { zdAxiosGet } from '@/app/axios';

export const getUserInfo = () => zdAxiosGet('/getUserInfo').then((result: any) => result);
