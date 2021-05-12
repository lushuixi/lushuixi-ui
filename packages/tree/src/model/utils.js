/**
 * tree工具函数
 */

export const NODE_KEY = '$treeNodeId';

/**
 * 给node.data添加属性NODE_KEY,值为节点的id(node.id)
 * node.js:markNodeData(this, data);
 * 
 * Object.defineProperty(obj, prop, descriptor) 会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
 * 参考:https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
 * obj:要定义属性的对象
 * prop:要定义或修改的属性的名称或 Symbol
 * descriptor:要定义或修改的属性描述符
 * 
 * 
 * @param {treeNode} node 
 * @param {Object} data 
 * @returns 
 */
export const markNodeData = function(node, data) {
    if(!data || data[NODE_KEY]) return;
    
    // 给data添加属性NODE_KEY,值为节点的id
    Object.defineProperty(data, NODE_KEY, {
        /**
         * 对象data属性NODE_KEY对应的值
         */
        value: node.id,

        /**
         * 是否展示在可枚举对象中,默认false
         * true:可枚举,for..let...in可以获取到该键值;
         * false:否则不可获取到该键值
         */
        enumerable: false,

        /**
         * 是否可配置,默认为false
         * 当且仅当该属性为true时,该属性的描述符才能被改变,同时该属性也能被删除
         * configurable为false:不可删,执行delete $treeNodeId会报错
         * configurable为true:可删除,执行delete $treeNodeId不报错
         */
        configurable: true,

        /**
         * 是否允许改写,默认为false
         * 当且仅当该属性值为true时,该属性值即value对应的值才能被赋值运算符改变
         * writable为false:不可写入,执行赋值运算符(例如item.$treeNodeId = 33)会报错
         * writable为true:可以写入
         */
        writable: true,
    });
}

 /**
  * 获取节点的key
  * 
  * tree.vue:getNodeKey(this.nodeKey, node.data)
  * this.nodeKey:是树prop得的key(整体自定义的)
  * 如果nodeKey不存在,则返回该node.data定义的NODE_KEY
  * 如果nodeKey存在,则返回data[nodeKey]
  * 
  * @param {String} key 
  * @param {Object} data 
  * @returns 
  */
export const getNodeKey = function(key, data) {
    // console.log('获取nodeKey', key, data);

    // 不建议写法
    // if(!key) return data[NODE_KEY]
    // else return data[key];

    // 建议写法
    if(!key) return data[NODE_KEY];
    return data[key];
}