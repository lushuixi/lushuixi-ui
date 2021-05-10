import {
    mapStates,
} from './store/helper';
import LayoutObserver from './layout-observer';

/**
 * th和td标签中属性colspan和rowspan有什么意义吗?
 */

const convertToRows = (columns) => {
    columns.forEach((column) => {
        column.colspan = 1;
        column.rowspan = 1;
    })

    return columns;
}

export default {
    name: "YTableHeader",

    mixins: [LayoutObserver],

    props: {
        store: {
            required: true,
        },
    },

    computed: {
        table() {
            return this.$parent;
        },

        ...mapStates({
            columns: 'columns', 
        })
    }, 

    // watch: {
    //     columns(newValue) {
    //         console.log('header-监听columns变化', newValue)
    //     },
    // },

    created() {
        console.log('created-header', this);
    },

    // updated() {
    //     console.log('table-header', this.$el)
    // },

    render(h) {
        // console.log('YTableHeader-render函数', this._l);
        // return h('span');

        let columnRows = convertToRows(this.columns);
        // console.log('columnRows', columnRows)

        /**
         * JSX支持
         * 官方文档:https://cn.vuejs.org/v2/guide/render-function.html#JSX
         * 需要安装插件:npm install @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props
         * babel-plugin-syntax-jsx, babel-plugin-transform-vue-jsx
         * 配置.babelrc: {"plugins": ["transform-object-rest-spread","transform-vue-jsx"]}
         * 
         * this._l 是一个渲染列表的函数renderList
         * 可以通过打印this._l, 查看具体函数
         * 接收两个值,第一个值是列表,第二个是渲染函数
         * 渲染函数接收两个参数: 第一个值是一列属性,第二个值是索引
         */

        return (
            <table
                class="y-table__header"
                cellspacing="0"
                cellpadding="0"
                border="0">
                    <colgroup>
                        {
                            this.columns.map(column => <col name={column.id} key={column.id} />)
                        }
                    </colgroup>
                    <thead>
                        <tr>
                            {
                                this._l(columnRows, (column, cellIndex) => (
                                    <th
                                        key={cellIndex}
                                        colspan={column.colspan}
                                        rowspan={column.rowspan}>
                                        <div
                                            class="cell">
                                            {column.label}
                                        </div>
                                    </th>
                                ))
                            }
                        </tr>
                    </thead>
            </table>
        )
    }
}