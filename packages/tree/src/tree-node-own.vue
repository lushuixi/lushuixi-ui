<template>
    <!-- 如何渲染子树?循环嵌套

        v-on事件修饰符
        官方文档:https://cn.vuejs.org/v2/guide/events.html
        参考:https://www.cnblogs.com/xiaoyaoxingchen/p/10405207.html

        .stop:阻止单击事件继续传播(阻止事件冒泡,阻止事件向上级DOM元素传递)
        .prevent:提交事件不再重载页面(form表单提交,阻止默认事件的发生)
        .capture:添加事件监听器时使用事件捕获模式(捕获冒泡，即有冒泡发生时，有该修饰符的dom元素会先执行，如果有多个，从外到内依次执行，然后再按自然顺序执行触发的事件)
        .self:当前元素自身触发处理函数(将事件绑定到自身，只有自身才能触发，通常用于避免冒泡事件的影响)
        .once:设置事件只能触发一次，比如按钮的点击等
        .passive
        .native:在父组件中给子组件绑定一个原生的事件，就将子组件变成了普通的HTML标签，不加'. native'事件是无法触 发的

        修饰符也可以串联
        .stop.prevent

        只有修饰符
        @click.native.stop:阻止子组件点击事件冒泡
        checkbox多选框是需要点击选中或不选中的,该事件是原生的点击事件
        那么在父组件树节点组件中,点击是展开或伸缩子树的
        如果不做处理,则点击checkbox多选框,原生的点击事件会向上冒泡,从而使父组件也跟着触发点击事件
        所以需要阻止该子组件的原生点击事件冒泡,于是加上@click.native.stop

        @click.stop:阻止向上冒泡,在该级展开子树

        节点的选中状态变化后通知父子组件更新选中状态
     -->
    <div
        class="y-tree-node"
        :aria-expanded="expanded"
        @click.stop="handleClick"
    >
        <!-- 节点内容的展示,主要分四部分(展开图标展示,多选框,加载中图标,节点内容展示)
            动态计算偏移量:(node.level - 1) * treeC.indent + 'px' 
            1.渲染树节点

            点击节点行展开或取消展开子树
            node.expanded:true展开|false不展开
        -->
        <div
            class="y-tree-node__content"
            :style="{'padding-left': (node.level - 1) * treeC.indent + 'px'}"
        >
            <!-- 这里分四部分 -->
            <!-- 多选框 -->
            <y-checkbox
                v-if="showCheckbox"
                v-model="node.checked"
                :indeterminate="node.indeterminate"
                @click.native.stop
                @change="handleNodeUpdateChange"
            >
            </y-checkbox>
            <!-- 内容 -->
            <node-content :node="node"></node-content>
        </div>
        <!-- 子组件如何渲染?
            element-ui是通过组件el-collapse-transition来实现的
            有一个问题
            如何实现循环嵌套呢?
            自己原本想的:循环嵌套就是顺下去,往下走
            实际上:循环嵌套式一个环,往下走完还要往回走

            如果没有子节点(node.childNodes.length为0)则不展示

            2.渲染该节点的子树
         -->
         <y-collapse-transition>
             <!-- v-if="node.expanded && node.childNodes.length"
                v-if:动态的控制DOM元素的添加和删除
                v-show:只是同来css的display来控制元素的显示和隐藏
                <transition> can only be used on a single element. Use <transition-group> for lists.
                所以需要在外层增加一层标签div, 而不是直接循环
              -->
            <div
                v-if="childNodeRendered"
                v-show="expanded"
                class="y-tree-node__children"
                :aria-expanded="expanded"
            >
                <y-tree-node
                    v-for="(child) in node.childNodes"
                    :key="getNodeKey(child)"
                    :node="child"
                    :show-checkbox="showCheckbox"
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
                
                console.log('88', this, node, typeof node);
                // 增加自定义节点显示内容(插槽)
                return (
                    treeC.$scopedSlots.default 
                        ? treeC.$scopedSlots.default({node, data})
                        : <span class="y-tree-node__label">{node.label}</span>
                )
            }
        }
    },

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
        },

        showCheckbox: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            /**
             * 表示父组件是否是树根,如果是则表示父组件,如果不是则表示父组件的tree
             * tree :null,
             * 树上所有节点共享的属性和方法(通过treeC一级一级的传递下去)
             */
            treeC: null,

            // 该节点是否展开,作用是html需要
            expanded: false,
            
            /**
             * 子树是否渲染(是否展开子树)
             * 表示子树是否已经被渲染过了
             * 如果被渲染过了
             * - expanded为true则隐藏子树(display:none)
             * - expanded为false则显示子树(display:block)
             */
            childNodeRendered: false,
        }
    },

    /**
     * 监听属性,
     * 不仅可以监听属性自己,还可监听对象
     * 监听对象(深度监听对象的属性|监听该对象指定属性)
     * 
     */
    watch: {
        /**
         * 监听node.expanded的更新
         * 如果原节点的expand是false
         * 点击节点行 -> hangleClick -> 调用node.expand -> node.expand为true -> 可以监听到该值的变化
         * 再次点击节点行 -> handleClick -> 
         */
        'node.expanded'(val) {
            // console.log('监听node.expanded', val);

            // 等视图更新后再去调用,否则可能会出现只监听到一次,便不打印值了
            this.$nextTick(() => this.expanded = val);
            if(val) {
                this.childNodeRendered = true;
            }
            // console.log('监听node.expanded', this);
        },
    },

    methods: {

        /**
         * 获取节点的key
         */
        getNodeKey(node) {
            // console.log('treeC', this.treeC)
            return getNodeKey(this.treeC.nodeKey, node.data)
        },

        /**
         * 点击展开|收缩
         */
        handleClick() {
            // console.log('点击了', this.expanded);
            // this.handleExpandIconClick();

            if(this.expanded) {
                // 如果已经展开了,则收缩
                this.node.collapse();
            } else {
                // 如果没有展开,则展开
                this.node.expand();
            }

            // console.log('ending');
        },

        /**
         * 更改节点的选中状态
         * 取消选中 | 选中 | 半选中
         */
        notifyNodeUpdate(node, type) {
            // console.log('通知节点更改选中状态:取消选中|选中|半选中', node);
            switch(type) {
                case 'checked': 
                    // console.log('checkedcheckedchecked');
                    node.checked = true;
                    node.indeterminate = false;
                    break;
                case 'indeterminate':
                    node.checked = false;
                    node.indeterminate = true;
                    break;
                default: 
                    node.checked = false;
                    node.indeterminate = false;
                    break;
            }
        },

        /**
         * 统计节点的选中状态的个数
         * 选中状态: checked:true,cancel:false,indeterminate:false
         * 取消选中: checked:false,cancel:true,indeterminate:false
         * 半选中:   checked:false,cancel:false,indeterminate:true
         */
        countNodeStatus(childNodes) {
            let res = {
                checked: 0,
                cancel: 0,
                indeterminate: 0,
            };
            // console.log('统计节点的选中状态个数', childNodes);
            childNodes.forEach(node => {
                if(node.checked) res.checked++;
                if(node.indeterminate) res.indeterminate++;
                if(!node.checked && !node.indeterminate) res.cancel++;
            });
            return res;
        },

        /**
         * 判断父节点的选中状态
         */
        judgeParentNodeStatus(childNodes) {
            let childNodesStatus = this.countNodeStatus(childNodes);
            // console.log('统计子节点的选中状态', childNodes, childNodesStatus)
            if(childNodesStatus.checked === childNodes.length) {
                return 'checked';
            }
            if(childNodesStatus.cancel === childNodes.length) {
                return 'cancel';
            }
            return 'indeterminate';
        },

        /**
         * 父节点更新节点
         * 因为父节点的选中状态是根子节点的选中状态是挂钩的
         * 如果所有子节点都是选中状态->父节点选中
         * 如果所有子节点都取消选中->父节点取消选中
         * 其他情况->父节点半选中
         * 统计个数
         */
        notifyNodeParentUpdate(parentNode) {
            let type = this.judgeParentNodeStatus(parentNode.childNodes);
            // console.log('type', type);
            this.notifyNodeUpdate(parentNode, type);
        },

        /**
         * 通知节点的子节点更改选中状态
         * 向下走
         * 子节点可能有多个
         * 父节点选中:所有的子节点选中
         * 父节点取消选中:所有的子节点取消选中
         */
        notifyChildNodesDepUpdate(childNodes, type) {
            // console.log('子节点', childNodes, type);
            if(!childNodes || !childNodes.length) return;
            childNodes.forEach(node => {
                this.notifyNodeUpdate(node, type);
                if(node.childNodes) this.notifyChildNodesDepUpdate(node.childNodes, type);
            });
        },

        /**
         * 通知节点的父节点更改选中状态
         * 向上走
         * 父节点是唯一的
         */
        notifyParentDepUpdate(parent) {
            // console.log('父节点', parent);
            if(!parent) return;
            this.notifyNodeParentUpdate(parent);
            parent = parent.parent;
            this.notifyParentDepUpdate(parent);
        },

        /**
         * 节点的选择框选择状态发生变化
         * 该节点选中状态变化后通知父子节点的选中状态
         * status:选中状态
         * node:该节点
         */
        handleNodeUpdateChange(status) {
            // console.log('节点的选择框选择状态发生变化', status, this.node);
            // 通知子节点更改选中状态
            if(!this.node.childNodes && !this.node.parent) return;
            let type = status ? 'checked' : 'cancel';
            this.notifyNodeUpdate(this.node, type);
            if(this.node.childNodes) {
                this.notifyChildNodesDepUpdate(this.node.childNodes, type);
            }
            if(this.node.parent) {
                this.notifyParentDepUpdate(this.node.parent);
            }
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
        // console.log('tree-node', this.node, this.node.childNodes);
    
        const treeC = this.treeC;
        if(!treeC) {
            console.warn('Can not find node\'s tree.');
        }
        // console.log('created', tree, tree.indent, this.node.level, tree.indent * (this.node.level-1))

        /**
         * created:this.$data是空对象,则在created中赋值的变量在虚拟节点的根部
         * 但是如果赋值的变量也在data中,则也回保存到data中
         * 组件下的data是响应式的数据(更新视图)
         * 因为expanded和childNodeRendered需要是响应式的,所以需要在data中定义
         * 否则非响应式的数据便不需要保存到data中
         */
        if(this.node.expanded) {
            this.expanded = true;
            this.childNodeRendered = true;
        }

        // console.log('88', this.node.expanded);
    
    },

    mounted() {
        // console.log('node', this.node, this.showCheckbox, this.treeC.showCheckbox)
    }
}
</script>