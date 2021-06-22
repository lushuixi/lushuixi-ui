<template>
    <div>
        {{name}}
        <!-- <p class="test" v-loading="loadingFlag" loading-text="测试v-loading指令">测试v-loading指令</p> -->
        <p class="test" v-loading.body="loadingFlag" loading-text="路水系">测试v-loading指令</p>
        <!-- <p class="test" v-loading.body.fullscreen="loadingFlag" loading-text="路水系">测试v-loading指令</p> -->
        <h4>我爱你，你爱我，蜜雪冰城甜蜜蜜</h4>
        <h4>我爱你，你爱我，蜜雪冰城甜蜜蜜</h4>
        <h4>我爱你，你爱我，蜜雪冰城甜蜜蜜</h4>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loadingFlag: true,
        }
    },
    watch: {
        loadingFlag: {
            immediate: true,
            handler(newValue) {
                console.log('newValue', newValue);
            },
        },
    },
    beforeCreate() {
        this.name = "露水晰";
    },
    mounted() {
        // let loading = this.$loading({text: '加载中...'});
        setTimeout(() => {
            // console.log('loading', loading);
            // loading.close();
            console.log('首页首页首页', this.loadingFlag);
            // this.loadingFlag = false;
        }, 1000);
    },
}
</script>

<style scoped>
.test {
    position: relative;
    height: 120px;
}
</style>