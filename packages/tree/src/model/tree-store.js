/**
 * tree-store.js
 * 树的属性和方法
 * 
 * ES6 class(类)
 * constructor:构造方法
 * this关键字则代表实例对象
 * 构造函数的prototype属性，在ES6的“类”上面继续存在。事实上，类的所有方法都定义在类的prototype属性上面
 * 在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为
 * 参考:https://blog.csdn.net/weixin_44691513/article/details/108416033
 * 
 */

import Node from './node';

export default class TreeStore {
    constructor(options) {

        // 赋值初始化:options是对象,遍历使用for...in...
        for(let option in options) {
            if(options.hasOwnProperty(option)) {
                this[option] = options[option];
            }
        }

        // this.nodesMap = {};
        
        /**
         * 实例化根节点Node
         * 根节点实例化
         * 由根节点开始生成树
         * 根节点->根节点的childNodes->...
         */
        this.root = new Node({
            data: this.data,
            store: this,
        });

        // console.log('treeStore', this, options);
    }

    // /**
    //  * 注册node节点
    //  * @param {*} node 
    //  * @returns 
    //  */
    // registerNode(node) {
    //     const key = this.key;

    //     // 如果不存在则返回
    //     if(!key || !node || !node.data) return;
        
    //     const nodeKey = node.key;
    //     if(nodeKey !== undefined) this.nodesMap[node.key] = node;
        
    //     // console.log('注册node节点', nodeKey !== undefined, this.nodesMap);
    // }
} 