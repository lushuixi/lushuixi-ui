import Store from './index';

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