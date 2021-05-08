import Vue from 'vue';

// TableLayout 设置表格的相关属性和方法

class TableLayout {
    // 构造器
    constructor(options) {
        console.log('tableLayout', options);
        this.table = null;
        this.store = null;
        this.showHeader = true;

        this.fit = true; // 何意?

        this.bodyWidth = null;

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

    /**
     * Vue.prototype.$isServer 是什么意思?
     * Vue实例是否运行与服务器上, 属性值为true标识实例运行于服务器, 每个Vue实例都可以通过该属性判断。该属性一般用于服务器渲染, 用以区分代码是否在服务器上运行。
     * 
     * 动态计算宽度(没有分配width的列)
     * 如果这样的列只有一个, 则把剩余的宽度都分给它
     * 如果这样的列有多个, 则按照最小宽度的比例分配剩余的宽度(而非平均分配)
     * 
     * 设置columns值
     */
    updateColumnsWidth() {

        // console.log('updateColumnsWidth', this.table.columns, Vue.prototype.$isServer);
        // console.log('updateColumnsWidth', this.table.$el);

        // 如果在服务器上运行,则返回
        if(Vue.prototype.$isServer) return;

        const fit = this.fit;
        
        const bodyWidth = this.table.$el.clientWidth;
        let bodyMinWidth = 0;

        const flattenColumns = this.table.columns;
        // filter不改变原数组,且返回数组的指针指向原数组相对应的数组项的地址
        // 所以改变返回的数组值, 原数组值也会发生相应的改变
        let flexColumns = flattenColumns.filter((column) => typeof column.width !== 'number');

        // 如果width存在且realWidth也存在, 则设置realWdith为null
        flattenColumns.forEach((column) => {
            if(typeof column.width === 'number' && column.realWidth) column.realWidth = null;
        })

        if(flexColumns.length > 0 && fit) {
            flattenColumns.forEach((column) => {
                bodyMinWidth += column.width || column.minWidth || 80;
            })

            const scrollYWidth = 0;

            // 如果没有滚动条
            // 通过bodyMinWidth来判断
            console.log('999', bodyMinWidth <= bodyWidth - scrollYWidth)
            if(bodyMinWidth <= bodyWidth - scrollYWidth) {

                // 没有分配宽度的列的总宽
                const totalFlexWidth = bodyWidth - scrollYWidth - bodyMinWidth;

                if(flexColumns.length === 1) {
                    flexColumns[0].realWidth = (flexColumns[0].minWidth || 80) + totalFlexWidth;
                }else {
                    // 计算所有没有宽度的列的最小宽度之和
                    const allColumnsWidth = flexColumns.reduce((prev, column) => prev + (column.minWidth || 80), 0);
                    // console.log('allColumnsWidth', flexColumns, allColumnsWidth)
                    
                    // 计算倍数
                    const flexWidthPerPixel = totalFlexWidth / allColumnsWidth;
                    console.log('3333', flexWidthPerPixel, allColumnsWidth, totalFlexWidth);

                    // 非第一个列的宽度
                    let noneFirstWidth = 0;

                    flexColumns.forEach((column, index) => {
                        if(index === 0) return;
                        // console.log('7', column, index)

                        // 取不大于该值的整数,这样会把多余的宽度都分配到第一列上
                        const flexWidth = Math.floor((column.minWidth || 80) * flexWidthPerPixel);
                        // console.log('7', flexWidth, flexWidthPerPixel)
                    
                        noneFirstWidth += flexWidth;
                        // console.log('7', noneFirstWidth)
                        
                        column.realWidth = (column.minWidth || 80) + flexWidth;
                    })

                    // 计算第一个的realWidth
                    flexColumns[0].realWidth = (flexColumns[0].minWidth || 80) + totalFlexWidth - noneFirstWidth;
                }

            }

            this.bodyWidth = Math.max(bodyMinWidth, bodyWidth);
            this.table.resizeState.width = this.bodyWidth;

            // console.log('999', this.table.columns)
            // console.log('999', bodyWidth, scrollYWidth, bodyMinWidth, bodyWidth - scrollYWidth - bodyMinWidth)
        } else {
            // 有水平滚动条
        }
        // console.log('888', flattenColumns, flexColumns)

    }
}

export default TableLayout;