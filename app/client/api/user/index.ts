/*
 * @Author: Klien
 * @Date: 2022-02-14 14:39:53
 * @LastEditTime: 2022-07-26 01:02:42
 * @LastEditors: Klien
 */

import { zdAxiosGet } from '@/app/axios';

export const getUserInfo = () => zdAxiosGet('/getUserInfo');
