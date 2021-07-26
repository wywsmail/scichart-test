/* eslint-disable @typescript-eslint/camelcase */
import axios from "axios";
import apiUrl from "../../api_url.global";
import { diagnoses, token, tagListData, tableData } from "@/composition/store";

export const showECGChartFn = () => {
  const showECGChart = (id): Promise<any> => {
    return new Promise((resolve, reject) => {
      const config: any = {
        baseURL: apiUrl.url + localStorage.getItem("dbNum"),
        url: "/diagnoses/" + id,
        headers: {
          "Content-Type": "application/json",
          platform: "web"
        },
        method: "get",
        data: {}
      };
      console.log("送的資料", config);
      axios(config)
        .then(res => {
          console.log(res);
          // res.data.data.forEach((item, index) => {
          //   item.start_time = new Date(item.start_time).toLocaleString();
          // });
          res.data.data.start_time = new Date(
            res.data.data.start_time
          ).toLocaleString();
          console.log(res.data.data);
          diagnoses.data = [res.data.data];
          tableData.data = [res.data.data];
          console.log(diagnoses.data);
          console.log(`a`);
          resolve(diagnoses);
        })
        .catch(err => {
          console.log(err);
          alert("沒有資料喔");
          reject(err);
        });
    });
  };
  const showTagRange = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          apiUrl.url +
            localStorage.getItem("dbNum") +
            "/notes/" +
            diagnoses.data[0].diagnosis_id,
          {
            headers: {
              Authorization: "Bearer " + token
            }
          }
        )
        .then(res => {
          console.log(res);
          tagListData.data = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    });
  };
  return { showECGChart, showTagRange };
};
