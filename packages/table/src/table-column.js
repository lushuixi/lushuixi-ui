/**
 * 注意: 该文件不是vue文件,而是js文件
 * 使用jsx语言渲染dom
 * 官方文档: https://cn.vuejs.org/v2/guide/render-function.html
 * 该js是table-column组件,那么在使用该组件时,会传递过来两个属性prop和label
 * 这两个属性要如何处理才能往columns中添加该列的属性呢？
 */
import {mergeOptions} from './utils';
let columnIdSeed = 1;
console.log('hhuhuhu', columnIdSeed);

export default {
    name: 'YTableColumn',
    
    props: {
        // 表格数据项字段名
        prop: String,
        // 标题
        label: String
    },

    data() {
        return {
            columns: [],
        }
    },

    // 计算属性,有缓存作用
    computed: {
        // owner汉语意为主人,即父级的table组件
        owner() {
            let parent = this.$parent;
            while (parent && !parent.tableId) {
                parent = parent.$parent;
            }
            return parent;
        },
        /**
         * 该table-column的父级组件是table还是table-column
         * 如果是table-column,因该是要做单元格合处理的
         */
        columnOrTableParent() {
            let parent = this.$parent;
            while (parent && !parent.tableId && !parent.columnId) {
                parent = parent.$parent;
            }
            return parent;
        }
    },
    
    methods: {
        // reduce 两两比较操作,数组之间的拼接
        getPropsData(...props) {
            return props.reduce((prev,cur) => {
                if(Array.isArray(cur)) {
                    cur.forEach((key) => {
                        prev[key] = this[key]; // 将数据中的key对应的值赋值
                    })
                }
                return prev;
            }, {});
        },
        // 获取索引
        getColumnElIndex(children, child) {
            // console.log('getColumnElIndex', children, child);
            return [].indexOf.call(children, child);
        }
    },

    // 此时,this.data和this.$el都还没有值,为undefined, 也可以进行一些初始化
    beforeCreate() {
        // console.log('beforeCreate', this.$data);
        this.column = {};
        this.columnId = '';
    },

    /**
     * 在模板被渲染成html之前被调用, 即通常初始化某些属性值, 然后再渲染成视图
     * this.$el -> undefined
     * this.$data -> data的初始化值
     * 此时,虚拟dom节点已生产,但是还没有渲染成真是的dom节点
     * 注意: 如果table下有两个table-column,则第一个table-column时,columnIdSeed值为1,
     * 但是到第二个table-column时,columnIdSeed值为2,这是为什么呢?
     * 测试了下,发现无论第几个table-column,在export default外打印值都为1且只在第一次打印了
     * 也就类似缓存下来了,export default外面定义的变量会被缓存下来,无论定义了几遍table(里面包含table-column)
     * 保证每个table-column都会有一个唯一的columnId
     */
    created() {
        // 定义table-column组件的columnId
        const parent = this.columnOrTableParent;
        this.columnId = (parent.tableId || parent.columnId) + '_column_' + columnIdSeed++;
        // console.log('create', this.columnId);

        // 定义默认属性,暂时只有id
        const defaults = {
            id: this.columnId,
        }

        // 基础属性
        const basicProps = ['label'];
        
        // 收集column属性
        let column = this.getPropsData(basicProps);
        column = mergeOptions(defaults, column);
        // console.log('ccc', column);

        this.columnConfig = column;
        
    },

    // 在模板被渲染成html之后被调用,即通常初始化页面完成后,再对html的dom节点进行一些需要的操作
    mounted() {
        // console.log('table-column传递的属性', this.prop, this.label);
        const owner = this.owner;
        const parent = this.columnOrTableParent;
        // vm.$children 当前实例的直接子组件(虚拟节点)
        // vm.$el.children 当前dom节点的直接子节点(真实dom节点)
        const children = parent.$el.children;
        const columnIndex = this.getColumnElIndex(children, this.$el);
        owner.store.commit('insertColumn', this.columnConfig);
        // console.log('888888888888', owner, parent, children, columnIndex);
        
    },

    render(h) {
        // console.log('table-column', h,  this.$slots);
        // 默认插槽,替子元素占位
        // slots 也要渲染，需要计算合并表头
        return h('div', this.$slots.default);
    }
}