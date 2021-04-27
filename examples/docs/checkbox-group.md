```
<template>
  <div>
    <p>checkbox-group</p>
    <l-checkbox-group v-model="checkboxGroupOptions" @change="handleCheckboxChange">
      <l-checkbox
        v-for="(item, index) in checkboxGroupPem" 
        :key="index" 
        :label="item.id">
        {{item.name}}
      </l-checkbox>
    </l-checkbox-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkboxGroupOptions: ["1"],
      checkboxGroupPem: [
        {
          id: "1",
          name: '杭州',
        },
        {
          id: "2",
          name: '上海',
        },
        {
          id: "3",
          name: '北京',
        }
      ],
    }
  },
  methods: {
    handleCheckboxChange(data) {
      console.log('handleCheckboxChange', data);
    }
  },
  watch: {
    checkboxGroupOptions() {
      console.log('checkboxGroupOptions', this.checkboxGroupOptions)
    }
  }
}
</script>
```