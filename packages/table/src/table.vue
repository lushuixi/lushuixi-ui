<template>
    <!-- table组件是如何渲染子组件tabel-column的呢? -->
    <div class="y-table"
        :class="[{
            'y-table__border': border
        }]">
        <!-- 原生-子节点-列的渲染 -->
        <div class="hidden-columns" ref="hiddenColumns">
            <slot></slot>
        </div>
        <!-- <div v-if="showHeader"
            class="y-table__header-wrapper"
            ref="headerWrapper">
            <table-header></table-header>
        </div> -->
    </div>
</template>

<script>
import TableLayout from './table-layout';
import TableHeader from './table-header';
import {createStore} from './store/helper';

let tableIdSeed = 1;
export default {

    name: 'YTable',

    components: {
        TableHeader,
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
        }
    },

    created() {
        this.tableId = 'y-table_' + tableIdSeed++;
    },

    mounted() {
        // console.log('data', this)
        console.log('6666', this)
    }

}
</script>

<style>
    .y-table {
        position: relative;
    }
    .y-table .hidden-columns {
        position: absolute;
        visibility: hidden;
        z-index: -1;
    }
</style>
