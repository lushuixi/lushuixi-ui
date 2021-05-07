<template>
    <!-- table组件是如何渲染子组件tabel-column的呢? 
        <y-table :data="data">
            <y-table-column prop="name" lable="姓名"></y-table-column>
            <y-table-column prop="position" label="职位"></y-table-column>
        </y-table>
        y-table-column职责: 收集列的属性,并将其提交到公共数据池中的columns
        y-table通过prop得到的data: 提交到公共数据池中的data
        接下来, 如何展示呢? -- 表格布局
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
                :store="store">
            </table-header>
        </div>
        <!-- 表体 -->
        <div
            class="y-table__body-wrapper"
            ref="bodyWrapper">
            <table-body
                :store="store">
            </table-body>
        </div>
        <!-- 表尾 -->
    </div>
</template>

<script>
import TableLayout from './table-layout';
import TableHeader from './table-header';
import TableBody from './table-body';
import {createStore, mapStates} from './store/helper';

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

    computed: {
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

    created() {
        this.tableId = 'y-table_' + tableIdSeed++;
    },

    mounted() {
        // console.log('6666', this);
        // 在这里试是不行的
        // let res = mapStates.call(this, {
        //     columns: 'columns',
        //     tableData: 'data',
        // })
        console.log('88888888', this);
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
