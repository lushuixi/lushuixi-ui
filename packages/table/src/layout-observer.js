/**
 * 混入布局观察器
 */
export default {

    computed: {
        // 表格布局属性
        tableLayout() {
            let layout = this.layout;
            // console.log('tableLayout', layout);

            if(!layout && this.table) {
                layout = this.table.layout;
            }

            // 如果还是没有则抛出错误
            if(!layout) {
                throw new Error('Can not find table layout.');
            }

            return layout;
        }
    },

    methods: {
        /**
         * 设置colgroup中的col的width属性
         * 
         * vue:获取当前组件所在的真实dom this.$el
         * js:获取dom节点方式之一
         * js:获取匹配指定css选择器的所有元素 querySelectorAll (querySelector获取匹配到的第一个元素)
         * js:获取dom属性 getAttribute
         * js:设置dom属性 setAttribute
         * @param {Object} layout 
         * @returns undefined
         */
        onColumnsChange(layout) {
            console.log('layout', layout);

            // 获取真实dom, 通过querySelectorAll筛选
            // querySelectorAll方法返回文档中匹配指定 CSS 选择器的所有元素，返回 NodeList 对象
            const cols = this.$el.querySelectorAll('colgroup > col');
            // console.log('77', cols, this.columns);
            
            const flattenColumns = this.columns;
            const columnsMap = {};

            flattenColumns.forEach((column) => {
                columnsMap[column.id] = column;
            })
            // console.log('flatcolumnsMaptenColumns', columnsMap)
            
            if(!cols.length) return;

            for(let i = 0, j = cols.length; i < j; i++) {
                const col = cols[i];
                const name = col.getAttribute('name');
                const column = columnsMap[name];
                // console.log(i, col, name, columnsMap, column);
                
                if(column) {
                    col.setAttribute('width', column.realWidth || column.width);
                }
            }
        }
    },

    mounted() {
        // console.log('哈喽', this.tableLayout, this);

        this.onColumnsChange(this.tableLayout);
    },

    updated() {
        console.log('模块更新', this.$el);
        this.onColumnsChange(this.tableLayout);
    }

}