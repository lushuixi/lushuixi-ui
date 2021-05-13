<template>
    <!-- y-tree实现思路
        接收数组data,每行要显示的数据源,是根据children字段来无限下走,
        因为不知道data的深度,如何处理呢?
        在循环之前将data拍平吗?

        data数组项如果有children字段且非空,则有子树

        树:从根节点出发生成子树
        tree.vue 树组件入口 -> 创建store: this.store = new TreeStore({...})
        tree-node.vue 树组件的节点的渲染
        model/tree-store.js 树节点的容器(侧重于处理) -> 实例化根节点: this.root = new Node({...}), 构建根节点的子树
        model/node.js 节点类 -> 生成节点的childNodes, 从而构建该节点的子树
     -->
    <div
        class="y-tree">
        <!-- 子树如何渲染?循环生成?多层嵌套? -->
        <y-tree-node
            v-for="(child) in root.childNodes"
            :node="child"
            :key="getNodeKey(child)">
        </y-tree-node>
    </div>
</template>

<script>
import TreeStore from './model/tree-store';
import YTreeNode from './tree-node';
import {
    getNodeKey,
} from './model/utils';
export default {
    name: 'YTree',

    components: {
        YTreeNode,
    },

    props: {
        /**
         * 树要展示的数据
         */
        data: {
            type: Array,
        },

        /**
         * 指定节点的key
         */
        nodeKey: String,

        /**
         * 配置项
         */
        props: {
            type: Object,
            default: function() {
                return {
                    children: 'children', // 指定子树为节点某个对象的值即"children"对应值表示子节点的数据
                    label: 'label', // 指定节点标签为节点对象的某个属性的值
                }
            }
        },

        /**
         * 相邻级节点间的水平缩进
         */
        indent: {
            type: Number,
            default: 18,
        }

    },

    data() {
        return {
            store: null,
            root: null,
        }
    },

    watch: {
        data(newVal) {
            console.log('监听data发生变化', newVal)
        }
    },

    methods: {
        // 获取节点的key
        getNodeKey(node) {
            return getNodeKey(this.nodeKey, node.data);
        }
    },

    created() {
        // 给子树判断父组件是否为树
        this.isTree = true;

        // 创建树的store
        this.store = new TreeStore({
            key: this.nodeKey,
            data: this.data,
            props: this.props,
        });

        // 树的根节点
        this.root = this.store.root;
    },

    mounted() {
        console.log('tree', this.root);
    }
}
</script>

<style>

</style>