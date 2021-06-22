/**
 * Bind after-leave event for vue instance. 
 * Make sure after-leave is called in any browsers.
 * 
 * @param {Vue} instance 必传 Vue instance
 * @param {Function} callback 必传 callback of after-leave event
 * @param {Number} speed 非必传 the speed of transition, default value is 300ms
 * @param {Boolean} once 非必传 weather bind after-leave once. default value is false.
 */
export default function(instance, callback, speed = 300, once = false) {
    // 如果instance和callback不存在,抛出异常 hrow new Error()
    if(!instance || !callback) throw new Error('instance & callback is required');

    let called = false;
    
    const afterLeaveCallback = function() {
        if(called) return;
        called = true;
        if(callback && typeof callback === 'function') {
            // 执行callback, 更改this指向
            callback.apply(null, arguments);
        }
    };

    // 意欲何为?(根据调用类型区分)
    // 设置监听after-leave事件
    if(once) {
        console.log('执行once为 true,设置监听事件');
        // 指令方式调用v-loading时
        // vm.$once(event, callback): 监听一个自定义事件，但是只触发一次。一旦触发之后，监听器就会被移除。
        instance.$once('after-leave', afterLeaveCallback);
    } else {
        console.log('执行once为 false,设置监听事件');
        // 服务方式调用loading时,监听after-leave事件
        // vm.$on(event, callback): 监听当前vue实例上自定义的事件,
        // 事件可以由 vm.$emit 触发。回调函数会接收所有传入事件触发函数的额外参数。
        instance.$on('after-leave', afterLeaveCallback);
    }

    // 定时器以防止前面没有触发关闭loading
    // 该定时器功能:为了在设置el.instance.hiding=true之后执行
    setTimeout(() => {
        afterLeaveCallback();
    }, speed + 100);
} 