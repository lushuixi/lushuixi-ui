## 1 loading

### 1.1 需求说明
实现加载数据时动效显示
```vue
<template>
    <transition
        name="y-loading-fade"
        @after-leave="handleAfterLeave">
        <div 
            v-show="visible"
            class="y-loading-mask"
            :style="{backgroundColor: background || ''}"
            :class="[
                customClass, {
                'is-fullscreen': fullscreen,
            }]">
            <div class="y-loading-spinner">
                <svg v-if="!spinner" class="circular" viewBox="25 25 50 50">
                    <circle class="path" cx="50" cy="50" r="20" fill="none"/>
                </svg>
                <p v-if="text" class="y-loading-text">{{text}}</p>
            </div>
        </div>
    </transition>
</template>
```

### 1.2 两种类型
根据父亲节可将加载分两种,全局加载和局部加载。全局加载以document.body为父节点,局部加载以options.target为父节点。

#### 全局loading
父节点:documnet.body

#### 局部loading
父节点:loading传入的参数options.target

### 1.3 加载参数

options

| 参数       | 说明                                                         | 类型          | 可选值 | 默认值        |
| ---------- | ------------------------------------------------------------ | ------------- | ------ | ------------- |
| taeget     | loading需要覆盖的dom节点。可传入一个dom对象或字符串；若传入字符串，则会将其作为参数传入document.querySelectory以获取到对应dom节点 | object/string | -      | document.body |
| spinner    | 是否显示加载图标                                             | string        | -      | null          |
| background | 遮罩背景色                                                   | string        | -      | null          |
| text       | 显示在加载图标下方的加载文案                                 | string        | -      | null          |
| fullscreen | 是全局加载还是局部加载                                       | boolean       | -      | true          |

### 1.4 调用方式

#### 1.4.1 this.$loading(options)
将loading挂载到Vue的原型链上
```js
Vue.prototype.$loading = Loading.service;
```
例如(调用loading, 且隔3s关闭loading)
```vue
let loading = this.$loading({text: '加载中...',});
setTimeout(() => {
    loading.close(); // 关闭loading
}, 3000);
```

#### 1.4.2 指令
注册v-loading指令,通过指令v-loading的形式调用
```js
// 注册自定义指令
Vue.directive('loading', {
    bind: function(el, binding, vnode) {
        const textExr = el.getAttribute('loading-text');
        const spinnerExr = el.getAttribute('loading-spinner');
        const backgroundExr = el.getAttribute('loading-background');
            
        const vm = vnode.context;
            
        const mask = new Mask({
            el: document.createElement('div'),
            data: {
                text: vm && vm[textExr] || textExr,
                spinner: vm && vm[spinnerExr] || spinnerExr,
                backgrond: vm && vm[backgroundExr] || backgroundExr,
                fullscreen: !!binding.modifiers.fullscreen,
            },
        });

        el.instance = mask;
        el.mask = mask.$el;
        el.maskStyle = {};

        binding.value && toggleLoading(el, binding);
    },

    update: function(el, binding) {
        el.instance.setText(el.getAttribute('loading-text'));
        if(binding.oldValue !== binding.value) {
            toggleLoading(el, binding);
        }
    },

    unbind: function(el, binding) {
        if(el.domInserted) {
            el.mask &&
            el.mask.parentNode &&
            el.mask.parentNode.removeChild(el.mask);

            toggleLoading(el, {
                value: false,
                modifiers: binding.modifiers,
            });
        }
        el.instance && el.instance.$destroy();
    },
});
```
例如(通过指令调用loading, 还可定义修饰对象, 例 v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true })
```
<template>
    <div>
        <p class="test" v-loading="loadingFlag" loading-text="测试v-loading指令">测试v-loading指令</p>
        <!-- <p class="test" v-loading.body="loadingFlag" loading-text="测试v-loading指令">测试v-loading指令</p> -->
        <!-- <p class="test" v-loading.body.fullscreen="loadingFlag" loading-text="测试v-loading指令">测试v-loading指令</p> -->
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
    created() {
        this.name = "露水晰";
    },
    mounted() {
        setTimeout(() => {
            this.loadingFlag = false;
        }, 1000);
    },
}
</script>

<style scoped>
</style>
```

