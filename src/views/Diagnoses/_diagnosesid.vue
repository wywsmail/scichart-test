<template>
  <el-row type="flex" justify="center">
    <el-col :span="16">
      <h1>Chart</h1>
      <el-table :data="diagnoses.data" stripe style="width: 1200px">
        <el-table-column prop="diagnosis_id" label="ID" width="180"></el-table-column>
        <el-table-column prop="start_time" label="Time" width="180"></el-table-column>
        <el-table-column prop="hr_last" label="HR"></el-table-column>
        <el-table-column prop="gain" label="Gain"></el-table-column>
        <el-table-column prop="device_id" label="Device"></el-table-column>
      </el-table>
    </el-col>
  </el-row>
  <el-row type="flex" justify="center">
    <el-col :span="16">
      <el-table :data="diagnoses.data">
        <el-table-column label="Channel Name">LEAD1</el-table-column>
        <el-table-column label="Time">1s-5s</el-table-column>
        <el-table-column label="備註">ST-E</el-table-column>
        <el-table-column label="操作">
          <template v-slot>
            <el-button size="mini" type="primary">編輯</el-button>
            <el-button size="mini" type="danger">刪除</el-button>
            <el-button size="mini" type="info">離開</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  <el-row type="flex" justify="center" :gutter="20" style="width: 1200px">
    <el-col :span="4" align="center">
      <el-button type="primary" icon="el-icon-edit">標記備註</el-button>
    </el-col>
    <el-col :span="4" align="center">
      <el-button type="primary">Evaluation Mode</el-button>
    </el-col>
    <el-col :span="4" align="center">
      <el-button type="primary">Tag Mode</el-button>
    </el-col>
    <el-col :span="4" align="center">
      <el-button type="primary">Change Model / Update</el-button>
    </el-col>
    <el-col :span="4">
      <select v-model="selected" placeholder="請選擇 Model">
        <option v-for="item in modelName" :key="item.value" :value="item.value">
          {{ item.label }}
        </option>
      </select>
      <span>選項：{{ selected }}</span>
    </el-col>
  </el-row>
  <div style="margin: 10px; display:none">
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
  <el-button-group style="display:none">
    <el-button type="primary" icon="el-icon-arrow-left">上一页</el-button>
    <el-button type="primary"
      >下一页<i class="el-icon-arrow-right el-icon--right"></i
    ></el-button>
  </el-button-group>
  <br />
  <el-button-group style="display:none">
    <el-button type="primary" icon="el-icon-edit">標記</el-button>
    <el-button type="primary" icon="el-icon-share"></el-button>
    <el-button type="primary" icon="el-icon-delete"></el-button>
  </el-button-group>
  <el-row type="flex" justify="center">
    <el-col :span="16">
      <div id="scichart-root" style="width: 100%; height: 800px; margin: auto"></div>
    </el-col>
  </el-row>
  <div id="result" style="white-space: pre"></div>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { computed, defineComponent, onMounted, ref, reactive } from "vue";
// import SciChart from "@/components/SciChart.vue";
import { dataInformation, showECGChart, diagnoses,getAnomalyModels, modelName } from "@/composition/store";

// about scichart

