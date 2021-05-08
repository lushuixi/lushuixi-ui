import Store from './index';

/**
 * 创建公共池并设置公共池中的数据初始化
 * @param {Object} table 
 * @param {Object} initialState 
 * @returns 
 */
export function createStore(table, initialState = {}) {
    // 如果不存在,则抛错
    if(!table) {
        throw new Error('Table is required.');
    }

    const store = new Store();
    store.table = table;

    Object.keys(initialState).forEach(key => {
        let value = initialState[key];
        if(typeof value !== 'undefined') {
            store.states[key] = initialState[key];
        }
    })

    return store;
}

/**
 * 实现同时定义多个computed属性
 * 但是只能在computed中执行 ...mapStates({columns: 'columns'})
 * 换到mounted()中便不可以了
 * @param {Object} mapper 
 * @returns Object
 */
export function mapStates(mapper) {
    const res = {};
    // console.log('mapStates', mapper, res);
    Object.keys(mapper).forEach(key => {
        const value = mapper[key];
        let fn;
        if(typeof value === 'string') {
            fn = function() {
                return this.store.states[value];
            }
        }else if(typeof value === 'function') {
            fn = function() {
                return value.call(this, this.store.states);
            }
        }else {
            console.error('invalid value type');
        }

        if(fn) {
            res[key] = fn;
        }
    })

    // console.log('r', res);
    return res;

}