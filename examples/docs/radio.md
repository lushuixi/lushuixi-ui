```
<template>
    <div>
        <p>raodio</p>
        <l-radio v-model="radioValue" label="1">杭州</l-radio>
        <l-radio v-model="radioValue" label="2">上海</l-radio>
    </div>
</template>

<script>

export default {
  data() {
    return {
      radioValue: "1",
    };
  },
  watch: {
    radioValue() {
      console.log('父组件radioValue', this.radioValue)
    }
  }
};
</script>
```