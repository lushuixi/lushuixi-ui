import Vue from 'vue';
import Main from './main.vue';

/**
 * 1. Vue.extend(options) 全局API
 * options:Object
 * 这个方法返回实例自身，因而可以链式调用其它实例方法
 * 使用基础 Vue 构造器,创建一个“子类”
 * 参数是一个包含组件选项的对象
 * 
 * 使用步骤:
 *  - 创建构造器:let MessageConstructor = Vue.extend(Main);
 *  - 创建MessageConstructor的实例:let instance = new MessageConstructor();
 *  - 如果想要挂载到真实dom上,使用vm.$mount
 * 
 * 2. vm.$mount([elementOrSelector])
 * elementOrSelector可选参数
 * 
 * 如果 Vue 实例在实例化时没有收到 el 选项，
 * 则它处于“未挂载”状态,
 * 没有关联的 DOM 元素
 * 可以使用 vm.$mount() 手动地挂载一个未挂载的实例
 * 
 * 如果没有提供 elementOrSelector 参数,
 * 模板将被渲染为文档之外的的元素，并且你必须使用原生 DOM API 把它插入文档中
 * 
 * var MyComponent = Vue.extend({ // 创建构造器
 *     template: '<div>Hello!</div>'
 * })
 * new MyComponent().$mount('#app') // 创建并挂载到 #app (会替换 #app)
 * 
 * 或者在文档之外渲染并且随后挂载
 * var component = new MyComponent().$mount() // 生成一个el选项->虚拟dom节点
 * document.getElementById('app').appendChild(component.$el) -> 真实dom节点
 */
let MessageConstructor = Vue.extend(Main);

let instance;
let instances = [];
let seed = 1; 
let initZIndex = 2000;

/**
 * 定义Message
 * @param {String|Object} options 
 * @returns 
 */

const Message = function(options) {
    // debugger;
    // console.log('Message', options, this);

    // 收到参数,如何将其写入到main.vue中生成一个组件呢?
    // 这个问题会在后面提到

    // 如果当前Vue实例运行于服务器,则返回
    if(Vue.prototype.$isServer) return;

    // 如果options不存在则为空对象
    // 目的:给options设置默认值(空对象{})
    options = options || {};
    
    // 如果options是字符串
    // 把该值作为message的值
    // 也就是说,如果传入进来的options是一个字符串则为message内容
    if(typeof options === 'string') {
        options = {
            message: options
        };
    }

    // 这里使用id是为了可能有多个message被调用来保证唯一性
    // 为什么在外面这些message会共用一个seed呢?
    // 根据js作用域链原理，这些message共在一个词法环境
    // 这样的话, export default Message 相当于立即执行该函数Message(每次message调用都是立即执行message函数)
    // 类似下面的代码
    // function testSeed() { // 同在一个词法作用域
    //     let seed = 0;
    //     function fun1() { // 相当于Message
    //       console.log(seed++);
    //     }
    //     fun1(); // 相当于message
    //     fun1();
    //     fun1();
    //     fun1();
    // }
    // testSeed();
    let id = 'message_' + seed++;
    
    // 用户自定义的关闭message的回调函数
    let userOnClose = options.onClose;


    // 定义message关闭的回调函数
    options.onClose = function() {
        // 调用自身
        // 为什么在Message内部还可以使用Message外部定义的方法呢?
        // js执行上下文?
        Message.close(id, userOnClose);
    };

    // 创建MessageConstructor(vue构造器)的实例
    instance = new MessageConstructor({
        data: options
    });
    // 为什么要定义id呢?
    instance.id = id;

    // 生成el选项->虚拟dom节点,在文档之外渲染并且随后挂载
    instance.$mount();

    // 挂载到真实的dom节点
    document.body.appendChild(instance.$el);

    // 定义距离顶部的高度值以形成垂直排列的布局
    // offsetHeight=实际内容的高度+padding+border
    // clientHeight=实际内容的高度+padding(不包括水平滚动条)
    let verticalOffset = options.offset || 20;
    instances.forEach(item => {
        console.log('item', item.$el.offsetHeight);
        verticalOffset += item.$el.offsetHeight + 16;
    });
    instance.verticalOffset = verticalOffset;

    console.log('id', id, instance, verticalOffset);

    // 设置该message可见
    // 为什么可以在这里更改该message的状态呢?
    // 因为此时instance相当于是一个vue组件(一个虚拟dom节点),所以可以更改
    instance.visible = true;

    // 因为message使用了fixed定位,所以还需要设置message的zIndex
    // 依次递增以不至于被盖到下面
    // 个人使用方法
    instance.$el.style.zIndex = initZIndex ++;

    // 将实例保存起来
    // 目的:设置这些message的高度偏移量以垂直排列展示,不至于叠加显示
    instances.push(instance);

    // 返回该实例(一个vue组件,一个虚拟dom节点)
    return instance;
};

// 如果我们想通过Message.success的形式访问呢?
// 定义Message的类型
['success', 'warning', 'info', 'error'].forEach(type => {
    Message[type] = options => {
        // 为什么要重复判断options的类型呢?(Message内部也判断了)
        // 因为要设置该message的type
        // 如果是字符串,直接设置type会报错
        if(typeof options === 'string') {
            options = {
                message: options,
            };
        }

        // 定义该message的类型
        options.type = type;

        return Message(options);
    };
});

/**
 * 关闭message
 * @param {String} id
 * @param {Function} userOnClose (可选)
 * @returns 
 */
Message.close = function(id, userOnClose) {
    let len = instances.length;
    let index = -1;
    let removedHeight;

    for(let i = 0; i < len; i++) {

        console.log(i, id);

        // 如果找到对应的message, 则执行关闭后的回调
        if(id === instances[i].id) {
            // 保存销毁的message的offsetHeight
            removedHeight = instances[i].$el.offsetHeight;

            // index保存当前销毁的message
            index = i;

            // 在执行函数之前先判断是否是函数
            if(typeof userOnClose === 'function') {
                // 关闭message的回调
                userOnClose(instances[i]);
            }

            // 删除该message
            instances.splice(i, 1);

            // 退出for循环
            break;
        }
    }

    // console.log('888', len, instances,);
    // 如果len小于等于1即message队列只有一个message -> 因为只有一个,所以销毁后,不用再去更新后面的top
    // 如果index为-1,也就是message队列中没有该message -> 无需处理后面的
    // 如果index>instances.length - 1,即销毁的message是最后一个 -> 无需处理后面的
    if(len <= 1 || index === -1 || index > instances.length - 1) {
        return;
    }

    // 如果有多个message
    // 第一个message销毁后,后面的message的top值仍是原来的
    // 所以需要修改后面的top为上一个message的top
    for(let i = index; i < len - 1; i++) {
        let dom = instances[i].$el;
        // 更新该message的top
        dom.style['top'] = parseInt(dom.style['top'], 10) - removedHeight - 16 + 'px';   
    }
};

// 关闭所有的messsage
Message.closeAll = function() {
    // 倒着关闭message(依次关闭倒数第一个,这样无需去设置后面的top)
    for(let i = instances.length - 1; i >= 0; i--) {
        instances[i].close();
    }
};

export default Message;