import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Diagnoses_v1/index.vue")
  },
  {
    path: "/Diagnoses_v1/:diagnosesid",
    name: "diagnosesChart_v1",
    component: () => import("../views/Diagnoses_v1/_diagnosesid.vue")
  },
  {
    path: "/Diagnoses_v2",
    name: "Diagnoses_v2",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Diagnoses_v2/index.vue")
  },
  {
    path: "/Diagnoses_v2/:diagnosesid",
    name: "diagnosesChart_v2",
    component: () => import("../views/Diagnoses_v2/_diagnosesid.vue")
  },
  {
    path: "/infinite-test",
    name: "infinite-test",
    // component: Chart
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/infinite-test.vue")
  },
  {
    path: "/testarea",
    name: "testarea",
    // component: Chart
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/testarea.vue")
  },
  {
    path: "/Login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
