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
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
// import { username, password } from "@/composition/store";

export default defineComponent({
  setup() {
    const username = ref("");
    const password = ref("");
    onMounted(() => console.log(username, password));
    return { username, password };
  },
});
</script>

<style scoped></style>
