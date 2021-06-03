### element-ui

[官网](https://element.eleme.cn/#/zh-CN/component/message)

#### message
> 使用方法
```
this.$message(options)
```

> options

| 参数                     | 说明                                          | 类型           | 可选值                     | 默认值 |
| :----------------------- | :-------------------------------------------- | :------------- | :------------------------- | :----- |
| message                  | 消息文字                                      | string / VNode | —                          | —      |
| type                     | 主题                                          | string         | success/warning/info/error | info   |
| dangerouslyUseHTMLString | 是否将 message 属性作为 HTML 片段处理         | boolean        | —                          | false  |
| duration                 | 显示时间, 毫秒。设为 0 则不会自动关闭         | number         | —                          | 3000   |
| onClose                  | 关闭时的回调函数, 参数为被关闭的 message 实例 | function       | —                          | —      |
| offset                   | Message 距离窗口顶部的偏移量                  | number         | —                          | 20     |

方法：调用 `Message` 或 `this.$message` 会返回当前 Message 的实例。如果需要手动关闭实例，可以调用它的 `close` 方法

#### 实现结构

因为`message(options)`说明message是一个函数（非组件）且接收参数`options`

##### 1. 如何实现呢？

我刚开始在packages/message/index.js，这样的话message便是一个组件而不是函数，所以在使用`message(options)`时报错`message is not a function`

```js
import YMessage from './src/main'; // 引入的是vue文件

/* istanbul ignore next */
// 在Vue.use(Message) 时调用组件上的intall
YMessage.install = function(Vue) {
    Vue.component(YMessage.name,YMessage);
};

export default YMessage;
```

导出message，src/index.js

```
import Message from '../packages/message/index.js';

const components = []

// 全局注册组件
// 在Vue.use(插件)时调用 插件.install
const install = function (Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
}

export default {
    install,
    Message,
}
```

##### 2. 看了源码

若是想让message是一个函数，就把它当成一个函数来暴漏出来

```
import YMessage from './src/main.js';
export default YMessage;
```

>  packages/message/src/main.js

```
const Message = function(options) {
	// 执行操作
};
export default Message;
```

>  packages/message/src/main.vue 负责前端展示

```
<template>
	<div 
        :class="[
        	'y-message',
             type && `y-message--${type}`,
        ]"
        :style="positionStyle"
        v-show="visible"
        role="alert">
        <slot>
          	<p v-if="!dangerouslyUseHTMLString" class="y-message__content">{{message}}</p>
            <p v-else v-html="message" class="y-message__content">{{message}}</p>
        </slot>
    </div>
</template>
```

##### 3. 那么如何让Message成为一个组件，因为要在网页上展示message的呢？

这个时候，`vm.extend() ` 来了（vm.extend 是Vue的构造器）

> packages/message/src/main.js

```
import Vue from 'vue';
import Main from './main.vue';

// 第一步:创建vue构造器
let MessageConstructor = Vue.extend(Main);
let instance;

const Message = function(options) {
	options = options || {};
	if(typeof options === 'string') {
		options = {
			message: options,
		};
	}
	
	// 第二步:实例化构造器(此时还没有el选项，也就是说还不是一个虚拟dom节点)
	instance = new MessageConstructor({
        data: options
    });
    
    // 第三步:生成el选项,从而成为一个虚拟dom节点（$mount在没有传入任何参数情况下表示在文档之外渲染并且随后挂载）
    instance.$mount();
    
    // 第四步:挂载，生成一个真实的dom节点
    document.body.appendChild(instance.$el);
    
    return instance;
}
export default Message;
```

这样就可以以函数的形式生成dom节点，从而展示message

##### 4. 如何通过`this.$message`的形式来调用呢?

> 将message挂载到Vue的原型链上，src/index.js

```
import Message from '../packages/message/index.js';

const components = []

// 全局注册组件
// 在Vue.use(插件)时调用 插件.install
const install = function (Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
    // 挂载到vue的原型链上,这样便可以在vue文件中通过this.$message来使用了
   	Vue.prototype.$message = Message;
}

export default {
    install,
    Message,
}
```

##### 5. 如何在一定时间后关闭message?

> packages/message/src/main.vue 部分代码，设置一个定时器

```js
// 设置定时器
// 在一定时间后销毁该message
startTimter() {
   // 如果duration为0则永不关闭
   if(this.duration > 0) {
       this.timer = setTimeout(() => {
           // 判断是否在关闭
           if(!this.closed) {
              this.close();
           }
       }, this.duration)
	}
},
```

> packages/message/src/main.vue 部分代码 ，如何销毁message?，使用了Vue的内置组件transition来实现单组件的过渡效果

```
// 该message离开时
handleAfterLeave() {
   // 销毁虚拟dom节点
   this.$destroy(true);

   // 销毁对应的真实dom节点
   this.$el.parentNode.removeChild(this.$el);
},
```

##### 6. 多个message如何垂直排列而不覆盖在一起呢?

> 因为message使用了fixed定位，所以只需要让后面的message的top加上上一个message的top即可实现 packages/message/src/main.js

```
let verticalOffset = options.offset || 20;
instances.forEach(item => {
	console.log('item', item.$el.offsetHeight);
    verticalOffset += item.$el.offsetHeight + 16;
});
instance.verticalOffset = verticalOffset;
```

packages/message/src/main.vue

```
// 计算属性
computed: {
	// 定义相对定位的属性
    positionStyle() {
    	return {
        	'top': `${this.verticalOffset}px`
        };
    },
},
```











