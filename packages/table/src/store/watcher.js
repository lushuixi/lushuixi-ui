import Vue from 'vue';

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
                columns: [],
            }
        }
    },

    methods: {

    }
})