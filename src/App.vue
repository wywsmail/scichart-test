<template>
  <el-container>
    <el-header>
      <el-row type="flex" justify="space-between">
        <el-col :span="5">
          <div id="nav">
            <el-button width="100" size="medium" @click.prevent="changePage('')" native-type="submit">inCare</el-button>
            <el-button width="100" size="medium" @click.prevent="changePage('diagnoses')" native-type="submit">Diagnoses</el-button>
          </div>
        </el-col>
        <el-col :span="3">
          <div id="nav">
            <el-button width="100" size="medium" @click.prevent="changePage('login')" native-type="submit" v-if="!isLogin">Log In</el-button>
            <el-button width="100" size="medium" @click.prevent="logout" native-type="submit" v-else>Log Out</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main><router-view /></el-main>
    <el-footer>inCare © 2021</el-footer>
  </el-container>
</template>

<script>
import { defineComponent } from "vue";
import { logout, isLogin } from "@/composition/store";
import router from "./router/index";
// import { password, identifier, login, logout } from "@/composition/store";
export default defineComponent({
  setup() {
    const changePage = to =>{
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
