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
            ref="yTreeRef"
            :data="dataCustom3"
            :show-checkbox="true"
            :defaultExpandAll="true"
            @check-change="handleNodeChange">
            <div class="tree-row" slot-scope="{node,data}">
                <div class="tree-row-name">
                    {{data.label}} -- 
                    {{node.label}}
                </div>
                <div v-if="node.childNodes && node.childNodes.length === 0" class="tree-row-operate">
                    <y-checkbox-group 
                        v-model="data.operates" 
                        @click.native.stop
                        @change="handleCheckboxChange(data, node)">
                        <y-checkbox
                            v-for="(item, index) in data.menuOperates"
                            :label="item.id"
                            :key="index+item.id">
                            {{item.name}}
                        </y-checkbox>
                    </y-checkbox-group>
                </div>
            </div>
        </y-tree>

        <!-- <el-tree
            ref="yTreeRef"
            :data="dataCustom3"
            node-key="id"
            :show-checkbox="true"
            @check-change="handleNodeChange">
            <div slot-scope="{node, data}" class="tree-row">
                <div class="tree-row-name">{{data.label}}</div>
                <div v-if="node.childNodes && node.childNodes.length === 0" class="tree-row-operate">
                    <el-checkbox-group
                        v-model="data.operates"
                        @change="handleCheckboxChange(data, node)">
                        <el-checkbox
                            v-for="(item, index) in data.menuOperates"
                            :label="item.id"
                            :key="index+item.id">
                            {{item.name}}
                        </el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
        </el-tree> -->
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
        },
        dataCustom3() {
            let res = [];
            res = [
                {
                    label: '一级 1',
                    operates: [],
                    id:11,
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
                        id:19,
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
                            id:16,
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
                                id: 20,
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
                        id: 21,
                    }]
                },{
                    label: '一级 2',
                    operates: [],
                    id: 22,
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
                        id: 24,
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
                            id: 30,
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
                    id: 26,
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
        /**
         * 节点的复选框选中状态变化后的回调
         * data:该节点的数据
         * checked:该节点是否选中
         * indeterminate:节点的子树中[是否有]被选中的节点(这句话的意思也就是说:该节点是否是半选中状态[因为半选中状态表示子节点中有被选中的节点])
         * 这样就可以实现节点的选中状态变化后通知该节点内部的复选框组的值更新(取消选择|全部选择)
         * 
         * 注意:如果半选中状态下仍未改变则不会触发
         */
        handleNodeChange(data, checked, indeterminate) {
            // console.log('handleNodeChange', data, checked, indeterminate);
            if(!data || !data.operates || !data.menuOperates) return;
            // this.$nextTick(() => {
                // 取消选中
                if(!checked && !indeterminate) data.operates = [];
                // 选中
                if(checked) {
                    data.operates = data.menuOperates.map(item => item.id);
                }
            // })

            // 获取选中节点
            // const checkedNodes = this.$refs.yTreeRef.getCheckedNodes(true, true);
            // console.log(88, checkedNodes);

            // 获取选中节点的key
            // const checkedKeys = this.$refs.yTreeRef.getCheckedKeys(true);
            // console.log('88', checkedKeys);

            // 获取节点(根据key或者data)
            const node = this.$refs.yTreeRef.getNode(26);
            // const node = this.$refs.yTreeRef.getNode({
            //     label: '三级 2',
            //     operates: [],
            //     id: 26,
            //     menuOperates: [{
            //         id:1,
            //         name:'查看',
            //     },{
            //         id:2,
            //         name:'新增',
            //     },{
            //         id:3,
            //         name:'编辑',
            //     }]
            // });
            console.log('888', node);
        },

        /**
         * 节点内部复选框组选中数据发生变化的回调
         * 只有叶子节点才有复选框组, 所以只需要通知改节点以及父组件更改选中状态
         */
        handleCheckboxChange(data, node) {
            // console.log('handleCheckboxGroupChange', data, node);
            if(!data || !data.operates || !data.menuOperates) return;

            let status;
            if(data.operates.length <= 0) {
                status = false; // 取消选中
            } else if (data.operates.length >= data.menuOperates.length) {
                status = true; // 选中
            } else {
                status = 'half'; // 半选中
            }

            // this.node.setChecked(ev.target.checked, !this.treeC.checkStrictly);
            // 设置节点的选中状态
            node.setChecked(status, true);

            // this.operates = this.$refs.treeRef.getCheckedNodes(true, true);
        },

        
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