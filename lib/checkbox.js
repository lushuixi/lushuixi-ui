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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
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

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/checkbox/src/checkbox.vue?vue&type=template&id=d0387074&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "label",
    { staticClass: "y-checkbox", attrs: { role: "checkbox" } },
    [
      _c(
        "span",
        {
          staticClass: "y-checkbox__input",
          class: {
            "is-checked": _vm.isChecked,
            "is-indeterminate": _vm.indeterminate
          }
        },
        [
          _c("span", { staticClass: "y-checkbox__inner" }),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.model,
                expression: "model"
              }
            ],
            ref: "checkbox",
            staticClass: "y-checkbox__original",
            attrs: { type: "checkbox", "aria-hidden": "false" },
            domProps: {
              value: _vm.label,
              checked: Array.isArray(_vm.model)
                ? _vm._i(_vm.model, _vm.label) > -1
                : _vm.model
            },
            on: {
              change: [
                function($event) {
                  var $$a = _vm.model,
                    $$el = $event.target,
                    $$c = $$el.checked ? true : false
                  if (Array.isArray($$a)) {
                    var $$v = _vm.label,
                      $$i = _vm._i($$a, $$v)
                    if ($$el.checked) {
                      $$i < 0 && (_vm.model = $$a.concat([$$v]))
                    } else {
                      $$i > -1 &&
                        (_vm.model = $$a
                          .slice(0, $$i)
                          .concat($$a.slice($$i + 1)))
                    }
                  } else {
                    _vm.model = $$c
                  }
                },
                _vm.handleChange
              ]
            }
          })
        ]
      ),
      _c(
        "span",
        { staticClass: "y-checkbox__label" },
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


// CONCATENATED MODULE: ./packages/checkbox/src/checkbox.vue?vue&type=template&id=d0387074&

// EXTERNAL MODULE: ./src/mixins/emitter.js
var emitter = __webpack_require__(4);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/checkbox/src/checkbox.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var checkboxvue_type_script_lang_js_ = ({
    name: 'YCheckbox',
    props: {
        value: {},
        // label选中状态的值, 只有在checkbox-group或者value为数组类型的时候方可有效
        label: {},
        // 半选中状态
        indeterminate: Boolean
    },
    // 混入dispatch方法
    mixins: [emitter["a" /* default */]],
    computed: {
        // 判断是否是group组件
        // vm.$parent, 父实例，如果当前实例有的话 https://cn.vuejs.org/v2/api/#vm-parent
        // vm.$options, 用于当前 Vue 实例的初始化选项。需要在选项中包含自定义 property 时会有用处 https://cn.vuejs.org/v2/api/#vm-options
        isGroup: function isGroup() {
            var parent = this.$parent;
            // 查找父节点, 判断是否是checkbox-group
            while (parent) {
                if (parent.$options.componentName !== 'YCheckboxGroup') {
                    parent = parent.$parent;
                } else {
                    // 保留父组件checkbox-group的数据
                    this._checkboxGroup = parent;
                    // console.log('_checkboxGroup', this._checkboxGroup);
                    return true;
                }
            }
            return false;
        },

        // 原生多选框值的选中状态
        model: {
            get: function get() {
                // return this.value;
                return this.isGroup ? this._checkboxGroup.value : this.value;
            },
            set: function set(val) {
                /**
                 * 通知父组件value值发生了变化
                 * v-model双向绑定, 手动通知父组件吗？这是因为并非是value值发生了变化，
                 * 而是另一个依赖变量model发生了变化, model发生变化后value也要变, 所以需要手动触发
                 * 为什么val会自动增删呢？
                 */
                if (this.isGroup) {
                    // console.log('通知父组件更新数据', val, this.model);
                    // 由于父组件的value是数组类型, 则更新即删除和添加，如何做到的呢？
                    // console.log('model发生了变化', val, this.label);
                    this.dispatch('YCheckboxGroup', 'input', [val]);
                } else {
                    this.$emit('input', val);
                }
                this.$refs.checkbox && (this.$refs.checkbox.checked = this.isChecked);
            }
        },
        /**
         * 选中状态的判定
         * 如何判定选中状态？
         * 这里分三种情况，一种是单个使用(value为布尔类型, label为undefined)
         * 一种情况是单个使用(value为数组类型, label为数组中的某一项)
         * 一种情况是父组件为checkbox-group(value为undefined, label有值)
         */
        isChecked: function isChecked() {
            // this.model.toString(), {}.toString.call(this.model)有什么区别？
            // 若this.model=true, 则 this.model.toString()->true, {}.toString.call(this.model)->[object Boolean]
            // console.log('第一种情况', {}.toString.call(this.model), {}.toString.call(this.model) === '[object Boolean]')

            // 如果是第一种情况, 单独使用多选框且value值为布尔类型
            if ({}.toString.call(this.model) === '[object Boolean]') {
                // console.log('hhhh', this.model);
                return this.model;
            }

            // 如果是第二种情况，单独使用且value为数组类型
            // 数组的判定类型有几种？
            // console.log('第二种情况', this.model, Array.isArray(this.model), this.model.indexOf(this.label), this.model.includes(this.label));
            else if (Array.isArray(this.model)) {
                    // console.log(this.model, this.label);
                    // 判断值是否存在于数组中
                    // indexOf和includes的区别
                    return this.model.indexOf(this.label) > -1;
                }

            // 第三种情况，父组件是checkbox-group, 则this.model为数组类型
            // 如何判断是否选中呢？
            // console.log('第三种情况，父组件是checkbox-group', this._checkboxGroup.value, this.label);
        }
    },
    methods: {
        /**
         * 父组件可能有change事件，即选中状态变化后的回调
         * 因为这是由原生多选框选中状态变化后的回调，需要等视图更新后方可获取到新值，并将新值传给回调函数
         */
        handleChange: function handleChange(ev) {
            var _this = this;

            // console.log('原生checkbox发生了变化', this.model);
            this.$nextTick(function () {
                _this.$emit('change', _this.model, ev);
                if (_this.isGroup) {
                    // 组件checkbox-group绑定的change事件
                    _this.dispatch('YCheckboxGroup', 'change', [_this._checkboxGroup.value]);
                }
            });
        }
    },
    mounted: function mounted() {
        // console.log('checkbox', this.value, this.label);
        // console.log(this.model.toString(), {}.toString.call(this.model), {}.toString.call(this.model) === '[object Boolean]')
        // 如果是半选中状态, 添加aria-controls属性, 为什么？
        // if(this.indeterminate) {
        //     this.$el.setAttribute('aria-controls', this.controls);
        // }
        // console.log('isChecked', this.isChecked);
    },

    watch: {
        // isChecked() {
        //     console.log('watchisChecked', this.isChecked)
        // }
    }
});
// CONCATENATED MODULE: ./packages/checkbox/src/checkbox.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_checkboxvue_type_script_lang_js_ = (checkboxvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/checkbox/src/checkbox.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_checkboxvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/checkbox/src/checkbox.vue"
/* harmony default export */ var src_checkbox = (component.exports);
// CONCATENATED MODULE: ./packages/checkbox/index.js


src_checkbox.install = function (Vue) {
    Vue.component(src_checkbox.name, src_checkbox);
};

/* harmony default export */ var packages_checkbox = __webpack_exports__["default"] = (src_checkbox);

/***/ }),

/***/ 4:
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
            // console.log('父亲节点', parent, name, [eventName].concat('1'));
            // apply 修改this.$emit中的this指向
            this.$emit.apply(parent, [eventName].concat(params));
        }
    }

});

/***/ })

/******/ });