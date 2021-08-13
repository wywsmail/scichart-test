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
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router;
