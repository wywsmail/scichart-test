/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/camelcase */

// About interface

interface Iapidata<T> {
  // length: number;
  data: T;
}

interface TDataPoint {
  // index: number;
  x1Value: number;
  x2Value: number;
  y1Value: number;
  y2Value: number;
}

interface TNote {
  id: string;
  diagnosis_id: string;
  x1: string;
  x2: string;
  channel: string;
  note: string;
}

import { reactive, ref, computed } from "vue";
import router from "../router/index";
import axios from "axios";
import apiUrl from "../../api_url.global";

// 原 tempState.js

export const token = localStorage.getItem("token") || ref(null);
export const userId = localStorage.getItem("userid") || ref(null);
export const tableData = reactive({
  data: []
});
export const role = localStorage.getItem("role") ?? ref("");
export const diagnoses: Iapidata<object> = reactive({
  data: [],
  length
});
// export const diagnoses = reactive({
//   data: []
// });
export const dataInformation = reactive({ data: [] });
export const rows = ref([]);
export const colums = ref([
  {
    label: "Patient ID",
    field: "patient_id"
  },
  {
    label: "Time",
    field: "datetime"
  },
  {
    label: "Measure Type",
    field: "measure_type"
  },
  {
    label: "Who measures",
    field: "measure_person"
  },
  {
    label: "Tags",
    field: "tagged"
  },
  {
    label: "",
    field: "delete"
  }
]);
export const numberOfElements = ref(0);
export const diagnosesUpdateTime = ref(null);

export const anomalyMode = ref(false);
export const anomalySequence = ref([]);
export const evaluationTags = ref([]);
export const anomalyModels = ref([]);

export const selectedPoints: TDataPoint[][] = reactive([]);

export const noteMode = ref("");
export const tagMode = computed(() => {
  return noteMode.value;
});
export const tagListData: any = reactive({
  data: []
});
export const tagList = computed(() => {
  return tagListData;
});
export const selectTagData: any = reactive({
  data: [
    {
      index: 0,
      channel: "",
      created_at: "",
      diagnosis_id: "",
      note: "",
      x1: "",
      x2: ""
    }
  ]
});
console.log(selectTagData.data);
export const tagDataShow = computed(() => {
  return selectTagData.data;
});
export const isEnabled = ref(false);
export const isChecked = computed(() => isEnabled.value);

// about scichart

import { SciChartSurface } from "scichart/Charting/Visuals/SciChartSurface";
import { NumericAxis } from "scichart/Charting/Visuals/Axis/NumericAxis";
import { NumberRange } from "scichart/Core/NumberRange";
import { CategoryAxis } from "scichart/Charting/Visuals/Axis/CategoryAxis";
import { EAxisAlignment } from "scichart/types/AxisAlignment";
import { FastLineRenderableSeries } from "scichart/Charting/Visuals/RenderableSeries/FastLineRenderableSeries";
import { XyDataSeries } from "scichart/Charting/Model/XyDataSeries";
import { ECoordinateMode } from "scichart/Charting/Visuals/Annotations/AnnotationBase";
import { TextAnnotation } from "scichart/Charting/Visuals/Annotations/TextAnnotation";
import { MouseWheelZoomModifier } from "scichart/Charting/ChartModifiers/MouseWheelZoomModifier";
import { EXyDirection } from "scichart/types/XyDirection";
import { SciChartJSLightTheme } from "scichart/Charting/Themes/SciChartJSLightTheme";
import { ZoomPanModifier } from "scichart/Charting/ChartModifiers/ZoomPanModifier";
import { HorizontalLineAnnotation } from "scichart/Charting/Visuals/Annotations/HorizontalLineAnnotation";

// 原 SimpleDataPointSelectionModifier.ts 內容

/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/camelcase */

import { ChartModifierBase2D } from "scichart/Charting/ChartModifiers/ChartModifierBase2D";
import { ModifierMouseArgs } from "scichart/Charting/ChartModifiers/ModifierMouseArgs";
import { Point } from "scichart/Core/Point";
import { BoxAnnotation } from "scichart/Charting/Visuals/Annotations/BoxAnnotation";
import { translateFromCanvasToSeriesViewRect } from "scichart/utils/translate";
import { testIsInBounds } from "scichart/utils/pointUtil";
import { ENearestPointLogic } from "scichart/Charting/Visuals/RenderableSeries/HitTest/IHitTestProvider";

// Create a TypeScript class which inherits ChartModifierbase2D to insert into SciChartSurface.chartModifiers collection
export class SimpleDataPointSelectionModifier extends ChartModifierBase2D {
  private startPoint: Point | undefined;
  private endPoint: Point | undefined;
  selectionAnnotation: BoxAnnotation;
  private isSelecting: boolean | undefined;
  config: any = reactive([]);
  y1 = -1;
  y2 = 1;
  y3 = 3;
  y4 = 5;
  y5 = 7;
  y6 = 9;
  y7 = 11;

