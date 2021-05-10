import {
    mapStates,
} from './store/helper';
import {
    getRowIdentity,
} from './utils';
import LayoutObserver from './layout-observer';

export default {
    name: 'YTableBody',

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
            data: 'data',
            columns: 'columns',
        })
    },
    
    methods: {
        /**
         * 获取行的key
         * @param {*} row 
         * @param {*} index 
         * @returns 
         */
        getKeyOfRow(row, index) {
            const rowKey = this.table.rowKey;
            // console.log('rowKey', rowKey, row)
            
            if(rowKey) {
                return getRowIdentity(row, rowKey);
            }
            return index;
        },

        /**
         * 
         * @param {Number} index 索引 
         */
        isColumnHidden(index) {
            console.log('isColumnHidden', index);
        },

        /**
         * 获取span值
         * @param {*} row 
         * @param {*} column 
         * @param {*} rowIndex 
         * @param {*} columnIndex 
         * @returns 
         */
        getSpan(row, column, rowIndex, columnIndex) {
            // console.log('getSpan', row, column, rowIndex, columnIndex);
            let rowspan = 1;
            let colspan = 1;
            return {
                rowspan, colspan
            };
        },
        
        /**
         * 
         * @param {Object} row 行数据
         * @param {Number} $index 索引
         */
        rowRender(row, $index) {
            // console.log('rowRender', row, $index, this);
            const {columns} = this;
            // const columnsHidden = columns.map((column, index) => this.isColumnHidden(index));
            return (<tr
                key={this.getKeyOfRow(row, $index)}>
                {
                    columns.map((column, cellIndex) => {
                        const {rowspan, colspan} = this.getSpan(row, column, $index, cellIndex);
                        if(!rowspan || !colspan) {
                            return null;
                        }
                        const columnData = {...column};
                        // console.log('里面', column, columnData)
                        const data = {
                            store: this.store,
                            column: columnData,
                            row,
                            $index,
                        };
                        return (
                            <td
                                rowspan={rowspan}
                                colspan={colspan}>
                                {
                                    column.renderCell.call(
                                        this._renderProxy, // 何意?
                                        this.$createElement, // 何意?
                                        data, // 接受的参数
                                    )
                                }
                            </td>
                        )
                    })
                }
            </tr>);
        },

        /**
         * 
         * @param {Object} row 行数据
         * @param {Number} $index 索引
         */
        wrappedRowRender(row, $index) {
            // console.log('wrappedRowRender', row, $index);
            return this.rowRender(row, $index);
        }
    },

    // watch: {
    //     columns(newValue) {
    //         console.log('body-监听columns变化', newValue)
    //     },
    // },

    // updated() {
    //     console.log('table-body', this.$el)
    // },

    render(h) {
        // console.log('table-body', this.columns);
        const data = this.data || [];
        const columns = this.columns || [];
        // data.reduce((acc, row) => {
        //     console.log(acc, row)
        // }, [])
        return (
            <table
                class="y-table__body"
                cellspacing="0"
                cellpadding="0"
                border="0">
                <colgroup>
                    {
                        columns.map(column => <col name={column.id} key={column.id} />)
                    }
                </colgroup>
                <tbody>
                    {/* table基础结构 */}
                    {/* {
                        data.map(row => (
                            <tr>
                                {
                                    columns.map((column, cellIndex) => (
                                        <td key={cellIndex}>
                                            <div
                                                class="cell">
                                                {row[column.property]}
                                            </div>
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    } */}
                    {/* table基础结构补充一 */}
                    {
                        data.reduce((acc, row) => {
                            return acc.concat(this.wrappedRowRender(row, acc.length))
                        }, [])
                    }
                </tbody>
            </table>
        )
    }
}