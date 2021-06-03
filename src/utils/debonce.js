/**
 * 防抖
 * @param {Function} fn 
 * @param {Number} delay 
 * @returns 
 */
const debonce = function(fn, delay) {
    let timer = null;
    return function() {
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
            if(typeof fn === 'function') {
                fn();
            }
        }, delay);
    }
}

export default debonce;