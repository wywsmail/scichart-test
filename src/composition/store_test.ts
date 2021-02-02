import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import apiUrl from "../../api_url.global";
export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const token = ref(null);
    const retrieveToken = (username: string, password: string) => {
      const loginConfig: any = {
        baseURL: apiUrl.url,
        url: "/login",
        headers: {
          "Content-Type": "application/json",
          "platform": "web"
        },
        method: "post",
        data: {
          identifier: username,
          password: password
        }
      };
      const router = useRouter();
      axios(loginConfig)
        .then(res => {
          console.log(res);
          token.value = res.data.access_token;
          localStorage.setItem("role", res.data.role);
          router.push({ name: "diagnoses" });
        })
        .catch(err => {
          console.log(err);
        });
    };
    const login = (): void => {
      retrieveToken(username.value, password.value);
    };
  }
};
