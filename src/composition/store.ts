/* eslint-disable @typescript-eslint/camelcase */

import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import router from "../router/index";
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
export const userId = localStorage.getItem("userid") || ref(null);
export const tableData = reactive({ data: [] });
export const role = localStorage.getItem("role") ?? ref("");
// export const diagnoses = reactive([]);
// export const diagnosesid = ref(localStorage.getItem("diagnosesid"));
export const diagnoses = ref([]);
export const dataInformation = ref([]);
// export const dataInformation = ref()||
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
export const isLogin = ref(JSON.parse(localStorage.getItem("isLogin")));
console.log(isLogin.value);

// LOGIN PAGE

export const identifier = ref("");
export const password = ref("");
export const retrieveToken = (phone: string, password: string) => {
  const loginConfig: any = {
    // baseURL: "https://dev.intelliances.com/broker/medical/v2",
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
      token.value = res.data.access_token;
      localStorage.setItem("role", res.data.role);
      console.log(res.data.user_id);
      localStorage.setItem("userid", res.data.user_id);
      window.setTimeout(() => {
        router.push({ name: "Diagnoses" });
      }, 1000);
      localStorage.setItem("isLogin", JSON.stringify(true));
      isLogin.value = true;
      console.log(isLogin.value);
    })
    .catch(err => {
      console.log(err);
    });
};
export const login = () => {
  retrieveToken(identifier.value, password.value);
};

export const logout = () => {
  window.localStorage.removeItem("userid");
  window.localStorage.removeItem("diagnosesid");
  // window.localStorage.removeItem("dataInfo");
  tableData.data.length = 0;
  // diagnoses.value.length = 0;
  // dataInfomation.value.length = 0;
  // isLogin.value = false;
  localStorage.setItem("isLogin", JSON.stringify(false));
  isLogin.value = false;
  console.log(isLogin.value);
  window.setTimeout(() => {
    router.push({ name: "Home" });
  }, 1000);
  console.log(userId.value);
};

// DIAGNOSES PAGE

export const requestDiagnoses = () => {
  const config: any = {
    baseURL: apiUrl.url,
    url: "/diagnoses/dashboard",
    headers: {
      "Content-Type": "application/json",
      platform: "web"
    },
    method: "post",
    data: {
      medical_id: "01",
      user_id: localStorage.getItem("userid"),
      role: "regular",
      start_date: "2021-03-11T02:47:12.068Z"
    }
  };
  axios(config)
    .then(res => {
      console.log(res.data.data);
      res.data.data.forEach(item => {
        item.start_time = new Date(item.start_time).toLocaleString();
      });
      tableData.data = res.data.data;
      console.log(tableData);
      
      // tableData.data.length = 0;
      // tableData.data.push(...res.data.data);
    })
    .catch(err => {
      console.log(err);
    });
};

// CHART PAGE

export const getECGChart = (_index, row) => {
  // localStorage.setItem("diagnosesid", row.diagnosis_id);
  // diagnosesid.value = row.diagnosis_id;
  // console.log(diagnosesid.value);
  window.setTimeout(() => {
    router.push(`/Diagnoses/${row.diagnosis_id}`);
  }, 1000);
  // showECGChart(index, row);
};

export const showECGChart = id => {
  const config: any = {
    baseURL: apiUrl.url,
    url: "/diagnoses/" + id,
    headers: {
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
  console.log('送的資料', config);
  axios(config)
    .then(res => {
      console.log(res);
      // const dataAry = [];
      const dataInfo = [];
      // res.data.data.measures[0].values.forEach(item => {
      //   dataAry.push([item.name, item.raw_datas]);
      // });
      // dataInfo.push({
      //   dataInfo: [
      //     res.data.data.diagnosis_id,
      //     res.data.data.start_time,
      //     res.data.data.hr_last,
      //     res.data.data.gain,
      //     res.data.data.device_id
      //   ]
      // });
      // res.data.data.measures[0].values.forEach(item => {
      //   dataAry.push({
      //     chartInfo: [item.name, item.raw_datas]});
      // });
      // console.log(dataAry);
      // localStorage.setItem(
      //   "dataAry",
      //   JSON.stringify(res.data.data.measures[0].values)
      // );
      dataInfo.push(
        res.data.data.diagnosis_id,
        res.data.data.start_time,
        res.data.data.hr_last,
        res.data.data.gain,
        res.data.data.device_id
      );
      dataInformation.value = dataInfo;
      diagnoses.value = res.data.data.measures[0].values;
      // localStorage.setItem("datainfo", JSON.stringify(dataInfo));
      console.log(dataInformation.value);
      console.log(diagnoses.value);
      // dataInformation.value = JSON.parse(localStorage.getItem("datainfo"))
      // console.log(JSON.parse(localStorage.getItem("datainfo")));
      // console.log(dataInformation.value);
      // dataInformation.value.length = 0;
      // dataInformation.value.push(...dataInfo);
    })
    .catch(err => {
      console.log(err);
    });
};
