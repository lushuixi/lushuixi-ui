<template>
    <y-table
        :data="data"
        :border="border"
        :align="align"
        :height="height"
        :maxHeight="maxHeight">
        <template v-for="(column, index) in columns">
            <y-table-column
                :key="index"
                :prop="column.prop || null"
                :label="column.label || null"
                :align="column.align || null"
                :width="column.width || null">
                <template slot-scope="scope">
                    <template v-if="column.slots">
                        <slot :name="column.slots" :row="scope.row"></slot>
                    </template>
                    <template v-else-if="column.prop && scope.row[column.prop]">
                        <span>{{scope.row[column.prop]}}</span>
                    </template>
                    <template v-else>
                        <slot :row="scope.row"></slot>
                    </template>
                </template>
            </y-table-column>
            <!-- 自定义表格数据data为空时的样式 -->
            <!-- <template v-slot:empty>
                哈喽
            </template> -->
        </template>
    </y-table>
</template>

<script>
export default {
    props: {
        // 列的数据
        columns: {
            type: Array,
            default: function() {
                return [];
            }
        },

        // 表格数据
        data: {
            type: Array,
            default: function() {
                return [];
            }
        },

        // 是否有边框,默认是false
        border: {
            type: Boolean,
            default: false,
        },

        // 文本对齐方式
        align: String,

        // 表格高度
        height: [Number, String],

        // 表格最大高度
        maxHeight: [Number, String],
    },

    mounted() {
        console.log('hhhg', this.align)
    }
}
</script>