/**
 * table-header:table子组件,表头
 */

import {
    mapStates,
} from './store/helper';
import LayoutObserver from './layout-observer';

/**
 * th和td标签中属性colspan和rowspan有什么意义吗?
 * - colspan 规定单元格横跨列数
 * - rowspan 规定单元格横跨行数
 */

/**
 * 将带有children字段的数组, 拉出来(但是不将children字段砍掉)
 * @param {Array} columns 
 * @returns Array
 */
const getAllColumns = (columns) => {
    const result = [];

    columns.forEach((column) => {
        result.push(column);
        if(column.children) {
            // 解构数组
            // 三点运算符:result.push(...getAllColumns(columns.children));
            // 利用apply接收数组形式的传参
            result.push.apply(result, getAllColumns(column.children));
        }
    })

    return result;
}

/**
 * 将列数组扁平化
 * maxLevel:列的最大深度
 * level:列所在第几层
 * rowspan:列所在的层到最底层的深度
 * colspan:如果有嵌套子列,则取自嵌套子列的长度;否则取1
 * 对象赋值传入的是地址, 所以不需要renturn
 * @param {Array} originColumns 
 * @returns Array
 */
const convertToRows = (originColumns) => {
    // console.log('originColumns', originColumns);
    /**
     * 如果有children字段, rowspan = children.length === 0 ? 1 : chldren.length
     * 还需要将这样的列给整成一个数组,扁平的数组
     */

    // 记录最大深度
    let maxLevel = 1;

    const traverse = (column, parent) => {
        // 定义自己的列深度
        if(parent) {
            column.level = parent.level + 1;
            if(maxLevel < column.level) {
                maxLevel = column.level;
            }
        }

        // 定义自己的colspan
        if(column.children) {
            let colspan = 0;
            column.children.forEach((subColumn) => {
                traverse(subColumn, column);
                colspan += subColumn.colspan;
            })
            column.colspan = colspan;
        } else {
            column.colspan = 1;
        }
    }

    // 遍历一级的,一级没有父列
    originColumns.forEach((column) => {
        column.level = 1;
        traverse(column);
    });

    /**
     * 定义一个空数组,即返回的数组的初始化
     * maxLevel 记录嵌套列的深度, 也是返回数组的长度
     * 
     * 根据column的level来保存
     * 如果某列的level为2,则将其push到rows[1]中
     * 所以需要将嵌套的子列磨平
     */
    const rows = [];
    for(let i = 0; i < maxLevel; i++) {
        rows.push([]);
    }

    /**
     * 由于数组originColumns可能是
     * 如果是嵌套列, 则originColumns项中有children(子列)
     * 需要将其变成一维的(树型->一维数组)
     */
    const allColumns = getAllColumns(originColumns);

    // 计算列的rowspan
    allColumns.forEach((column) => {
        // 定义列的rowspan
        if(!column.children) {
            // 这里是取自该列所在层(包括自身层)到最底层的深度
            column.rowspan = maxLevel - column.level + 1;
        } else {
            // 叶子层, 最底层
            column.rowspan = 1;
        }

        // 保存至rows, 根据列层level
        rows[column.level - 1].push(column);
        // console.log('8', column, rows);
    })
    // console.log('col', originColumns, maxLevel, getAllColumns(originColumns));

    return rows;
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

    // created() {
        // console.log('created-header', this);
    // },

    // updated() {
    //     console.log('table-header', this.$el)
    // },

    render(h) {
        // console.log('YTableHeader-render函数', this._l);
        // return h('span');
        const originColumns = this.store.states.originColumns;
        const columnRows = convertToRows(originColumns);
        // console.log('columnRows', originColumns);

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
                        {/* 没有嵌套子列 */}
                        {/* <tr>
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
                        </tr> */}
                        {/* 可能含有嵌套子列 */}
                        {
                            this._l(columnRows, (columns, rowIndex) => 
                                <tr
                                    key={rowIndex}>
                                    {
                                        columns.map((column, cellIndex) => (<th
                                            colspan={column.colspan}
                                            rowspan={column.rowspan}
                                            key={column.id}>
                                            <div
                                                class="cell">
                                                {column.label}
                                            </div>
                                        </th>))
                                    }
                                </tr>)
                        }
                    </thead>
            </table>
        )
    }
}