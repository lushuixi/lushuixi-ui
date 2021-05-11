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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
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

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/radio/src/radio.vue?vue&type=template&id=69cd6268&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "label",
    {
      staticClass: "l-radio",
      class: [
        { "is-focus": _vm.focus },
        { "is-checked": _vm.model === _vm.label }
      ],
      attrs: { role: "radio", "aria-checked": _vm.model === _vm.label }
    },
    [
      _c(
        "span",
        {
          staticClass: "l-radio__input",
          class: {
            "is-checked": _vm.model === _vm.label
          }
        },
        [
          _c("span", { staticClass: "l-radio__inner" }),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.model,
                expression: "model"
              }
            ],
            ref: "radio",
            staticClass: "l-radio__original",
            attrs: { type: "radio", "aria-hidden": "false" },
            domProps: {
              value: _vm.label,
              checked: _vm._q(_vm.model, _vm.label)
            },
            on: {
              focus: function($event) {
                _vm.focus = true
              },
              blur: function($event) {
                _vm.focus = false
              },
              change: [
                function($event) {
                  _vm.model = _vm.label
                },
                _vm.handleChange
              ]
            }
          })
        ]
      ),
      _c(
        "span",
        { staticClass: "l-radio__label" },
        [
          _vm._t("default"),
          !_vm.$slots.default ? [_vm._v(_vm._s(_vm.label))] : _vm._e()
        ],
        2
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/radio/src/radio.vue?vue&type=template&id=69cd6268&

// EXTERNAL MODULE: ./src/mixins/emitter.js
var emitter = __webpack_require__(2);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/radio/src/radio.vue?vue&type=script&lang=js&
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


/* harmony default export */ var radiovue_type_script_lang_js_ = ({

    name: 'LRadio',

    // 混入，增加dispath方法，将事件向上派发给父组件
    mixins: [emitter["a" /* default */]],

    // 接收父组件传递的数据
    props: {
        value: {}, // 父组件v-model
        label: {} // 父组件label
    },

    computed: {
        /**
         * 向上追溯父组件是否为radio-group
         * 不能通过name来判断，所以需要定义componentName
         */
        isGroup: function isGroup() {
            var parent = this.$parent;
            while (parent) {
                // console.log('radio下的父组件', parent, parent.$options.componentName);
                if (parent.$options.componentName !== 'LRadioGroup') {
                    parent = parent.$parent;
                } else {
                    // 保留radio-group组件的数据
                    this._radioGroup = parent;
                    return true;
                }
            }
            return false;
        },

        /**
         * 因为model值是绑定到原生的input框中的
         * 只要该input框
         * 如果是父组件radio-group下的radio, 则isGroup为true, model取radio-group组件上的value
         * 如何去通知父组件radio-group更新value值呢？
         */
        model: {
            get: function get() {
                // return this.value;
                return this.isGroup ? this._radioGroup.value : this.value;
            },
            set: function set(val) {
                console.log('model值发生了变化', val);
                // 通知父组件更新v-model对应的value值
                // this.$emit('input', val)
                if (this.isGroup) {
                    // this.dispatch('YRadioGroup', 'input', [val]);
                    // this.dispatch 是混入进来的, 通知父组件radio-group更新
                    this.dispatch('LRadioGroup', 'input', [val]);
                } else {
                    this.$emit('input', val);
                }
                // 同步到原生单选框的选中状态
                this.$refs.radio && (this.$refs.radio.checked = this.model === this.label);
            }
        }
    },

    data: function data() {
        return {
            focus: false
        };
    },


    methods: {
        handleChange: function handleChange() {
            var _this = this;

            // input改变后, 需要等视图的更新, 更新后方可获取该值, 为label对应的值
            this.$nextTick(function () {
                console.log('handleChange', _this.model);
                // 这句话有什么意义, 通知父组件选中状态变化后的回调
                _this.$emit('change', _this.model);
                // 如果是父组件是radio-group组件, 则调用父组件的handleChange, 以更新model值
                _this.isGroup && _this.dispatch('LRadioGroup', 'handleChange', _this.model);
            });
        }
    },

    mounted: function mounted() {
        // console.log('111', this.$slots, Boolean(this.$slots.default), this.value, this.label, this.model === this.label);
        // 测试: label值为1，如果加冒号，表示传入的是数字类型，1+1=1；如果不加冒号，表示传入的是字符串类型，1+1=11
        // console.log('222', this.label, this.label + 1);
        console.log('333', this.model);
    }
});
// CONCATENATED MODULE: ./packages/radio/src/radio.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_radiovue_type_script_lang_js_ = (radiovue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/radio/src/radio.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_radiovue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/radio/src/radio.vue"
/* harmony default export */ var src_radio = (component.exports);
// CONCATENATED MODULE: ./packages/radio/index.js


src_radio.install = function (Vue) {
    Vue.component(src_radio.name, src_radio);
};

/* harmony default export */ var packages_radio = __webpack_exports__["default"] = (src_radio);

/***/ }),

/***/ 2:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * mixin混入,可以混入到所使用的组件本身的实例对象，两个对象的融合
 * 例如，radio组件使用了混入，且该混入对象中有radio组件没有的方法，则混入后radio组件便有了这个方法
 * 使用场景：如果多个组件公用同一个方法或什么的，可以抽离出来，混入进去
 * 官方文档: https://cn.vuejs.org/v2/guide/mixins.html
 */

/* harmony default export */ __webpack_exports__["a"] = ({

    methods: {

        /**
         * 实现子组件向父组件派发事件, 子组件通知父组件
         * @param {*} componentName 组件名, 用来查找拥有该组件名的组件(当前的父组件)
         * @param {*} eventName 事件名, 字符串类型
         * @param {*} params 参数
         */
        dispatch: function dispatch(componentName, eventName, params) {

            // console.log('混入文件emitter', componentName, eventName, params, this);
            var parent = this.$parent;
            var name = parent.$options.componentName;

            // 查找组件名为componentName的父组件
            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent;
                if (parent) {
                    name = parent.$options.componentName;
                }
            }

            /**
             * emit官方文档: https://cn.vuejs.org/v2/api/#vm-emit
             * vm.$emit( eventName, […args] ), 接收的参数有两种形式, 一种是this.$emit(eventName, 参数), 一种是this.$emit([事件名, 参数])
             * concat 连接两个数组 ['input'].concat(['1']) => ['input', '1'], ['input'].concat('1') => ['input', '1']
             * 语法: arrayObject.concat(arrayX,arrayX,......,arrayX) 必需。该参数可以是具体的值，也可以是数组对象。可以是任意多个。
             * 返回值: 返回一个新的数组。该数组是通过把所有 arrayX 参数添加到 arrayObject 中生成的。如果要进行 concat() 操作的参数是数组，那么添加的是数组中的元素，而不是数组。
             * apply 修改this.$emit中的this指向
             * this.$emit([事件名， 参数]) 会有什么样的效果？会报错的，不能这样写的
             * 之所以可以这样写(this.$emit(parent, [eventName].concat(params))), 是因为js中修改this指向，如果使用apply方法接受数组形式的参数(call方法分别接受参数)
             * 所以 this.$emit(parent, ['input', '1']) 会被译成 vm.$emit('input', '1') 这种形式
             */
            console.log('父亲节点', parent, name, [eventName].concat('1'));
            // apply 修改this.$emit中的this指向
            this.$emit.apply(parent, [eventName].concat(params));
        }
    }

});

/***/ })

/******/ });