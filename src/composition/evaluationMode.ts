import { reactive } from "vue";
import axios from "axios";
import apiUrl from "../../api_url.global";
import {
  anomalyData,
  evaluationData,
  selectedModelName
} from "@/composition/store";
import { useInitSciChart } from "@/composition/index";

export const evaluationModeFn = () => {
  const modelName = reactive([]);
  const { initSciChart } = useInitSciChart();
  const getAnomalyModels = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      modelName.length = 0;
      axios
        .get(`${apiUrl.url}${localStorage.getItem("dbNum")}/models/name`)
        .then(res => {
          modelName.push({
            value: res.data.default,
            label: res.data.default
          });
          res.data.challengers.forEach(item => {
            modelName.push({
              value: item,
              label: item
            });
          });
          resolve(modelName);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
  const activeEvaluationMode = (val, id) => {
    const config1: any = {
      baseURL: apiUrl.url + localStorage.getItem("dbNum"),
      url: `/anomaly/${val}/${id}`,
      headers: {
        "Content-Type": "application/json",
        platform: "web"
      },
      method: "get",
      data: {}
    };
    const getAnomaly = () => {
      return axios(config1);
    };
    const config2: any = {
      baseURL: apiUrl.url + localStorage.getItem("dbNum"),
      url: `/evaluation/${id}`,
      headers: {
        "Content-Type": "application/json",
        platform: "web"
      },
      method: "get",
      data: {}
    };
    const getEvaluation = () => {
      return axios(config2);
    };

    axios.all([getAnomaly(), getEvaluation()]).then(
      axios.spread((anomaly, evaluation) => {
        anomalyData.data.length = 0;
        anomalyData.data.push(anomaly.data.data);
        evaluationData.data.length = 0;
        evaluationData.data.push(...evaluation.data.data);
        initSciChart();
      })
    );
  };
  return {
    modelName,
    getAnomalyModels,
    activeEvaluationMode,
    selectedModelName,
    anomalyData,
    initSciChart
  };
};
