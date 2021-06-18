/* eslint-disable @typescript-eslint/camelcase */
import axios from "axios";
import apiUrl from "../../api_url.global";
import { useInitSciChart } from "@/composition/index";
import {
  selectedPoints,
  diagnoses,
  tagListData,
  token,
  selectTagData
  // initSciChart
} from "@/composition/store";

// let max = selectedPoints[0].length;
// let max = 0;
// const filterSelectedPoints = selectedPoints.
// selectedPoints.forEach((item)=>{
//   max = item.length > max ? item.length : max;
// });
// console.log(max);
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
  // console.log(filterSelectedAry);
  const saveData = val => {
    const maxLength = Math.max(...selectedPoints.map(p => p.length));
    const filterSelectedAry = { channel: 0, data: [] };
    selectedPoints.forEach((item, index) => {
      if (item.length === maxLength) {
        filterSelectedAry.channel = index;
        filterSelectedAry.data.push(item);
      }
    });

    // console.log(selectedPoints);
    // console.log(selectedPoints.length);
    // console.log(maxLength);
    // console.log(filterSelectedAry);
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
    // console.log(selectedPoints[-1].length);
    // for (let i = 0; i < selectedPoints.length; i++) {
    //   if (
    //     selectedPoints[i].length !== 0 &&
    //     selectedPoints[i - 1].length !== 0 &&
    //     selectedPoints[i + 1].length !== 0
    //   ) {
    //     x1 = selectedPoints[i][0].x1Value.toFixed(0);
    //     x2 = selectedPoints[i][0].x2Value.toFixed(0);
    //     y1 = selectedPoints[i][0].y1Value.toFixed(0);
    //     y2 = selectedPoints[i][0].y2Value.toFixed(0);
    //     theChannel = i.toString();
    //   } else if (
    //     selectedPoints[i].length !== 0 &&
    //     selectedPoints[i - 1].length !== 0 &&
    //     selectedPoints[i + 1].length === 0
    //   ) {
    //     x1 = selectedPoints[i][0].x1Value.toFixed(0);
    //     x2 = selectedPoints[i][0].x2Value.toFixed(0);
    //     y1 = selectedPoints[i][0].y1Value.toFixed(0);
    //     y2 = selectedPoints[i][0].y2Value.toFixed(0);
    //     theChannel = i.toString();
    //   } else if (
    //     selectedPoints[i].length !== 0 &&
    //     selectedPoints[i - 1].length === 0 &&
    //     selectedPoints[i + 1].length !== 0
    //   ) {
    //     x1 = selectedPoints[i][0].x1Value.toFixed(0);
    //     x2 = selectedPoints[i][0].x2Value.toFixed(0);
    //     y1 = selectedPoints[i][0].y1Value.toFixed(0);
    //     y2 = selectedPoints[i][0].y2Value.toFixed(0);
    //     theChannel = i.toString();
    //   }
    // }
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
      })
      .catch(err => {
        console.log(err);
      });
    tagListData.data.splice(selectTagData.data.index);
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
    initSciChart();
  };
  const modifyData = (tagData, val) => {
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
        channel: tagData[0].channel,
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
      })
      .catch(err => {
        console.log(err);
      });
  };
  return { saveData, deleteData, modifyData };
};
