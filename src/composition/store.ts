import { ref, reactive } from "vue";
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

// HOME PAGE
export const isLogin = ref(false);

// DIAGNOSES PAGE
export const renderDashboard = () => {
  // onMounted(() => {});
};

// CHART PAGE
// interface tempDiagnoses {
//   data:{}
// }
// interface tempDiagnoses {
//   data: Object;
// }

// interface TData {
//   (code: number, data: string): 
// }

type TData = {
  code: number;
  // data: any;
  data: {
    create_data: string;
    device_id: string;
    diagnosis_id: string;
    diagnosis_type: string;
    end_time: string;
    measure_times: string;
    measure_type: string;
    measures: [
      {
        event_count: number;
        event_detect: [];
        heart_rate: [];
        measure_counts_by_second: number;
        measure_id: string;
        measure_index: number;
        peak_indexs: [];
        stress: [];
        value: [
          {
            name: string;
            index: number;
            raw_datas: [];
          }
        ];
      }
    ];
    medical_id: string;
    sdk_version: string;
    start_time: string;
    version: string;
  };
};

export const tempDiagnoses = reactive({ data: {} as TData });

const diagnosesRequest = axios.create({
  baseURL: apiUrl.url + "diagnoses/",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtSI6Ind5d3NtYWlsIiwic3ViIjoiOTVlYWUzMmEtYTg5Yy00NDBmLTg0ZjktMjFkMmU1YzZkNmI4IiwiaWF0IjoxNjA4MDE3ODA3LCJleHAiOjE2MDgxMDQyMDd9.UkROdW-KF2MmhJdXoUDHJKIOfGQS3SaAHDMwYZWfpH4"
  }
});

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

export const requestDiagnoses = () => {
  return diagnosesRequest
    .get("dbb1f0fe-af16-4332-9e2a-13ad33e39c50")
    .then((res) => {
      console.log(res.data.code);
      tempDiagnoses.data = res.data;
      console.log(tempDiagnoses.data.data.version);
    })
    .catch((err) => {
      console.log(err);
    });
};

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
export const username = ref("");
export const password = ref("");
// export const handLoginSubmit = (username: string, password: string) => {};
