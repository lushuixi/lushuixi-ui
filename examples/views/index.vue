<template>
    <div class="table-box">
        <!-- 一次封装 -->
        <!-- <y-table 
            :data="tableData"
            rowKey="id">
            <y-table-column prop="name" label="姓名"></y-table-column>
            <y-table-column prop="alias" label="别名"></y-table-column>
            <y-table-column prop="position" label="职位"></y-table-column>
            <y-table-column prop="sex" label="姓名"></y-table-column>
            <y-table-column prop="home" label="家乡"></y-table-column>
            <y-table-column prop="birth" label="生日"></y-table-column>
            <y-table-column prop="dreams" label="梦想"></y-table-column>
            <y-table-column prop="likes" label="爱好"></y-table-column>
            <y-table-column prop="value" label="悬赏金"></y-table-column>
            <y-table-column label="操作">
                <template slot-scope="scope">
                    <y-button key="show" type="text" @click="handleShowClick(scope.row)">查看</y-button>
                    <y-button key="edit" type="text" @click="handleEditClick(scope.row)">编辑</y-button>
                    <y-button key="remove" type="text" @click="handleRemoveClick(scope.row)">删除</y-button>
                </template>
            </y-table-column>
        </y-table> -->

        <!-- 二次封装 -->
        <!-- <StandardTable
            :columns="columns"
            :data="tableData"/> -->

        <y-table 
            :data="tableData"
            border
            align="center">
            <y-table-column prop="name" label="姓名" align="center"></y-table-column>
            <y-table-column label="介绍" align="center">
                <y-table-column label="个人信息" align="center">
                    <y-table-column prop="position" label="职位"></y-table-column>
                    <y-table-column prop="sex" label="性别"></y-table-column>
                    <y-table-column prop="home" label="家乡"></y-table-column>
                </y-table-column>
                <y-table-column label="个人喜好" align="center">
                    <y-table-column prop="likes" label="爱好"></y-table-column>
                    <y-table-column prop="value" label="悬赏金"></y-table-column>
                </y-table-column>
                <y-table-column prop="birth" label="生日" align="center"></y-table-column>
            </y-table-column>
            <y-table-column prop="alias" label="别名"></y-table-column>
        </y-table>

        <!-- <table border>
            <thead>
                <tr>
                    <th colspan="1" rowspan="2">姓名</th>
                    <th colspan="2" rowspan="1">个人信息</th>
                </tr>
                <tr>
                    <th colspan="1" rowspan="1">职位</th>
                    <th colspan="1" rowspan="1">性别</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="1" rowspan="1">路飞</td>
                    <td colspan="1" rowspan="1">船长</td>
                    <td colspan="1" rowspan="1">男</td>
                </tr>
                <tr>
                    <td colspan="1" rowspan="1">索隆</td>
                    <td colspan="1" rowspan="1">战斗员</td>
                    <td colspan="1" rowspan="1">男</td>
                </tr>
                <tr>
                    <td colspan="1" rowspan="1">乌索普</td>
                    <td colspan="1" rowspan="1">狙击手</td>
                    <td colspan="1" rowspan="1">男</td>
                </tr>
            </tbody>
        </table> -->
    </div>
</template>

<script>
import StandardTable from '../components/standardTable';
export default {
    components: {
        StandardTable
    },

    data() {
        return {
            tableData: [
                {
                    id: 1,
                    name: "蒙奇·D·路飞",
                    alias: '草帽路飞',
                    position: "草帽一伙、草帽大船团船长",
                    sex: '男',
                    home: '东海风车村',
                    birth: '5月5日(日本儿童节)',
                    dreams: '找到传说中的One Piece，成为海贼王',
                    likes: '所有美食，首选是肉',
                    value: '1500000000',
                },
                {
                    id: 2,
                    name: "罗罗诺亚・索隆",
                    alias: '海贼猎人索隆',
                    position: "草帽海贼团战斗员",
                    sex: '男',
                    home: '东海霜月村',
                    birth: '11月11日',
                    dreams: '世界第一大剑豪',
                    likes: '米饭、海兽的肉、能搭配酒的食物、酒',
                    value: '320000000',
                },
                {
                    id: 3,
                    name: "乌索普",
                    alias: 'GOD·乌索普',
                    position: "草帽一伙狙击手",
                    sex: '男',
                    home: '东海西罗布村',
                    birth: '4月1日(愚人节)',
                    dreams: '勇敢的海上战士',
                    likes: '秋岛的秋刀鱼、旺季鱼类',
                    value: '200000000',
                },
                {
                    id: 4,
                    name: "娜美",
                    alias: '小贼猫',
                    position: "草帽一伙的航海士",
                    sex: '女',
                    home: '东海可可西亚村',
                    birth: '7月3日',
                    dreams: '画出全世界的地图',
                    likes: '钱和橘子',
                    value: '200000000',
                }
            ]
        }
    },

    computed: {
        columns() {
            return [
                {
                    prop: 'name',
                    label: '姓名',
                },{
                    prop: 'alias',
                    label: '别名',
                },{
                    prop: 'position',
                    label: '职位',
                },{
                    prop: 'sex',
                    label: '性别',
                },{
                    prop: 'home',
                    label: '家乡'
                },{
                    prop: 'birth',
                    label: '生日',
                },{
                    prop: 'dreams',
                    label: '梦想',
                },{
                    prop: 'likes',
                    label: '喜好',
                },{
                    prop: 'value',
                    label: '悬赏金',
                }
            ];
        }
    },

    methods: {
        handleShowClick(data) {
            console.log('点击查看', data);
        },
        handleEditClick(data) {
            console.log('点击编辑', data);
        },
        handleRemoveClick(data) {
            console.log('点击删除', data);
        }
    },

    mounted() {
        // sessionStorage.test = "lushuixi";
    }
}
</script>

<style scoped>
.table-box {
    /* width: 960px; */
    margin: 0 auto;
    height: 200px;
}
</style>