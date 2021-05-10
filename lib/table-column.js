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

/***/ 1:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return mergeOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return parseWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return parseMinWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return compose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getRowIdentity; });
/**
 * 判断对象obj自身是否包含key属性(非继承过来的)
 * @param {Object} obj 
 * @param {String} key 
 * @returns Boolean
 * obj.hasOwnProperty(key)
 */
function hasOwn(obj, key) {
    // console.log(obj)
    return Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * 合并两个对象
 * @param {Object} defaults 
 * @param {Object} config 
 * @returns Object
 */
function mergeOptions(defaults, config) {
    console.log('mergeOptions', defaults, config);
    // 定义新值保存处理结果(因为更改对象参数会更改原值,对象传参是按地址传的)
    var options = {};
    var key = void 0;
    for (key in defaults) {
        // console.log('ke', key)
        options[key] = defaults[key];
    }
    for (key in config) {
        // console.log('ke', key, hasOwn(config, key))
        if (hasOwn(config, key)) {
            var value = config[key];
            if (typeof value !== 'undefined') {
                options[key] = value;
            }
        }
    }
    return options;
}

/**
 * 转为数字类型
 * width: undefined -> undefined
 * width: 非undefined -> 数字 -> 数字
 *                    -> 非数字 -> null
 * parseInt() 函数可解析一个字符串，并返回一个整数。
 * parseInt(string, radix) 进制转换（接收两个参数），parseInt方法还可以接受第二个参数（2到36之间），表示被解析的值的进制，返回该值对应的十进制数。默认情况下，parseInt的第二个参数为10，即默认是十进制转十进制。超出这个范围，则返回NaN
 * 使用 isNaN() 来判断一个值是否是数字。原因是 NaN 与所有值都不相等，包括它自己
 * @param {String} width 
 * @returns width
 */
function parseWidth(width) {
    if (width !== undefined) {
        width = parseInt(width, 10);
        // 如果转十进制后是非数字,则为null
        if (isNaN(width)) {
            width = null;
        }
    }
    return width;
}

/**
 * 数字化最小宽度
 * parseWidth
 * @param {Number} minWidth 
 * @returns Number
 */
function parseMinWidth(minWidth) {
    if (typeof minWidth !== 'undefined') {
        minWidth = parseWidth(minWidth);
        if (isNaN(minWidth)) {
            minWidth = 80;
        }
    }
    return minWidth;
}

/**
 * 前提:fun[n](column){...return column}
 * 调用时:compose(fun1, fun2, fun3)
 * 使用时:compose(...funcs) 则funcs为数组形式
 * funcs.reduce((a, b) => (...args) => a(b(...args))) 分析
 *  第一步: a为fun1, b为fun2, 则fun1(func2(...args))
 *  第二步: a为fun1(func2(...args)), b为fun3, 则fun1(func2(...args))(fun3(...args))
 *  于是乎, 返回一个组成函数, 即fun1,fun2,fun3相互依赖, 执行顺序为fun3,fun2,fun1即从右至左
 * @param  {...any} funcs
 * 
 * reduce使用合集:
 * 参考:https://www.cnblogs.com/amujoe/p/11376940.html
 * array.reduce(function(prev, cur, currentIndex, array), init)
 * 解释:
 * array:表示原数组
 * prev:表示上一次调用回调时的返回值，或者初始值 init
 * cur:表示当前正在处理的数组元素
 * currentIndex:表示当前正在处理的数组元素的索引，若提供 init 值，则索引为0，否则索引为1
 * init:表示初始值
 * 用法三:redux compose源码实现
 * 这里是它的高阶使用: 作为一个高阶函数，用于函数的 compose
 * return funcs.reduce((a, b) => (...args) => a(b(...args)));
 * 返回值是一个函数
 * 
 * 用法一: 也是平常最常使用的
 * [1,2,3,4].reduce((prev,cur)=> prev+cur) 1+2=3,3+3=6,6+4=10
 * 
 * 用法二: 带初值的
 * [1,2,3,4].reduce((prev,cur) => prev+cur, 10) 10+1=11, 11+2=13, 13+3=16, 16+4=20
 * 
 */
function compose() {
    for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
        funcs[_key] = arguments[_key];
    }

    // 长度为0
    if (funcs.length === 0) {
        return function (arg) {
            return arg;
        };
    }

    // 长度为1
    if (funcs.length === 1) {
        return funcs[0];
    }

    // 函数二次嵌套
    // a要的是b的参数 -> 上一个要下一个的参数
    return funcs.reduce(function (a, b) {
        return function () {
            return a(b.apply(undefined, arguments));
        };
    });
}

