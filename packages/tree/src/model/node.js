/**
 * node.js
 * 树节点的属性和方法
 * 
 */

import objectAssign from '../../../../src/utils/merge';
import {
    markNodeData,
} from './utils';

/**
 * getPropertyFromData(this, 'children')
 * node.store为tree-store中的this
 * node.store.children: 函数 | 字符串 | undefined
 * 从node.data中获取prop对应的值
 * 
 * store.props 是树的配置项
 * 
 * @param {*} node 
 * @param {*} prop 
 */
const getPropertyFromData = function(node, prop) {
    const props = node.store.props;

    const data = node.data || {};

    const config = props && props[prop];
    // console.log('888', props, config, data[config]);

    if(typeof config === 'function') {
        return config(data, node);
    } else if (typeof config === 'string') {
        return data[config];
    } else if (typeof config === 'undefined') {
        const dataProp = data[prop];
        // console.log('children', dataProp)
        return dataProp === undefined ? '' : dataProp;
    }
}

// 树节点的id
let nodeIdSeed = 0;

export default class Node {
    constructor(options) {
        this.id = nodeIdSeed++;

        // 节点data
        this.data = null;

        // 是否选中,默认false:取消选中(true:选中)
        this.checked = false;

        // 半选中,默认false
        this.indeterminate = false;

        // 父亲节点
        this.parent = null;

        // 是否展开
        this.expanded = false;
        
        // 是否是当前节点
        this.isCurrent = false;

        // 赋初值
        for(let option in options) {
            if(options.hasOwnProperty(option)) {
                this[option] = options[option];
            }
        }

        // internal
        // 该节点的层级,默认为0
        this.level = 0;
        // 该节点的子节点
        this.childNodes = [];

        // 计算层级 根节点层级为0
        if(this.parent) {
            this.level = this.parent.level + 1;
        }

        const store = this.store;
        if(!store) {
            throw new Error('[Node]store is required!');
        }

        // 构建子树
        this.setData(this.data);

        // 设置节点的展开属性
        // console.log('store', this.store.defaultExpandAll);
        if(store.defaultExpandAll) {
            this.expanded = true;
        }

        // 节点注册,为什么会在tree-store中呢?为什么要注册?
        // store.registerNode(this);

        // console.log('Node', this, options);
    }

    /**
     * 通过 node.label 调用(即执行get方法)
     */
    get label() {
        return getPropertyFromData(this, 'label');
    }

    /**
     * A instanceof B:A是否是B的实例
     * 设置该节点的data和childNodes
     * 根节点下的data是一个数组,其子节点便是根据此生成的
     * @param {*} data 
     */
    setData(data) {
        // console.log('setData', Array.isArray(data), data instanceof Array);
        
        // 如果data不是数组即非根节点,则需要给节点标记id
        if(!Array.isArray(data)) {
            markNodeData(this, data);
        }

        this.data = data;
        this.childNodes = [];

        let children;
        // 如果该节点的层级为0,且该data为数组类型
        // 根节点下的data是一个数组,其子节点便是根据此生成的
        if(this.level === 0 && this.data instanceof Array) {
            children = this.data;
        } else {
            // 非根节点,看其children字段是否还存在
            children = getPropertyFromData(this, 'children') || [];
        }

        // 子节点的生成
        for(let i = 0, j = children.length; i < j; i++) {
            this.insertChild({data: children[i]});
        }

        // console.log('ndoe', this);
    }

    /**
     * 插入子节点childNodes
     * @param {*} child 
     * @param {*} index 
     */
    insertChild(child, index) {
        // console.log('insertChild', child, child instanceof Node);

        // 如果child不是Node的实例对象
        if(!(child instanceof Node)) {
            // 将后面的对象值添加到child
            objectAssign(child, {
                parent: this,
                store: this.store,
            });

            // 创建child节点
            child = new Node(child);
            // console.log('chi', child);
        }

        child.level = this.level + 1;
        // console.log('ch', child, index);

        /**
         * typeof index !== 'undefined'
         * index !== undefined
         * 
         * 将child插入到childNodes
         */
        if(typeof index === 'undefined' || index < 0) {
            // console.log(typeof index !== 'undefined')
            this.childNodes.push(child);
        } else {
            // console.log(index, index === undefined)
            this.childNodes.splice(index, 0, child)
        }
    }

    /**
     * 子树收缩
     * 设置展开属性
     * node.expanded = false
     */
    collapse() {
        this.expanded = false;
        // console.log('collapse', this, this.expanded);
    }

    /**
     * 展开子树
     * 设置节点的展开属性
     * node.expanded = true
     * 
     * 注意:树上的每个节点都具有展开和伸缩子树的方法,而不是将这两个方法共享
     * 保证了树节点的独立性质
     */
    expand() {
        // console.log('展开子树', this);
        this.expanded = true;
    }
}