/* eslint-disable @typescript-eslint/camelcase */
import axios from "axios";
import apiUrl from "../../api_url.global";
import { useInitSciChart } from "@/composition/index";
import {
  selectedPoints,
  diagnoses,
  tagListData,
  token,
  selectTagData,
  evaluationTagData,
  isChecked,
  selectedModelName,
  anomalyData
} from "@/composition/store";

export const modalFn = () => {
  const { initSciChart } = useInitSciChart();
  // const maxLength = Math.max(...selectedPoints.map(p => p.length));
  // const filterSelectedAry = { channel: 0, data: [] };
  // selectedPoints.forEach((item, index) => {
  //   if (item.length === maxLength) {
  //     filterSelectedAry.channel = index;
  //     filterSelectedAry.data.push(item);
  //   }
  // });
  const saveData = val => {
    const maxLength = Math.max(...selectedPoints.map(p => p.length));
    const filterSelectedAry = { channel: 0, data: [] };
    selectedPoints.forEach((item, index) => {
      if (item.length === maxLength) {
        filterSelectedAry.channel = index;
        filterSelectedAry.data.push(item);
      }
    });

    console.log(selectedPoints);
    // console.log(selectedPoints.length);
    // console.log(maxLength);
    console.log(filterSelectedAry);
    // console.log(diagnoses.data);
    let x1: string;
    let x2: string;
    let y1: string;
    let y2: string;
    let theChannel: string;
    for (let i = 0; i < selectedPoints.length; i++) {
      if (selectedPoints[i].length !== 0) {
        x1 = selectedPoints[i][0].x1Value.toFixed(0);
        x2 = selectedPoints[i][0].x2Value.toFixed(0);
        y1 = selectedPoints[i][0].y1Value.toFixed(0);
        y2 = selectedPoints[i][0].y2Value.toFixed(0);
        // theChannel = max.toString();
        theChannel = filterSelectedAry.channel.toString();
      }
    }
    const config: any = {
      url: apiUrl.url + localStorage.getItem("dbNum") + "/notes/create",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      method: "post",
      data: {
        id: "",
        diagnosis_id: diagnoses.data[0].diagnosis_id,
        x1: x1,
        x2: x2,
        y1: y1,
        y2: y2,
        channel: theChannel,
        note: `["${val}"]`
      }
    };
    console.log(config);
    axios(config)
      .then(res => {
        console.log(tagListData.data);
        console.log(res.data.data.datas[0].note_id);
        tagListData.data.push({
          id: res.data.data.datas[0].note_id,
          channel: config.data.channel,
          created_at: "",
          note: config.data.note,
          x1: config.data.x1,
          x2: config.data.x2,
          diagnosis_id: config.data.diagmosis_id
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  const deleteData = val => {
    console.log(tagListData);
    console.log(val);
    // console.log(tagListData.data.indexOf(val.data[0].id));
    const config: any = {
      url:
        apiUrl.url +
        localStorage.getItem("dbNum") +
        "/notes/delete/" +
        val[0].id,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      method: "delete"
    };
    console.log(config);
    axios(config)
      .then(res => {
        console.log(res);
        tagListData.data.splice(selectTagData.data.index);
        console.log(tagListData.data);
        selectTagData.data.length = 0;
        selectTagData.data.push({
          index: 0,
          channel: "",
          created_at: "",
          diagnosis_id: "",
          note: "",
          x1: "",
          x2: ""
        });
      })
      .catch(err => {
        console.log(err);
      });
    initSciChart();
  };
  const modifyData = (tagData, val, newChannel) => {
    console.log(tagData);
    console.log(val);
    const config: any = {
      url: apiUrl.url + localStorage.getItem("dbNum") + "/notes/modify",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      method: "put",
      data: {
        id: tagData[0].id,
        diagnosis_id: diagnoses.data[0].diagnosis_id,
        x1: tagData[0].x1,
        x2: tagData[0].x2,
        // channel: tagData[0].channel,
        channel: `${newChannel}`,
        note: `["${val}"]`
      }
    };
    console.log(config);
    axios(config)
      .then(res => {
        console.log(res);
        console.log(config.data.note);
        console.log(tagListData.data);
        console.log(selectTagData.data[0].index);
        tagListData.data[selectTagData.data[0].index].note = config.data.note;
        selectTagData.data[0].note = JSON.parse(config.data.note)[0];
        selectTagData.data[0].channel = config.data.channel;
      })
      .catch(err => {
        console.log(err);
      });
    initSciChart();
  };
  const deleteEvaluationData = val => {
    console.log(val[0].id);
    const config: any = {
      // 暫時停用，移除網址
      // url:
      //   apiUrl.url +
      //   localStorage.getItem("dbNum") +
      //   "/notes/delete/" +
      //   val[0].id,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      method: "delete"
    };
    console.log(config);
    axios(config)
      .then(res => {
        console.log(res);
        // tagListData.data.splice(selectTagData.data.index);
        console.log(tagListData.data);
        evaluationTagData.data.length = 0;
        evaluationTagData.data.push({
          id: "",
          channel: "",
          evaluator: "",
          evaluation: "",
          model_name: "",
          x1: "",
          x2: ""
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  const modifyEvaluationData = (data, val) => {
    const maxLength = Math.max(...selectedPoints.map(p => p.length));
    const filterSelectedAry = { channel: 0, data: [] };
    selectedPoints.forEach((item, index) => {
      if (item.length === maxLength) {
        filterSelectedAry.channel = index;
        filterSelectedAry.data.push(item);
      }
    });
    let x1: string;
    let x2: string;
    let theChannel: string;
    for (let i = 0; i < selectedPoints.length; i++) {
      if (selectedPoints[i].length !== 0) {
        x1 = selectedPoints[i][0].x1Value.toFixed(0);
        x2 = selectedPoints[i][0].x2Value.toFixed(0);
        // theChannel = max.toString();
        theChannel = filterSelectedAry.channel.toString();
      }
    }
    console.log(data);
    console.log(anomalyData.data);
    console.log(filterSelectedAry);
    const aiTagNote1 = anomalyData.data[0].result
      .flat(Infinity)
      .filter(e => e > 0);
    const aiTagNote2 = aiTagNote1.filter((item, index) => {
      return aiTagNote1.indexOf(item) === index;
    });
    const evaluation: any = {
      diagnosis_id: diagnoses.data[0].diagnosis_id,
      model_name: selectedModelName.value,
      evaluator: localStorage.getItem("username"),
      score: "",
      ai_sequence: [JSON.stringify(anomalyData.data[0].result)],
      evaluator_sequence: []
    };
    console.log(aiTagNote2);
    // if (aiTagNote2.toString() === 1){
    //   evaluation.evaluation = "ST-D";
    // }
    if (isChecked.value !== true) {
      if (aiTagNote2.toString() === "1") {
        evaluation.evaluation = `${val}:APC`;
        console.log(aiTagNote2.toString());
      } else if (aiTagNote2.toString() === "2") {
        evaluation.evaluation = `${val}:ST-D`;
      } else if (aiTagNote2.toString() === "3") {
        evaluation.evaluation = `${val}:ST-E`;
        console.log(aiTagNote2.toString());
      } else if (aiTagNote2.toString() === "4") {
        evaluation.evaluation = `${val}:VPC`;
      } else if (aiTagNote2.toString() === "5") {
        evaluation.evaluation = `${val}:Atrial Fibrillation`;
      } else if (aiTagNote2.toString() === "6") {
        evaluation.evaluation = `${val}:PSVT`;
      } else if (aiTagNote2.toString() === "7") {
        evaluation.evaluation = `${val}:ST-N`;
      } else if (aiTagNote2.toString() === "8") {
        evaluation.evaluation = `${val}:UnKnown`;
      } else if (aiTagNote2.toString() === "9") {
        evaluation.evaluation = `${val}:BBB`;
      } else if (aiTagNote2.toString() === "10") {
        evaluation.evaluation = `${val}:OMI`;
      }
      // (evaluation.evaluation = `${val}:${aiTagNote2}`),
      // (evaluation.ai_sequence = [JSON.stringify(anomalyData.data[0].result)]),
      // (evaluation.evaluator_sequence = []),
      (evaluation.channel = data[0].channel),
        (evaluation.x1 = data[0].x1.toString()),
        (evaluation.x2 = data[0].x2.toString());
    } else {
      (evaluation.evaluation = `${val}:Normal Sinus Rhythm`),
        // (evaluation.ai_sequence = ""),
        // (evaluation.evaluator_sequence = ""),
        (evaluation.channel = theChannel),
        (evaluation.x1 = x1),
        (evaluation.x2 = x2);
    }
    const config: any = {
      url: apiUrl.url + localStorage.getItem("dbNum") + "/evaluation",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      method: "post",
      data: evaluation
    };
    console.log(config);
    axios(config)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return {
    saveData,
    deleteData,
    modifyData,
    deleteEvaluationData,
    evaluationTagData,
    isChecked,
    modifyEvaluationData,
    selectedModelName,
    anomalyData
  };
};
