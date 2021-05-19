/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/camelcase */
import { reactive } from "vue";
import axios from "axios";
import apiUrl from "../../api_url.global";
import { ChartModifierBase2D } from "scichart/Charting/ChartModifiers/ChartModifierBase2D";
import { ModifierMouseArgs } from "scichart/Charting/ChartModifiers/ModifierMouseArgs";
import { Point } from "scichart/Core/Point";
import { BoxAnnotation } from "scichart/Charting/Visuals/Annotations/BoxAnnotation";
import { ECoordinateMode } from "scichart/Charting/Visuals/Annotations/AnnotationBase";
import { translateFromCanvasToSeriesViewRect } from "scichart/utils/translate";
import { testIsInBounds, testIsInXBounds } from "scichart/utils/pointUtil";
import { ENearestPointLogic } from "scichart/Charting/Visuals/RenderableSeries/HitTest/IHitTestProvider";
import { diagnoses } from "@/composition/store";
// 設定
type TDataPoint = {
  // index: number;
  x1Value: number;
  x2Value: number;
  y1Value: number;
  y2Value: number;
};
type TNote = {
  id: string;
  diagnosis_id: string;
  x1: string;
  x2: string;
  channel: string;
  note: string;
};
// type TDataPointArray = {
//   data: TDataPoint;
// }
// export const selectedPoints: TDataPoint[][] = reactive([]);
// Create a TypeScript class which inherits ChartModifierbase2D to insert into SciChartSurface.chartModifiers collection
export class SimpleDataPointSelectionModifier extends ChartModifierBase2D {
  private startPoint: Point | undefined;
  private endPoint: Point | undefined;
  private selectionAnnotation: BoxAnnotation;
  private isSelecting: boolean | undefined;
  config:any = reactive([]);
  selectedPoints: TDataPoint[][] = reactive([]);
  y1 = -1;
  y2 = 1;
  y3 = 3;
  y4 = 5;
  y5 = 7;
  y6 = 9;
  y7 = 11;

  // constructor() {
  //   super();

  //   // Create an annotation with YCoordinateMode Relative, and Y1, Y2 = 0,1
  //   // This stretches the annotation to fit the viewport in the Y-direction
  //   // Below in modifierMouseMove we will be updating the annotation X-values as the mouse is moved.
  //   this.selectionAnnotation = new BoxAnnotation({
  //     // Pixel COORDINATE MODE EXAMPLE
  //     // yCoordinateMode: ECoordinateMode.Pixel,
  //     // xCoordinateMode: ECoordinateMode.Pixel,

  //     // DataValue COORDINATE MODE EXAMPLE
  //     yCoordinateMode: ECoordinateMode.Relative,
  //     xCoordinateMode: ECoordinateMode.DataValue,
  //     y1: 0,
  //     y2: 0.1,
  //     // fill: "#ffffff33",
  //     fill: "#FFE66F33",
  //     strokeThickness: 0
  //   });
  //   console.log(this.selectionAnnotation);
  // }

