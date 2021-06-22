import Vue from 'vue';
import LushuixiUi from '../src/index.js';
import '../lib/theme-chalk/index.css';
// import ElementUi from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import router from './router/index';
import App from './app';
Vue.use(LushuixiUi);
// Vue.use(ElementUi);
// import {Message} from 'element-ui';
// Vue.use(Message)

// console.log('LushuixiUi', LushuixiUi,LushuixiUi.Loading);
// Vue.use(LushuixiUi.Loading);

// console.log('LushuixiUi.Loading', LushuixiUi.Loading.service())

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');