import { SciChartSurface } from "scichart/Charting/Visuals/SciChartSurface";
import { NumericAxis } from "scichart/Charting/Visuals/Axis/NumericAxis";
import { NumberRange } from "scichart/Core/NumberRange";
import { CategoryAxis } from "scichart/Charting/Visuals/Axis/CategoryAxis";
import { EAxisAlignment } from "scichart/types/AxisAlignment";
// import { EAutoRange } from "scichart/types/AutoRange";
// import { NumericLabelProvider } from "scichart/Charting/Visuals/Axis/LabelProvider/NumericLabelProvider";
import { FastLineRenderableSeries } from "scichart/Charting/Visuals/RenderableSeries/FastLineRenderableSeries";
import { XyDataSeries } from "scichart/Charting/Model/XyDataSeries";
import { ECoordinateMode } from "scichart/Charting/Visuals/Annotations/AnnotationBase";
import { TextAnnotation } from "scichart/Charting/Visuals/Annotations/TextAnnotation";
import { MouseWheelZoomModifier } from "scichart/Charting/ChartModifiers/MouseWheelZoomModifier";
import { EXyDirection } from "scichart/types/XyDirection";
// import { RubberBandXyZoomModifier } from "scichart/Charting/ChartModifiers/RubberBandXyZoomModifier";
// import { ZoomExtentsModifier } from "scichart/Charting/ChartModifiers/ZoomExtentsModifier";
import { ZoomPanModifier } from "scichart/Charting/ChartModifiers/ZoomPanModifier";
// import { CursorModifier } from "scichart/Charting/ChartModifiers/CursorModifier";
// import { RolloverModifier } from "scichart/Charting/ChartModifiers/RolloverModifier";
// import { EHorizontalAnchorPoint, EVerticalAnchorPoint } from "scichart/types/AnchorPoint";
import { SciChartJSLightTheme } from "scichart/Charting/Themes/SciChartJSLightTheme";
import { EDragMode } from "scichart/types/DragMode";
import { XAxisDragModifier } from "scichart/Charting/ChartModifiers/XAxisDragModifier";
import { YAxisDragModifier } from "scichart/Charting/ChartModifiers/YAxisDragModifier";
// import { isXAxis } from "scichart/Charting/Visuals/Axis/AxisCore";
// import { data } from "../assets/data";
import { RangeSelectionChartModifier } from "@/composition/RangeSelectionChartModifier";
import { SimpleDataPointSelectionModifier } from "@/composition/SimpleDataPointSelectionModifier";
import { EllipsePointMarker } from "scichart/Charting/Visuals/PointMarkers/EllipsePointMarker";
import { ZoomExtentsModifier } from "scichart/Charting/ChartModifiers/ZoomExtentsModifier";
import { HorizontalLineAnnotation } from 'scichart/Charting/Visuals/Annotations/HorizontalLineAnnotation';
import { EAutoRange } from 'scichart/types/AutoRange';

