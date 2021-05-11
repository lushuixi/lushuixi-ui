import Vue from 'vue';

/**
 * 拍平数组
 * 解构数组实现:
 * - 使用三点运算符
 * - 使用apply
 * @param {Array} columns 
 * @returns Array
 */
const doFlattenColumns = (columns) => {
    const result = [];
    columns.forEach((column) => {
        if(column.children) {
            // 解构数组
            // 使用三点运算符:result.push(...doFlattenColumns(column.children));
            // 使用apply:因为apply接受数组形式的参数(传入的参数是一个一个数组项)
            result.push.apply(result, doFlattenColumns(column.children));
        } else {
            result.push(column);
        }
    });
    return result;
}

/**
 * Vue.extend 扩展实例构造器,构建组件
 * new出来的对象也就默认有构造函数中的模块
 * 为什么呢?Vue.extend到底什么意思?
 * Vue.extend是对Vue的扩展?
 * 如果再使用$mount便可以挂载到dom上了?
 */
export default Vue.extend({
    data() {
        return {
            // 公共数据
            states: {
                // 渲染的数据来源
                data: [],

                // 列属性
                _columns: [],
                // columns 保存叶子列
                columns: [],
                // originColumns
                originColumns: [],
            }
        }
    },

    methods: {
        // 更新列
        updateColumns() {
            const states = this.states;

            const _columns = states._columns || [];

            const notFixedColumns = doFlattenColumns(_columns);

            states.originColumns = _columns;

            states.columns = [].concat(notFixedColumns);

            // console.log('更新列999999',_columns, states.columns);
            // console.log('7', states.columns)
        },

        // 更新DOM
        // scheduleLayout(needUpdateColumns) {
        //     if(needUpdateColumns) {
        //         this.updateColumns();
        //     }

        //     this.table.debouncedUpdateLayout();
        // }
    }
})