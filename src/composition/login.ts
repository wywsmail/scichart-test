// test

import { ref } from "vue";
import router from "../router/index";
import axios from "axios";
import apiUrl from "../../api_url.global";
import { tableData, token } from "@/composition/store";

export const addFunction = () => {
  const num = ref(0);
  const add = () => {
    num.value++;
  };
  const minus = () => {
    num.value--;
  };
  return { num, add, minus };
};

export const loginFn = () => {
  const identifier = ref("");
  const password = ref("");
  const isLogin = ref(JSON.parse(localStorage.getItem("isLogin")));
  // const token = localStorage.getItem("token") || ref(null);
  const userId = localStorage.getItem("userid") || ref(null);
  const retrieveToken = (phone: string, password: string) => {
    const loginConfig: any = {
      baseURL: apiUrl.url,
      url: "/login",
      headers: {
        "Content-Type": "application/json",
        platform: "mobile"
      },
      method: "post",
      data: {
        identifier: phone,
        password: password
      }
    };
    console.log("送的資料", loginConfig);
    axios(loginConfig)
      .then(res => {
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("userid", res.data.user_id);
        localStorage.setItem("token", res.data.access_token);
        window.setTimeout(() => {
          router.push({
            name: "Diagnoses_v2"
          });
        }, 1000);
        localStorage.setItem("isLogin", JSON.stringify(true));
        isLogin.value = true;
        console.log(isLogin.value);
        console.log(token.value);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const login = () => {
    retrieveToken(identifier.value, password.value);
  };
  const logout = () => {
    window.localStorage.removeItem("userid");
    window.localStorage.removeItem("diagnosesid");
    tableData.data.length = 0;
    localStorage.setItem("isLogin", JSON.stringify(false));
    isLogin.value = false;
    console.log(isLogin.value);
    window.setTimeout(() => {
      router.push({ name: "Home" });
    }, 1000);
    console.log(userId.value);
  };
  return { identifier, password, isLogin, token, retrieveToken, login, logout };
};
