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
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="changePage('Diagnoses_v1')"
              >Diagnoses(V1 DB)</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="changePage('Diagnoses_v2')"
              >Diagnoses(V2 DB)</a
            >
          </li>
        </ul>
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="changePage('testarea')"
              >Test Area</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="changePage('login_v1')"
              >Log in(V1 DB)</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Log out(V1 DB)</a>
          </li>
          <li class="nav-item" v-if="!isLogin">
            <a class="nav-link" href="#" @click.prevent="changePage('login_v2')"
              >Log in(V2 DB)</a
            >
          </li>
          <li class="nav-item" v-else>
            <a class="nav-link" href="#" @click.prevent="logout">Log out(V2 DB)</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view />
  <footer class="mt-auto py-3">inCare © 2021</footer>
</template>

<script>
import { useLoginFn } from "@/composition/index";
import router from "./router/index";
export default {
  setup() {
    const { logout, isLogin } = useLoginFn();
    const changePage = (to) => {
      router.push(`/${to}`);
    };
    return { changePage, logout, isLogin };
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
