<template>
  <el-row type="flex" justify="center">
    <el-col :span="4">
      <h1>Login</h1>
      <el-input placeholder="请输入帳號" clearable :model="username"></el-input>
      <el-input
        placeholder="请输入密码"
        show-password
        clearable
        :model="password"
      ></el-input>
      <el-input type="submit"></el-input>
    </el-col>
  </el-row>
  <label for=""
    >帳號
    <input type="text" v-model="username" />
  </label>
  <label for=""
    >密碼
    <input type="text" v-model="password" />
  </label>
  <input type="submit" value="click" @click.prevent="login" />
</template>

<script>
import { defineComponent, ref } from "vue";
// import axios from "axios";
// import Login from "./Login.vue";
import { retrieveToken } from "../composition/store";
// import { username, password } from "@/composition/store";

export default defineComponent({
  setup() {
    const username = ref("");
    const password = ref("");
    const login = () => {
      retrieveToken(username.value, password.value);
      // console.log(username.value, password.value);
      // const loginConfig = {
      //   baseURL: "https://dev.intelliances.com/broker/medical/v2",
      //   url: "/login",
      //   header: {
      //     "Content-Type": "application/json",
      //     platform: "web"
      //   },
      //   method: "post",
      //   data: {
      //     identifier: username.value,
      //     password: password.value
      //   }
      // };
      // axios(loginConfig)
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    };
    return { username, password, login };
  }
});
</script>

<style scoped></style>
