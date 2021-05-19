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

    /**
     * 获取选中状态[全选中|半选中]的节点
     * node.checked:false
     * node.indeterminte:false
     * 
     * 入参:
     * Boolean:leafOnly:是否只是叶子节点,默认值为false
     * Boolean:includeHalfChecked:是否包含半选节点,默认值为false
     * 
     * 返回值:
     * Array:返回目前选中或半选中节点的数据所组成的数组
     * 
     * 应用场景:
     * 需要选中节点或者半选中节点所组成的数据
     */
    getCheckedNodes(leafOnly = false, includeHalfChecked = false) {
        const checkedNodes = [];
        // console.log('checkedNodes', checkedNodes, leafOnly, includeHalfChecked, this);

        // tranverse:翻转
        const tranverse = function(node) {
            // 如果传进来的是根节点,则取自根节点的childNodes(说明是第一次进来的), 否则取自节点的childNodes
            const childNodes = node.root ? node.root.childNodes : node.childNodes;
            
            // console.log('childNodes', childNodes);

            // forEach回过滤掉空数组的(如果是空数组,则不执行回调函数)
            childNodes.forEach((child) => {

                // 筛选条件:
                // 如果child.leaf === leafOnly || child.indeterminate === includeHalfChecked

                // 节点本身
                if((child.checked || (includeHalfChecked && child.indeterminate))
                    && (!leafOnly || (leafOnly && child.isLeaf))) {
                    checkedNodes.push(child.data);
                }

                // 如果节点有子节点, 这里没有取判断是否有子节点
                // 有条件判断
                // if(child.childNodes.length) tranverse(child);

                tranverse(child);

            })
        }

        tranverse(this);

        return checkedNodes;
    }

    /**
     * 获取节点的key所组成的数组
     * 前提:节点可被选, 且设置了节点的key
     * 
     * 入参:
     * leafOnly:是否只是叶子节点,默认值为false
     * 
     * 返回值:
     * Boolean:
     */
    getCheckedKeys(leafOnly = false) {
        // 笔者写法 -- 繁杂,太直白
        // // console.log('获取选中状态下的节点的', this.getCheckedNodes(leafOnly));
        // const checkedKeys = [];
        // this.getCheckedNodes(leafOnly)
        //     .forEach(item => {
        //         // console.log('item', item, this.key, item[this.key]);
        //         if(this.key && item[this.key]) {
        //             checkedKeys.push(item[this.key]);
        //         }
        //     })
        // return checkedKeys;

        // 源码 -- 简洁
        // console.log({}[this.key]) // undefined
        // 如果this.key存在但data[this.key]不存在,则为undefined
        // 如果this.key不存在则this.key为undefined
        // 此时data[this.key]仍未undefined
        // console.log(88, {}[this.lushuixi]);
        // 所以如果this.key不存在或者data不存在则返回值未undefined
        return this.getCheckedNodes(leafOnly).map((data) => (data || {})[this.key]);
    }
} 