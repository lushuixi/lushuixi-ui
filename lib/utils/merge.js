/**
 * 合并多个对象到第一个参数
 * arguments:函数传入的参数集
 * @param {*} target 第一个参数
 * @returns 
 */
export default function (target) {
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
}