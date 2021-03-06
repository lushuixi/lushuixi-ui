import YButton from './src/button';

/* istanbul ignore next */
// 在Vue.use(Button) 时调用组件上的intall
YButton.install = function (Vue) {
    // 全局注册组件
    // react与vue不同的是, vue组件必须注册(或全局注册,或局部注册)
    Vue.component(YButton.name, YButton);
};

export default YButton;