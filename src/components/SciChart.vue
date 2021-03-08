<template>
  <div class="hello">
    <p>{{ count }}</p>
    <button @click="handClickPlus">Click to Plus</button>
    <button @click="handClickLess">Click to Less</button>
    <div style="margin: 10px">
      <input type="checkbox" id="enable-pan" checked />
      <label for="enable-pan">Enable Mouse-Drag to Pan</label><br />
      <input type="checkbox" id="enable-zoom" />
      <label for="enable-zoom">Enable Mouse-Drag to Zoom</label><br />
      <input type="checkbox" id="enable-range-select" />
      <label for="enable-range-select">Enable Range Select</label><br />
      <input type="checkbox" id="enable-zoom-to-fit" checked />
      <label for="enable-zoom-to-fit">Enable Double-Click to Zoom to Fit</label><br />
      <input type="checkbox" id="enable-mouse-wheel-zoom" checked />
      <label for="enable-mouse-wheel-zoom">Enable Mousewheel Zoom</label><br />
    </div>
    <div id="scichart-root" style="width: 100%; height: 800px; margin: auto"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import {
  count,
  handClickPlus,
  handClickLess,
  diagnoses,
  showECGChart
} from "@/composition/store";
import { SciChartSurface } from "scichart/Charting/Visuals/SciChartSurface";
import { NumericAxis } from "scichart/Charting/Visuals/Axis/NumericAxis";
import { NumberRange } from "scichart/Core/NumberRange";
import { CategoryAxis } from "scichart/Charting/Visuals/Axis/CategoryAxis";
import { EAxisAlignment } from "scichart/types/AxisAlignment";
import { EAutoRange } from "scichart/types/AutoRange";
import { NumericLabelProvider } from "scichart/Charting/Visuals/Axis/LabelProvider/NumericLabelProvider";
import { FastLineRenderableSeries } from "scichart/Charting/Visuals/RenderableSeries/FastLineRenderableSeries";
import { XyDataSeries } from "scichart/Charting/Model/XyDataSeries";
import { ECoordinateMode } from "scichart/Charting/Visuals/Annotations/AnnotationBase";
import { TextAnnotation } from "scichart/Charting/Visuals/Annotations/TextAnnotation";
import { MouseWheelZoomModifier } from "scichart/Charting/ChartModifiers/MouseWheelZoomModifier";
import { EXyDirection } from "scichart/types/XyDirection";
// import { RubberBandXyZoomModifier } from "scichart/Charting/ChartModifiers/RubberBandXyZoomModifier";
// import { ZoomExtentsModifier } from "scichart/Charting/ChartModifiers/ZoomExtentsModifier";
import { ZoomPanModifier } from "scichart/Charting/ChartModifiers/ZoomPanModifier";
// import { RolloverModifier } from "scichart/Charting/ChartModifiers/RolloverModifier";
// import { EHorizontalAnchorPoint, EVerticalAnchorPoint } from "scichart/types/AnchorPoint";
import { SciChartJSLightTheme } from "scichart/Charting/Themes/SciChartJSLightTheme";
import { EDragMode } from "scichart/types/DragMode";
import { XAxisDragModifier } from "scichart/Charting/ChartModifiers/XAxisDragModifier";
// import { YAxisDragModifier } from "scichart/Charting/ChartModifiers/YAxisDragModifier";
// import { isXAxis } from "scichart/Charting/Visuals/Axis/AxisCore";
// import { data } from "../assets/data";
// import { RangeSelectionChartModifier } from "@/composition/RangeSelectionChartModifier";
async function initSciChart() {
  SciChartSurface.setRuntimeLicenseKey(
    "5ycxvf/fY4gXbo/ejlWy2JzrxfwiO3XxnN4QB5l327kqZNnGd+hs1lHuSmi2+TDeenf0kGGDk6rpjYWwpLJipt6qTvMzRx6zlZhY9Qyo+DYNuNieYzxrC/ZceJwv7E/2UdlYysxQLHMDEcp0txtbjJ++qVe4gjU1bgU8+mz92RzB7rZhonqZ6pCZyLYgONZ8ljZicebuSlOM0KQSeomou30SIE1S9wiP6W9YuuaIoCR/gZIwMZnioOHf8k3gsPB3EfCH0D/Mz+/eUq9RliOJkSm66r13+XgaDRp/fG9UAF2xoZmXSqzBX1v52A2Xn7NuXyxmOiQVRvIfuF7qW6e7XIZqHed6ZJ+rp9xXMs+q1JlF39LmZsMqChi0HuAM8eohJhRJ0dspyTAFH9aot6nBJCi1DmKu0DXumyXm9IdEOlXCWa5whtWDwoUnvkuKrI1KRDVZ1KjsDoZ+Pvw+7oX0+ERCeMeUrpgx0XhDFe8jzQB33hmiAu23FJ4OIike6RGYlWk5VczgpY+NXSVj5tjM0b0JiF/mFGjoFKsQ3noKqAHyosPrfhtGH830MYD44ObNWuvLWeLxNofC4a5odOwPFHvwDVVlNTAo9UFw2g3p7pF9WAsup7+YV7cjooMQPqrMD4GBSggeh+k26nQyc9nAT0qiceMSScuHENhbc+j8UFI0RZuP1x5d6xkJJ1A8TtJ41KDqxML8QrV/KijPP+y5iAxIOCexrjGlPTCTdUhTpw=="
  );
  // LICENSING //
  // Set your license code here
  // You can get a trial license key from https://www.scichart.com/licensing-scichart-js/
  // Purchased license keys can be viewed at https://www.scichart.com/profile
  //
  // e.g.
  //
  // SciChartSurface.setRuntimeLicenseKey("YOUR_RUNTIME_KEY");
  //
  // Also, once activated (trial or paid license) having the licensing wizard open on your machine
  // will mean any or all applications you run locally will be fully licensed.

  // Create the SciChartSurface in the div 'scichart-root'
  // The SciChartSurface, and webassembly context 'wasmContext' are paired. This wasmContext
  // instance must be passed to other types that exist on the same surface.

  // Create the SciChartSurface in the div 'scichart-root'
  // The SciChartSurface, and webassembly context 'wasmContext' are paired. This wasmContext
  // instance must be passed to other types that exist on the same surface.
  const { sciChartSurface, wasmContext } = await SciChartSurface.create("scichart-root");

  sciChartSurface.applyTheme(new SciChartJSLightTheme());

  const xAxis = new CategoryAxis(wasmContext);
  xAxis.labelProvider.formatLabel = (index: number) => {
    return index / 250 + "s";
  };
  xAxis.drawMajorGridLines = true;
  // Create an X,Y Axis and add to the chart
  // const xAxis = new NumericAxis(wasmContext);
  xAxis.autoTicks = true;
  // Have a major gridline every 10 units on the axis
  xAxis.majorDelta = 30;
  console.log(xAxis.majorDelta);
  // Have a minor gridline every 2 units on the axis
  xAxis.minorDelta = 0;
  console.log(xAxis.minorDelta);
  xAxis.visibleRangeLimit = new NumberRange(0, 7499);
  const yAxis = new NumericAxis(wasmContext, {
    axisTitle: "(mV)",
    axisAlignment: EAxisAlignment.Right,
    drawLabels: false
  });

  sciChartSurface.xAxes.add(xAxis);
  sciChartSurface.yAxes.add(yAxis);

  // // Declare a DataSeries
  const xyDataSeries1 = new XyDataSeries(wasmContext);
  const xyDataSeries2 = new XyDataSeries(wasmContext);
  const xyDataSeries3 = new XyDataSeries(wasmContext);
  const xyDataSeries4 = new XyDataSeries(wasmContext);
  const xyDataSeries5 = new XyDataSeries(wasmContext);
  const xyDataSeries6 = new XyDataSeries(wasmContext);

  console.log(diagnoses.value[0][0]);
  console.log(diagnoses.value[0][1].length);
  console.log(diagnoses.value[1][0]);
  console.log(diagnoses.value[1][1].length);
  console.log(diagnoses.value[2][0]);
  console.log(diagnoses.value[2][1].length);
  console.log(diagnoses.value[3][0]);
  console.log(diagnoses.value[3][1].length);
  console.log(diagnoses.value[4][0]);
  console.log(diagnoses.value[4][1].length);
  console.log(diagnoses.value[5][0]);
  console.log(diagnoses.value[5][1].length);
  diagnoses.value[0][1].forEach((item: number, index: number) => {
    xyDataSeries6.append(index, item + 10);
  });
  diagnoses.value[1][1].forEach((item: number, index: number) => {
    xyDataSeries5.append(index, item + 8);
  });
  diagnoses.value[2][1].forEach((item: number, index: number) => {
    xyDataSeries4.append(index, item + 6);
  });
  diagnoses.value[3][1].forEach((item: number, index: number) => {
    xyDataSeries3.append(index, item + 4);
  });
  diagnoses.value[4][1].forEach((item: number, index: number) => {
    xyDataSeries2.append(index, item + 2);
  });
  diagnoses.value[5][1].forEach((item: number, index: number) => {
    xyDataSeries1.append(index, item + 0);
  });

  const mouseWheelZoomModifier = new MouseWheelZoomModifier({
    xyDirection: EXyDirection.XDirection
  });
  const zoomPanModifier = new ZoomPanModifier({
    xyDirection: EXyDirection.XDirection
  });
  // const rubberBandZoomModifier = new RubberBandXyZoomModifier();
  // const zoomExtentsModifier = new ZoomExtentsModifier();
  // const rangeSelectionModifier = new RangeSelectionChartModifier();
  // sciChartSurface.chartModifiers.add(zoomExtentsModifier);
  sciChartSurface.chartModifiers.add(zoomPanModifier);
  // sciChartSurface.chartModifiers.add(rubberBandZoomModifier);
  sciChartSurface.chartModifiers.add(mouseWheelZoomModifier);
  // sciChartSurface.chartModifiers.add(rangeSelectionModifier);
  // const inputEnablePan: HTMLElement = document.getElementById("enable-pan");
  // const inputEnableZoom: HTMLElement = document.getElementById("enable-zoom");
  // const inputEnableZoomToFit: HTMLElement = document.getElementById("enable-zoom-to-fit");
  // const inputEnableMouseWheel: HTMLElement = document.getElementById(
  //   "enable-mouse-wheel-zoom"
  // );
  // const inputEnableRangeSelect: HTMLElement = document.getElementById(
  //   "enable-range-select"
  // );

  // const inputEnablePan2: HTMLInputElement = <HTMLInputElement>(
  //   document.getElementById("enable-pan")
  // );
  // const inputEnableZoom2: HTMLInputElement = <HTMLInputElement>(
  //   document.getElementById("enable-zoom")
  // );
  // const inputEnableZoomToFit2: HTMLInputElement = <HTMLInputElement>(
  //   document.getElementById("enable-zoom-to-fit")
  // );
  // const inputEnableMouseWheel2: HTMLInputElement = <HTMLInputElement>(
  //   document.getElementById("enable-mouse-wheel-zoom")
  // );
  // const inputEnableRangeSelect2: HTMLInputElement = <HTMLInputElement>(
  //   document.getElementById("enable-range-select")
  // );

  // inputEnablePan.addEventListener("change", () => {
  //   zoomPanModifier.isEnabled = inputEnablePan2.checked;
  //   rubberBandZoomModifier.isEnabled = !inputEnablePan2.checked;
  //   rangeSelectionModifier.isEnabled = !inputEnablePan2.checked;
  //   inputEnableZoom2.checked = !inputEnablePan2.checked;
  //   inputEnableRangeSelect2.checked = !inputEnablePan2.checked;
  // });
  // inputEnableZoom.addEventListener("change", () => {
  //   rubberBandZoomModifier.isEnabled = inputEnableZoom2.checked;
  //   zoomPanModifier.isEnabled = !inputEnableZoom2.checked;
  //   rangeSelectionModifier.isEnabled = !inputEnableZoom2.checked;
  //   inputEnablePan2.checked = !inputEnableZoom2.checked;
  //   inputEnableRangeSelect2.checked = !inputEnableZoom2.checked;
  // });
  // inputEnableRangeSelect.addEventListener("change", () => {
  //   rangeSelectionModifier.isEnabled = inputEnableRangeSelect2.checked;
  //   zoomPanModifier.isEnabled = !inputEnableRangeSelect2.checked;
  //   rubberBandZoomModifier.isEnabled = !inputEnableRangeSelect2.checked;
  //   inputEnablePan2.checked = !inputEnableRangeSelect2.checked;
  //   inputEnableZoom2.checked = !inputEnableRangeSelect2.checked;
  // });

  // inputEnableZoomToFit.addEventListener("change", () => {
  //   zoomExtentsModifier.isEnabled = inputEnableZoomToFit2.checked;
  // });
  // inputEnableMouseWheel.addEventListener("change", () => {
  //   mouseWheelZoomModifier.isEnabled = inputEnableMouseWheel2.checked;
  // });

  // sciChartSurface.chartModifiers.add(new RolloverModifier());

  sciChartSurface.annotations.add(
    // Add TextAnnotations in the top left of the chart
    new TextAnnotation({
      text: "LEAD 1",
      textColor: "black",
      fontSize: 18,
      x1: 0.0,
      y1: 0.0,
      xCoordinateMode: ECoordinateMode.Relative,
      yCoordinateMode: ECoordinateMode.Relative
    }),
    new TextAnnotation({
      text: "LEAD 2",
      textColor: "black",
      fontSize: 18,
      x1: 0.0,
      y1: 0.2,
      xCoordinateMode: ECoordinateMode.Relative,
      yCoordinateMode: ECoordinateMode.Relative
    }),
    new TextAnnotation({
      text: "LEAD 3",
      textColor: "black",
      fontSize: 18,
      x1: 0.0,
      y1: 0.4,
      xCoordinateMode: ECoordinateMode.Relative,
      yCoordinateMode: ECoordinateMode.Relative
    }),
    new TextAnnotation({
      text: "aVR",
      textColor: "black",
      fontSize: 18,
      x1: 0.0,
      y1: 0.6,
      xCoordinateMode: ECoordinateMode.Relative,
      yCoordinateMode: ECoordinateMode.Relative
    }),
    new TextAnnotation({
      text: "aVL",
      textColor: "black",
      fontSize: 18,
      x1: 0.0,
      y1: 0.75,
      xCoordinateMode: ECoordinateMode.Relative,
      yCoordinateMode: ECoordinateMode.Relative
    }),
    new TextAnnotation({
      text: "aVF",
      textColor: "black",
      fontSize: 18,
      x1: 0.0,
      y1: 0.9,
      xCoordinateMode: ECoordinateMode.Relative,
      yCoordinateMode: ECoordinateMode.Relative
    })
    // // Add TextAnnotations with anchor points
    // new TextAnnotation({
    //   text: "Anchor Center (X1, Y1)",
    //   horizontalAnchorPoint: EHorizontalAnchorPoint.Center,
    //   verticalAnchorPoint: EVerticalAnchorPoint.Bottom,
    //   x1: 2,
    //   y1: 8,
    // }),
    // new TextAnnotation({
    //   text: "Anchor Right",
    //   horizontalAnchorPoint: EHorizontalAnchorPoint.Right,
    //   verticalAnchorPoint: EVerticalAnchorPoint.Top,
    //   x1: 2,
    //   y1: 8,
    // }),
    // new TextAnnotation({
    //   text: "or Anchor Left",
    //   horizontalAnchorPoint: EHorizontalAnchorPoint.Left,
    //   verticalAnchorPoint: EVerticalAnchorPoint.Top,
    //   x1: 2,
    //   y1: 8,
    // })
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

  sciChartSurface.chartModifiers.add(
    new XAxisDragModifier({ dragMode: EDragMode.Scaling })
    // new YAxisDragModifier({ dragMode: EDragMode.Panning })
  );
}

export default defineComponent({
  setup() {
    // count, handClickPlus, handClickLess;
    onMounted(() => {
      console.log("execute onMounted");
      initSciChart();
    });
    return {
      count,
      handClickPlus,
      handClickLess,
      initSciChart,
      diagnoses
    };
  },
  name: "HelloWorld",
  props: {
    msg: String
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
