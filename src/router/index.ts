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
		path: "/Diagnoses",
		name: "Diagnoses",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(
				/* webpackChunkName: "about" */ "../views/Diagnoses/index.vue"
			)
	},
	{
		path: "/Diagnoses/:diagnosesid",
		name: "diagnosesChart",
		component: () =>
			import(
				"../views/Diagnoses/_diagnosesid.vue"
			)
	},
	{
		path: "/hittest",
		name: "hittest",
		// component: Chart
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(
				/* webpackChunkName: "about" */ "../views/hittest.vue"
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