  // Called when mouse-down on the chart
  public modifierMouseDown(args: ModifierMouseArgs): void {
    super.modifierMouseDown(args);

    this.selectionAnnotation = new BoxAnnotation({
      // Pixel COORDINATE MODE EXAMPLE
      // yCoordinateMode: ECoordinateMode.Pixel,
      // xCoordinateMode: ECoordinateMode.Pixel,

      // DataValue COORDINATE MODE EXAMPLE
      yCoordinateMode: ECoordinateMode.Relative,
      xCoordinateMode: ECoordinateMode.DataValue,
      y1: 0,
      y2: 0.1,
      // fill: "#ffffff33",
      fill: "#FFE66F33",
      strokeThickness: 0
    });
    console.log(this.selectionAnnotation);

    // Point coordinates relative to series view rectangle.
    const hitTestInfo = this.parentSurface.renderableSeries
      .get(0)
      .hitTestProvider.hitTest(
        args.mousePoint,
        ENearestPointLogic.NearestPoint2D,
        1,
        false
      );
    // console.log(hitTestInfo);
    const yClickDataValue = hitTestInfo.hitTestPointValues.y;
    // console.log(yClickDataValue);
    // console.log(this.y1);
    // console.log(this.y2);
    if (this.y1 < yClickDataValue && this.y2 > yClickDataValue) {
      // this.selectionAnnotation.y1 = this.y1;
      // this.selectionAnnotation.y2 = this.y2;
      this.selectionAnnotation.y1 = (1 / 6) * 5;
      this.selectionAnnotation.y2 = (1 / 6) * 6;
      // console.log("y1=>",this.selectionAnnotation.y1,"y2=>",this.selectionAnnotation.y2);
    } else if (this.y2 < yClickDataValue && this.y3 > yClickDataValue) {
      // this.selectionAnnotation.y1 = this.y2;
      // this.selectionAnnotation.y2 = this.y3;
      this.selectionAnnotation.y1 = (1 / 6) * 4;
      this.selectionAnnotation.y2 = (1 / 6) * 5;
      // console.log("y1=>",this.selectionAnnotation.y1,"y2=>",this.selectionAnnotation.y2);
    } else if (this.y3 < yClickDataValue && this.y4 > yClickDataValue) {
      // this.selectionAnnotation.y1 = this.y3;
      // this.selectionAnnotation.y2 = this.y4;
      this.selectionAnnotation.y1 = (1 / 6) * 3;
      this.selectionAnnotation.y2 = (1 / 6) * 4;
      // console.log("y1=>",this.selectionAnnotation.y1,"y2=>",this.selectionAnnotation.y2);
    } else if (this.y4 < yClickDataValue && this.y5 > yClickDataValue) {
      // this.selectionAnnotation.y1 = this.y4;
      // this.selectionAnnotation.y2 = this.y5;
      this.selectionAnnotation.y1 = (1 / 6) * 2;
      this.selectionAnnotation.y2 = (1 / 6) * 3;
      // console.log("y1=>",this.selectionAnnotation.y1,"y2=>",this.selectionAnnotation.y2);
    } else if (this.y5 < yClickDataValue && this.y6 > yClickDataValue) {
      // this.selectionAnnotation.y1 = this.y5;
      // this.selectionAnnotation.y2 = this.y6;
      this.selectionAnnotation.y1 = (1 / 6) * 1;
      this.selectionAnnotation.y2 = (1 / 6) * 2;
      // console.log("y1=>",this.selectionAnnotation.y1,"y2=>",this.selectionAnnotation.y2);
    } else if (this.y6 < yClickDataValue && this.y7 > yClickDataValue) {
      this.selectionAnnotation.y1 = (1 / 6) * 0;
      this.selectionAnnotation.y2 = (1 / 6) * 1;
      // console.log("y1=>",this.selectionAnnotation.y1,"y2=>",this.selectionAnnotation.y2);
    }
    // this.isSelecting = true;
    // this.parentSurface.annotations.remove(this.selectionAnnotation);
    // this.parentSurface.annotations.add(this.selectionAnnotation);

    const translatedPoint = translateFromCanvasToSeriesViewRect(
      args.mousePoint,
      this.parentSurface.seriesViewRect
    );
    console.log(translatedPoint);
    if (translatedPoint) {
      this.startPoint = translatedPoint;
      this.endPoint = translatedPoint;
      // // Pixel COORDINATE MODE EXAMPLE
      // this.selectionAnnotation.x1 = translatedPoint.x;
      // this.selectionAnnotation.x2 = translatedPoint.x;
      // this.selectionAnnotation.y1 = translatedPoint.y;
      // this.selectionAnnotation.y2 = translatedPoint.y;

      // DataValue COORDINATE MODE EXAMPLE
      const { xCalc, yCalc } = this.getDefaultCoordCalculators();
      if (!xCalc) {
        return;
      }

      this.selectionAnnotation.x1 = xCalc.getDataValue(translatedPoint.x);
      this.selectionAnnotation.x2 = xCalc.getDataValue(translatedPoint.x);
      // this.selectionAnnotation.y1 = yCalc.getDataValue(translatedPoint.y);
      // this.selectionAnnotation.y2 = yCalc.getDataValue(translatedPoint.y);
      this.isSelecting = true;

      // this.parentSurface.annotations.remove(this.selectionAnnotation);
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
      // // Pixel COORDINATE MODE EXAMPLE
      // this.selectionAnnotation.x2 = translatedPoint.x;
      // this.selectionAnnotation.y2 = translatedPoint.y;

      // DataValue COORDINATE MODE EXAMPLE
      const { xCalc, yCalc } = this.getDefaultCoordCalculators();
      if (!xCalc) {
        return;
      }
      this.selectionAnnotation.x2 = xCalc.getDataValue(translatedPoint.x);
      // this.selectionAnnotation.y2 = yCalc.getDataValue(translatedPoint.y);
    }
  }

