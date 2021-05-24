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

        支持多选框的显示
        showCheckbox是否显示多选框,通过prop传递给子节点(一层一层的传递下去)
        tree-node.vue内容展示区增加多选框checkbox,增加v-if判断是否展示

        支持子树的点击展开和伸缩
        tree.vue:defaultExpandAll是否默认展开子树,默认为false,不展示子树
        tree-node.vue:对树节点node增加expand和collapse方法以设置node.expand为true或false
        tree-node.vue::对子树增加v-if(是否存在)和v-show(第一次加载后若收缩则隐藏而不是从dom中删除)
        tree-node.vue:增加响应式属性childNodeRendered和expanded,增加监听node.expand的变化以更新子树的收缩和展开

        支持自定义节点的显示内容 ------------------------------
        视图页面:<y-tree :data="data"><div slot-scope="scope"></div></y-tree>
        tree.vue渲染子树是通过tree-node.vue,所以需要将tree.vue的默认插槽传入到tree-node.vue
        [转变]:不一定要通过tree.vue显性传递tree.vue默认插槽给tree-node.vue
            - 在tree-node.vue中可以通过父组件的treeC来获取
        
        补充插槽知识:
        废弃了的用法:https://cn.vuejs.org/v2/guide/components-slots.html#%E5%BA%9F%E5%BC%83%E4%BA%86%E7%9A%84%E8%AF%AD%E6%B3%95
        - 带有slot属性的具名插槽 -> 通过this.$slots获取
        - 带有slot-scope属性的作用域插槽 -> 通过this.$scopedSlots获取
        新推荐的用法:v-slot

     -->
    <div
        class="y-tree">
        <!-- 子树如何渲染?循环生成?多层嵌套? -->
        <y-tree-node
            v-for="(child) in root.childNodes"
            :node="child"
            :show-checkbox="showCheckbox"
            :key="getNodeKey(child)"
        >
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
         * 节点是否可被选择
         * 树节点共享该值 show-checkbox
         */
        showCheckbox: {
            type: Boolean,
            default: false,
        },

        /**
         * 是否默认展开所有节点
         * 默认值false
         * 树节点共享值 default-expand-all
         * 存到store
         */
        defaultExpandAll: {
            type: Boolean,
            default: false,
        },

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
        },

        // 是否严格选中(不涉及父子节点的选中状态)
        checkStrictly: Boolean,

        // 是否更改子孙节点的选中状态
        checkDescendants: {
            type: Boolean,
            default: false,
        },

        // 默认选中节点的key组成的数组
        defaultCheckedKeys: Array,

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
        /**
         * 外部在调用tree组件时,需要通过refs来访问该组件的方法
         * 例如:this.$refs.treeRef.getCheckedNodes()
         * 但是呢?
         */

        // 获取节点的key
        getNodeKey(node) {
            return getNodeKey(this.nodeKey, node.data);
        },

        /**
         * 获取选中节点
         * leafOnly:是否只是叶子节点,默认值为false
         * includeHalfChecked:是否包含半选节点,默认值为false
         */
        getCheckedNodes(leafOnly, includeHalfChecked) {
            return this.store.getCheckedNodes(
                leafOnly,
                includeHalfChecked,
            );
        },

        /**
         * 获取选中状态下节点的key所组成的数据
         * leafOnly:是否只是叶子节点,默认值为false
         */
        getCheckedKeys(leafOnly) {
            return this.store.getCheckedKeys(
                leafOnly,
            );
        },

        /**
         * 根据key或者data获取节点
         */
        getNode(data) {
            return this.store.getNode(data);
        },

        /**
         * 获取半选中节点
         * 没有入参
         * 返回半选中节点
         */
        getHalfCheckedNodes() {
            return this.store.getHalfCheckedNodes();
        },

        /**
         * 获取半选中节点的key
         * 没有入参
         * 返回半选中节点的key所组成的数组
         */
        getHalfCheckedKeys() {
            return this.store.getHalfCheckedKeys();
        },

        /**
         * 设置节点为选中状态
         * 入参:
         * nodes:要设置为选中状态的节点的数据所组成的数组
         * leafOnly:是否仅设置叶子节点
         */
        setCheckedNodes(nodes, leafOnly) {
            return this.store.setCheckedNodes(nodes, leafOnly);
        },

        /**
         * 根据节点的keys设置勾选的节点
         * 入参:
         * 节点key组成的数组,默认值为[]
         * 是否只设置叶子节点的选中状态,默认值为false
         * 
         * const setCheckedKeys = this.$refs.yTreeRef.setCheckedKeys([22, 19], true);
         * console.log('setCheckedKeys', setCheckedKeys)
         */
        setCheckedKeys(keys, leafOnly) {
            // console.log('leee', keys, leafOnly)
            return this.store.setCheckedKeys(keys, leafOnly);
        },
    },

    created() {
        // 给子树判断父组件是否为树
        this.isTree = true;

        // 创建树的store
        this.store = new TreeStore({
            key: this.nodeKey,
            data: this.data,
            props: this.props,
            // showCheckbox: this.showCheckbox,
            checkStrictly: this.checkStrictly,
            checkDescendants: this.checkDescendants,
            defaultExpandAll: this.defaultExpandAll,
            defaultCheckedKeys: this.defaultCheckedKeys,
        });

        // 树的根节点
        this.root = this.store.root;
    },

    mounted() {
        // console.log('tree', this.root, this.showCheckbox);
        // this.getCheckedNodes();
        // console.log('tree', this, this.$slots);
        // console.log('defaultCheckedKeys', this.defaultCheckedKeys)
    }
}
</script>

<style>

</style>