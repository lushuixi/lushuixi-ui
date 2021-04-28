import YTableColumn from '../table/src/table-column';

YTableColumn.install = function (Vue) {
    Vue.component(YTableColumn.name, YTableColumn);
};

export default YTableColumn;