### 1.5 学知识

#### 1.5.1 vue2.x自定义指令
[官方文档](https://cn.vuejs.org/v2/guide/custom-directive.html)


#### 1.5.2 javascript元素的className属性与classList属性区别
className属性与classList属性同为Dom属性且都管理class类的值
不同的是classList属性值为特殊的DOMTokenList对象, 而className属性的值为普通的字符串(多个类名以空格为分割符)
兼容性:铁打的IE从9之前完全不支持classList属性，从版本10开始支持该属性，但不支持add与remove方法,其他浏览器支持该属性且支持其带的方法add与remove

> 判断指定节点是否存在指定类名

```
/**
 * 判断指定节点是否存在指定类名
 * @param {Node} el 元素节点
 * @param {String} cls class名
 * 
 * @returns boolean
 * false:不存在
 * true:存在
 * 
 * jQuery
 * $.contains(container, contained): 判断指定元素内是否包含另一个元素
 * 
 * 为什么Vue可以使用contains方法呢?
 * 难道是因为Vue本身已引入jQuery了吗？
 * 
 * className属性与classList属性:
 * className属性与classList属性同为Dom属性且都管理class类的值，
 * 不同的是classList属性值为特殊的DOMTokenList对象，
 * 而className属性的值为普通的字符串
 * 
 * 考虑到兼容性问题,两者同时使用
 * 铁打的IE从9之前完全不支持classList属性，从版本10开始支持该属性，但不支持add与remove方法
 * 
 */
export function hasClass(el, cls) {
    // 参数不为空的校验
    if(!el || !cls) return false;

    // 类名cls是否包含空格符,检验
    if(cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');

    // 判断节点el是否存在cls的类名
    // 如何判断
    // 两种方式: el.className.split(' ') | el.classList
    
    // classList属性的值为DOMTokenList对象，关于DOMTokenList官方解释是一组空格分隔的标记，与Array一样具有length属性，且索引从0开始，但无法使用Array对象的方法。
    // 不过DOMTokenList对象内置了add，remove，contains等方法，用于增删改查等操作；所以我们可以使用add，remove像JQ中addClass与removeClass方法一样操作class类
    if(el.classList) {
        // classList自带的contains,是否包含该类名,如果包含则返回true,否则返回false
        return el.classList.contains(cls);
    } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
}
```


> 对指定元素节点添加类名(若有多个,以空格分割)

```
/**
 * 对指定元素节点添加类名(若有多个,以空格分割)
 * 
 * el.classList 支持add, remove
 * 
 * @param {Node} el 元素节点
 * @param {String} cls class类名
 */
export function addClass(el, cls) {
    if(!el) return;
    let curClass = el.className;
    let classes = (cls || '').split(' ');
    
    for(let i = 0, j = classes.length; i < j; i++) {
        let className = classes[i];
        if(!className) return;

        if(el.classList) {
            el.classList.add(className);
        } else if(!hasClass(el, className)) {
            curClass += ' ' + className;
        }
    }

    if(!el.classList) {
        el.className = curClass;
    }
}
```

> 移出指定节点的指定class(可添加多个)

```
/**
 * 移出指定节点的指定class(可添加多个)
 * 
 * @param {Node} el 元素节点
 * @param {String} cls class名(单个或多个,多个以空格为分隔符)
 */
export function removeClass(el, cls) {
    if(!el || !cls) return;

    let classes = cls.split(' ');
    let curClass = ' ' + el.className + ' ';

    // 判断节点el是否存在cls的类名
    // 如果存在,则移除
    // 如果不存在,则返回

    for(let i = 0, j = classes.length; i < j; i++) {
        let clsName = classes[i];

        if(!clsName) continue;

        if(el.classList) {
            // 如果浏览器兼容classList
            el.classList.remove(clsName);
        } else if(hasClass(el, clsName)) {
            // 如果浏览器不兼容classList
            // 去除指令的类名
            curClass = curClass.replace(' ' + clsName + ' ', '');
        }
    }

    if(!el.classList) {
        // 如果浏览器不兼容classList
        el.className = trim(curClass);
    }
}
```

