import Vue from 'vue';
import Watcher from './watcher';

/**
 * 原型增加commit方法
 * @param {String} name 
 * @param  {...any[String]} args
 */
Watcher.prototype.commit = function(name, ...args) {
    console.log('Watcher', name, args);
}

export default Watcher;