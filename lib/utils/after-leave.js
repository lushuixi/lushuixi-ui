/**
 * Bind after-leave event for vue instance. 
 * Make sure after-leave is called in any browsers.
 * 
 * @param {Vue} instance 必传 Vue instance
 * @param {Function} callback 必传 callback of after-leave event
 * @param {Number} speed 非必传 the speed of transition, default value is 300ms
 * @param {Boolean} once 非必传 weather bind after-leave once. default value is false.
 */
export default function (instance, callback) {
    var speed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 300;
    var once = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    // 如果instance和callback不存在,抛出异常 hrow new Error()
    if (!instance || !callback) throw new Error('instance & callback is required');

    var called = false;

    var afterLeaveCallback = function afterLeaveCallback() {
        if (called) return;
        called = true;
        if (callback && typeof callback === 'function') {
            // 执行callback, 更改this指向
            callback.apply(null, arguments);
        }
    };

    // 意欲何为?
    if (once) {
        // vm.$once(event, callback): 监听一个自定义事件，但是只触发一次。一旦触发之后，监听器就会被移除。
        instance.$once('after-leave', afterLeaveCallback);
    } else {
        // vm.$on(event, callback): 监听当前vue实例上自定义的事件,
        // 事件可以由 vm.$emit 触发。回调函数会接收所有传入事件触发函数的额外参数。
        instance.$on('after-leave', afterLeaveCallback);
    }

    setTimeout(function () {
        afterLeaveCallback();
    }, speed + 100);
}