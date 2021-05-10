/**
 * 混入布局观察器
 * LayoutObserver布局观察器
 * 用于表格布局组件: table-header和table-body
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
         * 通过控制colgroup中的col的宽度来绑定table单元格的宽度
         * 通过使用colgroup标签, 向整个列应用样式, 而不需要重复为每个单元格或每一行设置样式
         * col属性:
         * - width:规定单元格的宽度
         * th/td属性高:
         * - colspan:规定单元格可横跨的列数
         * - rowspan:规定单元格可横跨的行数
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
            // console.log('layout', layout);

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

    created() {
        // console.log('cr', this.tableLayout);
        
        // 添加观察器
        this.tableLayout.addObserver(this);
    },

    mounted() {
        // console.log('哈喽', this.tableLayout, this);

        this.onColumnsChange(this.tableLayout);
    },

    updated() {
        // console.log('模块更新', this.$el);
        this.onColumnsChange(this.tableLayout);
    },

    /**
     * 为什么要destoryed?
     * 
     * Vue中父子组件的生命周期?
     */
    destroyed() {
        // 移出观察器
        this.tableLayout.removeObserver(this);
    },

}