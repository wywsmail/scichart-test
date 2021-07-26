import { reactive, ref } from "vue";
import axios from "axios";
import apiUrl from "../../api_url.global";
import { anomalyData, evaluationData, filterAnomalyData, selectedModelName } from "@/composition/store";
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
            // value: "選項" + 1,
            value: res.data.default,
            label: res.data.default
          });
          res.data.challengers.forEach(item => {
            modelName.push({
              // value: `選項${index + 2}`,
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
    console.log("getAnomaly送的資料", config1);
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
    console.log("getEvalution送的資料", config2);
    const getEvaluation = () => {
      return axios(config2);
    };

    axios.all([getAnomaly(), getEvaluation()]).then(
      axios.spread((anomaly, evaluation) => {
        console.log(anomaly.data.data);
        console.log(evaluation);
        anomalyData.data.length = 0;
        anomalyData.data.push(anomaly.data.data);
        evaluationData.data.length = 0;
        evaluationData.data.push(...evaluation.data.data);
        initSciChart();
      })
    );
    // axios(config)
    //   .then(res => {
    //     console.log(res.data.data);
    //     anomalyData.data.length = 0;
    //     anomalyData.data.push(res.data.data);
    //     console.log(anomalyData.data);
    //     initSciChart();
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
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

// function draw_anomalies(
// 	out, // res.data.result
// 	model_name, // model_name
// 	start_end // res.data.start_end_peak
// ) {
// 	const anomalies_pins = [];
// 	let channel = 0;
// 	let note = "";
// 	localStorage.setItem(
// 		"areaColor",
// 		"red"
// 	);
// 	out.forEach((c, i) => {
// 		c.forEach((o, j) => {
// 			if (o === 1) {
// 				note = "APC";
// 				if (model_name === "model_a1") {
// 					note = "PSVT";
// 				}
// 			}
// 			if (o === 2) {
// 				note = "ST-D";
// 				if (model_name === "model_a1") {
// 					note = "BBB";
// 				}
// 			}
// 			if (o === 3) {
// 				note = "ST-E";
// 				if (model_name === "model_a1") {
// 					note = "VPC";
// 				}
// 			}
// 			if (o === 4) {
// 				note = "VPC";
// 				if (model_name === "model_a1") {
// 					note = "Atrial Fibrillation";
// 				}
// 			}
// 			if (o === 5) {
// 				note = "Atrial Fibrillation";
// 			}
// 			if (o !== 0) {
// 				anomalies_pins.push({
// 					id: "",
// 					x1: parseInt(
// 						start_end[i][j][0]
// 					),
// 					x2: parseInt(
// 						start_end[i][j][1]
// 					),
// 					height: channel_height,
// 					v: note,
// 					y:
// 						channel * channel_height +
// 						margin.top
// 				});
// 			}
// 		});
// 		channel = channel + 1;
// 	});

// 	$(".pin-rect").remove();

// 	pinLineMap
// 		.selectAll("path")
// 		.data(anomalies_pins)
// 		.enter()
// 		.append("rect")
// 		.attrs(pin_rect)
// 		.attr("class", "pin-rect")
// 		.style(
// 			"fill",
// 			localStorage.getItem("areaColor")
// 		)
// 		.style("opacity", 0.2)
// 		.attrs(function(d) {
// 			return {
// 				"data-x1": d.x1,
// 				"data-x2": d.x2,
// 				"data-t1":
// 					Math.round(
// 						(d.x1 / 250) * 100
// 					) / 100,
// 				"data-t2":
// 					Math.round(
// 						(d.x2 / 250) * 100
// 					) / 100,
// 				"data-note": d.v,
// 				"data-id": d.id
// 			};
// 		});
// 	updateChannelOnPin();
// }
