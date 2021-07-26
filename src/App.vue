<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#" @click.prevent="changePage('')">
        <img
          src="../src/assets/logo.png"
          alt=""
          width="30"
          height="24"
          class="d-inline-block align-top"
        />
        inCare
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mb-2 mb-lg-0 me-auto">
          <li class="nav-item" v-if="dbNum === 'v1'">
            <a class="nav-link" href="#" @click.prevent="changePage('Diagnoses_v1')"
              >Diagnoses(V1 DB)</a
            >
          </li>
          <li class="nav-item" v-else>
            <a class="nav-link" href="#" @click.prevent="changePage('Diagnoses_v2')"
              >Diagnoses(V2 DB)</a
            >
          </li>
        </ul>
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="changePage('switchHitTest')"
              >switchHitTest</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="changePage('infinite-test')"
              >Infinite-test</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="changePage('testarea')"
              >Test Area</a
            >
          </li>
          <li class="nav-item" v-if="!isLogin">
            <a class="nav-link" href="#" @click.prevent="changePage('login')">Log in</a>
          </li>
          <li class="nav-item" v-else>
            <a class="nav-link" href="#" @click.prevent="logout">Log out</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view v-slot="{ Component }">
    <keep-alive include="Diagnoses_v1,Diagnoses_v2">
      <component class="vies" :is="Component"></component>
    </keep-alive>
  </router-view>
  <footer class="mt-auto py-3">inCare © 2021</footer>
</template>

<script>
import { onMounted } from "vue";
import { useLoginFn } from "@/composition/index";
import router from "./router/index";
import { dbNum } from "@/composition/store";
export default {
  setup() {
    const { logout, isLogin } = useLoginFn();
    console.log(isLogin.value);
    const changePage = (to) => {
      router.push(`/${to}`);
    };
    // const dbNum = computed(() => {
    //   return localStorage.getItem("dbNum");
    // });
    onMounted(() => {
      dbNum.value = localStorage.getItem("dbNum");
    });
    // const dbNum = ref(localStorage.getItem("dbNum"));
    console.log(dbNum.value);
    return { changePage, logout, isLogin, dbNum };
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
