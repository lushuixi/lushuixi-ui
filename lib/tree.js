module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/tree/src/tree.vue?vue&type=template&id=547575a6&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "y-tree" },
    _vm._l(_vm.root.childNodes, function(child) {
      return _c("y-tree-node", {
        key: _vm.getNodeKey(child),
        attrs: { node: child, "show-checkbox": _vm.showCheckbox }
      })
    }),
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/tree/src/tree.vue?vue&type=template&id=547575a6&

// EXTERNAL MODULE: ./src/utils/merge.js
var merge = __webpack_require__(8);

// CONCATENATED MODULE: ./packages/tree/src/model/utils.js
/**
 * tree工具函数
 */

var NODE_KEY = '$treeNodeId';

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
var markNodeData = function markNodeData(node, data) {
  if (!data || data[NODE_KEY]) return;

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
    writable: true
  });
};

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
var utils_getNodeKey = function getNodeKey(key, data) {
  // console.log('获取nodeKey', key, data);

  // 不建议写法
  // if(!key) return data[NODE_KEY]
  // else return data[key];

  // 建议写法
  if (!key) return data[NODE_KEY];
  return data[key];
};
// CONCATENATED MODULE: ./packages/tree/src/model/node.js
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * node.js
 * 树节点的属性和方法
 * 
 */




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
var getChildState = function getChildState(node) {
    // console.log('getChildState', node);
    // 设置初值
    var all = true;
    var none = true;

    for (var i = 0, j = node.length; i < j; i++) {
        var n = node[i];
        // checked: false | indeterminate:true
        // 子节点没有选中
        if (n.checked !== true || n.indeterminate) {
            all = false;
        }
        // checked:true | indeterminate:true
        // 字节点选中
        if (n.checked !== false || n.indeterminate) {
            none = false;
        }
    }
    // console.log('getChildState', all, none, !all && !none);
    return {
        all: all,
        none: none,
        half: !all && !none
    };
};

/**
 * 向上走,设置父节点的选中状态
 * @param {Node} node 
 */
var reInitChecked = function reInitChecked(node) {
    // console.log('reInitChecked', node);
    // 如果该节点没有子节点, 也就不用设置父节点选中状态了
    if (node.childNodes.length === 0) return;

    // 获取父节点的选中状态

    var _getChildState = getChildState(node.childNodes),
        all = _getChildState.all,
        none = _getChildState.none,
        half = _getChildState.half;
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

    var parent = node.parent;
    if (!parent || parent.level === 0) return;

    // 递归调用,往上走
    if (!node.store.checkStrictly) {
        reInitChecked(parent);
    }
};

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
var getPropertyFromData = function getPropertyFromData(node, prop) {
    var props = node.store.props;

    var data = node.data || {};

    var config = props && props[prop];
    // console.log('888', props, config, data[config]);

    if (typeof config === 'function') {
        return config(data, node);
    } else if (typeof config === 'string') {
        return data[config];
    } else if (typeof config === 'undefined') {
        var dataProp = data[prop];
        // console.log('children', dataProp)
        return dataProp === undefined ? '' : dataProp;
    }
};

// 树节点的id
var nodeIdSeed = 0;

