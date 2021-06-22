import directive from './src/directive';
import service from './src/index';

// YLoading.install = function(Vue) {
//     // 注册Vue组件
//     Vue.Component(YLoading, YLoading.name);
// };

// YLoading.install = function(Vue) {
//     // 挂载到Vue原型链
//     Vue.prototype.$loading = service;
// }
// export default YLoading;

export default {
    install(Vue) {
        console.log('注册loading');
        Vue.use(directive);
        Vue.prototype.$loading = service;
    },
    directive,
    service,
}