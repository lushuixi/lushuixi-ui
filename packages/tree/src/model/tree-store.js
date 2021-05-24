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
import {getNodeKey} from './utils';

export default class TreeStore {
    constructor(options) {

        // 赋值初始化:options是对象,遍历使用for...in...
        for(let option in options) {
            if(options.hasOwnProperty(option)) {
                this[option] = options[option];
            }
        }

        this.nodesMap = {};
        
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

        // 设置默认节点的选中
        this._initDefaultCheckedNodes();
    }

    /**
     * 注册node节点
     * 生成nodesMap数组(将树节点拍平存储以查找树节点)
     * @param {*} node 
     * @returns 
     */
    registerNode(node) {
        const key = this.key;

        // console.log('88noderegisterNode', node, this, key);

        // 如果不存在则返回
        if(!key || !node || !node.data) return;
        
        const nodeKey = node.key;
        if(nodeKey !== undefined) this.nodesMap[node.key] = node;
        
        // console.log('注册node节点', nodeKey !== undefined, this.nodesMap);
    }

    /**
     * 设置节点的默认选中状态
     */
    _initDefaultCheckedNodes() {
        // 笔者思路
        // 设置默认节点选中
        // this.defaultCheckedNodes要选中的节点的key所组成的数组
        // 遍历this.defaultCheckedKeys, 根据this.nodesMap获取节点,设置节点的选中
        // console.log('defaultCheckedKeys', this.defaultCheckedKeys, this.nodesMap);
        // this.defaultCheckedKeys.forEach((key) => {
        //     const node = this.nodesMap[key];
        //     if(node) {
        //         node.setChecked(true, true);
        //     }
        // })

        // 源码写法
        // 源码写法与自己不同的是:把用到的参数this.defaultCheckedKeys和this.nodesMap分别给赋值给了对应的变量
        const defaultCheckedKeys = this.defaultCheckedKeys;
        if(!defaultCheckedKeys || !defaultCheckedKeys.length) return;
        const nodesMap = this.nodesMap;

        defaultCheckedKeys.forEach((checkedKeys) => {
            const node = nodesMap[checkedKeys];

            if(node) {
                node.setChecked(true, !this.checkStrictly);
            }
        });
    }

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

    /**
     * 根据key值或者data获取节点
     * 前提条件:设置了节点的key(node-key)
     * 如果没有设置key怎么办?每个节点设置了$treeNodeId
     * 如果node-key值没有设置,则key取自$treeNodeId
     * 但是如果node-key没有设置,则this.nodesMap是空对象
     * 则this.nodesMap[key]为undefined
     * 
     * 入参:
     * Node|Object|String|Number: data | key
     * 如果是Object类型怎么怎么做
     * 如果data是树节点Node类型,则直接将其返回
     * 如果是对象或字符串或数组,则从nodesMap中获取对应key的节点
     * 
     * 返回值:
     * Node节点
     * 如果data的key值不存在或树的node-key没有定义,则返回null
     */
    getNode(data) {
        // 笔者写法-繁琐-命令式编程
        // 自己还在想如何根据对象还是字符串或数字类型的data获取node
        // 自己的想法:先遍历节点,再根据判断条件(如果是对象,怎么怎么办?如果式字符串或数字类型,怎么怎么办)
        // 判断条件结束后,再根据节点的childNodes去调用自身
        // 看了源码的写法,想想都好难受,自己的好复杂啊------------------

        // if(dataOrKey === undefined || dataOrKey === null) return;
        // 分对象类型和非对象类型
        // console.log('获取节点', dataOrKey, typeof dataOrKey, this);
        // const nodes = this.root && this.root.childNodes;
        // for(let i = 0, j = nodes.length; i < j; i++) {
        //     const node = nodes[i];
        //     const data = node.data;
        //     // 判断条件
        //     if(typeof dataOrKey !== 'object') {
        //         if(data[this.key] === dataOrKey) {
        //             console.log('找到了', node);
        //             return node;
        //         } else {
        //             this.getNode(node.childNodes);
        //         }
        //     } else {
        //         console.log('dataOrKey', dataOrKey, data);
        //     }
        // }

        // 源码-清晰明了-声明式编程
        // 无论data是对象类型或字符串|数字类型,都要根据key来获取节点
        // 首先要做的是根据data获取节点的key
        // 接着根据key获取节点 ---------------------------- 
        // 如何根据key获取节点?遍历节点吗?这时候,this.nodesMap便上场了
        // 源码中使用的是对象,将节点根据key生成一个节点地图
        if(data instanceof Node) return data;
        const key = typeof data !== 'object' ? data : getNodeKey(this.key, data);
        // console.log('key', key, this.nodesMap, this.nodesMap[key]);
        // 这里知道了nodesMap的用处(根据key获取节点)
        return this.nodesMap[key] || null;
    }

