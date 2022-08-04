/**
 * 订单模块
 */

 import request from './request';

/***
 * 获取订单列表
 */
 export const getOrders=(model)=>request.get('orders',{params:model})


 export const getExpress=()=>request.get('kuaidi/1106975712662')