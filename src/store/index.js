import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
        userInfo: {}
    },
	getters: {},
	mutations: {
        //登录后保存用户信息
		login(state, userInfo) {
			state.userInfo = userInfo
		},

        //本地存储取值  方法在app.js中调用。每次刷新不会丢失数据
		initUser(state) {
			state.userInfo = JSON.parse(localStorage.getItem('userInfo'));
		},

        //退出登录
		// loginOut(state) {
		// 	state.userInfo = {}
		// 	localStorage.removeItem('userInfo') //删除本地存储
		// }
    },
	actions: {},
	modules: {}
})