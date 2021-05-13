<template>
    <div>
        <!-- 树节点优化思路
            1.默认行展示和自定义行的展示
                自定义行的展示 -> <div slot-scope="{data, node}"></div>
            2.默认行展示
                默认选中,选中后的后调,获取选中的节点
            3.自定义行的展示 编辑角色权限
                默认展示,
                行的checkobx: 是否有选中行内部的checkobx
                行内部的权限checkobx: 权限是否选中 | 行的checkobx是否选中

                3.1操作行的checkobx: 选中 | 取消选中
                    - 选中 -> 向自己 - > 通知该行内部的权限checkobx全部选中
                              向下 - > 通知该行的子孙行的checkobx以及内部的权限checkobx全部选中状态
                              向上 - > 通知该行的祖先行的checkobx更改选中状态: 选中 | 半选中
                    - 取消选中 -> 向自己 - > 通知该行内部的权限checkobx全部取消选中
                                  向下 - >通知该行的子孙行的checkbox以及内部的权限checkobx全部取消选中
                                  向上 - > 通知该行的祖先行的checkbox更改选中状态: 半选中 | 取消选中
                    
                    行的checkbox选中状态变化后的回调函数check-change事件 -> 

                3.2操作行内部的权限checkobx: 选中 | 取消选中
                    - 选中 -> 向自己 - > 通知该行的checkobx更改选中状态: 选中 | 半选中
                              向下 - > 不通知(祖先行不应有权限, 否则乱套了)
                              向上 - > 通知该行的祖先行的checkobx更改选中状态: 选中 | 半选中
                    - 取消选中 -> 向自己 -> 通知该行的checkobox更改选中状态: 半选中 | 取消选中
                                  向下 -> 不通知
                                  向上 -> 通知该行的祖先行的checkbox更改选中状态: 半选中 | 取消选中

                    行内部的权限checkobx选中状态变化后回调函数change事件 -> 
         -->
        <!-- 树节点案例一 -->
        <!-- <y-tree 
            :data="data"
            :show-checkbox="false"
            :default-expand-all="false"
            node-key="id" /> -->

        <!-- 树节点案例二:支持自定义节点显示内容 -->
        <y-tree
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
                    >
                        <y-checkbox
                            v-for="(item, index) in data.menuOperates"
                            :value="item.id"
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
                    }]
                },{
                    label: '一级 2',
                    children: [{
                        label: '二级 2-1',
                        children: [{
                            label: '三级 2-1-1',
                        }]
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