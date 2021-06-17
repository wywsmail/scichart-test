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
            <div id="emailHelp" class="form-text">
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
          <div class="mb-3 text-start">
            <div for="" class="form-label">請選擇欲登入之資料庫</div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                value="v1"
                v-model="dbNum"
              />
              <label class="form-check-label" for="flexRadioDefault1"> V1 DB </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                checked
                value="v2"
                v-model="dbNum"
              />
              <label class="form-check-label" for="flexRadioDefault2"> V2 DB </label>
            </div>
          </div>
          <button type="submit" class="btn btn-primary" @click.prevent="login">
            {{ dbNum }} Log In
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useLoginFn } from "@/composition/index";
import { dbNum } from "@/composition/store";
// import { password, identifier, login } from "@/composition/store";

export default {
  setup() {
    const {
      identifier,
      password,
      // dbNum,
      isLogin,
      // token,
      // retrieveToken,
      login
      // logout
    } = useLoginFn();
    return {
      identifier,
      password,
      dbNum,
      isLogin,
      // token,
      // retrieveToken,
      login
      // logout
    };
  }
};
</script>

<style scoped></style>
