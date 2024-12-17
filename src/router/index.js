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
        redirect: "/home",
        component: () => import('../views/Layout/index.vue'),
        children: [
            {
                path: "/home",
                name: 'home',
                component: () => import('../views/home/index.vue'),
                meta:{
                    title:"首页"
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

// router.beforeEach((to, from, next) => {
// 	const token = JSON.parse(localStorage.getItem('userInfo')) ? JSON.parse(localStorage.getItem('userInfo')).token : ''
// 	if(!token){
// 		if(to.path != '/login'){
// 			next({path:'/login'})
// 		}else{
// 			next()
// 		}
// 	}else{
// 		if(to.path == '/login'){
// 			next({path:'/'})
// 		}
// 	}
// 	next();
// });

export default router
