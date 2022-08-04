/**
 * @file
 * @description 请求文件 axios的二次封装
 */

import axios from "axios";
import {Message} from 'element-ui';
import store from '@/store';

axios.defaults.baseURL= '/shiyan' //process.env.VUE_APP_BASE_URL; //基地址
axios.defaults.timeout=process.env.VUE_APP_TIMEOUT;  //超时时间

/**
 * 请求拦截器
 */
axios.interceptors.request.use(config=>{
    //请求头里添加验证配置项
    // TODO 处理验证头
    config.headers.Authorization=store.getters.token;
    return config
},error=>Promise.reject(error));

/**
 * 响应拦截器
 */
axios.interceptors.response.use(response=>{
    //TODO 处理成功后的数据
    const {data,meta:{
        msg,
        status
    }} =response.data;
    if(status==200 || status==201){
        return data;
    }
    Message.error(msg);
    return Promise.reject(msg);
},error=>{
    const msg=error.toString();
    if(msg.includes('Network Error')){
        Message.error('请求失败，请检查网络是否正常')
        return Promise.reject(error)
    }
    if(msg.includes('Timeout')){
        Message.error('请求超时，请稍后再试')
        return Promise.reject(error)
    }
    const {status}=error.response;
    switch (status){
        case 401:
            Message.error('登录超时，请您重新登录')
            //清空token 并且跳转登录页
            //TODO 处理超时跳转
            store.dispatch('exit');
            break;
        case 500:
                Message.error('接口请求失败，请稍后再试')
                break;
        case 404:
            Message.error('抱歉，接口不存在')
            break;
    }
    return Promise.reject(error);
});

export default axios;