<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
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
import { count, handClickPlus, handClickLess, diagnoses } from "@/composition/store";
import { SciChartSurface } from "scichart/Charting/Visuals/SciChartSurface";
import { NumericAxis } from "scichart/Charting/Visuals/Axis/NumericAxis";
import { FastLineRenderableSeries } from "scichart/Charting/Visuals/RenderableSeries/FastLineRenderableSeries";
import { XyDataSeries } from "scichart/Charting/Model/XyDataSeries";
import { TextAnnotation } from "scichart/Charting/Visuals/Annotations/TextAnnotation";
import { MouseWheelZoomModifier } from "scichart/Charting/ChartModifiers/MouseWheelZoomModifier";
import { RubberBandXyZoomModifier } from "scichart/Charting/ChartModifiers/RubberBandXyZoomModifier";
import { ZoomExtentsModifier } from "scichart/Charting/ChartModifiers/ZoomExtentsModifier";
import { ZoomPanModifier } from "scichart/Charting/ChartModifiers/ZoomPanModifier";
import { RolloverModifier } from "scichart/Charting/ChartModifiers/RolloverModifier";
import { EHorizontalAnchorPoint, EVerticalAnchorPoint } from "scichart/types/AnchorPoint";
import { SciChartJSLightTheme} from "scichart/Charting/Themes/SciChartJSLightTheme";
// import { isXAxis } from "scichart/Charting/Visuals/Axis/AxisCore";
// import { data } from "../assets/data";
import { RangeSelectionChartModifier } from "@/composition/RangeSelectionChartModifier";
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

  // Create an X,Y Axis and add to the chart
  const xAxis = new NumericAxis(wasmContext);
  const yAxis = new NumericAxis(wasmContext);
  
  // yAxis.isXAxis = false;
  
  sciChartSurface.xAxes.add(xAxis);
  sciChartSurface.yAxes.add(yAxis);
  // 改變顏色與格線的設定教學網址
  // https://www.scichart.com/documentation/js/current/webframe.html#Axis%20Styling%20-%20Styling%20Title%20and%20Axis%20Labels.html
  

  // // Declare a DataSeries
  const xyDataSeries1 = new XyDataSeries(wasmContext);
  const xyDataSeries2 = new XyDataSeries(wasmContext);
  const xyDataSeries3 = new XyDataSeries(wasmContext);
  const xyDataSeries4 = new XyDataSeries(wasmContext);
  const xyDataSeries5 = new XyDataSeries(wasmContext);
  const xyDataSeries6 = new XyDataSeries(wasmContext);

  diagnoses[5][1].forEach((item: number, index: number) => {
    xyDataSeries1.append(index, item + 0);
  });
  diagnoses[4][1].forEach((item: number, index: number) => {
    xyDataSeries2.append(index, item + 2);
  });
  diagnoses[3][1].forEach((item: number, index: number) => {
    xyDataSeries3.append(index, item + 4);
  });
  diagnoses[2][1].forEach((item: number, index: number) => {
    xyDataSeries4.append(index, item + 6);
  });
  diagnoses[1][1].forEach((item: number, index: number) => {
    xyDataSeries5.append(index, item + 8);
  });
  diagnoses[0][1].forEach((item: number, index: number) => {
    xyDataSeries6.append(index, item + 10);
  });
  const mouseWheelZoomModifier = new MouseWheelZoomModifier();
  const zoomPanModifier = new ZoomPanModifier();
  const rubberBandZoomModifier = new RubberBandXyZoomModifier();
  const zoomExtentsModifier = new ZoomExtentsModifier();
  const rangeSelectionModifier = new RangeSelectionChartModifier();
  sciChartSurface.chartModifiers.add(zoomExtentsModifier);
  sciChartSurface.chartModifiers.add(zoomPanModifier);
  sciChartSurface.chartModifiers.add(rubberBandZoomModifier);
  sciChartSurface.chartModifiers.add(mouseWheelZoomModifier);
  sciChartSurface.chartModifiers.add(rangeSelectionModifier);
  const inputEnablePan: HTMLElement = document.getElementById("enable-pan");
  const inputEnableZoom: HTMLElement = document.getElementById("enable-zoom");
  const inputEnableZoomToFit: HTMLElement = document.getElementById("enable-zoom-to-fit");
  const inputEnableMouseWheel: HTMLElement = document.getElementById(
    "enable-mouse-wheel-zoom"
  );
  const inputEnableRangeSelect: HTMLElement = document.getElementById(
    "enable-range-select"
  );

  const inputEnablePan2: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("enable-pan")
  );
  const inputEnableZoom2: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("enable-zoom")
  );
  const inputEnableZoomToFit2: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("enable-zoom-to-fit")
  );
  const inputEnableMouseWheel2: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("enable-mouse-wheel-zoom")
  );
  const inputEnableRangeSelect2: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("enable-range-select")
  );

  inputEnablePan.addEventListener("change", () => {
    zoomPanModifier.isEnabled = inputEnablePan2.checked;
    rubberBandZoomModifier.isEnabled = !inputEnablePan2.checked;
    rangeSelectionModifier.isEnabled = !inputEnablePan2.checked;
    inputEnableZoom2.checked = !inputEnablePan2.checked;
    inputEnableRangeSelect2.checked = !inputEnablePan2.checked;
  });
  inputEnableZoom.addEventListener("change", () => {
    rubberBandZoomModifier.isEnabled = inputEnableZoom2.checked;
    zoomPanModifier.isEnabled = !inputEnableZoom2.checked;
    rangeSelectionModifier.isEnabled = !inputEnableZoom2.checked;
    inputEnablePan2.checked = !inputEnableZoom2.checked;
    inputEnableRangeSelect2.checked = !inputEnableZoom2.checked;
  });
  inputEnableRangeSelect.addEventListener("change", () => {
    rangeSelectionModifier.isEnabled = inputEnableRangeSelect2.checked;
    zoomPanModifier.isEnabled = !inputEnableRangeSelect2.checked;
    rubberBandZoomModifier.isEnabled = !inputEnableRangeSelect2.checked;
    inputEnablePan2.checked = !inputEnableRangeSelect2.checked;
    inputEnableZoom2.checked = !inputEnableRangeSelect2.checked;
  });

  inputEnableZoomToFit.addEventListener("change", () => {
    zoomExtentsModifier.isEnabled = inputEnableZoomToFit2.checked;
  });
  inputEnableMouseWheel.addEventListener("change", () => {
    mouseWheelZoomModifier.isEnabled = inputEnableMouseWheel2.checked;
  });

  sciChartSurface.chartModifiers.add(new RolloverModifier());

  sciChartSurface.annotations.add(
    // Add TextAnnotations in the top left of the chart
    new TextAnnotation({
      text: "LEAD 1",
      textColor: "black",
      fontSize: 18,
      x1: 0.3,
      y1: 9.7,
    }),
    new TextAnnotation({
      text: "LEAD 2",
      textColor: "black",
      fontSize: 18,
      x1: 1,
      y1: 7.7,
    }),
    new TextAnnotation({
      text: "LEAD 3",
      textColor: "black",
      fontSize: 18,
      x1: 1,
      y1: 5.7,
    }),
    new TextAnnotation({
      text: "aVR",
      textColor: "black",
      fontSize: 18,
      x1: 1,
      y1: 3.7,
    }),
    new TextAnnotation({
      text: "aVL",
      textColor: "black",
      fontSize: 18,
      x1: 1,
      y1: 1.7,
    }),
    new TextAnnotation({
      text: "aVF",
      textColor: "black",
      fontSize: 18,
      x1: 1,
      y1: 0.7,
    }),
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
      diagnoses,
    };
  },
  name: "HelloWorld",
  props: {
    msg: String,
  },
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
