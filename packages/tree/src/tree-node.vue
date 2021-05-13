<template>
    <!-- 如何渲染子树?
     -->
    <div
        class="y-tree-node">
        <!-- 节点内容的展示,主要分四部分(展开图标展示,多选框,加载中图标,节点内容展示)
            动态计算偏移量:(node.level - 1) * treeC.indent + 'px' -->
        <div
            class="y-tree-node__content"
            :style="{'padding-left': (node.level - 1) * treeC.indent + 'px'}">
            <!-- 这里分四部分 -->
            <node-content :node="node"></node-content>
        </div>
        <!-- 子组件如何渲染?
            element-ui是通过组件el-collapse-transition来实现的
            有一个问题
            如何实现循环嵌套呢?
            自己原本想的:循环嵌套就是顺下去,往下走
            实际上:循环嵌套式一个环,往下走完还要往回走

            如果没有子节点(node.childNodes.length为0)则不展示
         -->
         <y-collapse-transition>
            <div
                v-if="node.childNodes.length"
                class="y-tree-node__children">
                <y-tree-node
                    v-for="(child) in node.childNodes"
                    :key="getNodeKey(child)"
                    :node="child"
                >
                </y-tree-node>
            </div>
         </y-collapse-transition>
    </div>
</template>

<script>
import YCollapseTransition from '../../../src/transitions/collapse-transition';
import {
    getNodeKey,
} from './model/utils';
export default {
    name: 'YTreeNode',
    componentName: 'YTreeNode',

    props: {
        /**
         * 两种写法
         */
        // node: {
        //     type: Object,
        //     default: function() {
        //         return {};
        //     }
        // },
        node: {
            default() {
                return {};
            }
        }
    },

    data() {
        return {
            /**
             * 表示父组件是否是树根,如果是则表示父组件,如果不是则表示父组件的tree
             * tree :null,
             * 树上所有节点共享的属性和方法(通过treeC一级一级的传递下去)
             */
            treeC: null,
        }
    },
    
    // 组件注册
    components: {
        YCollapseTransition,

        /**
         * 官方文档
         * 组件是可复用的Vue的实例
         * 所以它们接收与 new Vue 接收相同的选项，例如 data、computed、watch、methods 以及生命周期钩子等，仅有的例外是像 el 这样根实例特有的选项。
         * 
         * 创建html
         * - 使用template
         * - 使用render函数(利用js的编程能力, createElement)
         * - JSX(其实安装支持JSX的babel,使render函数里可以写JSX以代替createElement)
         */
        NodeContent: {
            props: {
                node: {
                    required: true,
                },
            },
            render(h) {
                const parent = this.$parent;
                const treeC = parent.treeC;
                const node = this.node;
                const {data, store} = node;
                // console.log('node', node, parent, treeC, data, store);
                // this: proxy:
                // [[Handler]]: Object
                // [[Target]]: VueComponent
                // [[IsRevoked]]: false
                
                console.log('88', this, node)
                return (
                    <span class="y-tree-node__label">{node.label}</span>
                )
            }
        }
    },

    methods: {
        getNodeKey(node) {
            console.log('treeC', this.treeC)
            return getNodeKey(this.treeC.nodeKey, node.data)
        },
    },

    created() {
        /**
         * 为什么这里只要将
         * const parent = parent.isTree ? parent : parent.tree
         * this.tree = parent.isTree ? parent : parent.tree
         * 报错:说是循环引用了
         * Error in render: "TypeError: Converting circular structure to JSON
         * 
         * this.$parent是tree.vue组件的虚拟节点,是因为命名不可同吗?
         * this.tree 与 tree.vue 都是 tree
         */
        // const parent = this.$parent;
        // console.log(this, parent);

        const parent = this.$parent;
        this.treeC = parent.isTree ? parent : parent.treeC;
        console.log('tree-node', this.node, this.node.childNodes);
    
        const treeC = this.treeC;
        if(!treeC) {
            console.warn('Can not find node\'s tree.');
        }
        // console.log('created', tree, tree.indent, this.node.level, tree.indent * (this.node.level-1))
    },

    mounted() {
        // console.log('node', this.node)
    }
}
</script>