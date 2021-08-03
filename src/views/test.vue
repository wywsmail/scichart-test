<template>
  <h1>Hello SciChart.js world?</h1>
  <p>
    In this example we add simple zoom and pan behaviour. Select the options below to
    enable different behaviours
  </p>
  <div style="margin: 10px">
    <input type="checkbox" id="enable-pan" checked />
    <label for="enable-pan">Enable Mouse-Drag to Pan</label><br />
    <input type="checkbox" id="enable-zoom" />
    <label for="enable-zoom">Enable Mouse-Drag to Zoom</label><br />
    <input type="checkbox" id="enable-zoom-to-fit" checked />
    <label for="enable-zoom-to-fit">Enable Double-Click to Zoom to Fit</label><br />
    <input type="checkbox" id="enable-mouse-wheel-zoom" checked />
    <label for="enable-mouse-wheel-zoom">Enable Mousewheel Zoom</label><br />
  </div>

  <!-- the Div where the SciChartSurface will reside -->
  <div class="container">
    <div id="scichart-root-test" style="height: 30%; width: 100%"></div>
  </div>
</template>
<script>
import { onMounted } from "vue";
import { SciChartSurface } from "scichart/Charting/Visuals/SciChartSurface";
import { NumericAxis } from "scichart/Charting/Visuals/Axis/NumericAxis";
import { XyDataSeries } from "scichart/Charting/Model/XyDataSeries";
import { FastLineRenderableSeries } from "scichart/Charting/Visuals/RenderableSeries/FastLineRenderableSeries";
import { MouseWheelZoomModifier } from "scichart/Charting/ChartModifiers/MouseWheelZoomModifier";
import { RubberBandXyZoomModifier } from "scichart/Charting/ChartModifiers/RubberBandXyZoomModifier";
import { ZoomPanModifier } from "scichart/Charting/ChartModifiers/ZoomPanModifier";
import { ZoomExtentsModifier } from "scichart/Charting/ChartModifiers/ZoomExtentsModifier";
import { PinchZoomModifier } from "scichart/Charting/ChartModifiers/PinchZoomModifier";

export default {
  setup() {
    const initChart = async () => {
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
      const { sciChartSurface, wasmContext } = await SciChartSurface.create(
        "scichart-root-test"
      );

      // Create an X,Y Axis and add to the chart
      const xAxis = new NumericAxis(wasmContext);
      const yAxis = new NumericAxis(wasmContext);

      sciChartSurface.xAxes.add(xAxis);
      sciChartSurface.yAxes.add(yAxis);

      // Create 100 dataseries, each with 10k points
      for (let seriesCount = 0; seriesCount < 100; seriesCount++) {
        const xyDataSeries = new XyDataSeries(wasmContext);

        const opacity = (1 - seriesCount / 120).toFixed(2);

        // Populate with some data
        for (let i = 0; i < 10000; i++) {
          xyDataSeries.append(
            i,
            Math.sin(i * 0.01) * Math.exp(i * (0.00001 * (seriesCount + 1)))
          );
        }

        // Add and create a line series with this data to the chart
        // Create a line series
        const lineSeries = new FastLineRenderableSeries(wasmContext, {
          dataSeries: xyDataSeries,
          stroke: `rgba(176,196,222,${opacity})`,
          strokeThickness: 2
        });

        sciChartSurface.renderableSeries.add(lineSeries);
      }

      // Add zoom, pan behaviours to the chart. Mousewheel zoom, panning and double-click to
      // zoom to fit
      const mouseWheelZoomModifier = new MouseWheelZoomModifier();
      const zoomPanModifier = new ZoomPanModifier();
      const rubberBandZoomModifier = new RubberBandXyZoomModifier();
      const zoomExtentsModifier = new ZoomExtentsModifier();
      const pinchZoomModifier = new PinchZoomModifier();
      sciChartSurface.chartModifiers.add(zoomExtentsModifier);
      sciChartSurface.chartModifiers.add(zoomPanModifier);
      sciChartSurface.chartModifiers.add(rubberBandZoomModifier);
      sciChartSurface.chartModifiers.add(mouseWheelZoomModifier);
      scichartSurface.chartModifiers.add(pinchZoomModifier);

      const inputEnablePan = document.getElementById("enable-pan");
      const inputEnableZoom = document.getElementById("enable-zoom");
      const inputEnableZoomToFit = document.getElementById("enable-zoom-to-fit");
      const inputEnableMouseWheel = document.getElementById("enable-mouse-wheel-zoom");
      inputEnablePan.addEventListener("input", (event) => {
        zoomPanModifier.isEnabled = inputEnablePan.checked;
        rubberBandZoomModifier.isEnabled = !inputEnablePan.checked;
        inputEnableZoom.checked = !inputEnablePan.checked;
        console.log(
          `Enabling Drag to Pan. Status: rubberBand checkbox ${inputEnableZoom.checked}, rubberBand ${rubberBandZoomModifier.isEnabled}, zoomPan checkbox ${inputEnablePan.isEnabled}, zoomPan ${zoomPanModifier.isEnabled} `
        );
      });

      inputEnableZoom.addEventListener("input", (event) => {
        rubberBandZoomModifier.isEnabled = inputEnableZoom.checked;
        zoomPanModifier.isEnabled = !inputEnableZoom.checked;
        inputEnablePan.checked = !inputEnableZoom.checked;
        console.log(
          `Enabling Drag to Zoom. Status: rubberBand checkbox ${inputEnableZoom.checked}, rubberBand ${rubberBandZoomModifier.isEnabled}, zoomPan checkbox ${inputEnablePan.isEnabled}, zoomPan ${zoomPanModifier.isEnabled} `
        );
      });

      inputEnableZoomToFit.addEventListener("input", (event) => {
        zoomExtentsModifier.isEnabled = inputEnableZoomToFit.checked;
        console.log("Enabling zoom extents");
      });

      inputEnableMouseWheel.addEventListener("input", (event) => {
        mouseWheelZoomModifier.isEnabled = inputEnableMouseWheel.checked;
        console.log("Enabling Mousewheel zoom");
      });
    };
    onMounted(() => {
      initChart();
    });

    return {};
  }
};
</script>
