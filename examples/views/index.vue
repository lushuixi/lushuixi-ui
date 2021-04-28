<template>
    <div>
        <y-table :data="tableData">
            <y-table-column prop="name" label="姓名"></y-table-column>
            <y-table-column prop="position" label="职位"></y-table-column>
        </y-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [
                {
                    name: "路飞",
                    position: "船长",
                },
                {
                    name: "索隆",
                    position: "战斗员",
                }
            ]
        }
    }
}
</script>
