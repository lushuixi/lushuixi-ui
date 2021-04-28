import YTable from './src/table';

YTable.install = function (Vue) {
    Vue.component(YTable.name, YTable);
};

export default YTable;