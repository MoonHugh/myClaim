import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{
			// 首页
			path: '/',
			name: 'default',
			component: resolve => require(['../page/index.vue'], resolve)
		},
		{
			// 首页
			path: '/index',
			name: 'index',
			component: resolve => require(['../page/index.vue'], resolve)
		},
		{			
			// 历史理赔
			path: '/historyClaim',
			name: 'historyClaim',
			component: resolve => require(['../page/historyClaim.vue'], resolve)
		}
	]
})
