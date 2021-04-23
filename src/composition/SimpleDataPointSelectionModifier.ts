import { ChartModifierBase2D } from "scichart/Charting/ChartModifiers/ChartModifierBase2D";
import { ModifierMouseArgs } from "scichart/Charting/ChartModifiers/ModifierMouseArgs";
import { Point } from "scichart/Core/Point";
import { BoxAnnotation } from "scichart/Charting/Visuals/Annotations/BoxAnnotation";
import { ECoordinateMode } from "scichart/Charting/Visuals/Annotations/AnnotationBase";
import { translateFromCanvasToSeriesViewRect } from "scichart/utils/translate";
import { testIsInBounds } from "scichart/utils/pointUtil";
import { ENearestPointLogic } from "scichart/Charting/Visuals/RenderableSeries/HitTest/IHitTestProvider";

// 設定
type TDataPoint = {
  index: number;
  // xValue: number;
  // yValue: number;
};
// type TDataPointArray = {
//   data: TDataPoint;
// }

// Create a TypeScript class which inherits ChartModifierbase2D to insert into SciChartSurface.chartModifiers collection
export class SimpleDataPointSelectionModifier extends ChartModifierBase2D {
  private startPoint: Point | undefined;
  private endPoint: Point | undefined;
  private readonly selectionAnnotation: BoxAnnotation;
  private isSelecting: boolean | undefined;
  private selectedPoints: TDataPoint[][] = [];
  y1 = 0;
  y2 = 1;
  y3 = 3;
  y4 = 5;
  y5 = 7;
  y6 = 9;
  y7 = 11;

  constructor() {
    super();

    // Create an annotation with YCoordinateMode Relative, and Y1, Y2 = 0,1
    // This stretches the annotation to fit the viewport in the Y-direction
    // Below in modifierMouseMove we will be updating the annotation X-values as the mouse is moved.
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
  }

  // Called when mouse-down on the chart
  public modifierMouseDown(args: ModifierMouseArgs): void {
    super.modifierMouseDown(args);
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
      this.selectionAnnotation.y1 = 0.84;
      this.selectionAnnotation.y2 = 1;
      // console.log("y1=>",this.selectionAnnotation.y1,"y2=>",this.selectionAnnotation.y2);
    } else if (this.y2 < yClickDataValue && this.y3 > yClickDataValue) {
      // this.selectionAnnotation.y1 = this.y2;
      // this.selectionAnnotation.y2 = this.y3;
      this.selectionAnnotation.y1 = 0.66;
      this.selectionAnnotation.y2 = 0.84;
      // console.log("y1=>",this.selectionAnnotation.y1,"y2=>",this.selectionAnnotation.y2);
    } else if (this.y3 < yClickDataValue && this.y4 > yClickDataValue) {
      // this.selectionAnnotation.y1 = this.y3;
      // this.selectionAnnotation.y2 = this.y4;
      this.selectionAnnotation.y1 = 0.485;
      this.selectionAnnotation.y2 = 0.66;
      // console.log("y1=>",this.selectionAnnotation.y1,"y2=>",this.selectionAnnotation.y2);
    } else if (this.y4 < yClickDataValue && this.y5 > yClickDataValue) {
      // this.selectionAnnotation.y1 = this.y4;
      // this.selectionAnnotation.y2 = this.y5;
      this.selectionAnnotation.y1 = 0.305;
      this.selectionAnnotation.y2 = 0.485;
      // console.log("y1=>",this.selectionAnnotation.y1,"y2=>",this.selectionAnnotation.y2);
    } else if (this.y5 < yClickDataValue && this.y6 > yClickDataValue) {
      // this.selectionAnnotation.y1 = this.y5;
      // this.selectionAnnotation.y2 = this.y6;
      this.selectionAnnotation.y1 = 0.125;
      this.selectionAnnotation.y2 = 0.305;
      // console.log("y1=>",this.selectionAnnotation.y1,"y2=>",this.selectionAnnotation.y2);
    } else if (this.y6 < yClickDataValue && this.y7 > yClickDataValue) {
      this.selectionAnnotation.y1 = 0;
      this.selectionAnnotation.y2 = 0.125;
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
    // console.log(this.selectedPoints[0]);
    document.getElementById("result").innerText = JSON.stringify(
      this.selectedPoints,
      null,
      4
    );
    this.startPoint = undefined;
    this.endPoint = undefined;
  }

  private performSelection() {
    this.selectedPoints = [];
    if (!(this.startPoint && this.endPoint)) {
      return;
    }

    this.parentSurface.renderableSeries
      .asArray()
      .filter(rs => rs.isVisible)
      .forEach((rs, index) => {
        this.selectedPoints[index] = [];
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
          yCalc.getDataValue(this.startPoint.y) <=
          yCalc.getDataValue(this.endPoint.y)
        ) {
          bottomYData = yCalc.getDataValue(this.startPoint.y);
          topYData = yCalc.getDataValue(this.endPoint.y);
        } else {
          bottomYData = yCalc.getDataValue(this.endPoint.y);
          topYData = yCalc.getDataValue(this.startPoint.y);
        }

        for (let i = 0; i < dataSeries.count(); i++) {
          const x = dataSeries.getNativeXValues().get(i);
          const y = dataSeries.getNativeYValues().get(i);
          if (
            testIsInBounds(x, y, leftXData, topYData, rightXData, bottomYData)
          ) {
            this.selectedPoints[index].push({
              index: i
              // xValue: x,
              // yValue: y
            });
          }
        }
      });
  }
  private getDefaultCoordCalculators() {
    const xAxis = this.parentSurface.xAxes.get(0);
    const yAxis = this.parentSurface.yAxes.get(0);
    if (!xAxis || !yAxis) {
      return { xCalc: undefined, yCalc: undefined };
    }

    const xCalc = xAxis.getCurrentCoordinateCalculator();
    const yCalc = yAxis.getCurrentCoordinateCalculator();

    return { xCalc, yCalc };
  }
}
