/**
 * table-column:table子组件,列
 * 
 * 注意: 该文件不是vue文件,而是js文件
 * 使用jsx语言渲染dom(需要安装相应的插件以支持JSX)
 * 官方文档: https://cn.vuejs.org/v2/guide/render-function.html
 * 该js是table-column组件,那么在使用该组件时,会传递过来两个属性prop和label
 * 这两个属性要如何处理才能往columns中添加该列的属性呢？
 */
import {
    mergeOptions, 
    parseWidth,
    parseMinWidth,
    compose,
} from './utils';

import {
    defaultRenderCell,
} from './config';

let columnIdSeed = 1;

export default {
    name: 'YTableColumn',
    
    // prop传值
    props: {
        // 表格数据项字段名
        prop: String,
        property: String,
        // 标题
        label: String,
        // 列宽
        width: {},
        minWidth: {},
    },

    data() {
        return {
            isSubColumn: false,
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
        },

        // 宽度
        realWidth() {
            return parseWidth(this.width);
        },
        
        // 最小宽度
        realMinWidth() {
            return parseMinWidth(this.minWidth);
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

        // 获取child在children的位置
        getColumnElIndex(children, child) {
            // console.log('getColumnElIndex', children, child);
            return [].indexOf.call(children, child);
        },

        // 设置列宽
        setColumnWidth(column) {
            if(this.realWidth) {
                column.width = this.realWidth;
            }

            if(this.realMinWidth) {
                column.minWidth = this.realMinWidth;
            }

            if(!column.minWidth) {
                column.minWidth = 80;
            }

            column.realWidth = column.width === undefined ? column.minWidth : column.width;
            
            return column;
        },

        /**
         * 在table-column中设置列的渲染函数
         * 列的渲染是通过table-header调用的
         * @param {Object} column 
         * @returns column
         */
        setColumnRenders(column) {
            // console.log('setColumnRenders', column);
            let originRenderCell = column.renderCell;
            // console.log('setColumnRenders', originRenderCell, defaultRenderCell)

            originRenderCell = originRenderCell || defaultRenderCell;

            // 对renderCell进行包装
            column.renderCell = (h, data) => {
                let children = null;
                // console.log('renderCell', h, data, this.$scopeSlots);

                // console.log('renderCell', this.$scopedSlots, this)

                // 如果该列存在默认插槽, 则渲染默认插槽, 这样的话便使得每列的自定义渲染方式整理到table-body的每列上
                // 充分说明, table-body中单元格的渲染需要单独分离出来, 调用每列的渲染函数, 这样便使table-column中每列的自定义同步到table-body下
                // 否则只展示该列对应的数据值
                if(this.$scopedSlots.default) {
                    // vm.$scopedSlots 范文作用域插槽, 并传入数据
                    children = this.$scopedSlots.default(data);
                }else {
                    children = originRenderCell(h, data);
                }

                const props = {
                    class: 'cell',
                    style: {},
                };

                return (
                    <div {...props}>
                        {children}
                    </div>
                )
            }

            return column;
        },

        // setColumnForcedProps(column) {
        //     console.log('setColumnForcedProps', column);
        //     return column;
        // }
    },

    /**
     * 此时,this.data和this.$el都还没有值,为undefined, 也可以进行一些初始化
     * 在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。
     * beforeCreate里定义的变量不会出现在this.$data里, 相当于新建了变量
     */
    beforeCreate() {
        // console.log('beforeCreate', this.$data);
        // debugger;
        this.column = {};
        this.columnId = '';
    },

    /**
     * 在模板被渲染成html之前被调用, 即通常初始化某些属性值, 然后再渲染成视图
     * this.$el -> undefined
     * this.$data -> data的初始化值, 属性和方法的运算一级watch/event事件回调的配置均已完成
     * 此时,虚拟dom节点已生成,但是还没有渲染成真是的dom节点
     * 在执行data()方法前props属性有数据已经可以访问，watch和computed监听函数此时为null，此时this.computed里的计算属性值为undefined。data函数执行完后，watch和computed监听函数才可用，因为data函数执行完后，data函数return的属性这时才可用。然而，挂载阶段还没开始，$el 属性目前不可见。
     * 
     * 注意: 如果table下有两个table-column,则第一个table-column时,columnIdSeed值为1,
     * 但是到第二个table-column时,columnIdSeed值为2,这是为什么呢?
     * 测试了下,发现无论第几个table-column,在export default外打印值都为1且只在第一次打印了
     * 也就类似缓存下来了,export default外面定义的变量会被缓存下来,无论定义了几遍table(里面包含table-column)
     * 保证每个table-column都会有一个唯一的columnId
     * 
     * beforeCreate 
     * created:
     *  - props、data里面的变量也可以访问(均已完成初始化)
     *  - computed中的变量, 如果依赖于data里面的变量, 则为undefined; 否则可以访问
     * mounted 初始化事件操作
     * 
     * 生命周期的调试:debugger
     * 例如:
     * beforeCreate() {debugger;}
     * 参考:https://blog.csdn.net/weixin_30616969/article/details/94973817
     */
    created() {
        // debugger;
        // console.log('cre', this)
        // 定义table-column组件的columnId
        const parent = this.columnOrTableParent;
        // 是否是子列, 如果两者不相等,则是子列(直接父组件也是table-column)
        this.isSubColumn = this.owner !== parent;
        this.columnId = (parent.tableId || parent.columnId) + '_column_' + columnIdSeed++;
        // console.log('create', this.columnId);

        // 定义默认属性,暂时只有id
        const defaults = {
            id: this.columnId,
            // 对应列内容的字段名, 也可以使用 property 属性
            property: this.prop || this.property,
        }

        // 基础属性
        // const basicProps = ['label', 'prop',];
        const basicProps = ['label',];
        
        // 收集column属性
        let column = this.getPropsData(basicProps);
        column = mergeOptions(defaults, column);
        // console.log('ccc', column);

        // 注意compose(组成,构成)执行顺序是从右到左,现在chains就相当于一个函数
        // const chains = compose(this.setColumnRenders, this.setColumnWidth, this.setColumnForcedProps);
        const chains = compose(this.setColumnRenders, this.setColumnWidth);
        column = chains(column);
        // console.log('chains', chains, column, chains(column));

        // console.log('chanins', column, column.renderCell())

        this.columnConfig = column;
        
    },

    /**
     * 在模板被渲染成html之后被调用,即通常初始化页面完成后,再对html的dom节点进行一些需要的操作
     * this.$el -> undefined
     * this.$data -> data的初始化值
     * el被新创建的vm.$el替换, 并挂载到实例上去之后调用该钩子
     * 此时,虚拟dom节点已生成,且已经渲染成真实的dom节点
     * 可对dom进行初始化相关的操作
     * 但是不承诺所有的子组件也都一起被挂载。如果希望等到整个视图都渲染完毕, 可以使用$nextTick
     */
    mounted() {
        // debugger;
        // console.log('table-column传递的属性', this.prop, this.label);
        const owner = this.owner;
        const parent = this.columnOrTableParent;

        // vm.$children 当前实例的直接子组件(虚拟节点)
        // vm.$el.children 当前dom节点的直接子节点(真实dom节点)
        // 如果直父组件是table-column
        const children = this.isSubColumn ? parent.$el.children : parent.$refs.hiddenColumns.children;
        
        const columnIndex = this.getColumnElIndex(children, this.$el);
        // 甚为关键,将该列的属性存入到table的公共池中
        // 父组件table的store
        // console.log('父组件table的store', owner, owner.store);
        // console.log('columnConfig', this.columnConfig);
        owner.store.commit('insertColumn', this.columnConfig, columnIndex, this.isSubColumn ? parent.columnConfig : null);
        // console.log('888888888888', owner, parent, children, columnIndex);
        // console.log('777777777', children, parent.$refs.hiddenColumns.children)

        // console.log('777777777', this.$slots)
    },

    // render渲染
    render(h) {
        console.log('table-column', h,  this.$slots);
        // 默认插槽,替子元素占位
        // slots 也要渲染，需要计算合并表头
        // 结构比较简单, 就不用jsx了
        // 默认插槽如何渲染到table-body?
        return h('div', this.$slots.default);
    }
}