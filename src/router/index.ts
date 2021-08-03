import {
	createRouter,
	createWebHashHistory,
	RouteRecordRaw
} from "vue-router";
import Home from "../views/Home.vue";
// import Chart from "../views/Chart.vue";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Home",
		component: Home
	},
	{
		path: "/Diagnoses_v1",
		name: "Diagnoses_v1",
		meta: {
			keepAlive: false
		},
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(
				/* webpackChunkName: "about" */ "../views/Diagnoses_v1/index.vue"
			)
	},
	{
		path: "/Diagnoses_v1/:diagnosesid",
		name: "diagnosesChart_v1",
		component: () =>
			import(
				"../views/Diagnoses_v1/_diagnosesid.vue"
			)
	},
	{
		path: "/Diagnoses_v2",
		name: "Diagnoses_v2",
		meta: {
			keepAlive: false
		},
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(
				/* webpackChunkName: "about" */ "../views/Diagnoses_v2/index.vue"
			)
	},
	{
		path: "/Diagnoses_v2/:diagnosesid",
		name: "diagnosesChart_v2",
		component: () =>
			import(
				"../views/Diagnoses_v2/_diagnosesid.vue"
			)
	},
	{
		path: "/test",
		name: "test",
		// component: Chart
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(
				/* webpackChunkName: "about" */ "../views/test.vue"
			)
	},
	{
		path: "/switchHitTest",
		name: "switchHitTest",
		// component: Chart
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(
				/* webpackChunkName: "about" */ "../views/switchHitTest.vue"
			)
	},
	{
		path: "/Login",
		name: "Login",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(
				/* webpackChunkName: "about" */ "../views/Login.vue"
			)
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router;
