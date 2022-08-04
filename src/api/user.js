/**
 * @file 
 * @description 用户模块接口文件
 */

import request from './request'

/**
 * @method
 * @description 登录
 * @param {object} model 用户登录信息
 */
export const login =(model)=>request.post('login',model);

/**
 * @method
 * @description  搜索
 * @param {object} model 查询模型
 */
export const search=(model)=>request.get('users',{
    params:model
});

/**
 * @method
 * @param {Number} id 要修改的用户id
 * @param {Boolean} state 要修改的状态
 */
export const switchState=(id,state)=>request.put(`users/${id}/state/${state}`)

/**
 * @method
 * @description 添加用户
 * @param {object} model 要添加的用户信息
 */
export const add=(model)=>request.post('users',model)

/**
 * @method
 * @description 修改
 * @param {model} model 要修改的数据
 */
export const update=(model)=>request.put(`users/${model.id}`,model);

/**
 * @method
 * @description 删除用户
 * @param {Number} 要删除的用户ID
 */
export const deleteUser=(id)=>request.delete(`users/${id}`)

/**
 * @method
 * @description 分配角色
 * @param {Number} userId 用户id
 * @param {Number} rid 角色id
 */
export const assignRole=(userId,rid)=>request.put(`users/${userId}/role`,{rid})