const initSciChart = async () =>{
  // SciChartSurface.setRuntimeLicenseKey(
  //   "5ycxvf/fY4gXbo/ejlWy2JzrxfwiO3XxnN4QB5l327kqZNnGd+hs1lHuSmi2+TDeenf0kGGDk6rpjYWwpLJipt6qTvMzRx6zlZhY9Qyo+DYNuNieYzxrC/ZceJwv7E/2UdlYysxQLHMDEcp0txtbjJ++qVe4gjU1bgU8+mz92RzB7rZhonqZ6pCZyLYgONZ8ljZicebuSlOM0KQSeomou30SIE1S9wiP6W9YuuaIoCR/gZIwMZnioOHf8k3gsPB3EfCH0D/Mz+/eUq9RliOJkSm66r13+XgaDRp/fG9UAF2xoZmXSqzBX1v52A2Xn7NuXyxmOiQVRvIfuF7qW6e7XIZqHed6ZJ+rp9xXMs+q1JlF39LmZsMqChi0HuAM8eohJhRJ0dspyTAFH9aot6nBJCi1DmKu0DXumyXm9IdEOlXCWa5whtWDwoUnvkuKrI1KRDVZ1KjsDoZ+Pvw+7oX0+ERCeMeUrpgx0XhDFe8jzQB33hmiAu23FJ4OIike6RGYlWk5VczgpY+NXSVj5tjM0b0JiF/mFGjoFKsQ3noKqAHyosPrfhtGH830MYD44ObNWuvLWeLxNofC4a5odOwPFHvwDVVlNTAo9UFw2g3p7pF9WAsup7+YV7cjooMQPqrMD4GBSggeh+k26nQyc9nAT0qiceMSScuHENhbc+j8UFI0RZuP1x5d6xkJJ1A8TtJ41KDqxML8QrV/KijPP+y5iAxIOCexrjGlPTCTdUhTpw=="
  // );
  SciChartSurface.setRuntimeLicenseKey(
    "LZSp787dL/Q4OmsvGywWQ6RZ8ql5O6jhjw92po8di9pP4KZZoQQ2uuoWMlO1sGNxc9grA4cGGd32r7vZkzLO1uhLsjXtowGqE090CV9L0BXDkhRrIsxtCYHIk1OXfbESEqVWSxeEKqx/OnKi3y51xIYc/VkxSq1GIO7sY0ZLjY9Sgmf/qupcwWmj/0xeni3FbW0IsX/NLIpAz3yt0YtUviMQc7GIdNpjnuLT9SF3xx8wUzWXyaUs55QpnRoE/7eX2W7BNqOaqtrLQyUBPp6Yp37PYYdGB6zs1Dsr63W8sFJjQui9uq12Ugmn+twLaZnY97++s9dAzDrj3RvCNZjGDaRDJNHBcnpg/whW+aYIIvOGjruyP8x6kUm01hXeo8iCt/+jT/AlJdLjVTy1UDbj1JCIy6YBJI/etfwc87Pn8JBSDVW37LHtrS8yHwpZV0M/0gdi9BtgxFTzT7pd7GYe6K+1EQZZJ2GV0/moZ4Jr8PYTXLdXE0M3pw04lOquC60A3KuH9shbXlBypWYL7+83s7Fpz850yve4UJWe+6M49WLQgznNjFezb6jF0ciOoywVvr/nx7zbilQjz6xpNPDHyMQMDWbTbsqAy9oQ5ePvkFx4tUsrMSSA3bmU0mDQHCKD2bwMQEO1rQYzLLTUVYHkBDl+idhoFraXDz0ISwrJZQsbfRcr62FvekndjRNSd+LwZa9DoZUuAhzoRsR5X4Q0F788K/u1UtaiFvlffPpTy7x5bzj2km0FHDEVxGg0ZxZ/3Bd2f2TiVQ=="
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
    return (index / 250).toFixed(0) + "s";
  };
  xAxis.drawMajorGridLines = true;
  // Create an X,Y Axis and add to the chart
  // const xAxis = new NumericAxis(wasmContext);
  xAxis.autoTicks = false;
  // Have a major gridline every 10 units on the axis
  // xAxis.maxAutoTicks = 1;
  // xAxis.majorDelta = 30;
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



  // sciChartSurface.chartModifiers.add(new RolloverModifier());
  // const cursorModifier = new CursorModifier({
  //   crosshairStroke: "#ff6600",
  //   crosshairStrokeThickness: 1,
  //   tooltipContainerBackground: "#000",
  //   tooltipTextStroke: "#ff6600",
  //   showTooltip: false
  //   // axisLabelsFill: "#b36200",
  //   // axisLabelsStroke: "#fff"
  // });
  // sciChartSurface.chartModifiers.add(cursorModifier);
  // const rubberBandZoomModifier = new RubberBandXyZoomModifier();
  // const zoomExtentsModifier = new ZoomExtentsModifier();
  // const rangeSelectionModifier = new RangeSelectionChartModifier();
  // sciChartSurface.chartModifiers.add(zoomExtentsModifier);
  
  // sciChartSurface.chartModifiers.add(rubberBandZoomModifier);
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


  // const mouseWheelZoomModifier = new MouseWheelZoomModifier({
  //   xyDirection: EXyDirection.XDirection
  // });
  // const zoomPanModifier = new ZoomPanModifier({
  //   xyDirection: EXyDirection.XDirection
  // });

  // sciChartSurface.chartModifiers.add(zoomPanModifier);
  // sciChartSurface.chartModifiers.add(mouseWheelZoomModifier);

  sciChartSurface.chartModifiers.add(
    new XAxisDragModifier({ dragMode: EDragMode.Scaling }),
    new SimpleDataPointSelectionModifier(),
    new MouseWheelZoomModifier({
      xyDirection: EXyDirection.XDirection
    })
    // new ZoomPanModifier({
    //   xyDirection: EXyDirection.XDirection
    // }),
    // new YAxisDragModifier({ dragMode: EDragMode.Panning })
  );
};

export default {
  name: "Chart",
  setup() {
    const selected = ref("");
    const route = useRoute();
    const dataAnomalyList = reactive([
      JSON.parse(localStorage.getItem("selectedPoints"))
    ]);
    console.log(dataAnomalyList);
    onMounted(async () => {
      // const route = useRoute();
      // console.log(route);
      // console.log(route.params.diagnosesid);
      console.log(`b`);
      await getAnomalyModels();
      await showECGChart(route.params.diagnosesid).catch((err) => {});
      console.log(`c`);
      initSciChart();
    });
    // const selectModel = value => {
    //   console.log(value);
    // };
    const selectModel = computed(() => {
      return selected.value;
    });
    // console.log(selectModel);
    return {
      dataInformation,
      initSciChart,
      modelName,
      diagnoses,
      selected,
      selectModel
    };
  }
};
</script>

<style scoped>
.el-button + .el-button {
  margin-left: 0px;
}
</style>