  // Called when mouse-up on the chart
  public modifierMouseUp(args: ModifierMouseArgs) {
    super.modifierMouseUp(args);
    this.isSelecting = false;
    this.performSelection();
    // const selectedPointArray = [];
    // this.selectedPoints.forEach(item => {
    //   if (item.length !== 0) {
    //     selectedPointArray.push(item);
    //   }
    // });
    // console.log(selectedPointArray);
    // localStorage.setItem("selectedPoints", JSON.stringify(this.selectedPoints));
    // console.log(this.selectedPoints);
    document.getElementById("result").innerText = JSON.stringify(
      this.selectedPoints,
      null,
      4
    );
    this.startPoint = undefined;
    this.endPoint = undefined;

    this.addNote();
  }

  private performSelection() {
    this.selectedPoints = [];
    if (!(this.startPoint && this.endPoint)) {
      return;
    }
    // console.log(this.parentSurface.renderableSeries);

    this.parentSurface.renderableSeries
      .asArray()
      .filter(rs => rs.isVisible)

      .forEach((rs, index) => {
        // console.log(rs);
        this.selectedPoints[index] = [];
        const dataSeries = rs.dataSeries;
        if (!dataSeries) {
          return;
        }
        // console.log(rs);
        const xCalc = rs.xAxis.getCurrentCoordinateCalculator();
        const yCalc = rs.yAxis.getCurrentCoordinateCalculator();
        // console.log(xCalc);
        // console.log(yCalc);

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
        // console.log(leftXData, rightXData);
        let bottomYData, topYData;

        // if (
        //   yCalc.getDataValue(this.startPoint.y) <=
        //   yCalc.getDataValue(this.endPoint.y)
        // ) {
        //   bottomYData = yCalc.getDataValue(this.startPoint.y);
        //   topYData = yCalc.getDataValue(this.endPoint.y);
        // } else {
        //   bottomYData = yCalc.getDataValue(this.endPoint.y);
        //   topYData = yCalc.getDataValue(this.startPoint.y);
        // }
        // for (let i = 0; i < 8; i++) {
        //   if(yCalc.getDataValue(this.startPoint.y) > this.y1 +i &&
        //       yCalc.getDataValue(this.endPoint.y) < this.y2+i)
        // {
        //   bottomYData = this.y1;
        //   topYData = this.y2;
        // }
        // for (let i = 0; i < 12; i + 2) {
        //   if (
        //     yCalc.getDataValue(this.startPoint.y) > this.y1 + i &&
        //     yCalc.getDataValue(this.endPoint.y) < this.y2 + i
        //   ) {
        //     bottomYData = this.y1 + i;
        //     topYData = this.y2 + i;
        //   }
        // }
        if (
          // yCalc.getDataValue(this.startPoint.y) <=
          //   yCalc.getDataValue(this.endPoint.y) &&
          yCalc.getDataValue(this.startPoint.y) > this.y1 &&
          yCalc.getDataValue(this.endPoint.y) < this.y2
        ) {
          bottomYData = this.y1;
          topYData = this.y2;
        } else if (
          yCalc.getDataValue(this.startPoint.y) <=
            yCalc.getDataValue(this.endPoint.y) &&
          yCalc.getDataValue(this.startPoint.y) > this.y2 &&
          yCalc.getDataValue(this.endPoint.y) < this.y3
        ) {
          bottomYData = this.y2;
          topYData = this.y3;
        } else if (
          // yCalc.getDataValue(this.startPoint.y) <=
          //   yCalc.getDataValue(this.endPoint.y) &&
          yCalc.getDataValue(this.startPoint.y) > this.y3 &&
          yCalc.getDataValue(this.endPoint.y) < this.y4
        ) {
          bottomYData = this.y3;
          topYData = this.y4;
        } else if (
          // yCalc.getDataValue(this.startPoint.y) <=
          //   yCalc.getDataValue(this.endPoint.y) &&
          yCalc.getDataValue(this.startPoint.y) > this.y4 &&
          yCalc.getDataValue(this.endPoint.y) < this.y5
        ) {
          bottomYData = this.y4;
          topYData = this.y5;
        } else if (
          // yCalc.getDataValue(this.startPoint.y) <=
          //   yCalc.getDataValue(this.endPoint.y) &&
          yCalc.getDataValue(this.startPoint.y) > this.y5 &&
          yCalc.getDataValue(this.endPoint.y) < this.y6
        ) {
          bottomYData = this.y5;
          topYData = this.y6;
        } else if (
          // yCalc.getDataValue(this.startPoint.y) <=
          //   yCalc.getDataValue(this.endPoint.y) &&
          yCalc.getDataValue(this.startPoint.y) > this.y6 &&
          yCalc.getDataValue(this.endPoint.y) < this.y7
        ) {
          bottomYData = this.y6;
          topYData = this.y7;
        }
        // console.log(bottomYData, topYData);
        // const x = dataSeries.getNativeXValues().get(1);
        // const y = dataSeries.getNativeYValues().get(1);
        // const x = dataSeries.getNativeXValues();
        // const y = dataSeries.getNativeYValues();
        // if (
        //   testIsInBounds(x, y, leftXData, topYData, rightXData, bottomYData)
        //   //     // testIsInXBounds(x, leftXData, rightXData)
        // ) {
        //   this.selectedPoints[index].push({
        //     // index: i,
        //     x1Value: leftXData,
        //     x2Value: rightXData,
        //     y1Value: bottomYData,
        //     y2Value: topYData
        //   });
        // }
        for (let i = 0; i < dataSeries.count(); i++) {
          const x = dataSeries.getNativeXValues().get(i);
          const y = dataSeries.getNativeYValues().get(i);
          // console.log(x, y);
          if (
            testIsInBounds(x, y, leftXData, topYData, rightXData, bottomYData)
            // testIsInXBounds(x, leftXData, rightXData)
          ) {
            this.selectedPoints[index].push({
              // index: i,
              x1Value: leftXData,
              x2Value: rightXData,
              y1Value: bottomYData,
              y2Value: topYData
            });
          }
        }
      });
    console.log(this.selectedPoints);
    return this.selectedPoints;
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
  // public onAttach() {
  //   super.onAttach();
  //   this.parentSurface.annotations.add(this.selectionAnnotation);
  // }
  // public onDetach() {
  //   this.parentSurface.annotations.remove(this.selectionAnnotation);
  //   super.onDetach();
  // }
  public addNote() {
    console.log(this.selectedPoints);
    console.log(diagnoses.data);
    let x1: string;
    let x2: string;
    let theChannel: string;
    for (let i = 0; i < this.selectedPoints.length; i++) {
      // console.log(this.selectedPoints[i].length);
      if (this.selectedPoints[i].length !== 0) {
        // x1 = this.selectedPoints[i][0].toString();
        // x2 = this.selectedPoints[i][this.selectedPoints.length - 1].toString();
        x1 = this.selectedPoints[i][0].x1Value.toString();
        x2 = this.selectedPoints[i][0].x2Value.toString();
        theChannel = i.toString();
      }
    }
    // theChannel = () => {
    //   for (let i = 0; i < this.selectedPoints.length; i++) {
    //     console.log(this.selectedPoints[i].length);
    //     // if (!this.selectedPoints[i].length) {
    //     //   x1 = this.selectedPoints[i][0].toString();
    //     //   x2 = this.selectedPoints[i][
    //     //     this.selectedPoints.length - 1
    //     //   ].toString();
    //     //   return i.toString();
    //     // }
    //   }
    // };
    const note: TNote = {
      id: "",
      diagnosis_id: diagnoses.data[0].diagnosis_id,
      x1: x1,
      x2: x2,
      channel: theChannel,
      note: `["ST-D"]`
    };
    const token = localStorage.getItem("token");
    console.log(note);
    this.config = {
      url: apiUrl.url + "notes/create",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      method: "post",
      data: note
    };
    console.log(this.config);
    // return this.configData;
    // axios(this.config)
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }
}
