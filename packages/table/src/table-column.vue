<template>
    <div>
        table-column
    </div>
</template>

<script>
export default {
    name: 'YTableColumn',
    props: {
        // 表格数据项字段名
        prop: String,
        // 标题
        label: String
    },
    mounted() {
        console.log('table-column', this.prop, this.label)
    }
}
</script>