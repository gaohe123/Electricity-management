/**
 * @file
 * @description 商品模块接口文件
 */
 import request from './request';

 /**
  * @method
  * @description 获取商品列表
  * @param {Object} model 分页类型
  */
 export const getGoodsList=(model)=>request.get('goods',{params:model})

 /**
  * @method
  * @description 添加商品
  * @param {Object} model 添加模型
  */
 export const addGoods=(model)=>request.post('goods',model)

/***
 * 商品删除
 */

export const delgoods=(id)=>request.delete(`goods/${id}`)


/**
 * 获取分类参数
 */

export const  getcategories =(queryModel)=>request.get(`categories`,{params:queryModel})


/**
 * @method
  * @description 获取属性
 * @param {Number} id  要查询的分类id
 * @param {string} type 要查询的类型
 */
export const getAttributes=(id,type)=>request.get(`categories/${id}/attributes?sel=${type}`)

export const updatedAttribute=(id,attrId,model)=>request.put(`categories/${id}/attributes/${attrId}`,model)



export const addAttribute=(catId,model)=>request.post(`categories/${catId}/attributes`,model)



//删除分类


export const deleteCategory=(id)=>request.delete(`categories/${id}`)


//添加分类
export const addCategory=(id)=>request.post(`categories`,model)


//编辑分类
export const updatedCategorye=(model)=>request.put(`categories/${model.cat_id}`,model)





