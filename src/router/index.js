// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '/src/pages/Home/index.vue'
import Search from '/src/pages/Search/index.vue'
import Login from '/src/pages/Login/index.vue'
import Register from '/src/pages/Register/index.vue'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'

// 二级路由
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'

// 引入store
import store from '@/store'
// import routes from './router'

// NavigationDuplicated 产生原因和解决方法
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)
let router = new VueRouter({
    routes: [
        {
            path: '/center',
            component: Center,
            meta: { show: true },
            children: [
                {
                    path: 'myorder',
                    component: myOrder
                },
                {
                    path: 'grouporder',
                    component: groupOrder
                },
                {
                    path: '/center',
                    redirect: "/center/myorder"
                }
            ]
        },
        {
            path: '/paysuccess',
            component: PaySuccess,
            meta: { show: true }
        },
        {
            path: '/pay',
            component: Pay,
            meta: { show: true },
            // 路由守卫
            beforeEnter: (to, from, next) => {
                if(from.path == '/trade'){
                    next()
                }else{
                    next(false)
                }

            }
        },
        {
            path: '/trade',
            component: Trade,
            meta: { show: true },
            // 路由守卫
            beforeEnter: (to, from, next) => {
                if(from.path == '/shopcart'){
                    next()
                }else{
                    next(false)
                }

            }
        },
        {
            path: '/shopcart',
            component: ShopCart,
            meta: { show: true }
        },
        {
            path: '/addcartsuccess',
            name: 'addcartsuccess',
            component: AddCartSuccess,
            meta: { show: true }
        },
        {
            path: '/detail/:skuid',
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
    ]
})
// 全局路由守卫
router.beforeEach(async (to, from, next) => {
    // next()
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    // 如果登入了
    if (token) {
        // 去的是login不行
        if (to.path == '/login') {
            next('/home')
        } else {
            // 去别的页面
            if (name) {
                // 有用户信息放行
                next()
            } else {
                // 无用户信息
                try {
                    await store.dispatch('userInfo')
                    next()
                } catch (error) {
                    // token失效从新登入
                    await store.dispatch('logout')
                    next('/login')

                }

            }

        }
    } else {
        // 未登入放行
        // 如果未登入跳转到trade/pay/center跳转到登入
        if (to.path.indexOf('/trade') != -1 || to.path.indexOf('/pay') != -1 || to.path.indexOf('/center') != -1) {
            next("/login?path=" + to.path)
        } else {
            next()
        }
    }

})

export default router