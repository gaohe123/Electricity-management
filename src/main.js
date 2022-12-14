import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import element from './utils/element'

Vue.use(element)

Vue.config.productionTip = false

/**
 * 时间格式化
 */
Date.prototype.format = function (fmt = 'yyyy-MM-dd HH:mm:ss') {
  const opts = {
    'y+': this.getFullYear().toString(),
    'M+': (this.getMonth() + 1).toString(),
    'd+': this.getDate().toString(),
    'H+': this.getHours().toString(),
    'm+': this.getMinutes().toString(),
    's+': this.getSeconds().toString(),
    'f+': this.getMilliseconds().toString()
  }
  for (const key in opts) {
    const value=opts[key];  //时间值
    if(new RegExp(`(${key})`).test(fmt)){
      const result=RegExp.$1; //如果匹配成则可获取到结果
      fmt=fmt.replace(result,value.padStart(result.length,'0'));
    }
  }
  return fmt;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
