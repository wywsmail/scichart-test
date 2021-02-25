<template>
  <p>test</p>
  <!-- the Div where first SciChartSurface will reside -->
  <div id="scichart-root-1" style="width: 800px; height: 350px"></div>
  <!-- the Div where second SciChartSurface will reside -->
  <div id="scichart-root-2" style="width: 800px; height: 350px"></div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { SciChartSurface } from "scichart/Charting/Visuals/SciChartSurface";
import { NumericAxis } from "scichart/Charting/Visuals/Axis/NumericAxis";
import { NumberRange } from "scichart/Core/NumberRange";
import { CategoryAxis } from "scichart/Charting/Visuals/Axis/CategoryAxis";
import { EAxisAlignment } from "scichart/types/AxisAlignment";
import { XyDataSeries } from "scichart/Charting/Model/XyDataSeries";
import { FastLineRenderableSeries } from "scichart/Charting/Visuals/RenderableSeries/FastLineRenderableSeries";
import { FastMountainRenderableSeries } from "scichart/Charting/Visuals/RenderableSeries/FastMountainRenderableSeries";
import { ZoomPanModifier } from "scichart/Charting/ChartModifiers/ZoomPanModifier";
import { MouseWheelZoomModifier } from "scichart/Charting/ChartModifiers/MouseWheelZoomModifier";
import { ZoomExtentsModifier } from "scichart/Charting/ChartModifiers/ZoomExtentsModifier";
import { SciChartVerticalGroup } from "scichart/Charting/LayoutManager/SciChartVerticalGroup";
import { RolloverModifier } from "scichart/Charting/ChartModifiers/RolloverModifier";
import { EAutoRange } from "scichart/types/AutoRange";

