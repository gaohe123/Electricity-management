/**
 * @file 
 * @description 角色模块接口文件
 */

 import request from './request'

 /**
  * @method
  * @description 获取角色 
  */
 export const getRoles=()=>request.get('roles')

 /**
  * @method
  * @description 删除标签
  * @param {Number} roleId 角色id
  * @param {Number} tagId 标签id
  */
 export const deleteTag=(roleId,tagId)=>request.delete(`roles/${roleId}/rights/${tagId}`)

 /**
  * @method
  * @description 添加角色
  * @param {Object} model 要添加的角色信息
  */
 export const addRole=(model)=>request.post('roles',model);

 /**
  * @method
  * @description
  * @param {Object} model 要修改的角色信息
  */
 export const updateRole=(model)=>request.put(`roles/${model.id}`,model)

 /**
  * @method
  * @description 删除角色
  * @param {Number} id 要删除的角色id
  */
 export const deleteRole=(id)=>request.delete(`roles/${id}`)

 /**
  * @method
  * @description 获取权限树形结构
  */
 export const getRightsList=()=>request.get('rights/tree')

 /**
  * @method
  * @description 获取权限列表
  */
 export const getRights=()=>request.get('rights/list')

 /**
  * @method
  * @description 更新权限
  * @param {Number} roleId 角色id
  * @param {string} rids
  */
 export const updateRights=(roleId,rids)=>request.post(`roles/${roleId}/rights`,{rids})