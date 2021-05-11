import Vue from 'vue';
import Watcher from './watcher';

// 手工模拟Store

/**
 * 定义设置属性的方法
 */
Watcher.prototype.mutations = {
    /**
     * 给公共数据池stores赋值data
     */
    setData(states, data) {
        // console.log('setData', states, data);
        states.data = data;
    },

    /**
     * 向公共数据池中的columns插入列属性
     * splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目(会改变原有数组)
     * arrayObject.splice(index,howmany,item1,.....,itemX) howmany为0则添加
     * 
     * 知道了parent, 标识到
     * 如果有父组件,则将其插入到父组件的children?但是此时父组件还没有加载呢,怎么办呢?
     * 
     * table-header和table-body都需要这个columns来计算colspan和rowspan值
     * table-header:columns中的colspan和rowspan
     * table-body:动态计算
     * 
     * @param {Object} states 
     * @param {String} column 
     * @param {String} index 
     * @param {Vnode} parent 
     */
    insertColumn(states, column, index, parent) {
        // console.log('insertColumn', states, column, index, parent);
        let array = states._columns;

        if(parent) {
            array = parent.children;
            if(!array) array = parent.children = [];
        }
        // console.log('insert', column, parent, array);
        
        if(typeof index !== 'undefined') {
            array.splice(index, 0, column);
        }else {
            array.push(column);
        }

        // console.log('array', array, states)
        // console.log('8', array, this.table.$ready);
        // if(this.table.$ready) {
        //     // 更新列
        //     this.updateColumns();
        //     // 更新 DOM
        //     this.scheduleLayout();
        // }
    },
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
    // console.log('Watcher', this)
    const mutations = this.mutations;
    if(mutations[name]) {
        // 第一个参数为states, 后面的参数为args
        mutations[name].apply(this, [this.states].concat(args))
    }else {
        throw new Error(`Action not found: ${name}`);
    }

}

export default Watcher;