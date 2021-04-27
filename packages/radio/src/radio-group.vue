<template>
    <!-- 第二步，radiogroup, 下面有radio子组件
        父组件会传递过来一个 v-model 即 value和input事件
        radio-group组件要把该value值传递给子组件radio
        子组件radio中该值发生变化，要通知radio-group，radio-group再通过input事件通知父组件
        如何把value值双向绑定给子组件呢？--
        element-ui 2.15.1 通过组件radio向上追溯判断父组件是否是radio-group, 如果是的话, 则取radio-group的value值
     -->
    <div
        class="l-radio-group"
        role="rolegroup">
        <!-- 并没有给子组件传递方法更新value值，那么子组件radio是如何通知父组件radio-group更新呢？(使用混入mixins的dispatch方法向上冒泡) -->
        <slot></slot>
    </div>
</template>

<script>
export default {
    
    name: 'LRadioGroup',

    componentName: 'LRadioGroup',

    props: {
        value: {},
    },

    created() {
        /**
         * this.$on 监听当前实例上的自定义事件。
         * 事件可以由 this.$emit 触发。
         * 回调函数会接收所有传入事件触发函数的额外参数。
         * 事实上, 子组件radio在调用的父组件radio-group的handleChange方法, 在radio-group没有显示定义
         */
        this.$on('handleChange', value => {
            console.log('radio-group监听handleChange发生了变化', value);
            // 通知父组件更新双向绑定的值
            this.$emit('input', value);
        })
    },

    mounted() {
        console.log('变化了', this.value, this.$slots);
    }

}
</script>