import Vue from 'vue';
import Watcher from './watcher';

// 手工模拟Store

/**
 * 定义设置属性的方法
 */
Watcher.prototype.mutations = {
    /**
     * 
     * @param {Object} states 
     * @param {String} column 
     * @param {String} index 
     * @param {Vnode} parent 
     */
    insertColumn(states, column, index, parent) {
        console.log('insertColumn', states, column, index, parent);
    }
}

/**
 * 原型增加commit方法
 * @param {String} name 
 * @param  {...any[String]} args(Array)
 * 函数里的this指向谁?-this指向Watcher
 * apply 改变this的指向,且参数为数组形式call(name, [arg1,arg2,arg3,...])
 * call 改变this的指向,且参数为非数组形式, call(name, arg1,arg2,arg3, ...)
 */
Watcher.prototype.commit = function(name, ...args) {
    // console.log('Watcher', name, args, this, [this.states].concat(args));
    const mutations = this.mutations;
    if(mutations[name]) {
        // 第一个参数为states, 后面的参数为args
        mutations[name].apply(this, [this.states].concat(args))
    }else {
        throw new Error(`Action not found: ${name}`);
    }

}

export default Watcher;