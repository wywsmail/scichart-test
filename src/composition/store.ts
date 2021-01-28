/* eslint-disable @typescript-eslint/camelcase */
import { reactive, ref } from "vue";
// import { onMounted } from "vue";
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

// 原 tempState.js
export const token = ref(null);
export const username = ref("");
export const role = localStorage.getItem("role") ?? ref("");
export const diagnoses = ref(null);
export const rows = ref([]);
export const colums = ref([
  {
    label: "Patient ID",
    field: "patient_id"
  },
  {
    label: "Time",
    field: "datetime"
  },
  {
    label: "Measure Type",
    field: "measure_type"
  },
  {
    label: "Who measures",
    field: "measure_person"
  },
  {
    label: "Tags",
    field: "tagged"
  },
  {
    label: "",
    field: "delete"
  }
]);
export const numberOfElements = ref(0);
export const diagnosesUpdateTime = ref(null);
export const noteMode = ref("");
export const anomalyMode = ref(false);
export const anomalySequence = ref([]);
export const evaluationTags = ref([]);
export const anomalyModels = ref([]);

// HOME PAGE
export const isLogin = ref(false);

// DIAGNOSES PAGE
export const tableData = reactive([
  {
    patientid: "2466332",
    time: "2020/08/05, 15:18:52",
    mesuretype: "still",
    whomeasure: "yuan",
    tags: "VPC,ST-E"
  },
  {
    patientid: "2466332",
    time: "2020/08/05, 15:18:52",
    mesuretype: "still",
    whomeasure: "yuan",
    tags: "VPC,ST-E"
  },
  {
    patientid: "2466332",
    time: "2020/08/05, 15:18:52",
    mesuretype: "still",
    whomeasure: "yuan",
    tags: "VPC,ST-E"
  },
  {
    patientid: "2466332",
    time: "2020/08/05, 15:18:52",
    mesuretype: "still",
    whomeasure: "yuan",
    tags: "VPC,ST-E"
  },
  {
    patientid: "2466332",
    time: "2020/08/05, 15:18:52",
    mesuretype: "still",
    whomeasure: "yuan",
    tags: "VPC,ST-E"
  },
  {
    patientid: "2466332",
    time: "2020/08/05, 15:18:52",
    mesuretype: "still",
    whomeasure: "yuan",
    tags: "VPC,ST-E"
  },
  {
    patientid: "2466332",
    time: "2020/08/05, 15:18:52",
    mesuretype: "still",
    whomeasure: "yuan",
    tags: "VPC,ST-E"
  },
  {
    patientid: "2466332",
    time: "2020/08/05, 15:18:52",
    mesuretype: "still",
    whomeasure: "yuan",
    tags: "VPC,ST-E"
  },
  {
    patientid: "2466332",
    time: "2020/08/05, 15:18:52",
    mesuretype: "still",
    whomeasure: "yuan",
    tags: "VPC,ST-E"
  },
  {
    patientid: "2466332",
    time: "2020/08/05, 15:18:52",
    mesuretype: "still",
    whomeasure: "yuan",
    tags: "VPC,ST-E"
  }
]);

export const requestDiagnoses = () => {
  const config: any = {
    baseURL: apiUrl.url,
    url: "/diagnoses/dashboard",
    header: {
      "Content-Type": "application/json",
      platform: "web"
    },
    method: "post",
    data: {
      medical_id: "01",
      // measure_person: username.value,
      // role: String(role),
      // start_date: diagnosesUpdateTime
      user_id: "c32a9d8f-c0fe-4e23-beb9-4e0d9db24368",
      role: "regular",
      start_date: "2021-03-11T02:47:12.068Z"
    }
  };
  console.log(config);
  // transformResponse: [].concat(
  //   axios.defaults.transformRespons,
  //   data => data.data
  // )
  axios(config)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

// export const username = ref("");
// export const role = ref("");

// const requestDiagnoses = axios.create({
//   baseURL: apiUrl.url + "diagnoses/",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtSI6Ind5d3NtYWlsIiwic3ViIjoiOTVlYWUzMmEtYTg5Yy00NDBmLTg0ZjktMjFkMmU1YzZkNmI4IiwiaWF0IjoxNjA4MDE3ODA3LCJleHAiOjE2MDgxMDQyMDd9.UkROdW-KF2MmhJdXoUDHJKIOfGQS3SaAHDMwYZWfpH4"
//   },
//   data: {
//     medical_id: "01",
//     measure_person: username,
//     role: role
//     // start_date: diagnosesUpdate
//   }
// });

// export const diagnosesRequest = () => {
//   return requestDiagnoses.post("dashboard")
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     }
// };

// export const diagnosesRequest = () => {
//   return requestDiagnoses
//     .post("dashboard")
//     .then(res => {
//       console.log(res);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// CHART PAGE

export const getSingleDiagnoses = () => {
  const config: any = {
    baseURL: apiUrl.url,
    url: "/diagnoses/" + "3d99f4a1-c997-42f0-a1f7-ef61b36d19c3",
    header: {
      "Content-Type": "application/json",
      platform: "web"
    },
    method: "get",
    data: {
      // medical_id: "01",
      // measure_person: username.value,
      // role: String(role),
      // start_date: diagnosesUpdateTime
      // user_id: "c32a9d8f-c0fe-4e23-beb9-4e0d9db24368",
      // role: "regular",
      // start_date: "2021-03-11T02:47:12.068Z"
    }
  };
  axios(config)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
  });
};

