// test

import { ref } from "vue";
import router from "../router/index";
import axios from "axios";
import apiUrl from "../../api_url.global";
import { tableData, token, dbNum, isLogin } from "@/composition/store";

export const loginFn = () => {
  const identifier = ref("");
  const password = ref("");
  const userId = localStorage.getItem("userid") || ref(null);
  const retrieveToken = (phone: string, password: string, dbNum: string) => {
    const loginConfig: any = {
      baseURL: apiUrl.url + dbNum,
      url: "/login",
      headers: {
        "Content-Type": "application/json",
        platform: dbNum === "v1" ? "web" : "mobile"
      },
      method: "post",
      data: {
        identifier: phone,
        password: password
      }
    };
    axios(loginConfig)
      .then(res => {
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("userid", res.data.user_id);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("phone", res.data.phone);
        window.setTimeout(() => {
          router.push({
            name: `Diagnoses_${dbNum}`
          });
        }, 1000);
        localStorage.setItem("isLogin", JSON.stringify(true));
        isLogin.value = true;
      })
      .catch(err => {
        console.log(err);
      });
  };
  const login = () => {
    localStorage.setItem("dbNum", dbNum.value);
    retrieveToken(identifier.value, password.value, dbNum.value);
  };
  const logout = () => {
    window.localStorage.removeItem("userid");
    window.localStorage.removeItem("diagnosesid");
    window.localStorage.removeItem("dbNum");
    tableData.data.length = 0;
    localStorage.setItem("isLogin", JSON.stringify(false));
    isLogin.value = false;
    window.setTimeout(() => {
      router.push({ name: "Home" });
    }, 1000);
  };
  return {
    identifier,
    password,
    isLogin,
    token,
    retrieveToken,
    login,
    logout,
    dbNum
  };
};
