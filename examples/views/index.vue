<template>
    <div>
        <y-table 
            :data="tableData"
            rowKey="id">
            <y-table-column prop="name" label="姓名" width="180"></y-table-column>
            <y-table-column prop="position" label="职位"></y-table-column>
            <y-table-column prop="name" label="姓名2"></y-table-column>
            <y-table-column prop="position" label="职位2"></y-table-column>
            <!-- <y-table-column label="操作"></y-table-column> -->
        </y-table>
        <!-- 测试y-table-column -->
        <!-- <y-table-column prop="name" label="姓名">展示子元素</y-table-column> -->

    </div>
</template>

<script>
import Table from '../../packages/table/src/table.vue'
export default {
    data() {
      
        Table
        return {
            tableData: [
                {
                    id: 1,
                    name: "路飞",
                    position: "船长",
                },
                {
                    id: 2,
                    name: "索隆",
                    position: "战斗员",
                }
            ]
        }
    },

    mounted() {
        // sessionStorage.test = "lushuixi";
    }
}
</script>
