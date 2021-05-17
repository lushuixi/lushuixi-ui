<template>
    <div>
        <!-- 树节点案例一 -->
        <!-- <y-tree 
            :data="data"
            :show-checkbox="false"
            :default-expand-all="false"
            node-key="id" /> -->

        <!-- 树节点案例二:支持自定义节点显示内容 -->
        <!-- <y-tree
            :data="dataCustom"
            node-key="id"
        >
            <div 
                class="tree-row"
                slot-scope="{node,data}"
            >
                <div class="tree-row-name">
                    {{data.label}} -- 
                    {{node.label}}
                </div>
                <div class="tree-row-operate">
                    <y-checkbox-group 
                        v-model="data.operates" 
                        @click.native.stop
                        @change="handleCheckboxGroupChange(data.operates)"
                    >
                        <y-checkbox
                            v-for="(item, index) in data.menuOperates"
                            :label="item.id"
                            :key="index+item.id"
                        >
                            {{item.name}}
                        </y-checkbox>
                    </y-checkbox-group>
                </div>
            </div>
        </y-tree> -->
        
        <!-- 树节点案例三:选中状态变化后通知父子组件更改选中状态 -->
        <y-tree
            :data="dataCustom"
            node-key="id"
            :show-checkbox="true"
        >
            <div 
                class="tree-row"
                slot-scope="{node,data}"
            >
                <div class="tree-row-name">
                    {{data.label}} -- 
                    {{node.label}}
                </div>
                <div class="tree-row-operate">
                    <y-checkbox-group 
                        v-model="data.operates" 
                        @click.native.stop
                        @change="handleCheckboxGroupChange(data.operates)"
                    >
                        <y-checkbox
                            v-for="(item, index) in data.menuOperates"
                            :label="item.id"
                            :key="index+item.id"
                        >
                            {{item.name}}
                        </y-checkbox>
                    </y-checkbox-group>
                </div>
            </div>
        </y-tree>
    </div>
</template>

<script>
export default {
    computed: {
        data() {
            let res = [];
            res = [
                {
                    label: '一级 1',
                    children: [{
                        label: '二级 1-1',
                        children: [{
                            label: '三级 1-1-1',
                            children: [{
                                label: '四级 1-1-1-1',
                            }]
                        }]
                    }],
                    
                },{
                    label: '一级 2',
                    children: [{
                        label: '二级 2-1',
                        children: [{
                            label: '三级 2-1-1',
                        }]
                    },{
                        label: '二级 2-2'
                    }]
                },{
                    label: '三级 2',
                }
            ];
            return res;
        },
        dataCustom() {
            let res = [];
            res = [
                {
                    label: '一级 1',
                    operates: [],
                    menuOperates: [{
                        id:1,
                        name:'查看'
                    },{
                        id:2,
                        name:'新增'
                    },{
                        id:3,
                        name:'编辑'
                    }],
                    children: [{
                        label: '二级 1-1',
                        operates: [],
                        menuOperates: [{
                            id:1,
                            name:'查看'
                        },{
                            id:2,
                            name:'新增'
                        },{
                            id:3,
                            name:'编辑'
                        }],
                        children: [{
                            label: '三级 1-1-1',
                            operates: [],
                            menuOperates: [{
                                id:1,
                                name:'查看'
                            },{
                                id:2,
                                name:'新增'
                            },{
                                id:3,
                                name:'编辑'
                            }],
                            children: [{
                                label: '四级 1-1-1-1',
                                operates: [],
                                menuOperates: [{
                                    id:1,
                                    name:'查看'
                                },{
                                    id:2,
                                    name:'新增'
                                },{
                                    id:3,
                                    name:'编辑'
                                }],
                            }]
                        }]
                    },{
                        label: '二级 1-1',
                        operates: [],
                    }]
                },{
                    label: '一级 2',
                    operates: [],
                    menuOperates: [{
                        id:1,
                        name:'查看'
                    },{
                        id:2,
                        name:'新增'
                    },{
                        id:3,
                        name:'编辑'
                    }],
                    children: [{
                        label: '二级 2-1',
                        operates: [],
                        menuOperates: [{
                            id:1,
                            name:'查看'
                        },{
                            id:2,
                            name:'新增'
                        },{
                            id:3,
                            name:'编辑'
                        }],
                        children: [{
                            label: '三级 2-1-1',
                            operates: [],
                            menuOperates: [{
                                id:1,
                                name:'查看'
                            },{
                                id:2,
                                name:'新增'
                            },{
                                id:3,
                                name:'编辑'
                            }],
                        }]
                    }]
                },{
                    label: '三级 2',
                    operates: [],
                    menuOperates: [{
                        id:1,
                        name:'查看'
                    },{
                        id:2,
                        name:'新增'
                    },{
                        id:3,
                        name:'编辑'
                    }],
                }
            ];
            return res;
        }
    },
    data() {
        return {
        }
    },
    methods: {
        handleCheckboxGroupChange(operates) {
            console.log('handleCheckboxGroupChange', operates)
        }
    },
    mounted() {
        // console.log('视图', this.data);
        // this.data.forEach((item) => {
            // console.log('item', item);
            // delete item.$treeNodeId;
            // for(let prop in item) {
            //     console.log(prop, item[prop])
            // }
            // item.$treeNodeId = 33;
        // })
    }
}
</script>

<style scoped>
.tree-row {
    width: 100%;
    display: flex;
    align-items: center;
}
.tree-row-name {
    flex: 1;
}
.tree-row-operate {
    flex: 1;
}
</style>