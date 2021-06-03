/**
 * 第一批写法
 * 这样的话,便是把YMessage当作一个组件来引入注册导出
 * 但是前台在使用的时候是YMessage(options)的形式即函数形式
 * 便会报错:YMessage不是一个函数
 */

// import YMessage from './src/main'; // 引入的是vue文件

// /* istanbul ignore next */
// // 在Vue.use(Message) 时调用组件上的intall
// YMessage.install = function(Vue) {
//     Vue.component(YMessage.name,YMessage);
// };

// export default YMessage;

/**
 * 第二批写法
 * 引入一个js文件，并导出
 * 这样的话，便可以把YMessage当作一个函数而非组件了
 * 
 * 相当于我们之前写的暴漏出来一个函数
 * 通过YMessage(options)使用
 */

import YMessage from './src/main.js';
export default YMessage;