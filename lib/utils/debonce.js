/**
 * 防抖
 * @param {Function} fn 
 * @param {Number} delay 
 * @returns 
 */
var debonce = function debonce(fn, delay) {
    var timer = null;
    return function () {
        if (timer) clearTimeout(timer);
        timer = setTimeout(function () {
            if (typeof fn === 'function') {
                fn();
            }
        }, delay);
    };
};

export default debonce;