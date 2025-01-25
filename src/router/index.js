import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/index.vue')
    },
    {
        path: '/',
        name: 'Layout',
        redirect: "/Home",
        component: () => import('../views/Layout/index.vue'),
        children: [
            {
                path: "/Home",
                name: 'Home',
                component: () => import('../views/Home/index.vue'),
                meta:{
                    title:"首页"
                }
            },
            {
                path: "/Classify",
                name: 'Classify',
                component: () => import('../views/Classify/index.vue'),
                meta:{
                    title:"分类"
                }
            },
            {
                path: "/Cart",
                name: 'Cart',
                component: () => import('../views/Cart/index.vue'),
                meta:{
                    title:"购物车"
                }
            },
            {
                path: "/My",
                name: 'My',
                component: () => import('../views/My/index.vue'),
                meta:{
                    title:"我的"
                }
            },
        ]
    }
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
	const token = JSON.parse(localStorage.getItem('userInfo')) ? JSON.parse(localStorage.getItem('userInfo')).token : ''
	if(!token){
		if(to.path != '/login'){
			next({path:'/login'})
		}else{
			next()
		}
	}else{
		if(to.path == '/login'){
			next({path:'/'})
		}
	}
	next();
});

export default router