  // Called when mouse-down on the chart
  public modifierMouseDown(args: ModifierMouseArgs): void {
    super.modifierMouseDown(args);
    this.selectionAnnotation = new BoxAnnotation({
      // DataValue COORDINATE MODE EXAMPLE
      yCoordinateMode: ECoordinateMode.Relative,
      xCoordinateMode: ECoordinateMode.DataValue,
      y1: 0,
      y2: 0.1,
      // fill: "#ffffff33",
      fill: "#FFE66F33",
      strokeThickness: 0
    });

    // Point coordinates relative to series view rectangle.
    const hitTestInfo = this.parentSurface.renderableSeries
      .get(0)
      .hitTestProvider.hitTest(
        args.mousePoint,
        ENearestPointLogic.NearestPoint2D,
        1,
        false
      );
    const yClickDataValue = hitTestInfo.hitTestPointValues.y;
    if (this.y1 < yClickDataValue && this.y2 > yClickDataValue) {
      this.selectionAnnotation.y1 = (1 / 6) * 5;
      this.selectionAnnotation.y2 = (1 / 6) * 6;
    } else if (this.y2 < yClickDataValue && this.y3 > yClickDataValue) {
      this.selectionAnnotation.y1 = (1 / 6) * 4;
      this.selectionAnnotation.y2 = (1 / 6) * 5;
    } else if (this.y3 < yClickDataValue && this.y4 > yClickDataValue) {
      this.selectionAnnotation.y1 = (1 / 6) * 3;
      this.selectionAnnotation.y2 = (1 / 6) * 4;
    } else if (this.y4 < yClickDataValue && this.y5 > yClickDataValue) {
      this.selectionAnnotation.y1 = (1 / 6) * 2;
      this.selectionAnnotation.y2 = (1 / 6) * 3;
    } else if (this.y5 < yClickDataValue && this.y6 > yClickDataValue) {
      this.selectionAnnotation.y1 = (1 / 6) * 1;
      this.selectionAnnotation.y2 = (1 / 6) * 2;
    } else if (this.y6 < yClickDataValue && this.y7 > yClickDataValue) {
      this.selectionAnnotation.y1 = (1 / 6) * 0;
      this.selectionAnnotation.y2 = (1 / 6) * 1;
    }

    const translatedPoint = translateFromCanvasToSeriesViewRect(
      args.mousePoint,
      this.parentSurface.seriesViewRect
    );
    console.log(translatedPoint);
    if (translatedPoint) {
      this.startPoint = translatedPoint;
      this.endPoint = translatedPoint;

      // DataValue COORDINATE MODE EXAMPLE
      const { xCalc, yCalc } = this.getDefaultCoordCalculators();
      if (!xCalc) {
        return;
      }

      this.selectionAnnotation.x1 = xCalc.getDataValue(translatedPoint.x);
      this.selectionAnnotation.x2 = xCalc.getDataValue(translatedPoint.x);
      this.isSelecting = true;

      this.parentSurface.annotations.remove(this.selectionAnnotation);
      this.parentSurface.annotations.add(this.selectionAnnotation);
    }
  }

  // Called when mouse-move on the chart
  public modifierMouseMove(args: ModifierMouseArgs): void {
    super.modifierMouseMove(args);
    const translatedPoint = translateFromCanvasToSeriesViewRect(
      args.mousePoint,
      this.parentSurface.seriesViewRect
    );

    if (translatedPoint && this.isSelecting) {
      this.endPoint = args.mousePoint;

      // DataValue COORDINATE MODE EXAMPLE
      const { xCalc, yCalc } = this.getDefaultCoordCalculators();
      if (!xCalc) {
        return;
      }
      this.selectionAnnotation.x2 = xCalc.getDataValue(translatedPoint.x);
    }
  }

  // Called when mouse-up on the chart
  public modifierMouseUp(args: ModifierMouseArgs) {
    super.modifierMouseUp(args);
    this.isSelecting = false;
    this.performSelection();
    this.startPoint = undefined;
    this.endPoint = undefined;
    this.cancelSelectionData();
  }

