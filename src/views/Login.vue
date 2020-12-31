<template>
  <el-row type="flex" justify="center">
    <el-col :span="4">
      <h1>Login</h1>
      <el-input placeholder="请输入帳號" clearable> </el-input>
      <el-input placeholder="请输入密码" show-password clearable></el-input>
      <el-input type="submit"></el-input>
    </el-col>
  </el-row>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped></style>
