import Vue from 'vue';
import LushuixiUi from '../src/index.js';
import '../lib/theme-chalk/index.css';
import ElementUi from 'element-ui';
import router from './router/index';
import App from './app';
Vue.use(LushuixiUi);
Vue.use(ElementUi);

console.log('LushuixiUi', LushuixiUi);

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');