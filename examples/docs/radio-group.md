```
<template>
    <div>
        <p>raodio-group 静态绑定radio的label</p>
        <!-- 第一步，这里需要注意一下，Vue中的prop传值时加冒号和不加v-binde的区别
            <l-radio label="1"></l-radio> 不加冒号, 是String类型 1+1=11
            <l-radio :label="1"></l-radio> 加冒号, 是Number类型 1+label=2
            加冒号，表示这是一个 JavaScript 表达式而不是一个字符串
            不加冒号，表示这是一个字符串
            只有传递字符串常量时，不采用v-bind形式，其余情况均采用v-bind形式传递（不加v-bind时，vue就认为此时通过prop传递给组件的是字符串常量）
            Vue 为什么要这样设计呢？v-bind的设计有什么意义？
            所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。
            这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。
            prop 官方文档: https://cn.vuejs.org/v2/guide/components-props.html
        -->
        <l-radio-group v-model="radioGroupValue">
            <l-radio label="1">男</l-radio>
            <l-radio label="2">女</l-radio>
            <l-radio label="3">未知</l-radio>
        </l-radio-group>

        <p>raodio-group 动态绑定radio的label</p>
        <l-radio-group v-model="radioGroupValue">
            <l-radio :label="1">男</l-radio>
            <l-radio :label="2">女</l-radio>
            <l-radio :label="3">未知</l-radio>
        </l-radio-group>
    </div>
</template>

<script>

export default {
  data() {
    return {
      radioGroupValue: "1",
    };
  },
  watch: {
    radioGroupValue() {
      console.log('父组件radioGroupValue', this.radioGroupValue)
    }
  }
};
</script>
```