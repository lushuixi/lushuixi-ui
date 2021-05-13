<template>
    <!-- checkbox-group 
        属性: v-model双向绑定值, 且为数组类型
        方法: change事件,双向绑定的值value发生变化后的回调
        如何将checkbox-group的值传递给checkbox子组件？-- 子组件通过向上追溯找到父组件checkbxo-group
        子组件checkbox值发生变化后, 如何通知父组件checkbox-group更新value值？
    -->
    <div 
        class="ycheckbox-group"
        role="checkboxgroup">
        <!-- 替children占位 -->
        <slot></slot>
    </div>
</template>

<script>

export default {
    name: 'YCheckboxGroup',
    componentName: 'YCheckboxGroup',
    props: {
        value: {},
    }
}
</script>