    /**
     * 获取半选中节点的数组
     * 
     * 入参:
     * 没有
     * 
     * 返回值:
     * 半选中节点所组成的数组(是节点的data而非节点所组成的数组) || []
     */
    getHalfCheckedNodes() {
        // console.log('选中半选节点的数组');
        // 笔者写法
        // 遍历树节点,筛选条件为节点处于半选中状态,返回符合条件的节点所组成的数组
        // 看了源码后,发现自己的很多不足
        // 首先,变量命名不够清晰明了,因为返回值是半选中节点所组成的数组,将res改为nodes会更加直白
        // 其次,因为最外层调用getHalfCheckedNodes方法并没有传入参数,也就是无传参,但是自己调用自己时,传入了参数,会造成歧义
        // 好好学习,天天向上 ----------------------------------------

        // const res = [];
        // nodes = nodes || this.root.childNodes;
        // nodes.forEach(node => {
        //     if(node.indeterminate === true && node.checked === false) {
        //         res.push(node);
        //     }
        //     this.getHalfCheckedNodes(node.childNodes);
        // })
        // return res;

        // 源码
        // 变量命名直白清晰明了
        // 把具体的判断逻辑写在tranverse里面了 -------------------
        const nodes = [];
        
        const tranverse = function(node) {
            const childNodes = node.root ? node.root.childNodes : node.childNodes;
            childNodes.forEach((child) => {
                if(child.indeterminate) {
                    nodes.push(child.data);
                }
                tranverse(child);
            })
        };

        tranverse(this);
    
        return nodes;
    }

    /**
     * 获取半选中节点的key所组成的数组
     * 
     * 入参:
     * 没有
     * 
     * 返回值:
     * 半选中节点的key所组成的数组(是节点的key) || []
     */
    getHalfCheckedKeys() {
        // console.log('getHalfCheckedKeys', '获取节点的key所组成的数组');
        // 笔者写法
        // 获取节点的key
        // 先获取节点,筛选条件半选中,将符合条件的节点的key
        // 写到一半的时候,突然想到,可以借用它法
        // 因为getHalfCheckedNodes方法是获取半选中节点所组成的数组的,那么可以根据该方法的返回值筛选得到key所组成的数组
        // 恭喜自己又进了一步
        // const keys = [];
        // const traverse = function(node) {
        //     const childNodes = node.root ? node.root.childNodes : node.childNdoes;
        //     childNodes.forEach((child) => {
        //         if(child.indeterminate) {
        //             keys.push(child[this.key]);
        //         }
        //         tranverse(child);
        //     })
        // }
        // traverse(this);
        // return keys;

        // 笔者写法二
        return this.getHalfCheckedNodes().map((data) => (data || {})[this.key]);
    }

    /**
     * 获取所有的节点
     */
    _getAllNodes() {
        // 自己写法
        // 看了源码自己的评价-----------
        // 变量定义不明确
        // nodes -> allNodes
        // key -> nodeKey
        // console.log('_getAllNodes', this.nodesMap);
        // let nodes = [];
        // let nodesMap = this.nodesMap;
        // for(let key in nodesMap) {
        //     if(nodesMap.hasOwnProperty(key)) {
        //         nodes.push(nodesMap[key]);
        //     }
        // }
        // console.log('哈喽', nodes);
        // Object.keys(nodesMap).forEach((key) => {
        //     if(nodesMap.hasOwnProperty(key))
        //         nodes.push(nodesMap[key]);
        // });
        // console.log('哈喽', nodes);

        // 源码写法
        const allNodes = [];
        const nodesMap = this.nodesMap;
        for(let nodeKey in nodesMap) {
            if(nodesMap.hasOwnProperty(nodeKey)) {
                allNodes.push(nodesMap[nodeKey]);
            }
        }
        return allNodes;
    }

