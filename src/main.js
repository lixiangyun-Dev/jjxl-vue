import Vue from 'vue'
import App from './App.vue'   
import ElementUI from 'element-ui';   //导入ElementUI
import 'element-ui/lib/theme-chalk/index.css';    //导入样式
import router from './router';
import axios from 'axios';


Vue.use(ElementUI);   //使用ElementUI
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
