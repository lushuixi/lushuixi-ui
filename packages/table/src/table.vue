<template>
    <!-- table组件是如何渲染子组件tabel-column的呢? 
        <y-table :data="data">
            <y-table-column prop="name" lable="姓名"></y-table-column>
            <y-table-column prop="position" label="职位"></y-table-column>
        </y-table>
        y-table-column职责: 收集列的属性,并将其提交到公共数据池中的columns
        y-table通过prop得到的data: 提交到公共数据池中的data
        接下来, 如何展示呢? -- 表格布局

        样式----------------------
        如何保证th和td同宽? -- 通过table下的colgroup的col宽度的设置, 这样便不用重复设置每个单元格的宽度
        给table-column添加width属性
    -->
    <div class="y-table"
        :class="[{
            'y-table__border': border
        }]">
        <!-- 原生-子节点-列的渲染 -->
        <div class="hidden-columns" ref="hiddenColumns">
            <slot></slot>
        </div>
        <!-- 表头 -->
        <div v-if="showHeader"
            class="y-table__header-wrapper"
            ref="headerWrapper">
            <table-header
                ref="tableHeader"
                :store="store"
                :style="{
                    width: bodyWidth
                }"></table-header>
        </div>
        <!-- 表体 -->
        <div
            class="y-table__body-wrapper"
            ref="bodyWrapper">
            <table-body
                :store="store"
                :style="{
                    width: bodyWidth
                }"></table-body>
        </div>
        <!-- 表格数据为空 -->
        <div
            v-if="!data || data.length === 0"
            class="y-table__empty-block"
            ref="emptyBolck">
            <span class="y-table__empty-text">
                <!-- 自定义表格为空时的数据展示 -->
                <slot name="empty">{{emptyText}}</slot>
            </span>
        </div>
        <!-- 表尾 -->
    </div>
</template>

<script>
/**
 * debounce去抖动
 * 参考:https://www.cnblogs.com/songyz/p/10310491.html
 */
import {
    debounce, 
    throttle
} from 'throttle-debounce';
import TableLayout from './table-layout';
import TableHeader from './table-header';
import TableBody from './table-body';
import {
    createStore, 
    mapStates
} from './store/helper';
import {
    addResizeListener,
    removeEventListener
} from '../../../src/utils/resize-event';

