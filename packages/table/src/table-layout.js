// import Vue from 'vue';
// TableLayout 设置表格的相关属性和方法

class TableLayout {
    // 构造器
    constructor(options) {
        console.log('tableLayout', options);
        this.table = null;
        this.store = null;
        this.showHeader = true;

        // 赋值
        for(let name in options) {
            if(options.hasOwnProperty(name)) {
                this[name] = options[name];
            }
        }

        if(!this.table) {
            throw new Error('table is required for Table Layout');
        }

        if(!this.store) {
            throw new Error('store is required for Table Layout');
        }
    }

    /**
     * 公共的表格处理方法
     * 如: setHeight设置高度等等
     */
}

export default TableLayout;