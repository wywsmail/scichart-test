<template>
  <!-- <el-container>
    <el-header>
      <el-row type="flex" justify="space-between">
        <el-col :span="5">
          <div id="nav">
            <el-button
              width="100"
              size="medium"
              @click.prevent="changePage('')"
              native-type="submit"
              >inCare
            </el-button>
            <el-button
              width="100"
              size="medium"
              @click.prevent="changePage('diagnoses')"
              native-type="submit"
              >Diagnoses
            </el-button>
          </div>
        </el-col>
        <el-col :span="3">
          <div id="nav">
            <el-button
              width="100"
              size="medium"
              @click.prevent="changePage('testarea')"
              native-type="submit"
              >Test Area
            </el-button>
            <el-button
              width="100"
              size="medium"
              @click.prevent="changePage('login')"
              native-type="submit"
              v-if="!isLogin"
              >Log In
            </el-button>
            <el-button
              width="100"
              size="medium"
              @click.prevent="logout"
              native-type="submit"
              v-else
              >Log Out
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main><router-view /></el-main>
    <el-footer>inCare © 2021</el-footer>
  </el-container> -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#" @click.prevent="changePage('')">inCare</a>
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
            <a class="nav-link" href="#" @click.prevent="changePage('diagnoses')"
              >Diagnoses</a
            >
          </li>
        </ul>
        <ul class="navbar-nav mb-2 mb-lg-0">
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
  <router-view />
  <footer>inCare © 2021</footer>
</template>

<script>
import { defineComponent } from "vue";
import { logout, isLogin } from "@/composition/store";
import router from "./router/index";
// import { password, identifier, login, logout } from "@/composition/store";
export default defineComponent({
  setup() {
    const changePage = (to) => {
      router.push(`/${to}`);
    };
    return { changePage, logout, isLogin };
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
