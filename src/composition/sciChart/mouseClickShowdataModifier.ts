/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/camelcase */

import { ChartModifierBase2D } from "scichart/Charting/ChartModifiers/ChartModifierBase2D";
import { ModifierMouseArgs } from "scichart/Charting/ChartModifiers/ModifierMouseArgs";
import { translateFromCanvasToSeriesViewRect } from "scichart/utils/translate";
import {
  tagList,
  selectTagData,
  anomalyData,
  evaluationData,
  filterAnomalyData,
  evaluationTagData
} from "@/composition/store";

export class MouseClickShowdataModifier extends ChartModifierBase2D {
  public modifierMouseUp(args: ModifierMouseArgs) {
    super.modifierMouseUp(args);
    const translatedPoint = translateFromCanvasToSeriesViewRect(
      args.mousePoint,
      this.parentSurface.seriesViewRect
    );
    const { xCalc, yCalc } = this.getDefaultCoordCalculators();
    if (!xCalc) {
      return;
    }
    // Tag Information 篩選
    selectTagData.data.length = 0;
    for (let i = 0; i < tagList.value.data.length; i++) {
      if (
        tagList.value.data[i].channel === "5" &&
        -1 < yCalc.getDataValue(translatedPoint.y) &&
        yCalc.getDataValue(translatedPoint.y) < 1 &&
        Number(tagList.value.data[i].x1) <
          xCalc.getDataValue(translatedPoint.x) &&
        xCalc.getDataValue(translatedPoint.x) < Number(tagList.value.data[i].x2)
      ) {
        selectTagData.data.push({
          index: i,
          channel: "5",
          created_at: tagList.value.data[i].created_at,
          diagnosis_id: tagList.value.data[i].diagnosis_id,
          id: tagList.value.data[i].id,
          note: JSON.parse(tagList.value.data[i].note)[0],
          x1: tagList.value.data[i].x1,
          x2: tagList.value.data[i].x2
        });
      } else if (
        tagList.value.data[i].channel === "4" &&
        1 < yCalc.getDataValue(translatedPoint.y) &&
        yCalc.getDataValue(translatedPoint.y) < 3 &&
        Number(tagList.value.data[i].x1) <
          xCalc.getDataValue(translatedPoint.x) &&
        xCalc.getDataValue(translatedPoint.x) < Number(tagList.value.data[i].x2)
      ) {
        selectTagData.data.push({
          index: i,
          channel: "4",
          created_at: tagList.value.data[i].created_at,
          diagnosis_id: tagList.value.data[i].diagnosis_id,
          id: tagList.value.data[i].id,
          note: JSON.parse(tagList.value.data[i].note)[0],
          x1: tagList.value.data[i].x1,
          x2: tagList.value.data[i].x2
        });
      } else if (
        tagList.value.data[i].channel === "3" &&
        3 < yCalc.getDataValue(translatedPoint.y) &&
        yCalc.getDataValue(translatedPoint.y) < 5 &&
        Number(tagList.value.data[i].x1) <
          xCalc.getDataValue(translatedPoint.x) &&
        xCalc.getDataValue(translatedPoint.x) < Number(tagList.value.data[i].x2)
      ) {
        selectTagData.data.push({
          index: i,
          channel: "3",
          created_at: tagList.value.data[i].created_at,
          diagnosis_id: tagList.value.data[i].diagnosis_id,
          id: tagList.value.data[i].id,
          note: JSON.parse(tagList.value.data[i].note)[0],
          x1: tagList.value.data[i].x1,
          x2: tagList.value.data[i].x2
        });
      } else if (
        tagList.value.data[i].channel === "2" &&
        5 < yCalc.getDataValue(translatedPoint.y) &&
        yCalc.getDataValue(translatedPoint.y) < 7 &&
        Number(tagList.value.data[i].x1) <
          xCalc.getDataValue(translatedPoint.x) &&
        xCalc.getDataValue(translatedPoint.x) < Number(tagList.value.data[i].x2)
      ) {
        selectTagData.data.push({
          index: i,
          channel: "2",
          created_at: tagList.value.data[i].created_at,
          diagnosis_id: tagList.value.data[i].diagnosis_id,
          id: tagList.value.data[i].id,
          note: JSON.parse(tagList.value.data[i].note)[0],
          x1: tagList.value.data[i].x1,
          x2: tagList.value.data[i].x2
        });
      } else if (
        tagList.value.data[i].channel === "1" &&
        7 < yCalc.getDataValue(translatedPoint.y) &&
        yCalc.getDataValue(translatedPoint.y) < 9 &&
        Number(tagList.value.data[i].x1) <
          xCalc.getDataValue(translatedPoint.x) &&
        xCalc.getDataValue(translatedPoint.x) < Number(tagList.value.data[i].x2)
      ) {
        selectTagData.data.push({
          index: i,
          channel: "1",
          created_at: tagList.value.data[i].created_at,
          diagnosis_id: tagList.value.data[i].diagnosis_id,
          id: tagList.value.data[i].id,
          note: JSON.parse(tagList.value.data[i].note)[0],
          x1: tagList.value.data[i].x1,
          x2: tagList.value.data[i].x2
        });
      } else if (
        tagList.value.data[i].channel === "0" &&
        9 < yCalc.getDataValue(translatedPoint.y) &&
        yCalc.getDataValue(translatedPoint.y) < 11 &&
        Number(tagList.value.data[i].x1) <
          xCalc.getDataValue(translatedPoint.x) &&
        xCalc.getDataValue(translatedPoint.x) < Number(tagList.value.data[i].x2)
      ) {
        selectTagData.data.push({
          index: i,
          channel: "0",
          created_at: tagList.value.data[i].created_at,
          diagnosis_id: tagList.value.data[i].diagnosis_id,
          id: tagList.value.data[i].id,
          note: JSON.parse(tagList.value.data[i].note)[0],
          x1: tagList.value.data[i].x1,
          x2: tagList.value.data[i].x2
        });
      }
    }

    // AnomalyData Information 篩選
    evaluationTagData.data.length = 0;
    filterAnomalyData.forEach(item => {
      if (
        item.channel === 5 &&
        -1 < yCalc.getDataValue(translatedPoint.y) &&
        yCalc.getDataValue(translatedPoint.y) < 1 &&
        Number(item.x1) < xCalc.getDataValue(translatedPoint.x) &&
        xCalc.getDataValue(translatedPoint.x) < Number(item.x2)
      ) {
        evaluationTagData.data.push({
          id: "",
          channel: item.channel.toString(),
          evaluator: "AI",
          evaluation: "",
          model_name: "",
          x1: item.x1,
          x2: item.x2
        });
      } else if (
        item.channel === 4 &&
        1 < yCalc.getDataValue(translatedPoint.y) &&
        yCalc.getDataValue(translatedPoint.y) < 3 &&
        Number(item.x1) < xCalc.getDataValue(translatedPoint.x) &&
        xCalc.getDataValue(translatedPoint.x) < Number(item.x2)
      ) {
        evaluationTagData.data.push({
          id: "",
          channel: item.channel.toString(),
          evaluator: "AI",
          evaluation: "",
          model_name: "",
          x1: item.x1,
          x2: item.x2
        });
      } else if (
        item.channel === 3 &&
        3 < yCalc.getDataValue(translatedPoint.y) &&
        yCalc.getDataValue(translatedPoint.y) < 5 &&
        Number(item.x1) < xCalc.getDataValue(translatedPoint.x) &&
        xCalc.getDataValue(translatedPoint.x) < Number(item.x2)
      ) {
        evaluationTagData.data.push({
          id: "",
          channel: item.channel.toString(),
          evaluator: "AI",
          evaluation: "",
          model_name: "",
          x1: item.x1,
          x2: item.x2
        });
      } else if (
        item.channel === 2 &&
        5 < yCalc.getDataValue(translatedPoint.y) &&
        yCalc.getDataValue(translatedPoint.y) < 7 &&
        Number(item.x1) < xCalc.getDataValue(translatedPoint.x) &&
        xCalc.getDataValue(translatedPoint.x) < Number(item.x2)
      ) {
        evaluationTagData.data.push({
          id: "",
          channel: item.channel.toString(),
          evaluator: "AI",
          evaluation: "",
          model_name: "",
          x1: item.x1,
          x2: item.x2
        });
      } else if (
        item.channel === 1 &&
        7 < yCalc.getDataValue(translatedPoint.y) &&
        yCalc.getDataValue(translatedPoint.y) < 9 &&
        Number(item.x1) < xCalc.getDataValue(translatedPoint.x) &&
        xCalc.getDataValue(translatedPoint.x) < Number(item.x2)
      ) {
        evaluationTagData.data.push({
          id: "",
          channel: item.channel.toString(),
          evaluator: "AI",
          evaluation: "",
          model_name: "",
          x1: item.x1,
          x2: item.x2
        });
      } else if (
        item.channel === 0 &&
        9 < yCalc.getDataValue(translatedPoint.y) &&
        yCalc.getDataValue(translatedPoint.y) < 11 &&
        Number(item.x1) < xCalc.getDataValue(translatedPoint.x) &&
        xCalc.getDataValue(translatedPoint.x) < Number(item.x2)
      ) {
        evaluationTagData.data.push({
          id: "",
          channel: item.channel.toString(),
          evaluator: "AI",
          evaluation: "",
          model_name: "",
          x1: item.x1,
          x2: item.x2
        });
      }
    });
    // Evaluation Information 篩選

    evaluationData.data.forEach(item => {
      if (
        item.channel === "5" &&
        -1 < yCalc.getDataValue(translatedPoint.y) &&
        yCalc.getDataValue(translatedPoint.y) < 1 &&
        Number(item.x1) < xCalc.getDataValue(translatedPoint.x) &&
        xCalc.getDataValue(translatedPoint.x) < Number(item.x2)
      ) {
        evaluationTagData.data.push({
          id: item.id,
          channel: item.channel,
          evaluator: item.evaluator,
          evaluation: item.evaluation,
          model_name: item.model_name,
          x1: item.x1,
          x2: item.x2
        });
      } else if (
        item.channel === "4" &&
        1 < yCalc.getDataValue(translatedPoint.y) &&
        yCalc.getDataValue(translatedPoint.y) < 3 &&
        Number(item.x1) < xCalc.getDataValue(translatedPoint.x) &&
        xCalc.getDataValue(translatedPoint.x) < Number(item.x2)
      ) {
        evaluationTagData.data.push({
          id: item.id,
          channel: item.channel,
          evaluator: item.evaluator,
          evaluation: item.evaluation,
          model_name: item.model_name,
          x1: item.x1,
          x2: item.x2
        });
      } else if (
        item.channel === "3" &&
        3 < yCalc.getDataValue(translatedPoint.y) &&
        yCalc.getDataValue(translatedPoint.y) < 5 &&
        Number(item.x1) < xCalc.getDataValue(translatedPoint.x) &&
        xCalc.getDataValue(translatedPoint.x) < Number(item.x2)
      ) {
        evaluationTagData.data.push({
          id: item.id,
          channel: item.channel,
          evaluator: item.evaluator,
          evaluation: item.evaluation,
          model_name: item.model_name,
          x1: item.x1,
          x2: item.x2
        });
      } else if (
        item.channel === "2" &&
        5 < yCalc.getDataValue(translatedPoint.y) &&
        yCalc.getDataValue(translatedPoint.y) < 7 &&
        Number(item.x1) < xCalc.getDataValue(translatedPoint.x) &&
        xCalc.getDataValue(translatedPoint.x) < Number(item.x2)
      ) {
        evaluationTagData.data.push({
          id: item.id,
          channel: item.channel,
          evaluator: item.evaluator,
          evaluation: item.evaluation,
          model_name: item.model_name,
          x1: item.x1,
          x2: item.x2
        });
      } else if (
        item.channel === "1" &&
        7 < yCalc.getDataValue(translatedPoint.y) &&
        yCalc.getDataValue(translatedPoint.y) < 9 &&
        Number(item.x1) < xCalc.getDataValue(translatedPoint.x) &&
        xCalc.getDataValue(translatedPoint.x) < Number(item.x2)
      ) {
        evaluationTagData.data.push({
          id: item.id,
          channel: item.channel,
          evaluator: item.evaluator,
          evaluation: item.evaluation,
          model_name: item.model_name,
          x1: item.x1,
          x2: item.x2
        });
      } else if (
        item.channel === "0" &&
        9 < yCalc.getDataValue(translatedPoint.y) &&
        yCalc.getDataValue(translatedPoint.y) < 11 &&
        Number(item.x1) < xCalc.getDataValue(translatedPoint.x) &&
        xCalc.getDataValue(translatedPoint.x) < Number(item.x2)
      ) {
        evaluationTagData.data.push({
          id: item.id,
          channel: item.channel,
          evaluator: item.evaluator,
          evaluation: item.evaluation,
          model_name: item.model_name,
          x1: item.x1,
          x2: item.x2
        });
      }
    });
  }
  private getDefaultCoordCalculators() {
    const xAxis = this.parentSurface.xAxes.get(0);
    const yAxis = this.parentSurface.yAxes.get(0);
    if (!xAxis || !yAxis) {
      return {
        xCalc: undefined,
        yCalc: undefined
      };
    }

    const xCalc = xAxis.getCurrentCoordinateCalculator();
    const yCalc = yAxis.getCurrentCoordinateCalculator();

    return { xCalc, yCalc };
  }
}
