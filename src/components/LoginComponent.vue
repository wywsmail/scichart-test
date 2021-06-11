<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-4">
        <form>
          <div class="mb-3 text-start">
            <label for="exampleInputEmail1" class="form-label">請輸入帳號</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="identifier"
            />
            <div id="emailHelp" class="form-text ç">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div class="mb-3 text-start">
            <label for="exampleInputPassword1" class="form-label">請輸入密碼</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              v-model="password"
            />
          </div>
          <button type="submit" class="btn btn-primary" @click.prevent="login">
            Log In
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useLoginFn } from "@/composition/index";
// import { password, identifier, login } from "@/composition/store";

export default {
  setup() {
    const {
      identifier,
      password,
      // isLogin,
      // token,
      // retrieveToken,
      login
      // logout
    } = useLoginFn();
    return {
      identifier,
      password,
      // isLogin,
      // token,
      // retrieveToken,
      login
      // logout
    };
  }
};
</script>

<style scoped></style>
