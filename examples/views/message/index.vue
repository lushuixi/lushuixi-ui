<template>
    <div>
        <y-button 
            type="primary"
            @click="handleOpenMessage">
            点击
        </y-button>
        
    </div>
</template>

<script>
// import {Message} from 'element-ui';
export default {
    methods: {
        handleOpenMessage() {
            /*
             * 报错: this.$message is not a function
             * 如何让一个组件变成一个函数?
             *  - 一个组件永远也变不成一个函数
             *  
             * 为什么我调用多次$message,会公用其seed呢?
             */
            // console.log('实例', this);
            // this.$message({
            //     message: '露水晰提示',
            //     type: 'error',
            //     duration: 0,
            // });
            this.$message.success('露水晰提示chengg')
            // setTimeout(()=>{
            //     this.$message({
            //         message: '露水晰提示2',
            //     });
            // }, 1000)
            // this.$message('露水晰提示3');
            // this.$message('露水晰提示4');

            // Message({
            //     message: '露水晰提示8888',
            //     duration: 0,
            //     type: 'error',
            //     offset: 200
            // })
            // setTimeout(()=>{
            //     Message({
            //     message: '露水晰提示7777',
            //     duration: 0,
            //     // offset: 200
            //     })
            // }, 100)
        }
    }
}
</script>