/**
 * 获取行的唯一标识
 * 如果rowKey是String类型,则以.为分割点,去最后一个
 * @param {*} row 
 * @param {*} rowKey [String, Function]
 * @returns 
 */
var getRowIdentity = function getRowIdentity(row, rowKey) {
    if (!row) throw new Error('row is required when get row identity');

    if (typeof rowKey === 'string') {
        if (rowKey.indexOf('.') < 0) {
            return row[rowKey];
        }

        var key = rowKey.split('.');
        var current = row;
        // 这不就相当于取最后一个吗?为什么要这么写?
        for (var i = 0; i < key.length; i++) {
            current = current[key[i]];
        }
        return current;
    } else if (typeof rowKey === 'function') {
        return rowKey.call(null, row);
    }
};

/***/ }),

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./packages/table/src/utils.js
var utils = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/table/src/config.js


function defaultRenderCell(h, _ref) {
    var row = _ref.row,
        column = _ref.column,
        $index = _ref.$index;


    var property = column.property;

    var value = property && row[property];

    // console.log('defaultRenderCell', row, column, $index, value)

    return value;
}
// CONCATENATED MODULE: ./packages/table/src/table-column.js
/**
 * table-column:table子组件,列
 * 
 * 注意: 该文件不是vue文件,而是js文件
 * 使用jsx语言渲染dom(需要安装相应的插件以支持JSX)
 * 官方文档: https://cn.vuejs.org/v2/guide/render-function.html
 * 该js是table-column组件,那么在使用该组件时,会传递过来两个属性prop和label
 * 这两个属性要如何处理才能往columns中添加该列的属性呢？
 */




var columnIdSeed = 1;

