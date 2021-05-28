<template>
  <el-row type="flex" justify="center">
    <el-col :span="16">
      <!-- <div :id="divElementId[0]" style="width: 100%; height: 400px; margin: auto"></div> -->
      <div :id="divElementId[1]" style="width: 100%; height: 400px; margin: auto"></div>
      <!-- <div :id="divElementId[2]" style="width: 100%; height: 400px; margin: auto"></div> -->
      <div :id="divElementId[3]" style="width: 100%; height: 400px; margin: auto"></div>
      <!-- <div id="result" style="white-space: pre"></div> -->
      <div :id="divElementId[4]" style="width: 100%; height: 400px; margin: auto"></div>
    </el-col>
  </el-row>
  <!-- Button trigger modal -->
  <button
    type="button"
    class="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
  >
    Launch demo modal
  </button>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">請選擇 Tag Note 類型</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
            />
            <label class="form-check-label" for="flexRadioDefault1">
              Normal Sinus Rhythm
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              checked
            />
            <label class="form-check-label" for="flexRadioDefault2"> APC </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              checked
            />
            <label class="form-check-label" for="flexRadioDefault2"> ST-D </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              checked
            />
            <label class="form-check-label" for="flexRadioDefault2"> ST-E </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              checked
            />
            <label class="form-check-label" for="flexRadioDefault2"> VPC </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              checked
            />
            <label class="form-check-label" for="flexRadioDefault2">
              Atrial Fibrillation
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              checked
            />
            <label class="form-check-label" for="flexRadioDefault2"> PSVT </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              checked
            />
            <label class="form-check-label" for="flexRadioDefault2"> ST-N </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              checked
            />
            <label class="form-check-label" for="flexRadioDefault2"> Unknown </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              checked
            />
            <label class="form-check-label" for="flexRadioDefault2"> BBB </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              checked
            />
            <label class="form-check-label" for="flexRadioDefault2"> OMI </label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// Vue
import { onMounted } from "vue";

// SciChartSurface

import { SciChartSurface } from "scichart/Charting/Visuals/SciChartSurface";
import { NumericAxis } from "scichart/Charting/Visuals/Axis/NumericAxis";
import { XyDataSeries } from "scichart/Charting/Model/XyDataSeries";
import { FastLineRenderableSeries } from "scichart/Charting/Visuals/RenderableSeries/FastLineRenderableSeries";
import { NumberRange } from "scichart/Core/NumberRange";

// RangeSelectionChartModifier
import { RangeSelectionChartModifier } from "@/composition/RangeSelectionChartModifier";

// CreateAnnotationsDynamically
import { CreateAnnotationModifier } from "@/composition/CreateAnnotationModifier";

// SimpleDataPointSelectionModifier
import { SimpleDataPointSelectionModifier } from "@/composition/SimpleDataPointSelectionModifier";
import { MouseWheelZoomModifier } from "scichart/Charting/ChartModifiers/MouseWheelZoomModifier";
import { EllipsePointMarker } from "scichart/Charting/Visuals/PointMarkers/EllipsePointMarker";
import { ZoomExtentsModifier } from "scichart/Charting/ChartModifiers/ZoomExtentsModifier";

// drawEditableAnnotations

import { ZoomPanModifier } from "scichart/Charting/ChartModifiers/ZoomPanModifier";
import { CursorModifier } from "scichart/Charting/ChartModifiers/CursorModifier";
import { LineAnnotation } from "scichart/Charting/Visuals/Annotations/LineAnnotation";
import { HorizontalLineAnnotation } from "scichart/Charting/Visuals/Annotations/HorizontalLineAnnotation";
import { VerticalLineAnnotation } from "scichart/Charting/Visuals/Annotations/VerticalLineAnnotation";
import { BoxAnnotation } from "scichart/Charting/Visuals/Annotations/BoxAnnotation";
import { CustomAnnotation } from "scichart/Charting/Visuals/Annotations/CustomAnnotation";
import { TextAnnotation } from "scichart/Charting/Visuals/Annotations/TextAnnotation";
import { EHorizontalAnchorPoint, EVerticalAnchorPoint } from "scichart/types/AnchorPoint";
import { ECoordinateMode } from "scichart/Charting/Visuals/Annotations/AnnotationBase";
import { ELabelPlacement } from "scichart/types/LabelPlacement";

// hitTest methods

import { Point } from "scichart/Core/Point";
import { ENearestPointLogic } from "scichart/Charting/Visuals/RenderableSeries/HitTest/IHitTestProvider";

