// element-ui 学习参考: https://zhuanlan.zhihu.com/p/94540894, https://zhuanlan.zhihu.com/p/94540894, https://segmentfault.com/a/1190000015884948
import Button from '../packages/button/index.js';
import Radio from '../packages/radio/index.js';
import RadioGroup from '../packages/radio-group/index.js';
import Checkbox from '../packages/checkbox/index.js';
import CheckboxGroup from '../packages/checkbox-group/index.js';
import Table from '../packages/table/index.js';
import TableColumn from '../packages/table-column/index.js';
import Tree from '../packages/tree/index.js';
import Message from '../packages/message/index.js';
import Loading from '../packages/loading/index.js';

const components = [
    Button,
    Radio,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
    Table,
    TableColumn,
    Tree,
]

// 全局注册组件
// 在Vue.use(插件)时调用 插件.install
const install = function (Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });

    // 注册loading指令
    Vue.use(Loading.directive);

    // 挂载到vue的原型链上
    // 这样便可以在vue文件中通过this.$message来使用了
    Vue.prototype.$message = Message;
    // console.log('vue', Vue.prototype);

    // 挂载-加载
    Vue.prototype.$loading = Loading.service;
}

export default {
    install,
    Button,
    Radio,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
    Table,
    TableColumn,
    Tree,
    Message,
    Loading,
}