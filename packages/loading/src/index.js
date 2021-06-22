/**
 * loadding的具体实现
 * 两大类型: 全局加载(document.body) | 局部加载(options.target)
 * 
 * 如果已经有全局加载,则返回该全局加载的实例
 * 
 * 
 * 
 */

import Vue from 'vue';
import lodingVue from './loading.vue';
import afterLeave from '../../../src/utils/after-leave';
import merge from '../../../src/utils/merge';

// 1.创造Vue构造器
const LoadingConstructor = Vue.extend(lodingVue);

// 默认属性
const defaults = {
    body: false, // 默认false, 有指定覆盖的节点
    fullscreen: true, // 默认true, 全局加载
    text: null, // 加载的文本
};

let fullscreenLoading;

/**
 * 定义方法两种实现形式-形式一: 直接在构造器的原型上构建
 * 另外一种形式: 以Vue中的data的形式
 * LoadingConstructor的原型是Vue
 * 在LoadingConstructor中扩展其原型,增加一个close方法
 * 也就是在LoadingConstructor的原型链上加一个close方法
 * 但是该方法是在LoadingConstructor的原型链上, 直接访问Vue, 是没有该方法的
 * 在自己的(LoadingConstructor)原型链(LoadingConstructor.prototype)上扩展,在其原型(Vue)上是不可见(该方法不存在)的
 * 扩展自己的原型链上不存在的属性和方法和自己的原型属性和方法无关
 * 
 * 在loading.vue中通过this.close访问
 */
LoadingConstructor.prototype.close = function() {
    console.log('关闭LoadingConstructor');
    if(this.fullscreen) {
        fullscreenLoading = undefined;
    }

    afterLeave(this, _ => {
        const target = this.fullscreen || this.body
            ? document.body 
            : this.target;
        
        // console.log('target', target, this.fullscreen, this.body)
        if(this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el);
        }
        
        // 销毁该实例
        this.$destroy();
    }, 300);

    // 先设置加载不可见
    this.visible = false;
};

const Loading = (options = {}) => {
    // 当前Vue实例是否运行于服务器
    if(Vue.prototype.$isServer) return;

    // merge: 合并多个对象到第一个对象
    options = merge({}, defaults, options);
    // console.log('optoons', options, merge);

    // options.target: Loading 需要覆盖的 DOM 节点
    // 类型: object/string
    // 默认值: document.body
    // 如果是object: dom节点
    // 如果是string: 将其作为参数传入 document.querySelector以获取到对应 DOM 节点
    if(typeof options.target === 'string') {
        options.target = document.querySelector(options.target);
    }
    options.target = options.target || document.body;
    
    // 两个对象的比较
    if(options.target !== document.body) {
        // 局部的加载
        options.fullscreen = false;
    } else {
        // 无指定的覆盖节点
        options.body = true;
    }

    // 如果已有全局加载,则返回该实例
    if(options.fullscreen && fullscreenLoading) {
        return fullscreenLoading;
    }

    // 定义实例挂载的父亲节点
    // options.body: 默认值false, 说明有指定覆盖的节点
    // options.target: Loading 需要覆盖的 DOM 节点
    let parent = options.body ? document.body : options.target;

    // 2.创造Vue实例,并挂载
    let instance = new LoadingConstructor({
        el: document.createElement('div'),
        data: options,
    });

    Loading.onClose = function() {}

    console.log('instance', instance, LoadingConstructor);

    // 3.渲染真实dom
    parent.appendChild(instance.$el);
    
    // 等待视图全部更新完毕
    Vue.nextTick(() => {
        instance.visible = true;
    });

    // 如果是全局加载
    if(options.fullscreen) {
        fullscreenLoading = instance;
    }

    return instance;
};

export default Loading;