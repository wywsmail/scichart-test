/* eslint-disable @typescript-eslint/camelcase */
import axios from "axios";
import apiUrl from "../../api_url.global";
import { tableData, dbNum, token, countNumber } from "@/composition/store";
import router from "../router/index";

export const requestDiagnosesFn = () => {
  const requestDiagnoses = page => {
    const config: any = {
      baseURL: apiUrl.url + localStorage.getItem("dbNum"),
      url: "/diagnoses/dashboard",
      headers: {
        "Content-Type": "application/json",
        platform: "web",
        Authorization: "Bearer " + token
      },
      method: "post"
    };
    if (localStorage.getItem("dbNum") === "v1") {
      config.data = {
        medical_id: "01",
        measure_person: localStorage.getItem("username"),
        role: "api",
        start_number: page * 10 - 9,
        end_number: page * 10
      };
    } else if (localStorage.getItem("dbNum") === "v2") {
      config.data = {
        medical_id: "01",
        user_id: localStorage.getItem("userid"),
        phone: localStorage.getItem("phone"),
        role: "regular",
        start_number: page * 10 - 9,
        end_number: page * 10
      };
    }
    axios(config)
      .then(res => {
        res.data.data.forEach((item, index) => {
          item.start_time = new Date(item.start_time).toLocaleString();
          item.index = page * 10 - 9 + index;
          item.notes =
            item.notes.length !== 0
              ? item.notes
                  .reduce((acc, current) => acc + ", " + current)
                  .replace(/(\[|]|")*/g, "")
              : "尚未標記";
        });
        tableData.data = res.data.data;
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getECGChart = id => {
    router.push(`/Diagnoses_${localStorage.getItem("dbNum")}/${id}`);
  };

  const dataCounts = () => {
    const config: any = {
      baseURL: apiUrl.url + localStorage.getItem("dbNum"),
      url: "/diagnoses/count",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        platform: "web"
      },
      method: "post"
    };
    if (localStorage.getItem("dbNum") === "v1") {
      config.data = {
        medical_id: "01",
        measure_person: localStorage.getItem("username"),
        role: "api",
        start_date: ""
      };
    } else if (localStorage.getItem("dbNum") === "v2") {
      config.data = {
        medical_id: "01",
        user_id: localStorage.getItem("userid"),
        role: "regular",
        phone: localStorage.getItem("phone")
      };
    }
    axios(config)
      .then(res => {
        countNumber.value = res.data.data.diagnosis_counts;
      })
      .catch(err => {
        console.log(err);
      });
  };
  return {
    requestDiagnoses,
    getECGChart,
    dbNum,
    dataCounts,
    countNumber
  };
};
