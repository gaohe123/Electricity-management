/**
 * @file
 * @description 菜单模块接口文件
 */
import request from './request';

/**
 * @method 
 * @description 获取菜单列表
 */
export const getMenus=()=>request.get('menus')