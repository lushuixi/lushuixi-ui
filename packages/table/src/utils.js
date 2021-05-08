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
export function mergeOptions(defaults, config) {
    console.log('mergeOptions', defaults, config);
    // 定义新值保存处理结果(因为更改对象参数会更改原值,对象传参是按地址传的)
    let options = {};
    let key;
    for(key in defaults) {
        // console.log('ke', key)
        options[key] = defaults[key];
    }
    for(key in config) {
        // console.log('ke', key, hasOwn(config, key))
        if(hasOwn(config, key)) {
            let value = config[key];
            if(typeof value !== 'undefined') {
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
export function parseWidth(width) {
    if(width !== undefined) {
        width = parseInt(width, 10);
        // 如果转十进制后是非数字,则为null
        if(isNaN(width)) {
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
export function parseMinWidth(minWidth) {
    if(typeof minWidth !== 'undefined') {
        minWidth = parseWidth(minWidth);
        if(isNaN(minWidth)) {
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
export function compose(...funcs) {
    // 长度为0
    if(funcs.length === 0) {
        return arg => arg;
    }

    // 长度为1
    if(funcs.length === 1) {
        return funcs[0];
    }

    // 函数二次嵌套
    // a要的是b的参数 -> 上一个要下一个的参数
    return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

/**
 * 获取行的唯一标识
 * 如果rowKey是String类型,则以.为分割点,去最后一个
 * @param {*} row 
 * @param {*} rowKey [String, Function]
 * @returns 
 */
export const getRowIdentity = (row, rowKey) => {
    if(!row) throw new Error('row is required when get row identity');
    
    if(typeof rowKey === 'string') {
        if(rowKey.indexOf('.') < 0) {
            return row[rowKey];
        }

        let key = rowKey.split('.');
        let current = row;
        // 这不就相当于取最后一个吗?为什么要这么写?
        for(let i = 0; i < key.length; i++) {
            current = current[key[i]];
        }
        return current;
    }else if(typeof rowKey === 'function') {
        return rowKey.call(null, row);
    }
}