    /**
     * 设置key在checkedKeys中的节点选中
     * 其余节点不选中
     * 
     * Object.create:创建一个新对象
     * 
     * @param {*} key 
     * @param {*} leafOnly 
     * @param {*} checkedKeys 
     */
    _setCheckedKeys(key, leafOnly = false, checkedKeys) {
        // console.log('设置选中的节点', key, leafOnly, checkedKeys);
        // const allNodes = this._getAllNodes();
        // 非常重要:节点根据node.level从小到大排列,
        // 这样可以保证父节点在前,子节点在后
        const allNodes = this._getAllNodes().sort((a,b)=>(b.level - a.level));
        const cache = Object.create(null);
        const keys = Object.keys(checkedKeys);
        // console.log('hello lusuix', cache, keys);

        // 首先设置所有节点取消选中状态
        allNodes.forEach(node => node.setChecked(false, false));

        for(let i = 0, j = allNodes.length; i < j; i++) {
            const node = allNodes[i];
            const nodeKey = node.data[key].toString();
            // 判断指定的key是否在数组keys中
            let checked = keys.indexOf(nodeKey) > -1;
            
            // console.log(node.data.id, node);
            
            // 如果不在,设置非选中
            if(!checked) {
                console.log('不在', node.data.id, checked, node, cache, cache[nodeKey])
                if(node.checked && !cache[nodeKey]) {
                    node.setChecked(false, false);
                }
                continue;
            }

            // console.log('在', node.data.id, checked, node, cache, cache[nodeKey])

            // 如果在,则设置选中
            let parent = node.parent;
            while(parent && parent.level > 0) {
                // console.log('parent8888', parent)
                cache[parent.data[key]] = true;
                parent = parent.parent;
            }
            // console.log('在', cache);

            // 如果是叶子节点
            if(node.isLeaf || this.checkStrictly) {
                node.setChecked(true, false);
                continue;
            }
            // 如果是非叶子节点
            node.setChecked(true, true);

            // 如果leafOnly为true,也就是只是设置该节点下的子树中的叶子节点为选中状态
            if(leafOnly) {
                // console.log('le', leafOnly)
                // 先设置非选中
                node.setChecked(false, false);
                // 递归设置非叶子节点为取消选中
                const tranverse = function(node) {
                    const childNodes = node.childNodes;
                    childNodes.forEach((child) => {
                        if(!child.isLeaf) {
                            child.setChecked(false, false);
                        }
                        tranverse(child);
                    })
                };
                tranverse(node);
            }
        }
    }
    
    /**
     * 设置节点为选中状态
     * 使用此方法必须设置 node-key 属性
     * 
     * 入参:
     * nodes:勾选节点数据的数组
     * leafOnly:是否是叶子节点
     */
    setCheckedNodes(nodes, leafOnly = false) {
        // 自己的思路
        // console.log('设置节点为选中状态', nodes);
        // const keys = [];
        // nodes.forEach((node) => {
        //     const nodeKey = getNodeKey(this.key, node);
        //     keys.push(nodeKey);
        // });
        // this.setCheckedKeys(keys, leafOnly);

        // 源码写法
        const key = this.key;
        const checkedKeys = {};
        nodes.forEach((item) => {
            checkedKeys[(item || {})[key]] = true;
        });

        this._setCheckedKeys(key, leafOnly, checkedKeys);
        
    }

    /**
     * 通过key设置目前勾选的节点
     * 前提条件:设置node-key
     * 
     * 入参:
     * data:要选中节点的key
     * leafOnly:是否仅设置叶子节点(如果leafOnly为true,则仅设置该节点的叶子节点为选中状态,且自己的状态为半选中状态或选中状态)
     * 
     */
    setCheckedKeys(keys = [], leafOnly = false) {
        // 笔者思路 
        // setCheckedKeys(keys = [], leafOnly = true)
        // 根据节点的key设置勾选
        // 筛选条件:根据key获取节点,节点的isLeaf与leafOnly比较
        // 将符合条件的节点设置选中状态(checked:true,indeterminate:false)
        // console.log('设置节点的key', data, leafOnly, this.nodesMap);
        // data.forEach((key) => {
        //     const node = this.nodesMap[key];
        //     console.log('key', key, this.nodesMap[key], node.isLeaf);
        //     // 如果leafOnly为false,则选中node节点
        //     // 否则,再对node进行筛选,看node.isLeaf是否为true,如果为true,则设置选中,否则不设置
        //     if(!leafOnly || (leafOnly && node.isLeaf)) {
        //         node.setChecked(true, true);
        //     }
        // })
        
        // 源码写法
        // 设置默认选中节点的key
        this.defaultCheckedKeys = keys;
        const key = this.key;
        const checkedKeys = {};
        keys.forEach((key) => {
            checkedKeys[key] = true;
        });

        // console.log('checkedKeys', checkedKeys, leafOnly);
        this._setCheckedKeys(key, leafOnly, checkedKeys);
    }
} 