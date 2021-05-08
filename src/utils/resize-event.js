import ResizeObserver from 'resize-observer-polyfill';

const isServer = typeof window === 'undefined';

/**
 * 监听器调用方法以响应监听事件变化
 * @param {Array} entries 
 */
const resizeHandler = function(entries) {
    // console.log('resizeHandler', entries);

    for(let entry of entries) {
        // console.log(entry);

        const listeners = entry.target.__resizeListeners__ || [];
        
        if(listeners.length) {
            listeners.forEach(fn => {
                fn();
            });
        }
    }
};

/**
 * 添加监听事件
 * @param {Object} element 
 * @param {Function} fn 
 */
export const addResizeListener = function(element, fn) {
    // console.log('设置监听事件', element, fn, isServer);

    // console.log('8', !element.__resizeListeners__);

    if(!element.__resizeListeners__) {
        element.__resizeListeners__ = [];
        
        element.__ro__ = new ResizeObserver(resizeHandler);
        
        element.__ro__.observe(element);
    }

    element.__resizeListeners__.push(fn);

    // console.log('e', element.__resizeListeners__);
}