/* harmony default export */ var table_column = ({
    name: 'YTableColumn',

    // prop传值
    props: {
        // 表格数据项字段名
        prop: String,
        property: String,
        // 标题
        label: String,
        // 列宽
        width: {},
        minWidth: {}
    },

    data: function data() {
        return {
            isSubColumn: false,
            columns: []
        };
    },


    // 计算属性,有缓存作用
    computed: {
        // owner汉语意为主人,即父级的table组件
        owner: function owner() {
            var parent = this.$parent;
            while (parent && !parent.tableId) {
                parent = parent.$parent;
            }
            return parent;
        },

        /**
         * 该table-column的父级组件是table还是table-column
         * 如果是table-column,因该是要做单元格合处理的
         */
        columnOrTableParent: function columnOrTableParent() {
            var parent = this.$parent;
            while (parent && !parent.tableId && !parent.columnId) {
                parent = parent.$parent;
            }
            return parent;
        },


        // 宽度
        realWidth: function realWidth() {
            return Object(utils["e" /* parseWidth */])(this.width);
        },


        // 最小宽度
        realMinWidth: function realMinWidth() {
            return Object(utils["d" /* parseMinWidth */])(this.minWidth);
        }
    },

    methods: {
        // reduce 两两比较操作,数组之间的拼接
        getPropsData: function getPropsData() {
            var _this = this;

            for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
                props[_key] = arguments[_key];
            }

            return props.reduce(function (prev, cur) {
                if (Array.isArray(cur)) {
                    cur.forEach(function (key) {
                        prev[key] = _this[key]; // 将数据中的key对应的值赋值
                    });
                }
                return prev;
            }, {});
        },


        // 获取child在children的位置
        getColumnElIndex: function getColumnElIndex(children, child) {
            // console.log('getColumnElIndex', children, child);
            return [].indexOf.call(children, child);
        },


        // 设置列宽
        setColumnWidth: function setColumnWidth(column) {
            if (this.realWidth) {
                column.width = this.realWidth;
            }

            if (this.realMinWidth) {
                column.minWidth = this.realMinWidth;
            }

            if (!column.minWidth) {
                column.minWidth = 80;
            }

            column.realWidth = column.width === undefined ? column.minWidth : column.width;

            return column;
        },


        /**
         * 在table-column中设置列的渲染函数
         * 列的渲染是通过table-header调用的
         * @param {Object} column 
         * @returns column
         */
        setColumnRenders: function setColumnRenders(column) {
            var _this2 = this;

            var h = this.$createElement;

            // console.log('setColumnRenders', column);
            var originRenderCell = column.renderCell;
            // console.log('setColumnRenders', originRenderCell, defaultRenderCell)

            originRenderCell = originRenderCell || defaultRenderCell;

            // 对renderCell进行包装
            column.renderCell = function (h, data) {
                var children = null;
                // console.log('renderCell', h, data, this.$scopeSlots);

                // console.log('renderCell', this.$scopedSlots, this)

                // 如果该列存在默认插槽, 则渲染默认插槽, 这样的话便使得每列的自定义渲染方式整理到table-body的每列上
                // 充分说明, table-body中单元格的渲染需要单独分离出来, 调用每列的渲染函数, 这样便使table-column中每列的自定义同步到table-body下
                // 否则只展示该列对应的数据值
                if (_this2.$scopedSlots.default) {
                    // vm.$scopedSlots 范文作用域插槽, 并传入数据
                    children = _this2.$scopedSlots.default(data);
                } else {
                    children = originRenderCell(h, data);
                }

                var props = {
                    class: 'cell',
                    style: {}
                };

                return h(
                    'div',
                    props,
                    [children]
                );
            };

            return column;
        }
    },

    /**
     * 此时,this.data和this.$el都还没有值,为undefined, 也可以进行一些初始化
     * 在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。
     * beforeCreate里定义的变量不会出现在this.$data里, 相当于新建了变量
     */
    beforeCreate: function beforeCreate() {
        // console.log('beforeCreate', this.$data);
        // debugger;
        this.column = {};
        this.columnId = '';
    },


    /**
     * 在模板被渲染成html之前被调用, 即通常初始化某些属性值, 然后再渲染成视图
     * this.$el -> undefined
     * this.$data -> data的初始化值, 属性和方法的运算一级watch/event事件回调的配置均已完成
     * 此时,虚拟dom节点已生成,但是还没有渲染成真是的dom节点
     * 在执行data()方法前props属性有数据已经可以访问，watch和computed监听函数此时为null，此时this.computed里的计算属性值为undefined。data函数执行完后，watch和computed监听函数才可用，因为data函数执行完后，data函数return的属性这时才可用。然而，挂载阶段还没开始，$el 属性目前不可见。
     * 
     * 注意: 如果table下有两个table-column,则第一个table-column时,columnIdSeed值为1,
     * 但是到第二个table-column时,columnIdSeed值为2,这是为什么呢?
     * 测试了下,发现无论第几个table-column,在export default外打印值都为1且只在第一次打印了
     * 也就类似缓存下来了,export default外面定义的变量会被缓存下来,无论定义了几遍table(里面包含table-column)
     * 保证每个table-column都会有一个唯一的columnId
     * 
     * beforeCreate 
     * created:
     *  - props、data里面的变量也可以访问(均已完成初始化)
     *  - computed中的变量, 如果依赖于data里面的变量, 则为undefined; 否则可以访问
     * mounted 初始化事件操作
     * 
     * 生命周期的调试:debugger
     * 例如:
     * beforeCreate() {debugger;}
     * 参考:https://blog.csdn.net/weixin_30616969/article/details/94973817
     */
    created: function created() {
        // debugger;
        // console.log('cre', this)
        // 定义table-column组件的columnId
        var parent = this.columnOrTableParent;
        // 是否是子列, 如果两者不相等,则是子列(直接父组件也是table-column)
        this.isSubColumn = this.owner !== parent;
        this.columnId = (parent.tableId || parent.columnId) + '_column_' + columnIdSeed++;
        // console.log('create', this.columnId);

        // 定义默认属性,暂时只有id
        var defaults = {
            id: this.columnId,
            // 对应列内容的字段名, 也可以使用 property 属性
            property: this.prop || this.property

            // 基础属性
            // const basicProps = ['label', 'prop',];
        };var basicProps = ['label'];

        // 收集column属性
        var column = this.getPropsData(basicProps);
        column = Object(utils["c" /* mergeOptions */])(defaults, column);
        // console.log('ccc', column);

        // 注意compose(组成,构成)执行顺序是从右到左,现在chains就相当于一个函数
        // const chains = compose(this.setColumnRenders, this.setColumnWidth, this.setColumnForcedProps);
        var chains = Object(utils["a" /* compose */])(this.setColumnRenders, this.setColumnWidth);
        column = chains(column);
        // console.log('chains', chains, column, chains(column));

        // console.log('chanins', column, column.renderCell())

        this.columnConfig = column;
    },


    /**
     * 在模板被渲染成html之后被调用,即通常初始化页面完成后,再对html的dom节点进行一些需要的操作
     * this.$el -> undefined
     * this.$data -> data的初始化值
     * el被新创建的vm.$el替换, 并挂载到实例上去之后调用该钩子
     * 此时,虚拟dom节点已生成,且已经渲染成真实的dom节点
     * 可对dom进行初始化相关的操作
     * 但是不承诺所有的子组件也都一起被挂载。如果希望等到整个视图都渲染完毕, 可以使用$nextTick
     */
    mounted: function mounted() {
        // debugger;
        // console.log('table-column传递的属性', this.prop, this.label);
        var owner = this.owner;
        var parent = this.columnOrTableParent;

        // vm.$children 当前实例的直接子组件(虚拟节点)
        // vm.$el.children 当前dom节点的直接子节点(真实dom节点)
        // 如果直父组件是table-column
        var children = this.isSubColumn ? parent.$el.children : parent.$refs.hiddenColumns.children;

        var columnIndex = this.getColumnElIndex(children, this.$el);
        // 甚为关键,将该列的属性存入到table的公共池中
        // 父组件table的store
        // console.log('父组件table的store', owner, owner.store);
        // console.log('columnConfig', this.columnConfig);
        owner.store.commit('insertColumn', this.columnConfig, columnIndex, this.isSubColumn ? parent.columnConfig : null);
        // console.log('888888888888', owner, parent, children, columnIndex);
        // console.log('777777777', children, parent.$refs.hiddenColumns.children)

        // console.log('777777777', this.$slots)
    },


    // render渲染
    render: function render(h) {
        console.log('table-column', h, this.$slots);
        // 默认插槽,替子元素占位
        // slots 也要渲染，需要计算合并表头
        // 结构比较简单, 就不用jsx了
        // 默认插槽如何渲染到table-body?
        return h('div', this.$slots.default);
    }
});
// CONCATENATED MODULE: ./packages/table-column/index.js


table_column.install = function (Vue) {
    Vue.component(table_column.name, table_column);
};

/* harmony default export */ var packages_table_column = __webpack_exports__["default"] = (table_column);

/***/ })

/******/ });