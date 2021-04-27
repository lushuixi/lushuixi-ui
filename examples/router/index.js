import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../views/index.vue';
Vue.use(VueRouter);

export default  new  VueRouter({
    routes: [
        {
            path:'/',
            redirect: '/index',
        },
        {
            path: '/index',
            component: Index,
        }
    ]
})