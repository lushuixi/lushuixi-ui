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
 * 根据子节点的选中状态判断父节点的选中状态
 * all - 表示子节点被选中checked
 * none - 表示子节点没有被选中cancel
 * half:!all && !none - 表示子节点的半选, all为false,则为true | all为true
 * 这种实现方式有点接收不了,于是就来模拟一下
 * 
 * 子节点 - [
 *  选中(checked:true,indeterminate:false),
 *  不选中(checked:false,indeterminate:false),
 *  半选中(checked:false,indeterminate:true),
 * ]
 * 默认all=true,none=true
 * 第一个子节点,选中,则none=false -> all:true,none:false,half:false 即如果只有这一个子节点则父节点选中
 * 第二个子节点,不选中,则all=false -> all:false,none:false,half:true 即如果只有这两个子节点的则父节点半选中
 * 第三个子节点,半选中,则all=false,none=false -> all:false,none:false,half:true 即如果只有这三个子节点则父节点半选中
 * 结果 -> 父节点半选中
 * ---------------------------------------------------
 * 评价:从父节点的选中状态出发,父节点的选中状态只有三种(选中|取消选中|半选中),实现相对简洁
 * 记录父节点根据前面子节点的选中状态的选中状态
 * 一个一个拆
 * 
 * 
 * 自己的写法是统计该节点的子节点的选中状态:
 * ---------------------------------------------------
 * status.checked 记录选中的个数
 * status.cancel 记录取消选中的个数
 * status.indeterminate 记录半选中的个数
 * 如果status.checked等于子节点的个数,则父节点选中
 * 如果status.cancel等于子节点的个数,则父节点取消选中
 * 否则,父节点半选中
 * 自评:我是从所有子节点的选中状态出发,这种实现方式相对繁琐
 * 
 *
 * 
 * @param {Array} node 
 */
export const getChildState  = node => {
    console.log('getChildState', node);
    // 设置初值
    let all = true;
    let none = true;

    for(let i = 0, j = node.length; i < j; i++) {
        const n = node[i];
        // checked: false | indeterminate:true
        // 子节点没有选中
        if(n.checked !== true || n.indeterminate) {
            all = false;
        }
        // checked:true | indeterminate:true
        // 字节点选中
        if(n.checked !== false || n.indeterminate) {
            none = false;
        }
    }
    // console.log('getChildState', all, none, !all && !none);
    return {
        all,
        none,
        half: !all && !none,
    }
    
}

/**
 * 向上走,设置父节点的选中状态
 * @param {Node} node 
 */
const reInitChecked = function(node) {
    // console.log('reInitChecked', node);
    // 如果该节点没有子节点, 也就不用设置父节点选中状态了
    if(node.childNodes.length === 0) return;

    // 获取父节点的选中状态
    const {all, none, half} = getChildState(node.childNodes);
    // console.log('res', all, none, half);

    // 设置节点的选中状态
    // 应为是三个不同的值,所以没有办法拆成两行去设置
    if (all) {
        node.checked = true;
        node.indeterminate = false;
    } else if (half) {
        node.checked = false;
        node.indeterminate = true;
    } else if (none) {
        node.checked = false;
        node.indeterminate = false;
    }

    const parent = node.parent;
    if(!parent || parent.level === 0) return;

    // 递归调用,往上走
    if(!node.store.checkStrictly) {
        reInitChecked(parent);
    }
}

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
     * 设置节点的isLeaf状态
     * 是否是叶子节点
     */
     updateLeafState() {
        const childNodes = this.childNodes;
        this.isLeaf = !childNodes || childNodes.length === 0;
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

        this.updateLeafState();
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

    /**
     * 设置节点的选中状态
     * (key/data, checked, deep) 
     * @param {*} value 
     * @param {*} deep 
     * @param {*} recursion 递归
     * @param {*} passValue 
     */
    setChecked(value, deep, recursion, passValue) {
        // console.log('设置节点的选中状态', value, deep, recursion, passValue, this);
        
        // 1.设置节点自身的选中状态
        this.indeterminate = value === 'half';
        this.checked = value === true;

        // 如果是严格模式即父子节点的选中状态是互不关联的
        if(this.store.checkStrictly) return;

        const handleDescendants = () => {
            // console.log('deep', deep);
            if(deep) {
                const childNodes = this.childNodes;
                for(let i = 0, j = childNodes.length; i < j; i++) {
                    const child = childNodes[i];
                    // 意思就是取passValue
                    // 如果passValue为true,则为true
                    // 如果passValue为false,则看value与false取异
                    // value为true,则为true;value为false,则为false
                    // passValue = passValue || value
                    passValue = passValue || value !== false;
                    const isCheck = passValue;
                    // console.log('child', child);
                    child.setChecked(isCheck, deep, true, passValue);
                }
            }
        }

        // 2.设置子孙节点的选中状态
        handleDescendants();

        // console.log('recursion', recursion);

        // 3.设置父节点的选中状态(recursion:false)
        const parent = this.parent;
        // 如果父节点不存在或为根节点,则说明已经找到根了
        if(!parent || parent.level === 0) return; 

        if(!recursion) {
            reInitChecked(parent);
        }

    }
}