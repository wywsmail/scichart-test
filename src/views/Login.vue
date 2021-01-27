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
import { retrieveToken } from "../composition/store";

export default defineComponent({
  setup() {
    const username = ref("");
    const password = ref("");
    const login = () => {
      retrieveToken(username.value, password.value);
    };
    return { username, password, login };
  }
});
</script>

<style scoped></style>
