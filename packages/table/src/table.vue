<template>
    <!-- table组件是如何渲染子组件tabel-column的呢? -->
    <div class="y-table"
        :class="[{
            'y-table__border': border
        }]">
        <!-- <div v-if="showHeader"
            class="y-table__header-wrapper"
            ref="headerWrapper">
            <table-header></table-header>
        </div> -->
        <slot></slot>
    </div>
</template>

<script>
import TableHeader from './table-header';
let tableIdSeed = 1;
export default {

    name: 'YTable',

    props: {

        // data需为数组类型Array, 且默认值为空数组[]
        data: {
            // 指定data的数组类型, 如果传入的data不是数组类型, 则vue会报错
            type: Array,
            // 对象或数组默认值必须从一个工厂函数获取
            default: function () {
                return [];
            }
        },

        // border需为布尔类型Boolean
        border: Boolean,

        // 是否显示表头, 布尔类型, 默认为true
        showHeader: {
            type: Boolean,
            default: true
        }

    },

    components: {
        TableHeader,
    },

    created() {
        this.tableId = 'y-table_' + tableIdSeed++;
    },

    mounted() {
        console.log('data', this)
    }

}
</script>

<style>

</style>
