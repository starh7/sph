import Home from '/src/pages/Home/index.vue'
import Search from '/src/pages/Search/index.vue'
import Login from '/src/pages/Login/index.vue'
import Register from '/src/pages/Register/index.vue'
import Detail from '@/pages/Detail'
export default {
    routes: [
        {
            path: '/detail',
            component: Detail,
            meta: { show: true }
        },
        {
            path: '/home',
            component: Home,
            meta: { show: true }
        },
        {
            path: '/search/:keyword?',
            component: Search,
            meta: { show: true },
            name: 'search'

        },
        {
            path: '/login',
            component: Login,
            meta: { show: false }

        },
        {
            path: '/register',
            component: Register,
            meta: { show: false }

        },
        // 重定向
        {
            path: '/',
            redirect: '/home'
        }
    ],
    //页面跳转显示在顶部 
    history: createWebHashHistory(),  
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 }
    }
}