export default {
  setup() {
    const HIT_TEST_RADIUS = 10;
    const divElementId = [
      "scichart-root-1",
      "scichart-root-2",
      "scichart-root-3",
      "scichart-root-4",
      "scichart-root-5"
    ];
    const drawEditableAnnotations = async () => {
      const { sciChartSurface, wasmContext } = await SciChartSurface.create(
        divElementId[0]
      );
      const xAxis = new NumericAxis(wasmContext);
      xAxis.visibleRange = new NumberRange(0, 10);
      sciChartSurface.xAxes.add(xAxis);
      const yAxis = new NumericAxis(wasmContext);
      yAxis.visibleRange = new NumberRange(0, 10);
      sciChartSurface.yAxes.add(yAxis);
      sciChartSurface.chartModifiers.add(new ZoomPanModifier());
      sciChartSurface.chartModifiers.add(new ZoomExtentsModifier());
      sciChartSurface.chartModifiers.add(new MouseWheelZoomModifier());
      const customSvgString = [
        ' <svg width="50" height="50"',
        ' xmlns="http://www.w3.org/2000/svg">',
        '<rect width="100%" height="100%" style="fill:#39603D">',
        '<animate attributeName="rx" values="0;25;0"',
        ' dur="2s" repeatCount="indefinite" color="#ffffff" /></rect></svg>'
      ].join("");
      const horizontalLineAnnotation1 = new HorizontalLineAnnotation({
        stroke: "#FF6600",
        strokeThickness: 3,
        y1: 5,
        x1: 5,
        showLabel: true,
        labelPlacement: ELabelPlacement.TopLeft,
        labelValue: "Not Editable"
      });
      const horizontalLineAnnotation2 = new HorizontalLineAnnotation({
        stroke: "#FF6600",
        strokeThickness: 3,
        y1: 4,
        x1: 5,
        showLabel: true,
        labelPlacement: ELabelPlacement.TopLeft,
        labelValue: "Editable",
        isEditable: true
      });

      const verticalLineAnnotation = new VerticalLineAnnotation({
        stroke: "#FF6600",
        strokeThickness: 3,
        x1: 9,
        y1: 3,
        showLabel: true,
        isEditable: true
      });

      sciChartSurface.annotations.add(
        horizontalLineAnnotation1,
        horizontalLineAnnotation2,
        verticalLineAnnotation,
        new LineAnnotation({
          stroke: "#B73225",
          strokeThickness: 3,
          x1: 1.0,
          x2: 4.0,
          y1: 9.0,
          y2: 8.0,
          isEditable: true
        }),

        new BoxAnnotation({
          stroke: "#4DA8DA",
          strokeThickness: 1,
          fill: "#007CC766",
          x1: 1.0,
          x2: 4.0,
          y1: 5.0,
          y2: 7.0,
          isEditable: true
        }),

        new CustomAnnotation({
          x1: 5,
          y1: 9,
          xCoordShift: 0,
          yCoordShift: 0,
          horizontalAnchorPoint: EHorizontalAnchorPoint.Center,
          verticalAnchorPoint: EVerticalAnchorPoint.Center,
          svgString: customSvgString,
          isEditable: true
        }),
        new TextAnnotation({
          x1: 1,
          y1: 3,
          xCoordinateMode: ECoordinateMode.DataValue,
          yCoordinateMode: ECoordinateMode.DataValue,
          horizontalAnchorPoint: EHorizontalAnchorPoint.Left,
          verticalAnchorPoint: EVerticalAnchorPoint.Center,
          textColor: "#F1B24A",
          fontSize: 26,
          fontFamily: "Times New Roman",
          text: "SciChart is the best library",
          isEditable: true
        }),
        new TextAnnotation({
          x1: 1,
          y1: 2,
          xCoordinateMode: ECoordinateMode.DataValue,
          yCoordinateMode: ECoordinateMode.DataValue,
          horizontalAnchorPoint: EHorizontalAnchorPoint.Left,
          verticalAnchorPoint: EVerticalAnchorPoint.Center,
          textColor: "#F1B24A",
          fontSize: 26,
          fontFamily: "Times New Roman",
          text: "Unmovable text",
          isEditable: false
        })
      );

      return { sciChartSurface, wasmContext };
    };
    const drawRangeSelect = async () => {
      const { sciChartSurface, wasmContext } = await SciChartSurface.create(
        divElementId[1]
      );
      // Create an X,Y Axis and add to the chart
      const xAxis = new NumericAxis(wasmContext);
      const yAxis = new NumericAxis(wasmContext);
      sciChartSurface.xAxes.add(xAxis);
      sciChartSurface.yAxes.add(yAxis);
      // Create some data and set on a line series
      const xyData = new XyDataSeries(wasmContext);
      for (let i = 0; i < 250; i++) {
        xyData.append(i, Math.sin(i * 0.1));
      }
      sciChartSurface.renderableSeries.add(
        new FastLineRenderableSeries(wasmContext, { dataSeries: xyData })
      );
      // Add a custom modifier to select ranges
      sciChartSurface.chartModifiers.add(
        new RangeSelectionChartModifier(),
        new MouseWheelZoomModifier()
      );
    };
    const drawCreateAnnotation = async () => {
      const { sciChartSurface, wasmContext } = await SciChartSurface.create(
        divElementId[2]
      );
      // Create an X,Y Axis and add to the chart
      const xAxis = new NumericAxis(wasmContext, {
        visibleRange: new NumberRange(0, 10)
      });
      const yAxis = new NumericAxis(wasmContext, {
        visibleRange: new NumberRange(0, 10)
      });
      sciChartSurface.xAxes.add(xAxis);
      sciChartSurface.yAxes.add(yAxis);
      // Add a custom modifier to create annotations on click
      sciChartSurface.chartModifiers.add(new CreateAnnotationModifier());
    };
    const drawSimpleDataPointSelect = async () => {
      const { sciChartSurface, wasmContext } = await SciChartSurface.create(
        divElementId[3]
      );
      // Create an X,Y Axis and add to the chart
      const xAxis = new NumericAxis(wasmContext);
      const yAxis = new NumericAxis(wasmContext, {
        growBy: new NumberRange(0.05, 0.05)
      });
      sciChartSurface.xAxes.add(xAxis);
      sciChartSurface.yAxes.add(yAxis);
      // Create some data and set on a line series
      const xyData1 = new XyDataSeries(wasmContext);
      const xyData2 = new XyDataSeries(wasmContext);
      const xyData3 = new XyDataSeries(wasmContext);
      for (let i = 0; i < 250; i++) {
        xyData1.append(i, Math.sin(i * 0.1));
        xyData2.append(i, Math.sin(i * 0.1) * 0.7);
        xyData3.append(i, Math.sin(i * 0.1) * 0.3);
      }
      sciChartSurface.renderableSeries.add(
        new FastLineRenderableSeries(wasmContext, {
          dataSeries: xyData1,
          stroke: "red",
          pointMarker: new EllipsePointMarker(wasmContext, {
            fill: "red",
            strokeThickness: 0
          })
        }),
        new FastLineRenderableSeries(wasmContext, {
          dataSeries: xyData2,
          stroke: "green",
          pointMarker: new EllipsePointMarker(wasmContext, {
            fill: "green",
            strokeThickness: 0
          })
        }),
        new FastLineRenderableSeries(wasmContext, {
          dataSeries: xyData3,
          stroke: "blue",
          pointMarker: new EllipsePointMarker(wasmContext, {
            fill: "blue",
            strokeThickness: 0
          })
        })
      );
      const cursorModifier = new CursorModifier({
        // crosshairStroke: "#ff6600",
        // crosshairStrokeThickness: 1,
        tooltipContainerBackground: "#000",
        tooltipTextStroke: "#ff6600",
        showTooltip: true
        // axisLabelsFill: "#b36200",
        // axisLabelsStroke: "#fff"
      });
      sciChartSurface.chartModifiers.add(cursorModifier);

      // Add a custom modifier to select ranges
      sciChartSurface.chartModifiers.add(
        new ZoomExtentsModifier(),
        new SimpleDataPointSelectionModifier(),
        new MouseWheelZoomModifier()
      );
    };
    const hitTest = async () => {
      const { wasmContext, sciChartSurface } = await SciChartSurface.create(
        divElementId[4]
      );
      sciChartSurface.xAxes.add(new NumericAxis(wasmContext));
      sciChartSurface.yAxes.add(new NumericAxis(wasmContext));
      // Create a Line Series with XyDataSeries and some data
      const lineSeries = new FastLineRenderableSeries(wasmContext);
      lineSeries.dataSeries = new XyDataSeries(wasmContext, {
        dataSeriesName: "Line Series",
        xValues: [0, 1, 2],
        yValues: [3, 4, 5]
      });
      // Add the line series to the SciChartSurface
      sciChartSurface.renderableSeries.add(lineSeries);
      // add an event listener for mouse down. You can access the actual SciChartSurface canvas as
      // follows, or find element by ID=divElementId in the dom
      sciChartSurface.domCanvas2D.addEventListener(
        "mousedown",
        (mouseEvent: MouseEvent) => {
          // call renderableSeries.hitTestProvider.hitTest passing in the mouse point
          // other parameters determine the type of hit-test operation to perform
          const hitTestInfo = lineSeries.hitTestProvider.hitTest(
            new Point(mouseEvent.offsetX, mouseEvent.offsetY),
            ENearestPointLogic.NearestPoint2D,
            HIT_TEST_RADIUS,
            false
          );
          // Log the result to console. HitTestInfo contains information about the hit-test operation
          console.log(
            `${hitTestInfo.dataSeriesName} hit test result: ` +
              `MouseCoord=(${hitTestInfo.xCoord}, ${hitTestInfo.yCoord}) ` +
              `IsHit? ${hitTestInfo.isHit} ` +
              `Result=(${hitTestInfo.xValue}, ${hitTestInfo.yValue}) `
          );
        }
      );
    };
    onMounted(() => {
      drawRangeSelect();
      drawSimpleDataPointSelect();
      drawCreateAnnotation();
      drawEditableAnnotations();
      hitTest();
    });
    return { divElementId };
  }
};
</script>

<style></style>
