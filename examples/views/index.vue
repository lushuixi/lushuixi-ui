<template>
    <div>
        <y-table 
            :data="tableData"
            rowKey="id">
            <y-table-column prop="name" label="姓名"></y-table-column>
            <y-table-column prop="position" label="职位"></y-table-column>
            <y-table-column prop="value" label="悬赏金"></y-table-column>
            <!-- <y-table-column prop="name" label="姓名"></y-table-column> -->
            <!-- <y-table-column prop="position" label="职位"></y-table-column> -->
            <!-- <y-table-column prop="value" label="悬赏金"></y-table-column> -->
            <y-table-column label="操作">
                <!-- slot-scope="scope" -->
                <template>
                    <y-button>查看</y-button>
                    <y-button>编辑</y-button>
                    <y-button>删除</y-button>
                    <!-- <span>{{scope.row}}</span> -->
                </template>
            </y-table-column>
            <!-- <template v-slot:empty>
                哈喽
            </template> -->
        </y-table>
        <!-- 测试y-table-column -->
        <!-- <y-table-column prop="name" label="姓名">展示子元素</y-table-column> -->

    </div>
</template>

<script>
import button from '../../packages/button/src/button.vue'
import Table from '../../packages/table/src/table.vue'
export default {
  components: { button },
    data() {
      
        Table
        return {
            tableData: [
                {
                    id: 1,
                    name: "路飞路飞路飞路飞路飞路飞",
                    position: "船长",
                    value: '1500000000',
                },
                {
                    id: 2,
                    name: "索隆",
                    position: "战斗员",
                    value: '320000000',
                },
                {
                    id: 3,
                    name: "乌索普",
                    position: "狙击手",
                    value: '200000000',
                }
            ]
        }
    },

    mounted() {
        // sessionStorage.test = "lushuixi";
    }
}
</script>
