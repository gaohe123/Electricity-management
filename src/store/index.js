import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router';

Vue.use(Vuex)

/**
 * @method
 * @deprecated vuex持久化插件
 * @param {Vuex} store vuex对象
 */
const storePersist=(store)=>{
  const key="VUEX_STORE_KEY";
  const storage=window.sessionStorage;

  const data=storage.getItem(key);
  data && store.replaceState(JSON.parse(data));

  store.subscribe(function(mutations,state){
    console.log(mutations);
    sessionStorage.setItem(key,JSON.stringify(state));
  })
}

export default new Vuex.Store({
  state: {
    /**
     * 登录用户
     */
    user:{},
    /**
     * 菜单列表
     */
    menus:[]
  },
  getters: {
    /**
     * token
     */
    token(state){
      return state.user.token;
    }
  },
  mutations: {
    /**
     * 设置登陆用户信息
     */
    setUser(state,payload){
      state.user=payload
    },
    /**
     * 设置菜单列表
     */
    setMenus(state,payload){
      state.menus=payload;
    }

  },
  actions: {
    //公共的业务 但是又涉及到操作store的数据，就使用actions方法
    /**
     * 退出
     */
    exit({commit}){
      //actions可以直接操作state数据但是不推荐
      // 1.无法触发subscribe方法
      commit('setUser',{})
      router.push({name:'login'})
    }
  },
  modules: {
  },
  plugins:[storePersist]
})
