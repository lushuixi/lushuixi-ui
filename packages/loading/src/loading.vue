<template>
    <transition
        name="y-loading-fade"
        @after-leave="handleAfterLeave">
        <div 
            v-show="visible"
            class="y-loading-mask lushuixi"
            :style="{backgroundColor: background || ''}"
            :class="[
                customClass, {
                'is-fullscreen': fullscreen,
            }]">
            <div class="y-loading-spinner">
                <!-- 画图 -->
                <svg v-if="!spinner" class="circular" viewBox="25 25 50 50">
                    <circle class="path" cx="50" cy="50" r="20" fill="none"/>
                </svg>
                <p v-if="text" class="y-loading-text">{{text}}</p>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            visible: false,
            text: null,
            customClass: '', // 自定义的class
            spinner: null,  // 自定义加载图标的类名
            background: null, // 遮罩背景色
            fullscreen: true, // 是否是全局加载,默认是
        }
    },
    watch: {
        visible: {
            immediate: true,
            handler(newValue) {
                console.log('加载中...', newValue);
            },
        }
    },
    methods: {
        handleAfterLeave() {
            console.log('我爱你，你爱我，蜜雪冰城甜蜜蜜');
            this.$emit('after-leave');
        },

        setText(text) {
            this.text = text;
        },  
    },
    mounted() {
        // console.log('ths', this.close());
    }
}
</script>