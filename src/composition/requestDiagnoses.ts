/* eslint-disable @typescript-eslint/camelcase */
import axios from "axios";
import { ref } from "vue";
import apiUrl from "../../api_url.global";
import { tableData, dbNum, token, countNumber } from "@/composition/store";
import router from "../router/index";

export const requestDiagnosesFn = () => {
  const requestDiagnoses = (start = 1, end = 10) => {
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
        // measure_person: "wywsmail",
        role: "api",
        start_number: start,
        end_number: end
      };
    } else if (localStorage.getItem("dbNum") === "v2") {
      config.data = {
        medical_id: "01",
        user_id: localStorage.getItem("userid"),
        phone: localStorage.getItem("phone"),
        role: "regular",
        start_number: start,
        end_number: end
      };
    }
    console.log(config);
    axios(config)
      .then(res => {
        console.log(res.data.data);
        res.data.data.forEach((item, index) => {
          item.start_time = new Date(item.start_time).toLocaleString();
          item.index = start + index;
          
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
    // const APIone = () => {
    //   return axios(config);
    // };
    // const APItwo = () => {
    //   return axios({
    //     url: "https://dev.intelliances.com/broker/medical/v2/notes/",
    //     method: "get",
    //     headers: {
    //       "Content-Type": "application/json",
    //       platform: "web",
    //       Authorization: "Bearer " + token
    //     }
    //   });
    // };
    // axios.all([APIone(), APItwo()]).then(
    //   axios.spread((one, two) => {
    //     console.log(one);
    //     console.log(two);
    //     one.data.data.forEach((item1, index) => {
    //       item1.start_time = new Date(item1.start_time).toLocaleString();
    //       item1.index = start + index;
    //       two.data.data.forEach(item2 => {
    //         if (item2.diagnosis_id === item1.diagnosis_id) {
    //           item1.notes.push(item2.note);
    //           console.log(item2.note);
    //         }
    //       });
    //     });
    //     console.log(one.data.data);
    //     const newAry = one.data.data.forEach(item => {
    //       item.notes.filter((ele, pos) => {
    //         return item.notes.indexOf(ele) == pos;
    //         // console.log(ele,pos);
    //       });
    //     });
    //     console.log(one.data.data);
    //     tableData.data = one.data.data;
    //     // console.log(newAry);
    //   })
    // );
  };
  const getECGChart = id => {
    // router.push(`/Diagnoses_v2/${id}`);
    router.push(`/Diagnoses_${localStorage.getItem("dbNum")}/${id}`);
  };
  const diagnosesSearch = id => {
    console.log(id);
  };
  // const countNumber = ref(0);
  const dataCounts = () => {
    const config: any = {
      baseURL: apiUrl.url + localStorage.getItem("dbNum"),
      url: "/diagnoses/count",
      headers: {
        // Authorization: token,
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
        // measure_person: "wywsmail",
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
    console.log(config);
    axios(config)
      .then(res => {
        console.log(res.data.data.diagnosis_counts);
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
    diagnosesSearch,
    dataCounts,
    countNumber
  };
};
