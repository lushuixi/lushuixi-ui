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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
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

/***/ 9:
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

// CONCATENATED MODULE: ./src/utils/merge.js
/**
 * 合并对象到第一个参数
 * @param {*} target 第一个参数
 * @returns 
 */
/* harmony default export */ var merge = (function (target) {
    // console.log('merge', target, arguments)
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
        // store.registerNode(this);

        // console.log('Node', this, options);
    }

    /**
     * 通过 node.label 调用(即执行get方法)
     */


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
            merge(child, {
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
     * 保证了树节点的独立性
     */


    Node.prototype.expand = function expand() {
        // console.log('展开子树', this);
        this.expanded = true;
    };

    _createClass(Node, [{
        key: 'label',
        get: function get() {
            return getPropertyFromData(this, 'label');
        }
    }]);

    return Node;
}();

/* harmony default export */ var model_node = (node_Node);
// CONCATENATED MODULE: ./packages/tree/src/model/tree-store.js
function tree_store_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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



var tree_store_TreeStore = function TreeStore(options) {
    tree_store_classCallCheck(this, TreeStore);

    // 赋值初始化:options是对象,遍历使用for...in...
    for (var option in options) {
        if (options.hasOwnProperty(option)) {
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
    this.root = new model_node({
        data: this.data,
        store: this
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
;

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

                // console.log('88', this, node)

                return h(
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
            childNodeRendered: false
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
        // console.log('tree-node', this.node, this.node.childNodes);

        var treeC = this.treeC;
        if (!treeC) {
            console.warn('Can not find node\'s tree.');
        }
        // console.log('created', tree, tree.indent, this.node.level, tree.indent * (this.node.level-1))

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
        }

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
        // 获取节点的key
        getNodeKey: function getNodeKey(node) {
            return utils_getNodeKey(this.nodeKey, node.data);
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
            defaultExpandAll: this.defaultExpandAll
        });

        // 树的根节点
        this.root = this.store.root;
    },
    mounted: function mounted() {
        console.log('tree', this.root, this.showCheckbox);
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

/***/ })

/******/ });