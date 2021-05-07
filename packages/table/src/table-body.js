import {mapStates} from './store/helper';

export default {
    name: 'YTableBody',

    props: {
        store: {
            required: true,
        },
    },

    computed: {
        ...mapStates({
            data: 'data',
            columns: 'columns',
        })
    },

    render(h) {
        console.log('table-body', this.columns);
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
                    {
                        data.map(row => (
                            <tr>
                                {
                                    columns.map((column, cellIndex) => (
                                        <td key={cellIndex}>
                                            <div
                                                class="cell">
                                                {row[column.prop]}
                                            </div>
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    }
}