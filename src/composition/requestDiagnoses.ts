/* eslint-disable @typescript-eslint/camelcase */
import axios from "axios";
import apiUrl from "../../api_url.global";
import { tableData } from "@/composition/store";
import router from "../router/index";

export const requestDiagnosesFn = () =>{
  const requestDiagnoses = () => {
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
        role: "regular"
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
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getECGChart = id => {
    router.push(`/Diagnoses_v2/${id}`);
  };
  return { requestDiagnoses, getECGChart };
};
