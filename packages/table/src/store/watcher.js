import Vue from 'vue';

/**
 * Vue.extend 扩展实例构造器,构建组件
 * new出来的对象也就默认有构造函数中的模块
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