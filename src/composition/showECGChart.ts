import axios from "axios";
import apiUrl from "../../api_url.global";
import { diagnoses } from "@/composition/store";

export const showECGChartFn = () => {
  const showECGChart = (id): Promise<any> => {
    return new Promise((resolve, reject) => {
      const config: any = {
        baseURL: apiUrl.url,
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
          diagnoses.data = [res.data.data];
          console.log(diagnoses.data);
          console.log(`a`);
          resolve(diagnoses);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  };
  return { showECGChart };
};
