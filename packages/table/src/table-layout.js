import Vue from 'vue';

import {
    parseHeight,
} from './utils';

/**
 * TableLayout 定义表格的整体相关属性和方法
 * 用于table.vue整体控制table
 */

class TableLayout {
    // 构造器
    constructor(options) {
        console.log('tableLayout', options);
        this.table = null;
        this.store = null;
        this.showHeader = true;

        this.fit = true; // 何意?

        this.bodyWidth = null;

        this.observers = [];

        this.height = null;
        this.tableHeight = null;
        this.headerHeight = null;
        this.bodyHeight = null; // table height - table-header height

        this.scrollX = false;
        this.scrollY = false;

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
     * Vue.$refs 数组
     * 可以解构
     * 
     * js获取dom节点的高度
     * 参考:https://blog.csdn.net/qq_35430000/article/details/80277587
     * clientHeight:包括padding,但不包括border、水平滚动条、margin的元素的高度(对于inline的元素该属性一直是0,单位px)
     * offsetHeight:包括padding、border、水平滚动条,但不包括margin的元素的高度(对于inline的元素该属性一直是0,单位px)
     * scrollHeight:子元素比父元素稿,父元素不想被子元素撑的一样高就显示出了滚动条,在滚动的过程中本元素有部分被隐藏.scrollHeight>=clientHeight恒成立
     *  - 表示当前不可见部分的元素的高度, 而可见部分的高度是clientHeight
     *  - 有滚动条时讨论scrollHeight才有意义,在没有滚动条时scrollHeight==clientHeight恒成立,单位px
     * scrollTop:有滚动条时,滚动条向下滚动的距离也就是顶部被遮住部分的高度。在没有滚动条时scrollTop==0恒成立
     * offsetTop:当前元素顶部距离最近父元素顶部的距离,和没有滚动条没有关系
     */
    updateElsHeight() {
        // 如果table还没有渲染出真实dom节点, 则等其渲染完再调用
        if(!this.table.$ready) return Vue.nextTick(() => this.updateElsHeight());
        // console.log('更新高度', this.table.$ready);

        const {headerWrapper} = this.table.$refs;

        // console.log('更新高度', this);
        if(this.showHeader && !headerWrapper) return;

        // 获取header高度
        // 但是此时,table-header可能还没有完全渲染出来,所以此时头部高度是0
        // 所以使用Vue.nextTick等更新后再执行该方法
        const headerHeight = this.headerHeight = headerWrapper.offsetHeight;
        if (this.showHeader && headerWrapper.offsetWidth > 0 && (this.table.columns || []).length > 0 && headerHeight < 2) {
            return Vue.nextTick(() => this.updateElsHeight());
        }

        // 整体表格高度
        // 并计算出表体的高度
        const tableHeight = this.tableHeight = this.table.$el.clientHeight;
        if(this.height !== null) {
            this.bodyHeight = tableHeight - headerHeight;
            // console.log('高度', tableHeight, headerHeight, this.bodyHeight)
        }

        // console.log('高度', this.height, this.bodyHeight)

        // 纵向滚动更新
        this.updateScrollY();

        // 通知观察器-滚动
        this.notifyObservers('scrollable');

    }

    /**
     * 更新this.scrollY:是否需要滚动
     * @returns 
     */
    updateScrollY() {
        const height = this.height;
        
        // 如果高度为null,则无需设置滚动
        if(height === null) return false;

        const bodyWrapper = this.table.bodyWrapper;
        if(this.table.$el && bodyWrapper) {
            const body = bodyWrapper.querySelector('.y-table__body');
            const prevScrollY = this.scrollY;
            // 是否滚动
            const scrollY = body.offsetHeight > this.bodyHeight;
            this.scrollY = scrollY;
            return prevScrollY !== scrollY;
        }

        return false;
    }

    /**
     * 设置表格高度
     * 设置了表格的固定高度,则如果表体的高度过高,则出现表体滚动条,从而使表头固定
     * @param {Number/String} height 
     */
    setHeight(value, prop = 'height') {
        // console.log('setHeight', height, parseHeight(height));
        if(Vue.prototype.$isServer) return;

        const el = this.table.$el;

        value = parseHeight(value);
        // 不管prop是height还是max-height, 都设置给this.height
        this.height = value;

        // console.log('el', el, this.table.$ready);

        // 获取table真实的dom节点
        // 此时,table节点可能还没有渲染出真实的dom节点
        // 怎么赋值呢? -- Vue.nextTick 在下次 DOM 更新循环结束之后执行延迟回调
        if(!el && (value || value === 0)) return Vue.nextTick(() => this.setHeight(value, prop));

        if(typeof value === 'number') {
            el.style[prop] = value + 'px';
        } else if (typeof value === 'string') {
            el.style[prop] = value;
        }

        // 更新高度
        this.updateElsHeight();
    }

    /**
     * 设置表格最大高度
     * @param {Number/String} value 
     */
    setMaxHeight(value) {
        this.setHeight(value, 'max-height');
    }

    /**
     * Vue.prototype.$isServer 是什么意思?
     * Vue实例是否运行与服务器上, 属性值为true标识实例运行于服务器, 每个Vue实例都可以通过该属性判断。该属性一般用于服务器渲染, 用以区分代码是否在服务器上运行。
     * 
     * 动态计算宽度(没有分配width的列)
     * 如果这样的列只有一个, 则把剩余的宽度都分给它
     * 如果这样的列有多个, 则按照最小宽度的比例分配剩余的宽度(而非平均分配)
     * 
     * 更新columns的realWidth值
     * 更新之后, 表头和表尾dom都需要相应的发生变化
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
            // console.log('999', bodyMinWidth <= bodyWidth - scrollYWidth)
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
                    // console.log('3333', flexWidthPerPixel, allColumnsWidth, totalFlexWidth);

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

        this.notifyObservers('columns');
    }

    /**
     * 没有设置观察器:
     * table.vue 设置页面窗口尺寸变化的监听器
     * 如果页面窗口宽度发生变化, 便会触发table-layout.updateColumnsWidth方法,以更新列的realWidth即states.columns发生变化
     * 但是这个变化可能不会触及table-header和table-body的col的变化(只有table-body下的col变化了,table-header并没有变化)
     * 不知道是为什么? 什么变化会触发dom的更新?
     * 
     * 设置观察器, 便可以保证通知到dom更新
     * table-header和table-body分别使用layout-observer进行混入, 分别创建一个观察器, 插入到观察器数组
     * 如果页面窗口宽度发生变化, 便会触发table-layout.updateColumnsWidth方法,以更新列的realWidth即states.columns发生变化
     * 从而触发观察器以通知dom更新(onColumnsChange更新col的width值)
     * 
     * @param {VNode} observer 
     */

    /**
     * 添加观察器
     * @param {VNode} observer 
     */
    addObserver(observer) {
        // console.log('添加观察器', observer);

        this.observers.push(observer);
    }
    
    /**
     * 移出观察器
     * @param {VNode} observe 
     */
    removeObserver(observe) {
        // console.log('移出观察器', observe, this.observers);
        const index = this.observers.indexOf(observe);
        if(index !== -1) {
            this.observers.splice(index, 1);
        }
    }

    /**
     * 通知观察器处理
     * @param {String} event 
     */
    notifyObservers(event) {
        const observers = this.observers;
        // console.log('notifyObservers', event, this.observers);
        
        observers.forEach((observe) => {
            switch(event) {
                case 'columns': // 更新列的dom
                    observe.onColumnsChange(this);
                    break;
                case 'scrollable':
                    // console.log('观察器', observe);
                    observe.onScrollableChange(this);
                    break;
                default: 
                    throw new Error(`Table Layout don't have event ${event}`);
            }
        });
    }
}

export default TableLayout; 