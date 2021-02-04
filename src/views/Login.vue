<template>
  <el-row type="flex" justify="center">
    <el-col :span="4">
      <h1>Login</h1>
      <el-input placeholder="请输入帳號" v-model="identifier"></el-input>
      <el-input
        placeholder="请输入密码"
        show-password
        v-model="password"
      ></el-input>
      <el-button width="100" size="medium" @click.prevent="login" native-type="submit">送出</el-button>
      <el-button width="100" size="medium" @click.prevent="logout" native-type="submit">登出</el-button>
    </el-col>
  </el-row>
</template>

<script>
import { defineComponent } from "vue";
import { password, identifier, login, logout } from "@/composition/store";
export default defineComponent({
  setup() {
    return { identifier, password, login, logout };
  }
});
</script>

<style scoped>
.el-button {
  width: 100%;
}
</style>
