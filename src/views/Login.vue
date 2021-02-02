<template>
  <el-row type="flex" justify="center">
    <el-col :span="4">
      <h1>Login</h1>
      <el-input
        placeholder="请输入帳號" :model="username"></el-input>
      <el-input
        placeholder="请输入密码"
        show-password
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
import { defineComponent } from "vue";
// import { useRouter } from "vue-router";
import { password, username, login } from "@/composition/store";
export default defineComponent({
  setup() {
    // const jump = () => {
    //   console.log("有嗎")
    //   const router = useRouter();
    //   router.push({ name: "diagnoses" });
    //
    return { username, password, login };
  }
});
</script>

<style scoped></style>