// type TData = {
//   code: number;
//   // data: any;
//   data: {
//     create_data: string;
//     device_id: string;
//     diagnosis_id: string;
//     diagnosis_type: string;
//     end_time: string;
//     measure_times: string;
//     measure_type: string;
//     measures: [
//       {
//         event_count: number;
//         event_detect: [];
//         heart_rate: [];
//         measure_counts_by_second: number;
//         measure_id: string;
//         measure_index: number;
//         peak_indexs: [];
//         stress: [];
//         value: [
//           {
//             name: string;
//             index: number;
//             raw_datas: [];
//           }
//         ];
//       }
//     ];
//     medical_id: string;
//     sdk_version: string;
//     start_time: string;
//     version: string;
//   };
// };

// export const tempDiagnoses = reactive({ data: {} as TData });

// const diagnosesRequest = axios.create({
//   baseURL: apiUrl.url + "diagnoses/",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtSI6Ind5d3NtYWlsIiwic3ViIjoiOTVlYWUzMmEtYTg5Yy00NDBmLTg0ZjktMjFkMmU1YzZkNmI4IiwiaWF0IjoxNjA4MDE3ODA3LCJleHAiOjE2MDgxMDQyMDd9.UkROdW-KF2MmhJdXoUDHJKIOfGQS3SaAHDMwYZWfpH4"
//   }
// });

// diagnosesRequest.interceptors.request.use(
//   config => {
//     console.log("請求發起前");
//     console.log(config);
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

// diagnosesRequest.interceptors.response.use(
//   response => {
//     console.log("請求發起後");
//     console.log(response);
//     return response;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

// export const requestDiagnoses = () => {
//   return diagnosesRequest
//     .get("dbb1f0fe-af16-4332-9e2a-13ad33e39c50")
//     .then(res => {
//       console.log(res.data.code);
//       tempDiagnoses.data = res.data;
//       console.log(tempDiagnoses.data.data.version);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// export const apiRequestDiagnoses = async () => {
//   try {
//     const res = await requestDiagnoses();
//     return res;
//   } catch (error) {
//     console.log(error.response.data);
//     return error.response.data;
//   }
//   // return tempDiagnoses.data;
// };

// const { data } = await apiRequestDiagnoses();
// tempDiagnoses.data = await apiRequestDiagnoses();
// console.log(tempDiagnoses);
// const { data } from apiRequestDiagnoses();
// console.log(apiRequestDiagnoses());
// console.log(tempDiagnoses);

// console.log(tempDiagnoses.data);

// LOGIN PAGE
// export const username = ref("");
// export const password = ref("");
// export const token = ref("");
// export const handLoginSubmit = (username: string, password: string) => {};

// interface AxiosRequestConfig {
//   baseURL: string;
//   url: string;
//   header: {
//     "Content-Type": string;
//     platform: string;
//   };
//   method: string;
//   data: {
//     identifier: string;
//     password: string;
//   };
// };

// interface BaseResponse {
//   success: boolean;
//   data: any;
//   message?: string;
// }

export const retrieveToken = (username: string, password: string) => {
  const loginConfig: any = {
    // baseURL: "https://dev.intelliances.com/broker/medical/v2",
    baseURL: apiUrl.url,
    url: "/login",
    header: {
      "Content-Type": "application/json",
      platform: "web"
    },
    method: "post",
    data: {
      identifier: username,
      password: password
    }
  };
  // console.log(loginConfig);
  axios(loginConfig)
    .then(res => {
      console.log(res);
      token.value = res.data.access_token;
      localStorage.setItem("role", res.data.role);
      // username = res.data.username;
      // console.log(token.value);
      // console.log(res.request.response);
    })
    .catch(err => {
      console.log(err);
    });
};

// export const retrieveToken = (username, password, credentials) => {
//   return new Promise((resolve, reject) => {
//     axios.defaults.headers.common.Authorization = "Bearer" + token.value;
//     const loginConfig = {
//       url: apiUrl.url + "medical/v2/login",
//       headers: { platform: "web" },
//       method: "post",
//       data: {
//         identifier: credentials.username.value,
//         password: credentials.password.vaule
//       }
//     };
//     axios(loginConfig)
//       .then(res => {
//         const token = res.data.access_token;
//         const role = res.data.role;
//         localStorage.setItem("role", role);
//         return Promise.resolve(res.data);
//     })
//       .then(res => {
//         const config = {
//           url: apiUrl.url + "/medical/v1/diagnoses/dashboard",
//           headers: { "Content-Type": "application/json" },
//           method: "post",
//           data: {
//             medical_id: "01",
//             measure_person: String(credentials.username),
//             role: String(res.role)
//           }
//         };
//         return axios(config);
//       })
//       .then(res => {
//         const notes = res.data.data.map(diagnosis => {
//           return {
//             diagnosis_id: diagnosis.diagnosis_id,
//             note: diagnosis.notes
//           };
//         });
//         // commit("SAVE_DIAGNOSIS", res.data.data);
//         // dispatch("notes/saveNotes", notes, { root: true });
//         resolve(res);
//       })
//       .catch(err => {
//         console.log(err);
//         reject(err);
//       })
//   });
// };