async function initSciChart() {
  SciChartSurface.setRuntimeLicenseKey(
    "5ycxvf/fY4gXbo/ejlWy2JzrxfwiO3XxnN4QB5l327kqZNnGd+hs1lHuSmi2+TDeenf0kGGDk6rpjYWwpLJipt6qTvMzRx6zlZhY9Qyo+DYNuNieYzxrC/ZceJwv7E/2UdlYysxQLHMDEcp0txtbjJ++qVe4gjU1bgU8+mz92RzB7rZhonqZ6pCZyLYgONZ8ljZicebuSlOM0KQSeomou30SIE1S9wiP6W9YuuaIoCR/gZIwMZnioOHf8k3gsPB3EfCH0D/Mz+/eUq9RliOJkSm66r13+XgaDRp/fG9UAF2xoZmXSqzBX1v52A2Xn7NuXyxmOiQVRvIfuF7qW6e7XIZqHed6ZJ+rp9xXMs+q1JlF39LmZsMqChi0HuAM8eohJhRJ0dspyTAFH9aot6nBJCi1DmKu0DXumyXm9IdEOlXCWa5whtWDwoUnvkuKrI1KRDVZ1KjsDoZ+Pvw+7oX0+ERCeMeUrpgx0XhDFe8jzQB33hmiAu23FJ4OIike6RGYlWk5VczgpY+NXSVj5tjM0b0JiF/mFGjoFKsQ3noKqAHyosPrfhtGH830MYD44ObNWuvLWeLxNofC4a5odOwPFHvwDVVlNTAo9UFw2g3p7pF9WAsup7+YV7cjooMQPqrMD4GBSggeh+k26nQyc9nAT0qiceMSScuHENhbc+j8UFI0RZuP1x5d6xkJJ1A8TtJ41KDqxML8QrV/KijPP+y5iAxIOCexrjGlPTCTdUhTpw=="
  );
  let chart1XAxis, chart2XAxis;
  const verticalGroup = new SciChartVerticalGroup();
  const modifierGroupId = "group1";

  // CREATE FIRST CHART
  const createFirstChart = async () => {
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

    // Create the first chart
    const { sciChartSurface, wasmContext } = await SciChartSurface.create(
      "scichart-root-1"
    );

    // Create an X Axis and add to the chart

    // const xAxis = new CategoryAxis(wasmContext, { axisTitle: "X Axis" });
    const xAxis = new NumericAxis(wasmContext, { axisTitle: "X Axis" });
    xAxis.visibleRangeLimit = new NumberRange(0, 100);
    sciChartSurface.xAxes.add(xAxis);
    chart1XAxis = xAxis;
    sciChartSurface.xAxes.add(xAxis);

    // Create Y Axis and add to the chart
    const yAxis = new NumericAxis(wasmContext, {
      axisTitle: "Y Axis",
      axisAlignment: EAxisAlignment.Right,
      autoRange: EAutoRange.Always,
      growBy: new NumberRange(0.2, 0.2)
    });
    sciChartSurface.yAxes.add(yAxis);

    // Create data for line series
    const dataForLineSeries = new XyDataSeries(wasmContext);
    for (let x = 0; x < 250; x++) {
      dataForLineSeries.append(x, Math.sin(x * 0.1));
    }

    // Create line series and add to the chart
    const lineSeries = new FastLineRenderableSeries(wasmContext, {
      dataSeries: dataForLineSeries
    });
    lineSeries.rolloverModifierProps.tooltipColor = "green";
    lineSeries.rolloverModifierProps.tooltipLabelX = "X";
    lineSeries.rolloverModifierProps.tooltipLabelY = "Y";
    sciChartSurface.renderableSeries.add(lineSeries);

    sciChartSurface.chartModifiers.add(
      new ZoomPanModifier(),
      new MouseWheelZoomModifier(),
      new ZoomExtentsModifier()
    );
    sciChartSurface.chartModifiers.add(
      new RolloverModifier({ modifierGroup: modifierGroupId })
    );

    verticalGroup.addSurfaceToGroup(sciChartSurface);
    return { sciChartSurface, wasmContext };
  };

  // CREATE SECOND CHART
  const createSecondChart = async () => {
    const { sciChartSurface, wasmContext } = await SciChartSurface.create(
      "scichart-root-2"
    );

    // Create an X Axis and add to the chart
    const xAxis = new NumericAxis(wasmContext);
    chart2XAxis = xAxis;
    sciChartSurface.xAxes.add(xAxis);

    // Create Y Axis and add to the chart
    const yAxis = new NumericAxis(wasmContext, {
      axisTitle: "Y Axis",
      axisAlignment: EAxisAlignment.Left,
      autoRange: EAutoRange.Always,
      growBy: new NumberRange(0.2, 0.2)
    });
    sciChartSurface.yAxes.add(yAxis);

    // Create data for mountain series
    const dataForMountainSeries = new XyDataSeries(wasmContext);
    for (let x = 0; x < 250; x++) {
      dataForMountainSeries.append(x, Math.cos(x * 0.1));
    }

    // Create mountain series, bind to primary axis and add to the chart
    const mountainSeries = new FastMountainRenderableSeries(wasmContext, {
      dataSeries: dataForMountainSeries,
      fill: "LightSteelBlue"
    });
    mountainSeries.rolloverModifierProps.tooltipColor = "green";
    sciChartSurface.renderableSeries.add(mountainSeries);

    sciChartSurface.chartModifiers.add(
      new ZoomPanModifier(),
      new MouseWheelZoomModifier(),
      new ZoomExtentsModifier()
    );
    sciChartSurface.chartModifiers.add(
      new RolloverModifier({ modifierGroup: modifierGroupId })
    );

    verticalGroup.addSurfaceToGroup(sciChartSurface);
    return { sciChartSurface, wasmContext };
  };

  // PARALLEL CREATION OF CHARTS
  const res = await Promise.all([createFirstChart(), createSecondChart()]);
  res.forEach((el) => {
    el.sciChartSurface.zoomExtents();
  });

  // Synchronize visible ranges
  chart1XAxis.visibleRangeChanged.subscribe((data1) => {
    chart2XAxis.visibleRange = data1.visibleRange;
  });
  chart2XAxis.visibleRangeChanged.subscribe((data1) => {
    chart1XAxis.visibleRange = data1.visibleRange;
  });
}

export default defineComponent({
  setup() {
    // count, handClickPlus, handClickLess;
    onMounted(() => {
      console.log("execute onMounted");
      initSciChart();
    });
    return {};
  },
  name: "HelloWorld",
  props: {
    msg: String
  }
});
</script>
