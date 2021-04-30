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