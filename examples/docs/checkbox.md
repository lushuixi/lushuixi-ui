```
<template>
  <div>
    <p>checkbox</p>
    <!-- 第一种情况 -->
    <l-checkbox v-model="checkboxValue" @change="handleChange">杭州</l-checkbox>
    <!-- 第二种情况 -->
    <l-checkbox v-model="checkboxArr" label="1" @change="handleChange">杭州</l-checkbox>
    <!-- 半选中状态 -->
    <l-checkbox 
      :indeterminate="checkboxIndeterminate" 
      v-model="checkboxIndeterminateValue"
      @change="handleIndeterminate">半选中状态</l-checkbox>
      <p>inputValue: {{inputValue}}</p>
    <input
      type="checkbox"
      :value="false"
      v-model="inputValue"
     />
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkboxValue: true,
      checkboxArr: [
        '1',
        '2',
        '3',
      ],
      checkboxIndeterminate: true,
      checkboxIndeterminateValue: false,
      inputValue: "",
    }
  },
  watch: {
    checkboxValue() {
      console.log('父组件checkboxValue', this.checkboxValue)
    }
  },
  methods: {
    handleChange(data) {
      console.log('父组件change事件', data);
    },
    handleIndeterminate(data) {
      console.log('半选', data);
      // 将半选控制标识更改为false, 便可以正常选中和取消选中了
      this.checkboxIndeterminate = false;
    }
  }
}
</script>

```