let tableIdSeed = 1;
export default {

    name: 'YTable',

    components: {
        TableHeader,
        TableBody,
    },

    props: {

        // data需为数组类型Array, 且默认值为空数组[]
        data: {
            // 指定data的数组类型, 如果传入的data不是数组类型, 则vue会报错
            type: Array,
            // 对象或数组默认值必须从一个工厂函数获取
            default: function () {
                return [];
            },
        },

        // border需为布尔类型Boolean
        border: Boolean,

        // 是否显示表头, 布尔类型, 默认为true
        showHeader: {
            type: Boolean,
            default: true
        },

        // 行数据的key,用来优化table的渲染
        rowKey: [String, Function],

        // 列的宽度是否自动撑开
        fit: {
            type: Boolean,
            default: true
        },

        /**
         * 表格数据为空时的文字
         * 空数据时显示的文本内容，也可以通过 slot="empty" 设置
         */
        emptyText: {
            type: String,
            default: '暂无数据',
        },

    },

    computed: {
        bodyWidth() {
            const {bodyWidth} = this.layout;
            // console.log('55', bodyWidth + 'px')
            
            return bodyWidth + 'px';
        },

        bodyWrapper() {
            return this.$refs.bodyWrapper;
        },
        
        /**
         * 对象展开运算符
         * 参考:https://vuex.vuejs.org/zh/guide/state.html#mapstate-%E8%BE%85%E5%8A%A9%E5%87%BD%E6%95%B0
         * 需要安装插件:babel-plugin-transform-object-rest-spread
         * 配置.bablrc文件:{"plugins": ["transform-object-rest-spread"]}
         */
        ...mapStates({
            columns: 'columns',
            tableData: 'data',
        })
    },

    data() {
        this.store = createStore(this, {
            rowKey: this.rowKey,
        });
        // TableLayout 设置表格的相关属性
        const layout = new TableLayout({
            store: this.store,
            table: this,
            showHeader: this.showHeader,
        });
        return {
            layout,
            resizeState: {
                width: null,
                height: null,
            }
        }
    },

    methods: {
        /**
         * throttle 节流
         */
        syncPostion: throttle(20, function() {
            const {scrollLeft, scrollTop, offsetWidth, scrollWidth} = this.bodyWrapper;
            // console.log('syncPosition', scrollLeft, scrollTop, offsetWidth, scrollWidth)
        }),

        // 监听窗口尺寸变化的响应的事件
        resizeListener() {
            if(!this.$ready) return;

            // 页面窗口尺寸变化,是否需要更新布局
            let shouldUpdateLayout = false;

            const el = this.$el;

            const {width: oldWidth, height: oldHeight} = this.resizeState;
            // console.log('old', oldWidth, oldHeight, el.offsetWidth);

            const width = el.offsetWidth;
            if(oldWidth !== width) {
                shouldUpdateLayout = true;
            }

            // console.log('shouldUpdateLayout', shouldUpdateLayout)

            if(shouldUpdateLayout) {
                this.resizeState.width = width;
                // this.resizeState.height = height;

                this.doLayout();
            }
        },

        // 绑定事件
        bindEvents() {
            // console.log('999', this.bodyWrapper);
            // 监听滚动
            this.bodyWrapper.addEventListener('scroll', 
                this.syncPostion,
                {passive: true},
            );

            // 如果列是自动撑开,则添加窗口尺寸的监听事件
            if(this.fit) {
                addResizeListener(this.$el, this.resizeListener);
            }
        },

        // 取消绑定
        unbindEvents() {
            if(this.fit) {
                removeEventListener(this.$el, this.resizeListener)
            }
        },

        doLayout() {
            this.layout.updateColumnsWidth();
        }
    },

    /**
     * 官方文档:https://cn.vuejs.org/v2/api/?#watch
     * 三种使用形式
     * - 普通(第一次data赋值不会被调用): data(value) {...}
     * - immediate和handler(第一次data赋值后便会被调用): data: {immediate: true, handler(value){...}}
     * - deep对象内部的属性监听(也叫深度监听): data: {deep: true, handler(value, oldValue){...}}
     */
    watch: {
        // 监听data
        data: {
            // 立即监听
            immediate: true,
            handler(value) {
                // 提交data到公共数据池
                this.store.commit('setData', value);
            }
        }
    },

    /**
     * 子组件: table-header和table-body
     * $children: [] 空数组
     */
    created() {
        // debugger;
        this.tableId = 'y-table_' + tableIdSeed++;

        // this.debouncedUpdateLayout = debounce(50, () => this.doLayout());
    },

    beforeMount() {
        // debugger;
    },

    /**
     * $children: [table-column组件, table-header组件, table-body组件]
     */
    mounted() {
        // debugger;
        // console.log('6666', this);
        // 在这里试是不行的
        // let res = mapStates.call(this, {
        //     columns: 'columns',
        //     tableData: 'data',
        // })
        console.log('88888888', this);

        // 绑定监听页面尺寸变化事件
        this.bindEvents();

        // 更新列
        this.store.updateColumns();

        // 
        this.doLayout();

        this.resizeState = {
            width: this.$el.offsetWidth,
            height: this.$el.offsetHeight,
        }

        // 监听窗口尺寸的变化,更新col的宽度

        this.$ready = true;
    },

    destroyed() {
        this.unbindEvents();
    },

}
</script>

<style>
    .y-table {
        box-sizing: border-box;
        position: relative;
        width: 100%;
        padding: 0;
        margin: 0;
        color: #606266;
        font-size: 14px;
    }
    .y-table::before {
        content: '';
        width: 100%;
        position: absolute;
        bottom: 0;
        height: 1px;
        background-color: #ebeef5;
    }
    .y-table .hidden-columns {
        position: absolute;
        visibility: hidden;
        z-index: -1;
    }
    .y-table .y-table__header,
    .y-table .y-table__body {
        width: 100%;
    }
    .y-table td,
    .y-table th {
        box-sizing: border-box;
        border-bottom: 1px solid #ebeef5;
        text-align: left;
        padding: 12px 0;
        vertical-align: middle;
        text-overflow: ellipsis;
    }
    .y-table th {
        letter-spacing: 1px;
    }
    .y-table__body td {
        transition: background-color .25s ease;
    }
    .y-table__body tr:hover td {
        background-color: #f5f7fa;
    }
    .y-table .cell {
        box-sizing: border-box;
        width: 100%;
        padding-left: 10px;
        padding-right: 10px;
        line-height: 23px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        word-break: break-all;
    }
    /* 表格数据为空 */
    .y-table__empty-block {
        width: 100%;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .y-table__empty-text {
        color: #909399;
        display: block;
        line-height: 60px;
        width: 50%;
    }
</style>
