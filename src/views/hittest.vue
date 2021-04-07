<template>
  <div :id="divElementId" />
  <div id="result" style="white-space: pre" />
</template>

<script lang="ts">
import { onMounted } from "vue";
import { SciChartSurface } from "scichart";
import { NumericAxis } from "scichart/Charting/Visuals/Axis/NumericAxis";
import { FastLineRenderableSeries } from "scichart/Charting/Visuals/RenderableSeries/FastLineRenderableSeries";
import { XyDataSeries } from "scichart/Charting/Model/XyDataSeries";
import { Point } from "scichart/Core/Point";
import { ENearestPointLogic } from "scichart/Charting/Visuals/RenderableSeries/HitTest/IHitTestProvider";
import { SimpleDataPointSelectionModifier } from "../composition/SimpleDataPointSelectionModifier";
import { MouseWheelZoomModifier } from "scichart/Charting/ChartModifiers/MouseWheelZoomModifier";
import { ZoomExtentsModifier } from "scichart/Charting/ChartModifiers/ZoomExtentsModifier";
// import { CreateAnnotationModifier } from "../composition/CreateAnnotationModifier";
// Create a SciChartSurface with X,Y axis

export default {
  setup() {
    const divElementId = "chart";
    const HIT_TEST_RADIUS = 10;
    const drawExample = async () => {
      const { wasmContext, sciChartSurface } = await SciChartSurface.create(divElementId);
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
      sciChartSurface.chartModifiers.add(
        new ZoomExtentsModifier(),
        new SimpleDataPointSelectionModifier(),
        new MouseWheelZoomModifier()
        // new CreateAnnotationModifier()
      );
    };

    onMounted(() => {
      drawExample();
    });
    return { divElementId };
  }
};
</script>

<style></style>
