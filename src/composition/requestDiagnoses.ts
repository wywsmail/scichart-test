/* eslint-disable @typescript-eslint/camelcase */
import axios from "axios";
import { ref } from "vue";
import apiUrl from "../../api_url.global";
import { tableData, dbNum } from "@/composition/store";
import router from "../router/index";

export const requestDiagnosesFn = () => {
  const requestDiagnoses = () => {
    const config: any = {
      baseURL: apiUrl.url + localStorage.getItem("dbNum"),
      url: "/diagnoses/dashboard",
      headers: {
        "Content-Type": "application/json",
        platform: "web"
      },
      method: "post"
    };
    if (localStorage.getItem("dbNum") === "v1") {
      config.data = {
        medical_id: "01",
        measure_person: localStorage.getItem("username"),
        // measure_person: "wywsmail",
        role: "api"
      };
    } else if (localStorage.getItem("dbNum") === "v2") {
      config.data = {
        medical_id: "01",
        user_id: localStorage.getItem("userid"),
        role: "regular"
      };
    }
    console.log(config);
    axios(config)
      .then(res => {
        console.log(res.data.data);
        res.data.data.forEach(item => {
          item.start_time = new Date(item.start_time).toLocaleString();
        });
        tableData.data = res.data.data;
        console.log(tableData);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getECGChart = id => {
    // router.push(`/Diagnoses_v2/${id}`);
    router.push(`/Diagnoses_${localStorage.getItem("dbNum")}/${id}`);
  };
  return { requestDiagnoses, getECGChart, dbNum };
};
