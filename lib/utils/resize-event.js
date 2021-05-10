import ResizeObserver from 'resize-observer-polyfill';

var isServer = typeof window === 'undefined';

/**
 * 监听器调用方法以响应监听事件变化
 * @param {Array} entries 
 */
var resizeHandler = function resizeHandler(entries) {
    // console.log('resizeHandler', entries);

    for (var _iterator = entries, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var entry = _ref;

        // console.log(entry);

        var listeners = entry.target.__resizeListeners__ || [];

        if (listeners.length) {
            listeners.forEach(function (fn) {
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
export var addResizeListener = function addResizeListener(element, fn) {
    // console.log('设置监听事件', element, fn, isServer);

    // console.log('8', !element.__resizeListeners__);

    if (!element.__resizeListeners__) {
        element.__resizeListeners__ = [];

        element.__ro__ = new ResizeObserver(resizeHandler);

        element.__ro__.observe(element);
    }

    element.__resizeListeners__.push(fn);

    // console.log('e', element.__resizeListeners__);
};

/**
 * 移出指定的监听事件
 * @param {Object} element 
 * @param {Function} fn 
 * @returns 
 */
export var removeEventListener = function removeEventListener(element, fn) {

    if (!element || !element.__resizeListeners__) return;

    // 删除
    element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);

    if (!element.__resizeListeners__.length) {
        element.__ro__.disconnect();
    }
};