var node_Node = function () {
    function Node(options) {
        _classCallCheck(this, Node);

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
        for (var option in options) {
            if (options.hasOwnProperty(option)) {
                this[option] = options[option];
            }
        }

        // internal
        // 该节点的层级,默认为0
        this.level = 0;
        // 该节点的子节点
        this.childNodes = [];

        // 计算层级 根节点层级为0
        if (this.parent) {
            this.level = this.parent.level + 1;
        }

        var store = this.store;
        if (!store) {
            throw new Error('[Node]store is required!');
        }

        // 构建子树
        this.setData(this.data);

        // 设置节点的展开属性
        // console.log('store', this.store.defaultExpandAll);
        if (store.defaultExpandAll) {
            this.expanded = true;
        }

        // 节点注册,为什么会在tree-store中呢?为什么要注册?
        // 因为需要节点的地图以找节点的时候方便些
        store.registerNode(this);

        // console.log('Node', this, options);
    }

    /**
     * 通过 node.label 调用(即执行get方法)
     */


    /**
     * 设置节点的isLeaf状态
     * 是否是叶子节点
     */
    Node.prototype.updateLeafState = function updateLeafState() {
        var childNodes = this.childNodes;
        this.isLeaf = !childNodes || childNodes.length === 0;
    };

    /**
     * A instanceof B:A是否是B的实例
     * 设置该节点的data和childNodes
     * 根节点下的data是一个数组,其子节点便是根据此生成的
     * @param {*} data 
     */


    Node.prototype.setData = function setData(data) {
        // console.log('setData', Array.isArray(data), data instanceof Array);

        // 如果data不是数组即非根节点,则需要给节点标记id
        if (!Array.isArray(data)) {
            markNodeData(this, data);
        }

        this.data = data;
        this.childNodes = [];

        var children = void 0;
        // 如果该节点的层级为0,且该data为数组类型
        // 根节点下的data是一个数组,其子节点便是根据此生成的
        if (this.level === 0 && this.data instanceof Array) {
            children = this.data;
        } else {
            // 非根节点,看其children字段是否还存在
            children = getPropertyFromData(this, 'children') || [];
        }

        // 子节点的生成
        for (var i = 0, j = children.length; i < j; i++) {
            this.insertChild({ data: children[i] });
        }

        // console.log('ndoe', this);

        this.updateLeafState();
    };

    /**
     * 插入子节点childNodes
     * @param {*} child 
     * @param {*} index 
     */


    Node.prototype.insertChild = function insertChild(child, index) {
        // console.log('insertChild', child, child instanceof Node);

        // 如果child不是Node的实例对象
        if (!(child instanceof Node)) {
            // 将后面的对象值添加到child
            Object(merge["a" /* default */])(child, {
                parent: this,
                store: this.store
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
        if (typeof index === 'undefined' || index < 0) {
            // console.log(typeof index !== 'undefined')
            this.childNodes.push(child);
        } else {
            // console.log(index, index === undefined)
            this.childNodes.splice(index, 0, child);
        }
    };

    /**
     * 子树收缩
     * 设置展开属性
     * node.expanded = false
     */


    Node.prototype.collapse = function collapse() {
        this.expanded = false;
        // console.log('collapse', this, this.expanded);
    };

    /**
     * 展开子树
     * 设置节点的展开属性
     * node.expanded = true
     * 
     * 注意:树上的每个节点都具有展开和伸缩子树的方法,而不是将这两个方法共享
     * 保证了树节点的独立性质
     */


    Node.prototype.expand = function expand() {
        // console.log('展开子树', this);
        this.expanded = true;
    };

    /**
     * 设置节点的选中状态
     * (key/data, checked, deep) 
     * @param {*} value 
     * @param {*} deep 
     * @param {*} recursion 递归
     * @param {*} passValue 
     */


    Node.prototype.setChecked = function setChecked(value, deep, recursion, passValue) {
        var _this = this;

        // console.log('设置节点的选中状态', value, deep, recursion, passValue, this.data.id);

        // 1.设置节点自身的选中状态
        this.indeterminate = value === 'half';
        this.checked = value === true;

        // 如果是严格模式即父子节点的选中状态是互不关联的
        if (this.store.checkStrictly) return;

        var handleDescendants = function handleDescendants() {
            // console.log('deep', deep);
            if (deep) {
                var childNodes = _this.childNodes;
                for (var i = 0, j = childNodes.length; i < j; i++) {
                    var child = childNodes[i];
                    // 意思就是取passValue
                    // 如果passValue为true,则为true
                    // 如果passValue为false,则看value与false取异
                    // value为true,则为true;value为false,则为false
                    // passValue = passValue || value
                    passValue = passValue || value !== false;
                    var isCheck = passValue;
                    // console.log('child', child);
                    child.setChecked(isCheck, deep, true, passValue);
                }
            }
        };

        // 2.设置子孙节点的选中状态
        handleDescendants();

        // console.log('recursion', recursion);

        // 3.设置父节点的选中状态(recursion:false)
        var parent = this.parent;
        // 如果父节点不存在或为根节点,则说明已经找到根了
        if (!parent || parent.level === 0) return;

        // 如果recursion不存在或为false,则设置父节点的选中状态(根据子节点的选中状态)
        if (!recursion) {
            reInitChecked(parent);
        }
    };

    _createClass(Node, [{
        key: 'label',
        get: function get() {
            return getPropertyFromData(this, 'label');
        }

        /**
         * 获取key
         */

    }, {
        key: 'key',
        get: function get() {
            var nodeKey = this.store.key;
            if (this.data) return this.data[nodeKey];
            return null;
        }
    }]);

    return Node;
}();

/* harmony default export */ var model_node = (node_Node);
// CONCATENATED MODULE: ./packages/tree/src/model/tree-store.js
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function tree_store_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * tree-store.js
 * 树的属性和方法
 * 
 * ES6 class(类)
 * https://es6.ruanyifeng.com/#docs/class
 * constructor:构造方法
 * this关键字则代表实例对象
 * 构造函数的prototype属性，在ES6的“类”上面继续存在。事实上，类的所有方法都定义在类的prototype属性上面
 * 在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为
 * 参考:https://blog.csdn.net/weixin_44691513/article/details/108416033
 * 
 */



var tree_store_TreeStore = function () {
    /**
     * 构造方法,类的默认执行方法
     * 且默认放回this(实例对象)
     * @param {*} options 
     */
    function TreeStore(options) {
        tree_store_classCallCheck(this, TreeStore);

        // 赋值初始化:options是对象,遍历使用for...in...
        for (var option in options) {
            if (options.hasOwnProperty(option)) {
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
        this.root = new model_node({
            data: this.data,
            store: this
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


    TreeStore.prototype.registerNode = function registerNode(node) {
        var key = this.key;

        // console.log('88noderegisterNode', node, this, key);

        // 如果不存在则返回
        if (!key || !node || !node.data) return;

        var nodeKey = node.key;
        if (nodeKey !== undefined) this.nodesMap[node.key] = node;

        // console.log('注册node节点', nodeKey !== undefined, this.nodesMap);
    };

    /**
     * 设置节点的默认选中状态
     */


    TreeStore.prototype._initDefaultCheckedNodes = function _initDefaultCheckedNodes() {
        var _this = this;

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
        var defaultCheckedKeys = this.defaultCheckedKeys;
        if (!defaultCheckedKeys || !defaultCheckedKeys.length) return;
        var nodesMap = this.nodesMap;

        defaultCheckedKeys.forEach(function (checkedKeys) {
            var node = nodesMap[checkedKeys];

            if (node) {
                node.setChecked(true, !_this.checkStrictly);
            }
        });
    };

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


    TreeStore.prototype.getCheckedNodes = function getCheckedNodes() {
        var leafOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var includeHalfChecked = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var checkedNodes = [];
        // console.log('checkedNodes', checkedNodes, leafOnly, includeHalfChecked, this);

        // tranverse:翻转
        var tranverse = function tranverse(node) {
            // 如果传进来的是根节点,则取自根节点的childNodes(说明是第一次进来的), 否则取自节点的childNodes
            var childNodes = node.root ? node.root.childNodes : node.childNodes;

            // console.log('childNodes', childNodes);

            // forEach回过滤掉空数组的(如果是空数组,则不执行回调函数)
            childNodes.forEach(function (child) {

                // 筛选条件:
                // 如果child.leaf === leafOnly || child.indeterminate === includeHalfChecked

                // 节点本身
                if ((child.checked || includeHalfChecked && child.indeterminate) && (!leafOnly || leafOnly && child.isLeaf)) {
                    checkedNodes.push(child.data);
                }

                // 如果节点有子节点, 这里没有取判断是否有子节点
                // 有条件判断
                // if(child.childNodes.length) tranverse(child);

                tranverse(child);
            });
        };

        tranverse(this);

        return checkedNodes;
    };

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


    TreeStore.prototype.getCheckedKeys = function getCheckedKeys() {
        var _this2 = this;

        var leafOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

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
        return this.getCheckedNodes(leafOnly).map(function (data) {
            return (data || {})[_this2.key];
        });
    };

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


    TreeStore.prototype.getNode = function getNode(data) {
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
        if (data instanceof model_node) return data;
        var key = (typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object' ? data : utils_getNodeKey(this.key, data);
        // console.log('key', key, this.nodesMap, this.nodesMap[key]);
        // 这里知道了nodesMap的用处(根据key获取节点)
        return this.nodesMap[key] || null;
    };

    /**
     * 获取半选中节点的数组
     * 
     * 入参:
     * 没有
     * 
     * 返回值:
     * 半选中节点所组成的数组(是节点的data而非节点所组成的数组) || []
     */


    TreeStore.prototype.getHalfCheckedNodes = function getHalfCheckedNodes() {
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
        var nodes = [];

        var tranverse = function tranverse(node) {
            var childNodes = node.root ? node.root.childNodes : node.childNodes;
            childNodes.forEach(function (child) {
                if (child.indeterminate) {
                    nodes.push(child.data);
                }
                tranverse(child);
            });
        };

        tranverse(this);

        return nodes;
    };

    /**
     * 获取半选中节点的key所组成的数组
     * 
     * 入参:
     * 没有
     * 
     * 返回值:
     * 半选中节点的key所组成的数组(是节点的key) || []
     */


    TreeStore.prototype.getHalfCheckedKeys = function getHalfCheckedKeys() {
        var _this3 = this;

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
        return this.getHalfCheckedNodes().map(function (data) {
            return (data || {})[_this3.key];
        });
    };

    /**
     * 获取所有的节点
     */


    TreeStore.prototype._getAllNodes = function _getAllNodes() {
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
        var allNodes = [];
        var nodesMap = this.nodesMap;
        for (var nodeKey in nodesMap) {
            if (nodesMap.hasOwnProperty(nodeKey)) {
                allNodes.push(nodesMap[nodeKey]);
            }
        }
        return allNodes;
    };

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


    TreeStore.prototype._setCheckedKeys = function _setCheckedKeys(key) {
        var leafOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var checkedKeys = arguments[2];

        // console.log('设置选中的节点', key, leafOnly, checkedKeys);
        // const allNodes = this._getAllNodes();
        // 非常重要:节点根据node.level从小到大排列,
        // 这样可以保证父节点在前,子节点在后
        var allNodes = this._getAllNodes().sort(function (a, b) {
            return b.level - a.level;
        });
        var cache = Object.create(null);
        var keys = Object.keys(checkedKeys);
        // console.log('hello lusuix', cache, keys);

        // 首先设置所有节点取消选中状态
        allNodes.forEach(function (node) {
            return node.setChecked(false, false);
        });

        for (var i = 0, j = allNodes.length; i < j; i++) {
            var node = allNodes[i];
            var nodeKey = node.data[key].toString();
            // 判断指定的key是否在数组keys中
            var checked = keys.indexOf(nodeKey) > -1;

            // console.log(node.data.id, node);

            // 如果不在,设置非选中
            if (!checked) {
                console.log('不在', node.data.id, checked, node, cache, cache[nodeKey]);
                if (node.checked && !cache[nodeKey]) {
                    node.setChecked(false, false);
                }
                continue;
            }

            // console.log('在', node.data.id, checked, node, cache, cache[nodeKey])

            // 如果在,则设置选中
            var parent = node.parent;
            while (parent && parent.level > 0) {
                // console.log('parent8888', parent)
                cache[parent.data[key]] = true;
                parent = parent.parent;
            }
            // console.log('在', cache);

            // 如果是叶子节点
            if (node.isLeaf || this.checkStrictly) {
                node.setChecked(true, false);
                continue;
            }
            // 如果是非叶子节点
            node.setChecked(true, true);

            // 如果leafOnly为true,也就是只是设置该节点下的子树中的叶子节点为选中状态
            if (leafOnly) {
                (function () {
                    // console.log('le', leafOnly)
                    // 先设置非选中
                    node.setChecked(false, false);
                    // 递归设置非叶子节点为取消选中
                    var tranverse = function tranverse(node) {
                        var childNodes = node.childNodes;
                        childNodes.forEach(function (child) {
                            if (!child.isLeaf) {
                                child.setChecked(false, false);
                            }
                            tranverse(child);
                        });
                    };
                    tranverse(node);
                })();
            }
        }
    };

    /**
     * 设置节点为选中状态
     * 使用此方法必须设置 node-key 属性
     * 
     * 入参:
     * nodes:勾选节点数据的数组
     * leafOnly:是否是叶子节点
     */


    TreeStore.prototype.setCheckedNodes = function setCheckedNodes(nodes) {
        var leafOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        // 自己的思路
        // 想着可以调用setCheckedKeys来实现
        // console.log('设置节点为选中状态', nodes);
        // const keys = [];
        // nodes.forEach((node) => {
        //     const nodeKey = getNodeKey(this.key, node);
        //     keys.push(nodeKey);
        // });
        // this.setCheckedKeys(keys, leafOnly);

        // 源码写法
        var key = this.key;
        var checkedKeys = {};
        nodes.forEach(function (item) {
            checkedKeys[(item || {})[key]] = true;
        });

        this._setCheckedKeys(key, leafOnly, checkedKeys);
    };

    /**
     * 通过key设置目前勾选的节点
     * 前提条件:设置node-key
     * 
     * 入参:
     * data:要选中节点的key
     * leafOnly:是否仅设置叶子节点(如果leafOnly为true,则仅设置该节点的叶子节点为选中状态,且自己的状态为半选中状态或选中状态)
     * 
     */


    TreeStore.prototype.setCheckedKeys = function setCheckedKeys() {
        var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var leafOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

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
        var key = this.key;
        var checkedKeys = {};
        keys.forEach(function (key) {
            checkedKeys[key] = true;
        });

        // console.log('checkedKeys', checkedKeys, leafOnly);
        this._setCheckedKeys(key, leafOnly, checkedKeys);
    };

    /**
     * 获取当前被选中节点的key
     * 使用此方法必须设置 node-key 属性，若没有节点被选中则返回 null
     * 无需在这里实现
     */
    // getCurrentKey() {
    //     // 自己的思路
    //     // 要获取当前选中节点的key,那么首先要知道的是当前选中的节点
    //     // 如何获取当前选中的节点呢?
    //     console.log('获取当前被选中节点的key');
    // }

    /**
     * 获取当前选中的节点
     * 如何获取呢?
     * 节点在tree-node.vue
     */


    TreeStore.prototype.getCurrentNode = function getCurrentNode() {};

    /**
     * 设置当前节点
     */


    TreeStore.prototype.setCurrentNode = function setCurrentNode(currentNode) {
        console.log('currentNode', currentNode);
    };

    return TreeStore;
}();

/* harmony default export */ var tree_store = (tree_store_TreeStore);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/tree/src/tree-node.vue?vue&type=template&id=3ba3ef0e&
var tree_nodevue_type_template_id_3ba3ef0e_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "y-tree-node",
      attrs: { "aria-expanded": _vm.expanded },
      on: {
        click: function($event) {
          $event.stopPropagation()
          return _vm.handleClick($event)
        }
      }
    },
    [
      _c(
        "div",
        {
          staticClass: "y-tree-node__content",
          style: {
            "padding-left": (_vm.node.level - 1) * _vm.treeC.indent + "px"
          }
        },
        [
          _vm.showCheckbox
            ? _c("y-checkbox", {
                attrs: { indeterminate: _vm.node.indeterminate },
                on: { change: _vm.handleCheckChange },
                nativeOn: {
                  click: function($event) {
                    $event.stopPropagation()
                  }
                },
                model: {
                  value: _vm.node.checked,
                  callback: function($$v) {
                    _vm.$set(_vm.node, "checked", $$v)
                  },
                  expression: "node.checked"
                }
              })
            : _vm._e(),
          _c("node-content", { attrs: { node: _vm.node } })
        ],
        1
      ),
      _c("y-collapse-transition", [
        _vm.childNodeRendered
          ? _c(
              "div",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.expanded,
                    expression: "expanded"
                  }
                ],
                staticClass: "y-tree-node__children",
                attrs: { "aria-expanded": _vm.expanded }
              },
              _vm._l(_vm.node.childNodes, function(child) {
                return _c("y-tree-node", {
                  key: _vm.getNodeKey(child),
                  attrs: { node: child, "show-checkbox": _vm.showCheckbox }
                })
              }),
              1
            )
          : _vm._e()
      ])
    ],
    1
  )
}
var tree_nodevue_type_template_id_3ba3ef0e_staticRenderFns = []
tree_nodevue_type_template_id_3ba3ef0e_render._withStripped = true


// CONCATENATED MODULE: ./packages/tree/src/tree-node.vue?vue&type=template&id=3ba3ef0e&

// CONCATENATED MODULE: ./src/transitions/collapse-transition.js
/**
 * 列的循环渲染
 * 根据children字段无限循环下去,生成子树
 * 
 * 使用render函数创建组件
 * 
 * 函数式组件(理解:同React的函数组件)-无状态,无实例
 * 官方文档:https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6
 * 轻量,渲染性能高,适合只依赖于外部数据传递而变化的组件
 * 入参是渲染上下文(render context)，返回值是渲染好的HTML
 * 
 * 没有管理任何状态,没有监听任何传递给它的状态,也没有生命周期方法。
 * 实际上,它只是一个接受一些prop的函数(没有响应式数据,没有实例[没有this上下文])。
 * 
 * 函数式组件只是函数,所以渲染开销也低很多
 * 常用于包装组件(包装组件什么意思?为什么会比较适合用在此呢?)
 * 
 * 由于函数组件拥有无状态、无实例(没有this)的两个特性,我们就可以把它用作高阶组件(所谓高阶组件,就是可以生成其他组件的组件)
 * 
 * 创建函数组件模板:
 * export default {name: 'func-component', functional: true, render(createElement, context) {...}}
 * 
 * 因为函数式组件没有this,参数靠context(Object类型)来传递了
 * Reander context 属性:
 * - props
 * - children
 * - slots
 * - parent
 * - listeners
 * - injections
 * - data
 * 
 * creatElement:官方文档:https://cn.vuejs.org/v2/guide/render-function.html
 * 
 * 函数式组件没有实例,事件只能由父组件传递:
 * creatElement里事件属性:on
 * 属性集成在data里:第二个参数
 * export default {name: 'func-component', functional: true, render(createElement, {children}) {...}}
 * 
 */

/* harmony default export */ var collapse_transition = ({
    name: 'YCollapseTransition',

    // 函数式组件标识,只有该值为true,render的第二个参数才有意义
    functional: true,

    render: function render(h, context) {
        // console.log('context', context);
        var children = context.children;

        return h('transition', // 标签名
        children // 子级虚拟节点
        );
    }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/tree/src/tree-node.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var tree_nodevue_type_script_lang_js_ = ({
    name: 'YTreeNode',
    componentName: 'YTreeNode',

    // 组件注册
    components: {
        YCollapseTransition: collapse_transition,

        /**
         * 官方文档
         * 组件是可复用的Vue的实例
         * 所以它们接收与 new Vue 接收相同的选项，例如 data、computed、watch、methods 以及生命周期钩子等，仅有的例外是像 el 这样根实例特有的选项。
         * 
         * 创建html
         * - 使用template
         * - 使用render函数(利用js的编程能力, createElement)
         * - JSX(其实安装支持JSX的babel,使render函数里可以写JSX以代替createElement)
         */
        NodeContent: {
            props: {
                node: {
                    required: true
                }
            },
            render: function render(h) {
                var parent = this.$parent;
                var treeC = parent.treeC;
                var node = this.node;
                var data = node.data,
                    store = node.store;
                // console.log('node', node, parent, treeC, data, store);
                // this: proxy:
                // [[Handler]]: Object
                // [[Target]]: VueComponent
                // [[IsRevoked]]: false

                // console.log('88', this, node, typeof node);
                // 增加自定义节点显示内容(插槽)

                return treeC.$scopedSlots.default ? treeC.$scopedSlots.default({ node: node, data: data }) : h(
                    'span',
                    { 'class': 'y-tree-node__label' },
                    [node.label]
                );
            }
        }
    },

    props: {
        /**
         * 两种写法
         */
        // node: {
        //     type: Object,
        //     default: function() {
        //         return {};
        //     }
        // },
        node: {
            default: function _default() {
                return {};
            }
        },

        showCheckbox: {
            type: Boolean,
            default: false
        }
    },

    data: function data() {
        return {
            /**
             * 表示父组件是否是树根,如果是则表示父组件,如果不是则表示父组件的tree
             * tree :null,
             * 树上所有节点共享的属性和方法(通过treeC一级一级的传递下去)
             */
            treeC: null,

            // 该节点是否展开,作用是html需要
            expanded: false,

            /**
             * 子树是否渲染(是否展开子树)
             * 表示子树是否已经被渲染过了
             * 如果被渲染过了
             * - expanded为true则隐藏子树(display:none)
             * - expanded为false则显示子树(display:block)
             */
            childNodeRendered: false,

            // 节点原来的选中状态
            oldChecked: null,
            oldIndeterminate: null
        };
    },


    /**
     * 监听属性,
     * 不仅可以监听属性自己,还可监听对象
     * 监听对象(深度监听对象的属性|监听该对象指定属性)
     * 
     */
    watch: {
        /**
         * 监听node.expanded的更新
         * 如果原节点的expand是false
         * 点击节点行 -> hangleClick -> 调用node.expand -> node.expand为true -> 可以监听到该值的变化
         * 再次点击节点行 -> handleClick -> 
         */
        'node.expanded': function nodeExpanded(val) {
            var _this = this;

            // console.log('监听node.expanded', val);

            // 等视图更新后再去调用,否则可能会出现只监听到一次,便不打印值了
            this.$nextTick(function () {
                return _this.expanded = val;
            });
            if (val) {
                this.childNodeRendered = true;
            }
            // console.log('监听node.expanded', this);
        },


        /**
         * 监听节点选中状态之checked变化
         */
        'node.checked': function nodeChecked(val) {
            // console.log('监听节点选中状态', val);
            this.handleSelectChange(val, this.node.indeterminate);
        },


        /**
         * 监听节点半选中状态之indeterminate
         */
        'node.indeterminate': function nodeIndeterminate(val) {
            // console.log('监听节点半选中状态', val);
            this.handleSelectChange(this.node.checked, val);
        }
    },

    methods: {

        /**
         * 获取节点的key
         */
        getNodeKey: function getNodeKey(node) {
            // console.log('treeC', this.treeC)
            return utils_getNodeKey(this.treeC.nodeKey, node.data);
        },


        /**
         * 点击展开|收缩
         */
        handleClick: function handleClick() {
            // console.log('点击了', this.expanded);
            // this.handleExpandIconClick();

            if (this.expanded) {
                // 如果已经展开了,则收缩
                this.node.collapse();
            } else {
                // 如果没有展开,则展开
                this.node.expand();
            }

            // console.log('ending');
        },


        /**
         * 更改节点的选中状态
         * 当节点的选中状态发生变化后的回调
         */
        handleCheckChange: function handleCheckChange(value, ev) {
            // console.log('handleCheckChange', value, ev);
            // 设置节点自身的选中状态
            // setChecked (key/data, checked, deep) 
            // 通过 key / data 设置某个节点的勾选状态, 使用此方法必须设置 node-key 属性
            // 如果是严格模式下, 即父子节点的选中状态互不关联, 默认为false
            this.node.setChecked(ev.target.checked, !this.treeC.checkStrictly);
        },


        /**
         * 当节点的复选框选中状态变化后的回调
         * 该节点的选中状态
         * check-change:节点的复选框选中状态变化后的回调
         *  - data:该节点的数据
         *  - checked:该节点是否选中
         *  - indeterminate:节点的子树是否被选中(说明:该节点本身是否是半选中状态)
         */
        handleSelectChange: function handleSelectChange(checked, indeterminate) {
            // console.log('当复选框节点选中后', checked, indeterminate);
            // console.log('原来的选中状态', this.oldChecked, this.oldIndeterminate);
            // 判断新值与旧值是否相同
            // 与写法
            if (this.oldChecked !== checked && this.oldIndeterminate !== indeterminate) {
                // 如果选中状态发生变化,则调用祖先组件树的check-change方法
                this.treeC.$emit('check-change', this.node.data, // 节点本身的数据
                checked, // 节点的选中状态
                indeterminate // 节点的半选中状态
                );
            }
            // 给旧状态赋新值
            this.oldChecked = checked;
            // 为什么要再次设置半选中状态呢?
            // 为什么不更新旧的半选中状态呢?
            this.indeterminate = indeterminate;

            // 或写法
            // if(this.oldChecked !== checked && this.oldIndeterminate !== indeterminate) {
            //     this.treeC.$emit('check-change', this.node.data, checked, indeterminate);
            // }
            // this.oldChecked = checked; this.oldIndeterminate = indeterminate;
        }
    },

    created: function created() {
        /**
         * 为什么这里只要将
         * const parent = parent.isTree ? parent : parent.tree
         * this.tree = parent.isTree ? parent : parent.tree
         * 报错:说是循环引用了
         * Error in render: "TypeError: Converting circular structure to JSON
         * 
         * this.$parent是tree.vue组件的虚拟节点,是因为命名不可同吗?
         * this.tree 与 tree.vue 都是 tree
         */
        // const parent = this.$parent;
        // console.log(this, parent);

        var parent = this.$parent;
        this.treeC = parent.isTree ? parent : parent.treeC;
        // console.log(this, parent, this.treeC);
        // console.log('tree-node', this.node, this.node.childNodes);

        var treeC = this.treeC;
        if (!treeC) {
            console.warn('Can not find node\'s tree.');
        }
        // console.log('created', tree, tree.indent, this.node.level, tree.indent * (this.node.level-1))

        var props = treeC.props || {};
        var childrenKey = props['children'] || 'children';
        // console.log('props', props, childrenKey);

        /**
         * created:this.$data是空对象,则在created中赋值的变量在虚拟节点的根部
         * 但是如果赋值的变量也在data中,则也回保存到data中
         * 组件下的data是响应式的数据(更新视图)
         * 因为expanded和childNodeRendered需要是响应式的,所以需要在data中定义
         * 否则非响应式的数据便不需要保存到data中
         */
        if (this.node.expanded) {
            this.expanded = true;
            this.childNodeRendered = true;
        }

        // console.log('88', this.node.expanded);
    },
    mounted: function mounted() {
        // console.log('node', this.node, this.showCheckbox, this.treeC.showCheckbox)
    }
});
// CONCATENATED MODULE: ./packages/tree/src/tree-node.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_tree_nodevue_type_script_lang_js_ = (tree_nodevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/tree/src/tree-node.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_tree_nodevue_type_script_lang_js_,
  tree_nodevue_type_template_id_3ba3ef0e_render,
  tree_nodevue_type_template_id_3ba3ef0e_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/tree/src/tree-node.vue"
/* harmony default export */ var tree_node = (component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/tree/src/tree.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var treevue_type_script_lang_js_ = ({
    name: 'YTree',

    components: {
        YTreeNode: tree_node
    },

    props: {
        /**
         * 树要展示的数据
         */
        data: {
            type: Array
        },

        /**
         * 指定节点的key
         */
        nodeKey: String,

        /**
         * 节点是否可被选择
         * 树节点共享该值 show-checkbox
         */
        showCheckbox: {
            type: Boolean,
            default: false
        },

        /**
         * 是否默认展开所有节点
         * 默认值false
         * 树节点共享值 default-expand-all
         * 存到store
         */
        defaultExpandAll: {
            type: Boolean,
            default: false
        },

        /**
         * 配置项
         */
        props: {
            type: Object,
            default: function _default() {
                return {
                    children: 'children', // 指定子树为节点某个对象的值即"children"对应值表示子节点的数据
                    label: 'label' // 指定节点标签为节点对象的某个属性的值
                };
            }
        },

        /**
         * 相邻级节点间的水平缩进
         */
        indent: {
            type: Number,
            default: 18
        },

        // 是否严格选中(不涉及父子节点的选中状态)
        checkStrictly: Boolean,

        // 是否更改子孙节点的选中状态
        checkDescendants: {
            type: Boolean,
            default: false
        },

        // 默认选中节点的key组成的数组
        defaultCheckedKeys: Array

    },

    data: function data() {
        return {
            store: null,
            root: null
        };
    },


    watch: {
        data: function data(newVal) {
            console.log('监听data发生变化', newVal);
        }
    },

    methods: {
        /**
         * 外部在调用tree组件时,需要通过refs来访问该组件的方法
         * 例如:this.$refs.treeRef.getCheckedNodes()
         * 但是呢?
         */

        // 获取节点的key
        getNodeKey: function getNodeKey(node) {
            return utils_getNodeKey(this.nodeKey, node.data);
        },


        /**
         * 获取选中节点
         * leafOnly:是否只是叶子节点,默认值为false
         * includeHalfChecked:是否包含半选节点,默认值为false
         */
        getCheckedNodes: function getCheckedNodes(leafOnly, includeHalfChecked) {
            return this.store.getCheckedNodes(leafOnly, includeHalfChecked);
        },


        /**
         * 获取选中状态下节点的key所组成的数据
         * leafOnly:是否只是叶子节点,默认值为false
         */
        getCheckedKeys: function getCheckedKeys(leafOnly) {
            return this.store.getCheckedKeys(leafOnly);
        },


        /**
         * 根据key或者data获取节点
         */
        getNode: function getNode(data) {
            return this.store.getNode(data);
        },


        /**
         * 获取半选中节点
         * 没有入参
         * 返回半选中节点
         */
        getHalfCheckedNodes: function getHalfCheckedNodes() {
            return this.store.getHalfCheckedNodes();
        },


        /**
         * 获取半选中节点的key
         * 没有入参
         * 返回半选中节点的key所组成的数组
         */
        getHalfCheckedKeys: function getHalfCheckedKeys() {
            return this.store.getHalfCheckedKeys();
        },


        /**
         * 设置节点为选中状态
         * 入参:
         * nodes:要设置为选中状态的节点的数据所组成的数组
         * leafOnly:是否仅设置叶子节点
         */
        setCheckedNodes: function setCheckedNodes(nodes, leafOnly) {
            return this.store.setCheckedNodes(nodes, leafOnly);
        },


        /**
         * 根据节点的keys设置勾选的节点
         * 入参:
         * 节点key组成的数组,默认值为[]
         * 是否只设置叶子节点的选中状态,默认值为false
         * 
         * const setCheckedKeys = this.$refs.yTreeRef.setCheckedKeys([22, 19], true);
         * console.log('setCheckedKeys', setCheckedKeys)
         */
        setCheckedKeys: function setCheckedKeys(keys, leafOnly) {
            // console.log('leee', keys, leafOnly)
            return this.store.setCheckedKeys(keys, leafOnly);
        },


        /**
         * 获取当前选中的节点
         */
        getCurrentNode: function getCurrentNode() {
            var currentNode = this.store.getCurrentNode();
            return currentNode ? currentNode.data : null;
        },


        /**
         * 获取当前被选中节点的key
         */
        getCurrentKey: function getCurrentKey() {
            // 自己的思路:写到store里
            // return this.store.getCurrentKey();
            // 抛出错误
            if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in getCurrentKey');
            var currentNode = this.getCurrentNode();
            return currentNode ? currentNode[this.nodeKey] : null;
        }
    },

    created: function created() {
        // 给子树判断父组件是否为树
        this.isTree = true;

        // 创建树的store
        this.store = new tree_store({
            key: this.nodeKey,
            data: this.data,
            props: this.props,
            // showCheckbox: this.showCheckbox,
            checkStrictly: this.checkStrictly,
            checkDescendants: this.checkDescendants,
            defaultExpandAll: this.defaultExpandAll,
            defaultCheckedKeys: this.defaultCheckedKeys
        });

        // 树的根节点
        this.root = this.store.root;
    },
    mounted: function mounted() {
        // console.log('tree', this.root, this.showCheckbox);
        // this.getCheckedNodes();
        // console.log('tree', this, this.$slots);
        // console.log('defaultCheckedKeys', this.defaultCheckedKeys)
    }
});
// CONCATENATED MODULE: ./packages/tree/src/tree.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_treevue_type_script_lang_js_ = (treevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/tree/src/tree.vue





/* normalize component */

var tree_component = Object(componentNormalizer["a" /* default */])(
  src_treevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var tree_api; }
tree_component.options.__file = "packages/tree/src/tree.vue"
/* harmony default export */ var tree = (tree_component.exports);
// CONCATENATED MODULE: ./packages/tree/index.js


tree.install = function (Vue) {
    Vue.component(tree.name, tree);
};

/* harmony default export */ var packages_tree = __webpack_exports__["default"] = (tree);

/***/ }),

/***/ 8:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 合并多个对象到第一个参数
 * arguments:函数传入的参数集
 * @param {*} target 第一个参数
 * @returns 
 */
/* harmony default export */ __webpack_exports__["a"] = (function (target) {
    // console.log('merge', target, arguments)
    // 从第二个参数开始取,因为target是第一个参数
    for (var i = 1, j = arguments.length; i < j; i++) {
        var scource = arguments[i] || {};
        // console.log('scource', scource)
        for (var prop in scource) {
            // 如果prop是scource的自身属性,而非继承而来的
            if (scource.hasOwnProperty(prop)) {
                var value = scource[prop];
                if (value !== undefined) {
                    target[prop] = value;
                }
            }
        }
    }
    return target;
});

/***/ })

/******/ });