import YTree from './src/tree';

YTree.install = function(Vue) {
    Vue.component(YTree.name, YTree);
}

export default YTree;