<template>
    <div class="y-table"
        :class="[{
            'y-table__border': border
        }]">
        table
    </div>
</template>

<script>
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

    },

    mounted() {
        console.log('data', this.data)
    }

}
</script>

<style>

</style>