  private performSelection() {
    selectedPoints.length = 0;
    if (!(this.startPoint && this.endPoint)) {
      return;
    }
    this.parentSurface.renderableSeries
      .asArray()
      .filter(rs => rs.isVisible)

      .forEach((rs, index) => {
        selectedPoints[index] = [];
        const dataSeries = rs.dataSeries;
        if (!dataSeries) {
          return;
        }
        const xCalc = rs.xAxis.getCurrentCoordinateCalculator();
        const yCalc = rs.yAxis.getCurrentCoordinateCalculator();

        // Find the bounds of the data inside the rectangle

        let leftXData, rightXData;

        if (
          xCalc.getDataValue(this.startPoint.x) <=
          xCalc.getDataValue(this.endPoint.x)
        ) {
          leftXData = xCalc.getDataValue(this.startPoint.x);
          rightXData = xCalc.getDataValue(this.endPoint.x);
        } else {
          leftXData = xCalc.getDataValue(this.endPoint.x);
          rightXData = xCalc.getDataValue(this.startPoint.x);
        }
        let bottomYData, topYData;

        if (
          yCalc.getDataValue(this.startPoint.y) > this.y1 &&
          yCalc.getDataValue(this.endPoint.y) < this.y2
        ) {
          bottomYData = this.y1;
          topYData = this.y2;
        } else if (
          yCalc.getDataValue(this.startPoint.y) > this.y2 &&
          yCalc.getDataValue(this.endPoint.y) < this.y3
        ) {
          bottomYData = this.y2;
          topYData = this.y3;
        } else if (
          yCalc.getDataValue(this.startPoint.y) > this.y3 &&
          yCalc.getDataValue(this.endPoint.y) < this.y4
        ) {
          bottomYData = this.y3;
          topYData = this.y4;
        } else if (
          yCalc.getDataValue(this.startPoint.y) > this.y4 &&
          yCalc.getDataValue(this.endPoint.y) < this.y5
        ) {
          bottomYData = this.y4;
          topYData = this.y5;
        } else if (
          yCalc.getDataValue(this.startPoint.y) > this.y5 &&
          yCalc.getDataValue(this.endPoint.y) < this.y6
        ) {
          bottomYData = this.y5;
          topYData = this.y6;
        } else if (
          yCalc.getDataValue(this.startPoint.y) > this.y6 &&
          yCalc.getDataValue(this.endPoint.y) < this.y7
        ) {
          bottomYData = this.y6;
          topYData = this.y7;
        }
        for (let i = 0; i < dataSeries.count(); i++) {
          const x = dataSeries.getNativeXValues().get(i);
          const y = dataSeries.getNativeYValues().get(i);
          if (
            testIsInBounds(x, y, leftXData, topYData, rightXData, bottomYData)
          ) {
            selectedPoints[index].push({
              x1Value: leftXData,
              x2Value: rightXData,
              y1Value: bottomYData,
              y2Value: topYData
            });
          }
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

  private cancelSelectionData() {
    const cancelSelectButton_1 = document.getElementById(
      "cancelSelectButton-1"
    );
    const cancelSelectButton_2 = document.getElementById(
      "cancelSelectButton-2"
    );
    cancelSelectButton_1.addEventListener("click", () => {
      this.parentSurface.annotations.remove(this.selectionAnnotation);
    });
    cancelSelectButton_2.addEventListener("click", () => {
      this.parentSurface.annotations.remove(this.selectionAnnotation);
    });
  }
}

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
    console.log(tagList.value.data);

    selectTagData.data.length = 0;
    for (let i = 0; i < tagList.value.data.length; i++) {
      if (
        tagList.value.data[i].channel === "0" &&
        -1 < yCalc.getDataValue(translatedPoint.y) &&
        yCalc.getDataValue(translatedPoint.y) < 1 &&
        Number(tagList.value.data[i].x1) <
          xCalc.getDataValue(translatedPoint.x) &&
        xCalc.getDataValue(translatedPoint.x) < Number(tagList.value.data[i].x2)
      ) {
        console.log(tagList.value.data[i].channel);
        console.log(tagList.value.data[i].x1);
        console.log(tagList.value.data[i].x2);
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
      } else if (
        tagList.value.data[i].channel === "1" &&
        1 < yCalc.getDataValue(translatedPoint.y) &&
        yCalc.getDataValue(translatedPoint.y) < 3 &&
        Number(tagList.value.data[i].x1) <
          xCalc.getDataValue(translatedPoint.x) &&
        xCalc.getDataValue(translatedPoint.x) < Number(tagList.value.data[i].x2)
      ) {
        console.log(tagList.value.data[i].channel);
        console.log(tagList.value.data[i].x1);
        console.log(tagList.value.data[i].x2);
        // selectTagData.index = 0;
        // selectTagData.data.length = 0;
        // selectTagData.index = i;
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
        tagList.value.data[i].channel === "2" &&
        3 < yCalc.getDataValue(translatedPoint.y) &&
        yCalc.getDataValue(translatedPoint.y) < 5 &&
        Number(tagList.value.data[i].x1) <
          xCalc.getDataValue(translatedPoint.x) &&
        xCalc.getDataValue(translatedPoint.x) < Number(tagList.value.data[i].x2)
      ) {
        console.log(tagList.value.data[i].channel);
        console.log(tagList.value.data[i].x1);
        console.log(tagList.value.data[i].x2);
        // selectTagData.index = 0;
        // selectTagData.data.length = 0;
        // selectTagData.index = i;
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
        tagList.value.data[i].channel === "3" &&
        5 < yCalc.getDataValue(translatedPoint.y) &&
        yCalc.getDataValue(translatedPoint.y) < 7 &&
        Number(tagList.value.data[i].x1) <
          xCalc.getDataValue(translatedPoint.x) &&
        xCalc.getDataValue(translatedPoint.x) < Number(tagList.value.data[i].x2)
      ) {
        console.log(tagList.value.data[i].channel);
        console.log(tagList.value.data[i].x1);
        console.log(tagList.value.data[i].x2);
        // selectTagData.index = 0;
        // selectTagData.data.length = 0;
        // selectTagData.index = i;
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
        tagList.value.data[i].channel === "4" &&
        7 < yCalc.getDataValue(translatedPoint.y) &&
        yCalc.getDataValue(translatedPoint.y) < 9 &&
        Number(tagList.value.data[i].x1) <
          xCalc.getDataValue(translatedPoint.x) &&
        xCalc.getDataValue(translatedPoint.x) < Number(tagList.value.data[i].x2)
      ) {
        console.log(tagList.value.data[i].channel);
        console.log(tagList.value.data[i].x1);
        console.log(tagList.value.data[i].x2);
        // selectTagData.index = 0;
        // selectTagData.data.length = 0;
        // selectTagData.index = i;
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
        tagList.value.data[i].channel === "5" &&
        9 < yCalc.getDataValue(translatedPoint.y) &&
        yCalc.getDataValue(translatedPoint.y) < 11 &&
        Number(tagList.value.data[i].x1) <
          xCalc.getDataValue(translatedPoint.x) &&
        xCalc.getDataValue(translatedPoint.x) < Number(tagList.value.data[i].x2)
      ) {
        console.log(tagList.value.data[i].channel);
        console.log(tagList.value.data[i].x1);
        console.log(tagList.value.data[i].x2);
        // selectTagData.index = 0;
        // selectTagData.data.length = 0;
        // selectTagData.index = i;
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
      }
    }
    console.log(selectTagData);
    // console.log(tagDataShow.value);
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

// 原 SimpleDataPointSelectionModifier.ts 內容
export const initSciChart = async () => {
  // SciChartSurface.setRuntimeLicenseKey(
  //   "5ycxvf/fY4gXbo/ejlWy2JzrxfwiO3XxnN4QB5l327kqZNnGd+hs1lHuSmi2+TDeenf0kGGDk6rpjYWwpLJipt6qTvMzRx6zlZhY9Qyo+DYNuNieYzxrC/ZceJwv7E/2UdlYysxQLHMDEcp0txtbjJ++qVe4gjU1bgU8+mz92RzB7rZhonqZ6pCZyLYgONZ8ljZicebuSlOM0KQSeomou30SIE1S9wiP6W9YuuaIoCR/gZIwMZnioOHf8k3gsPB3EfCH0D/Mz+/eUq9RliOJkSm66r13+XgaDRp/fG9UAF2xoZmXSqzBX1v52A2Xn7NuXyxmOiQVRvIfuF7qW6e7XIZqHed6ZJ+rp9xXMs+q1JlF39LmZsMqChi0HuAM8eohJhRJ0dspyTAFH9aot6nBJCi1DmKu0DXumyXm9IdEOlXCWa5whtWDwoUnvkuKrI1KRDVZ1KjsDoZ+Pvw+7oX0+ERCeMeUrpgx0XhDFe8jzQB33hmiAu23FJ4OIike6RGYlWk5VczgpY+NXSVj5tjM0b0JiF/mFGjoFKsQ3noKqAHyosPrfhtGH830MYD44ObNWuvLWeLxNofC4a5odOwPFHvwDVVlNTAo9UFw2g3p7pF9WAsup7+YV7cjooMQPqrMD4GBSggeh+k26nQyc9nAT0qiceMSScuHENhbc+j8UFI0RZuP1x5d6xkJJ1A8TtJ41KDqxML8QrV/KijPP+y5iAxIOCexrjGlPTCTdUhTpw=="
  // );

  // ONLY FOR PRODUCTION LICENSSING KEY
  // SciChartSurface.setRuntimeLicenseKey(
  //   "LZSp787dL/Q4OmsvGywWQ6RZ8ql5O6jhjw92po8di9pP4KZZoQQ2uuoWMlO1sGNxc9grA4cGGd32r7vZkzLO1uhLsjXtowGqE090CV9L0BXDkhRrIsxtCYHIk1OXfbESEqVWSxeEKqx/OnKi3y51xIYc/VkxSq1GIO7sY0ZLjY9Sgmf/qupcwWmj/0xeni3FbW0IsX/NLIpAz3yt0YtUviMQc7GIdNpjnuLT9SF3xx8wUzWXyaUs55QpnRoE/7eX2W7BNqOaqtrLQyUBPp6Yp37PYYdGB6zs1Dsr63W8sFJjQui9uq12Ugmn+twLaZnY97++s9dAzDrj3RvCNZjGDaRDJNHBcnpg/whW+aYIIvOGjruyP8x6kUm01hXeo8iCt/+jT/AlJdLjVTy1UDbj1JCIy6YBJI/etfwc87Pn8JBSDVW37LHtrS8yHwpZV0M/0gdi9BtgxFTzT7pd7GYe6K+1EQZZJ2GV0/moZ4Jr8PYTXLdXE0M3pw04lOquC60A3KuH9shbXlBypWYL7+83s7Fpz850yve4UJWe+6M49WLQgznNjFezb6jF0ciOoywVvr/nx7zbilQjz6xpNPDHyMQMDWbTbsqAy9oQ5ePvkFx4tUsrMSSA3bmU0mDQHCKD2bwMQEO1rQYzLLTUVYHkBDl+idhoFraXDz0ISwrJZQsbfRcr62FvekndjRNSd+LwZa9DoZUuAhzoRsR5X4Q0F788K/u1UtaiFvlffPpTy7x5bzj2km0FHDEVxGg0ZxZ/3Bd2f2TiVQ=="
  // );

  // ONLY FOR DEVELOPE LICENSSING KEY
  // SciChartSurface.setRuntimeLicenseKey(
  //   "fsC8ShOqUyzYgXr/skXvPhxfeOawLCs4Y3yFKW/wU9rDKjnvlMmrPhgzLBpOEhX2Bsk2v7z6E5tBreHZZffphKqKalYC6WTyaFHWsUSTgM0XvFVEXKNBmHCU+GyJ3DXi1SF5H2U73J3RgEs8JgLwSG4dd3qawMdhPbylEDTZvfV+rUv2h/GMoL8lKRcXCz+eR3NIBJSu8O4VAX3yirx0n1zwxX3izWjTDjqTNGqlrT5vkR44TEWWMoEh6oqL/aoHLewl1m0LtzO2XOyTL0oho7ufHAEomlIiQ2TkpXr69FvLzt/LqdcVKPFJEKgVnUfgDLsmmlX6rntwAOqrEj2bvcSb4G5GRGjylm8Nx0bJaNI94l89R+mISp8sPjoDqgP18XVKTlOy3172+xZcyFksISnHtRf5a2E6CjpccJXhplNfEKEM4Xs8NC0g/lgPX8ChTYOWvpJC9/RAPx6qAighr6ehWRjDSq75FzeHRMmsFCULaWQ0xrTFQGmVFzKNWSkzu8pUtazblJR3h8pfTqMLbRlBqqvPijQ+SUa5rSEp8jyjRztWkgYGZk8lqGSwQdpZ1FD0NzVrJxb4wr7bLMNDH9Oq7IIfoIt3QeyWhn8COKFfS0+hVL+V25IJEMgV8SlVEBvaLM1cCvEWTbpWeBipCgOowoeO2YzGZlu9CZqry/pEq1x9Nvfeo2PYDwBxO9kSl1EWYXQMPVp/TNR7GlQ+B6TdbIFTIGC/jX4+v3or9Q=="
  // );

  // FOR BOTH DOMAIN LICENSSING KEY
  SciChartSurface.setRuntimeLicenseKey(
    "v/0WAay88q5K5d+TsxglfrXiVkYIvp214hdjRXm5ISMTAaue7nTmdIbTIgH+AzBpZIuE20RKtPWFXOrKmbhLyy7y6ozcbKUqTlcTWpUalDb72gnqx6YxAAwGhe16TAoG/GKdNsFDdHax+ke/AvlVRyUuMaqQFs50nwgMJp51klnoJsuEEdbw6A3P8iR9JyPpSxgQ/ODg9790GRnhSecEA5smLRQBA3qBE9kDRwDZHQxO+DR4NFjiaoZTR88ZLb8dcVkU+YZNCg4VLyohjCjcCMfOnAUGGywkF+444aWZE5djzhps+xoJYyfbfrkD1ZMS51bApQEkEydOG+h0BN1PUSf1fLBhv5ltN7/+jLMKVshVErAgsXRscIkLYb3J5K2ZxjIvk0HeHnn2rtYfxX+j94Ta06h7ClwNcT3LFZnBLKe9yH8RUv6iOEQPQAXT50UlRLRCRYMViccc061CqZCmHVw5WD7HLzTfipk5VLxyqlmjf7v8mjpf2oBCNd05quIqSpLXUBzJZShBk9+Z2VGKOzeSVel7ZbRY0ReBm2BMaZ9Vx+hchrKWX+YCcbynD10mMx4FB2SL+fXxgzUp+7W67K/6YgCxlw0wHs/b5r9+gpqgMa6Zg7GF3nqp2yhpyXvPHhVIdNcmYfRGiPju5YuKY/Dsu0I3+QnCp5CDHgNqdsIEBTIbFd+734qGh6uaEcwKZcSnAWFmmWnW7WoqoX4twdahNOYR3+rDhu3KZvppeIx7cjKsCFz0EVnyVIEm4CD5inCbTWbYaQ=="
  );

  const { sciChartSurface, wasmContext } = await SciChartSurface.create(
    "scichart-root"
  );

  sciChartSurface.applyTheme(new SciChartJSLightTheme());

  const xAxis = new CategoryAxis(wasmContext);
  xAxis.labelProvider.formatLabel = (index: number) => {
    return (index / 250).toFixed(0) + "s";
  };
  xAxis.drawMajorGridLines = true;
  xAxis.autoTicks = false;
  console.log(xAxis.majorDelta);
  xAxis.minorDelta = 0;
  console.log(xAxis.minorDelta);
  xAxis.visibleRangeLimit = new NumberRange(0, 7499);
  const yAxis = new NumericAxis(wasmContext, {
    axisTitle: "(mV)",
    axisAlignment: EAxisAlignment.Right,
    drawLabels: false
  });
  yAxis.visibleRange = new NumberRange(-1, 11);

  sciChartSurface.xAxes.add(xAxis);
  sciChartSurface.yAxes.add(yAxis);

  // // Declare a DataSeries
  const xyDataSeries1 = new XyDataSeries(wasmContext);
  const xyDataSeries2 = new XyDataSeries(wasmContext);
  const xyDataSeries3 = new XyDataSeries(wasmContext);
  const xyDataSeries4 = new XyDataSeries(wasmContext);
  const xyDataSeries5 = new XyDataSeries(wasmContext);
  const xyDataSeries6 = new XyDataSeries(wasmContext);

  diagnoses.data[0].measures[0].values[0].raw_datas.forEach(
    (item: number, index: number) => {
      xyDataSeries6.append(index, item + 10);
    }
  );
  diagnoses.data[0].measures[0].values[1].raw_datas.forEach(
    (item: number, index: number) => {
      xyDataSeries5.append(index, item + 8);
    }
  );
  diagnoses.data[0].measures[0].values[2].raw_datas.forEach(
    (item: number, index: number) => {
      xyDataSeries4.append(index, item + 6);
    }
  );
  diagnoses.data[0].measures[0].values[3].raw_datas.forEach(
    (item: number, index: number) => {
      xyDataSeries3.append(index, item + 4);
    }
  );
  diagnoses.data[0].measures[0].values[4].raw_datas.forEach(
    (item: number, index: number) => {
      xyDataSeries2.append(index, item + 2);
    }
  );
  diagnoses.data[0].measures[0].values[5].raw_datas.forEach(
    (item: number, index: number) => {
      xyDataSeries1.append(index, item + 0);
    }
  );

  sciChartSurface.annotations.add(
    // Add TextAnnotations in the top left of the chart
    new TextAnnotation({
      text: "LEAD 1",
      textColor: "black",
      fontSize: 18,
      x1: 0.05,
      y1: (1 / 6) * 0,
      xCoordinateMode: ECoordinateMode.Relative,
      yCoordinateMode: ECoordinateMode.Relative
    }),
    new TextAnnotation({
      text: "LEAD 2",
      textColor: "black",
      fontSize: 18,
      x1: 0.05,
      y1: (1 / 6) * 1,
      xCoordinateMode: ECoordinateMode.Relative,
      yCoordinateMode: ECoordinateMode.Relative
    }),
    new TextAnnotation({
      text: "LEAD 3",
      textColor: "black",
      fontSize: 18,
      x1: 0.05,
      y1: (1 / 6) * 2,
      xCoordinateMode: ECoordinateMode.Relative,
      yCoordinateMode: ECoordinateMode.Relative
    }),
    new TextAnnotation({
      text: "aVR",
      textColor: "black",
      fontSize: 18,
      x1: 0.05,
      y1: (1 / 6) * 3,
      xCoordinateMode: ECoordinateMode.Relative,
      yCoordinateMode: ECoordinateMode.Relative
    }),
    new TextAnnotation({
      text: "aVL",
      textColor: "black",
      fontSize: 18,
      x1: 0.05,
      y1: (1 / 6) * 4,
      xCoordinateMode: ECoordinateMode.Relative,
      yCoordinateMode: ECoordinateMode.Relative
    }),
    new TextAnnotation({
      text: "aVF",
      textColor: "black",
      fontSize: 18,
      x1: 0.05,
      y1: (1 / 6) * 5,
      xCoordinateMode: ECoordinateMode.Relative,
      yCoordinateMode: ECoordinateMode.Relative
    }),
    new HorizontalLineAnnotation({
      stroke: "green",
      strokeThickness: 2,
      y1: 1
    }),
    new HorizontalLineAnnotation({
      stroke: "green",
      strokeThickness: 2,
      y1: 3
    }),
    new HorizontalLineAnnotation({
      stroke: "green",
      strokeThickness: 2,
      y1: 5
    }),
    new HorizontalLineAnnotation({
      stroke: "green",
      strokeThickness: 2,
      y1: 7
    }),
    new HorizontalLineAnnotation({
      stroke: "green",
      strokeThickness: 2,
      y1: 9
    })
  );

  // Add a line series to the SciChartSurface
  const lineSeries1 = new FastLineRenderableSeries(wasmContext);
  lineSeries1.strokeThickness = 2;
  lineSeries1.stroke = "rgba(255,0,0,1)";
  lineSeries1.dataSeries = xyDataSeries1;

  const lineSeries2 = new FastLineRenderableSeries(wasmContext);
  lineSeries2.strokeThickness = 2;
  lineSeries2.stroke = "rgba(255,0,0,1)";
  lineSeries2.dataSeries = xyDataSeries2;

  const lineSeries3 = new FastLineRenderableSeries(wasmContext);
  lineSeries3.strokeThickness = 2;
  lineSeries3.stroke = "rgba(255,0,0,1)";
  lineSeries3.dataSeries = xyDataSeries3;

  const lineSeries4 = new FastLineRenderableSeries(wasmContext);
  lineSeries4.strokeThickness = 2;
  lineSeries4.stroke = "rgba(255,0,0,1)";
  lineSeries4.dataSeries = xyDataSeries4;

  const lineSeries5 = new FastLineRenderableSeries(wasmContext);
  lineSeries5.strokeThickness = 2;
  lineSeries5.stroke = "rgba(255,0,0,1)";
  lineSeries5.dataSeries = xyDataSeries5;

  const lineSeries6 = new FastLineRenderableSeries(wasmContext);
  lineSeries6.strokeThickness = 2;
  lineSeries6.stroke = "rgba(255,0,0,1)";
  lineSeries6.dataSeries = xyDataSeries6;

  sciChartSurface.renderableSeries.add(lineSeries1);
  sciChartSurface.renderableSeries.add(lineSeries2);
  sciChartSurface.renderableSeries.add(lineSeries3);
  sciChartSurface.renderableSeries.add(lineSeries4);
  sciChartSurface.renderableSeries.add(lineSeries5);
  sciChartSurface.renderableSeries.add(lineSeries6);

  const tagModeEnable: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("tag-mode")
  );
  const scichartRoot = document.getElementById("scichart-root");

  const zoomPanModifier = new ZoomPanModifier();
  const simpleDataPointSelectionModifier = new SimpleDataPointSelectionModifier();
  const mouseWheelZoomModifier = new MouseWheelZoomModifier();
  const mouseMoveShowdataModifier = new MouseClickShowdataModifier();

  sciChartSurface.chartModifiers.add(zoomPanModifier);
  sciChartSurface.chartModifiers.add(simpleDataPointSelectionModifier);
  sciChartSurface.chartModifiers.add(mouseWheelZoomModifier);
  sciChartSurface.chartModifiers.add(mouseMoveShowdataModifier);

  mouseWheelZoomModifier.xyDirection = EXyDirection.XDirection;
  zoomPanModifier.xyDirection = EXyDirection.XDirection;

  tagModeEnable.addEventListener("change", () => {
    if (tagModeEnable.checked === true) {
      simpleDataPointSelectionModifier.isEnabled = true;
      zoomPanModifier.isEnabled = false;
      scichartRoot.setAttribute("data-bs-toggle", "modal");
      scichartRoot.setAttribute("data-bs-target", "#exampleModal");
    } else {
      simpleDataPointSelectionModifier.isEnabled = false;
      zoomPanModifier.isEnabled = true;
      scichartRoot.removeAttribute("data-bs-toggle");
      scichartRoot.removeAttribute("data-bs-target");
    }
  });
  axios
    .get(apiUrl.url + "notes/" + diagnoses.data[0].diagnosis_id, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then(res => {
      console.log(res);
      tagListData.data = res.data.data;
      console.log(tagListData);
      console.log(tagList.value.data);
      for (let i = 0; i < res.data.data.length; i++) {
        if (res.data.data[i].channel === "0") {
          sciChartSurface.annotations.add(
            new BoxAnnotation({
              fill: "#FFE66F33",
              strokeThickness: 0,
              x1: parseInt(tagListData.data[i].x1),
              x2: parseInt(tagListData.data[i].x2),
              y1: -1,
              y2: 1
            })
          );
        } else if (res.data.data[i].channel === "1") {
          sciChartSurface.annotations.add(
            new BoxAnnotation({
              fill: "#FFE66F33",
              strokeThickness: 0,
              x1: parseInt(tagListData.data[i].x1),
              x2: parseInt(tagListData.data[i].x2),
              y1: 1,
              y2: 3
            })
          );
        } else if (res.data.data[i].channel === "2") {
          sciChartSurface.annotations.add(
            new BoxAnnotation({
              fill: "#FFE66F33",
              strokeThickness: 0,
              x1: parseInt(tagListData.data[i].x1),
              x2: parseInt(tagListData.data[i].x2),
              y1: 3,
              y2: 5
            })
          );
        } else if (res.data.data[i].channel === "3") {
          sciChartSurface.annotations.add(
            new BoxAnnotation({
              fill: "#FFE66F33",
              strokeThickness: 0,
              x1: parseInt(tagListData.data[i].x1),
              x2: parseInt(tagListData.data[i].x2),
              y1: 5,
              y2: 7
            })
          );
        } else if (res.data.data[i].channel === "4") {
          sciChartSurface.annotations.add(
            new BoxAnnotation({
              fill: "#FFE66F33",
              strokeThickness: 0,
              x1: parseInt(tagListData.data[i].x1),
              x2: parseInt(tagListData.data[i].x2),
              y1: 7,
              y2: 9
            })
          );
        } else {
          sciChartSurface.annotations.add(
            new BoxAnnotation({
              fill: "#FFE66F33",
              strokeThickness: 0,
              x1: parseInt(tagListData.data[i].x1),
              x2: parseInt(tagListData.data[i].x2),
              y1: 9,
              y2: 11
            })
          );
        }
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export const saveData = val => {
  console.log(selectedPoints);
  console.log(diagnoses.data);
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
      theChannel = i.toString();
    }
  }
  const config: any = {
    url: apiUrl.url + "notes/create",
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

export const showTagList = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(apiUrl.url + "notes/" + diagnoses.data[0].diagnosis_id, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(res => {
        console.log(res);
        tagListData.data = res.data.data;
      })
      .catch(err => {
        console.log(err);
      });
  });
};

export const deleteData = val => {
  console.log(tagListData);
  console.log(val);
  // console.log(tagListData.data.indexOf(val.data[0].id));
  const config: any = {
    url: apiUrl.url + "notes/delete/" + val[0].id,
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

export const modifyData = (tagData, val) => {
  console.log(tagData);
  console.log(val);
  const config: any = {
    url: apiUrl.url + "notes/modify",
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

// HOME PAGE
export const isLogin = ref(JSON.parse(localStorage.getItem("isLogin")));
console.log(isLogin.value);

// LOGIN PAGE

export const identifier = ref("");
export const password = ref("");
export const retrieveToken = (phone: string, password: string) => {
  const loginConfig: any = {
    baseURL: apiUrl.url,
    url: "/login",
    headers: {
      "Content-Type": "application/json",
      platform: "mobile"
    },
    method: "post",
    data: {
      identifier: phone,
      password: password
    }
  };
  console.log("送的資料", loginConfig);
  axios(loginConfig)
    .then(res => {
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("userid", res.data.user_id);
      localStorage.setItem("token", res.data.access_token);
      window.setTimeout(() => {
        router.push({
          name: "Diagnoses"
        });
      }, 1000);
      localStorage.setItem("isLogin", JSON.stringify(true));
      isLogin.value = true;
      console.log(isLogin.value);
      console.log(token.value);
    })
    .catch(err => {
      console.log(err);
    });
};
export const login = () => {
  retrieveToken(identifier.value, password.value);
};

export const logout = () => {
  window.localStorage.removeItem("userid");
  window.localStorage.removeItem("diagnosesid");
  tableData.data.length = 0;
  localStorage.setItem("isLogin", JSON.stringify(false));
  isLogin.value = false;
  console.log(isLogin.value);
  window.setTimeout(() => {
    router.push({ name: "Home" });
  }, 1000);
  console.log(userId.value);
};

// DIAGNOSES PAGE

export const requestDiagnoses = () => {
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

// CHART PAGE

export const getECGChart = (index, row) => {
  console.log(index, row);
  console.log(row.diagnosis_id);
  router.push(`/Diagnoses/${row.diagnosis_id}`);
};

export const showECGChart = (id): Promise<any> => {
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

export const modelName = reactive([]);

export const getAnomalyModels = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get("https://dev.intelliances.com/broker/medical/v1/models/name")
      .then(res => {
        modelName.push({
          value: "選項" + 1,
          label: res.data.default
        });
        res.data.challengers.forEach((item, index) => {
          modelName.push({
            value: `選項${index + 2}`,
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
