import { ref, onMounted } from "vue";
import axios from "axios";
import apiUrl from "../../api_url.global";

// testing
export const count = ref(0);
export const handClickPlus = () => {
  count.value++;
};
export const handClickLess = () => {
  count.value--;
};

// HOME PAGE
export const isLogin = ref(false);

// DIAGNOSES PAGE
export const renderDashboard = () => {
  onMounted(() => {});
};

// CHART PAGE

const diagnosesRequest = axios.create({
  baseURL: apiUrl.url + "diagnoses/",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtSI6Ind5d3NtYWlsIiwic3ViIjoiOTVlYWUzMmEtYTg5Yy00NDBmLTg0ZjktMjFkMmU1YzZkNmI4IiwiaWF0IjoxNjA4MDE3ODA3LCJleHAiOjE2MDgxMDQyMDd9.UkROdW-KF2MmhJdXoUDHJKIOfGQS3SaAHDMwYZWfpH4"
  }
});

diagnosesRequest.interceptors.request.use(
  config => {
    console.log("請求發起前");
    console.log(config);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
diagnosesRequest.interceptors.response.use(
  response => {
    console.log("請求發起後");
    console.log(response);
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

const requestDiagnoses = () => {
  diagnosesRequest.get("dbb1f0fe-af16-4332-9e2a-13ad33e39c50");
};
export const apiRequestDiagnoses = async () => {
  try {
    const res = await requestDiagnoses();
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};

// LOGIN PAGE
export const username = ref("");
export const password = ref("");
// export const handLoginSubmit = (username: string, password: string) => {};
