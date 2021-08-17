/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/camelcase */

import {
	diagnoses,
	token,
	tagListData,
	anomalyData,
	evaluationData,
	filterAnomalyData,
	isChecked
} from "@/composition/store";
import axios from "axios";
import apiUrl from "../../../api_url.global";
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
import { BoxAnnotation } from "scichart/Charting/Visuals/Annotations/BoxAnnotation";
import { SimpleDataPointSelectionModifier } from "@/composition/sciChart/simpleDataPointSelectionModifier";
import { MouseClickShowdataModifier } from "@/composition/sciChart/mouseClickShowdataModifier";
import { PinchZoomModifier } from "scichart/Charting/ChartModifiers/PinchZoomModifier";
import { EExecuteOn } from "scichart/types/ExecuteOn";

export const initSciChartFn = () => {
	// const changeSwitch = () => {
	// 	const tagModeEnable: HTMLInputElement = <
	// 		HTMLInputElement
	// 	>document.getElementById(
	// 		"tag-mode"
	// 	);
	// 	const simpleDataPointSelectionModifier = new SimpleDataPointSelectionModifier();
	// 	const zoomPanModifier = new SimpleDataPointSelectionModifier();
	// 	tagModeEnable.checked = !tagModeEnable.checked;
	// 	if (
	// 		tagModeEnable.checked === true
	// 	) {
	// 		simpleDataPointSelectionModifier.isEnabled = true;
	// 		zoomPanModifier.isEnabled = false;
	// 		console.log(
	// 			tagModeEnable.checked,
	// 			isChecked.value,
	// 			simpleDataPointSelectionModifier,
	// 			zoomPanModifier
	// 		);
	// 		document
	// 			.getElementById("scichart-root")
	// 			.setAttribute(
	// 				"data-bs-toggle",
	// 				"modal"
	// 			);
	// 		document
	// 			.getElementById("scichart-root")
	// 			.setAttribute(
	// 				"data-bs-target",
	// 				"#exampleModal"
	// 			);
	// 	} else {
	// 		simpleDataPointSelectionModifier.isEnabled = false;
	// 		zoomPanModifier.isEnabled = true;
	// 		console.log(
	// 			tagModeEnable.checked,
	// 			isChecked.value,
	// 			simpleDataPointSelectionModifier,
	// 			zoomPanModifier
	// 		);
	// 		document
	// 			.getElementById("scichart-root")
	// 			.removeAttribute(
	// 				"data-bs-toggle"
	// 			);
	// 		document
	// 			.getElementById("scichart-root")
	// 			.removeAttribute(
	// 				"data-bs-target"
	// 			);
	// 	}
	// 	zoomPanModifier.xyDirection =
	// 		EXyDirection.XDirection;
	// };
	const initSciChart = async () => {
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

		const {
			sciChartSurface,
			wasmContext
		} = await SciChartSurface.create(
			"scichart-root"
		);

		sciChartSurface.applyTheme(
			new SciChartJSLightTheme()
		);

		const xAxis = new CategoryAxis(
			wasmContext
		);
		xAxis.labelProvider.formatLabel = (
			index: number
		) => {
			return (
				(index / 250).toFixed(0) + "s"
			);
		};
		xAxis.drawMajorGridLines = true;
		xAxis.autoTicks = false;
		xAxis.minorDelta = 0;
		xAxis.visibleRangeLimit = new NumberRange(
			0,
			7499
		);
		const yAxis = new NumericAxis(
			wasmContext,
			{
				axisTitle: "(mV)",
				axisAlignment:
					EAxisAlignment.Right,
				drawLabels: false
			}
		);
		yAxis.visibleRange = new NumberRange(
			-1,
			11
		);

		sciChartSurface.xAxes.add(xAxis);
		sciChartSurface.yAxes.add(yAxis);

		// // Declare a DataSeries
		const xyDataSeries1 = new XyDataSeries(
			wasmContext
		);
		const xyDataSeries2 = new XyDataSeries(
			wasmContext
		);
		const xyDataSeries3 = new XyDataSeries(
			wasmContext
		);
		const xyDataSeries4 = new XyDataSeries(
			wasmContext
		);
		const xyDataSeries5 = new XyDataSeries(
			wasmContext
		);
		const xyDataSeries6 = new XyDataSeries(
			wasmContext
		);

		diagnoses.data[0].measures[0].values[0].raw_datas.forEach(
			// CH1
			(item: number, index: number) => {
				xyDataSeries1.append(
					index,
					item + 10
				);
			}
		);
		diagnoses.data[0].measures[0].values[1].raw_datas.forEach(
			// CH2
			(item: number, index: number) => {
				xyDataSeries2.append(
					index,
					item + 8
				);
			}
		);
		diagnoses.data[0].measures[0].values[2].raw_datas.forEach(
			// CH3
			(item: number, index: number) => {
				xyDataSeries3.append(
					index,
					item + 6
				);
			}
		);
		diagnoses.data[0].measures[0].values[3].raw_datas.forEach(
			// CH4
			(item: number, index: number) => {
				xyDataSeries4.append(
					index,
					item + 4
				);
			}
		);
		diagnoses.data[0].measures[0].values[4].raw_datas.forEach(
			// CH5
			(item: number, index: number) => {
				xyDataSeries5.append(
					index,
					item + 2
				);
			}
		);
		diagnoses.data[0].measures[0].values[5].raw_datas.forEach(
			// CH6
			(item: number, index: number) => {
				xyDataSeries6.append(
					index,
					item + 0
				);
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
				xCoordinateMode:
					ECoordinateMode.Relative,
				yCoordinateMode:
					ECoordinateMode.Relative
			}),
			new TextAnnotation({
				text: "LEAD 2",
				textColor: "black",
				fontSize: 18,
				x1: 0.05,
				y1: (1 / 6) * 1,
				xCoordinateMode:
					ECoordinateMode.Relative,
				yCoordinateMode:
					ECoordinateMode.Relative
			}),
			new TextAnnotation({
				text: "LEAD 3",
				textColor: "black",
				fontSize: 18,
				x1: 0.05,
				y1: (1 / 6) * 2,
				xCoordinateMode:
					ECoordinateMode.Relative,
				yCoordinateMode:
					ECoordinateMode.Relative
			}),
			new TextAnnotation({
				text: "aVR",
				textColor: "black",
				fontSize: 18,
				x1: 0.05,
				y1: (1 / 6) * 3,
				xCoordinateMode:
					ECoordinateMode.Relative,
				yCoordinateMode:
					ECoordinateMode.Relative
			}),
			new TextAnnotation({
				text: "aVL",
				textColor: "black",
				fontSize: 18,
				x1: 0.05,
				y1: (1 / 6) * 4,
				xCoordinateMode:
					ECoordinateMode.Relative,
				yCoordinateMode:
					ECoordinateMode.Relative
			}),
			new TextAnnotation({
				text: "aVF",
				textColor: "black",
				fontSize: 18,
				x1: 0.05,
				y1: (1 / 6) * 5,
				xCoordinateMode:
					ECoordinateMode.Relative,
				yCoordinateMode:
					ECoordinateMode.Relative
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
		const lineSeries1 = new FastLineRenderableSeries(
			wasmContext
		);
		lineSeries1.strokeThickness = 2;
		lineSeries1.stroke =
			"rgba(255,0,0,1)";
		lineSeries1.dataSeries = xyDataSeries1;

		const lineSeries2 = new FastLineRenderableSeries(
			wasmContext
		);
		lineSeries2.strokeThickness = 2;
		lineSeries2.stroke =
			"rgba(255,0,0,1)";
		lineSeries2.dataSeries = xyDataSeries2;

		const lineSeries3 = new FastLineRenderableSeries(
			wasmContext
		);
		lineSeries3.strokeThickness = 2;
		lineSeries3.stroke =
			"rgba(255,0,0,1)";
		lineSeries3.dataSeries = xyDataSeries3;

		const lineSeries4 = new FastLineRenderableSeries(
			wasmContext
		);
		lineSeries4.strokeThickness = 2;
		lineSeries4.stroke =
			"rgba(255,0,0,1)";
		lineSeries4.dataSeries = xyDataSeries4;

		const lineSeries5 = new FastLineRenderableSeries(
			wasmContext
		);
		lineSeries5.strokeThickness = 2;
		lineSeries5.stroke =
			"rgba(255,0,0,1)";
		// lineSeries5.stroke = "blue";
		lineSeries5.dataSeries = xyDataSeries5;

		const lineSeries6 = new FastLineRenderableSeries(
			wasmContext
		);
		lineSeries6.strokeThickness = 2;
		lineSeries6.stroke =
			"rgba(255,0,0,1)";
		lineSeries6.dataSeries = xyDataSeries6;

		sciChartSurface.renderableSeries.add(
			lineSeries1
		);
		sciChartSurface.renderableSeries.add(
			lineSeries2
		);
		sciChartSurface.renderableSeries.add(
			lineSeries3
		);
		sciChartSurface.renderableSeries.add(
			lineSeries4
		);
		sciChartSurface.renderableSeries.add(
			lineSeries5
		);
		sciChartSurface.renderableSeries.add(
			lineSeries6
		);

		const tagModeEnable: HTMLInputElement = <
			HTMLInputElement
		>document.getElementById(
			"tag-mode"
		);
		const scichartRoot = document.getElementById(
			"scichart-root"
		);

		const zoomPanModifier = new ZoomPanModifier();
		const simpleDataPointSelectionModifier = new SimpleDataPointSelectionModifier();
		const mouseWheelZoomModifier = new MouseWheelZoomModifier();
		const mouseMoveShowdataModifier = new MouseClickShowdataModifier();
		const pinchZoomModifier = new PinchZoomModifier();

		sciChartSurface.chartModifiers.add(
			zoomPanModifier
		);
		if (screen.width > 1440) {
			sciChartSurface.chartModifiers.add(
				simpleDataPointSelectionModifier
			);
		}
		sciChartSurface.chartModifiers.add(
			mouseWheelZoomModifier
		);
		sciChartSurface.chartModifiers.add(
			mouseMoveShowdataModifier
		);
		sciChartSurface.chartModifiers.add(
			pinchZoomModifier
		);

		// tagModeEnable.addEventListener(
		// 	"change",
		// 	() => {
		// 		// sciChartSurface.chartModifiers.add(
		// 		// 	zoomPanModifier
		// 		// );
		// 		// sciChartSurface.chartModifiers.add(
		// 		// 	simpleDataPointSelectionModifier
		// 		// );
		// 		isChecked.value = !isChecked.value;
		// 		if (
		// 			// tagModeEnable.checked === true
		// 			isChecked.value
		// 		) {
		// 			simpleDataPointSelectionModifier.isEnabled = true;
		// 			zoomPanModifier.isEnabled = false;
		// 			// sciChartSurface.chartModifiers.remove(
		// 			// 	zoomPanModifier
		// 			// );
		// 			// sciChartSurface.chartModifiers.add(
		// 			// 	simpleDataPointSelectionModifier
		// 			// );
		// 			scichartRoot.setAttribute(
		// 				"data-bs-toggle",
		// 				"modal"
		// 			);
		// 			if (
		// 				filterAnomalyData.length ===
		// 				0
		// 			) {
		// 				scichartRoot.setAttribute(
		// 					"data-bs-target",
		// 					"#exampleModal"
		// 				);
		// 			} else {
		// 				scichartRoot.setAttribute(
		// 					"data-bs-target",
		// 					"#modifyEvaluationDataModal"
		// 				);
		// 			}
		// 			console.log(
		// 				tagModeEnable.checked,
		// 				isChecked.value,
		// 				simpleDataPointSelectionModifier,
		// 				zoomPanModifier
		// 			);
		// 		} else {
		// 			simpleDataPointSelectionModifier.isEnabled = false;
		// 			zoomPanModifier.isEnabled = true;
		// 			// sciChartSurface.chartModifiers.remove(
		// 			// 	simpleDataPointSelectionModifier
		// 			// );
		// 			// sciChartSurface.chartModifiers.add(
		// 			// 	zoomPanModifier
		// 			// );
		// 			console.log(
		// 				tagModeEnable.checked,
		// 				isChecked.value,
		// 				simpleDataPointSelectionModifier,
		// 				zoomPanModifier
		// 			);
		// 			scichartRoot.removeAttribute(
		// 				"data-bs-toggle"
		// 			);
		// 			scichartRoot.removeAttribute(
		// 				"data-bs-target"
		// 			);
		// 		}
		// 	}
		// );

		mouseWheelZoomModifier.xyDirection =
			EXyDirection.XDirection;
		zoomPanModifier.xyDirection =
			EXyDirection.XDirection;

		// 使用滑鼠左鍵
		zoomPanModifier.executeOn =
			EExecuteOn.MouseLeftButton;
		// 使用滑鼠右鍵
		simpleDataPointSelectionModifier.executeOn =
			EExecuteOn.MouseRightButton;

		// 使用滑鼠左鍵
		// mouseMoveShowdataModifier.executeOn =
		// 	EExecuteOn.MouseLeftButton;

		pinchZoomModifier.xyDirection =
			EXyDirection.XDirection;

		// const filterAnomalyData = reactive([]);
		// const changeSwitch = () => {
		//   isChecked.value = !isChecked.value;
		//   if (isActive.value === true) {
		//     console.log(isActive.value);
		//     simpleDataPointSelectionModifier.isEnabled = true;
		//     zoomPanModifier.isEnabled = false;
		//     console.log(
		//       "有嗎?",
		//       "這是true=>",
		//       simpleDataPointSelectionModifier,
		//       zoomPanModifier
		//     );
		//     // xAxisDragModifier.isEnabled = true;
		//     document
		//       .getElementById("scichart-root")
		//       .setAttribute("data-bs-toggle", "modal");
		//     document
		//       .getElementById("scichart-root")
		//       .setAttribute("data-bs-target", "#exampleModal");
		//   } else {
		//     console.log(isActive.value);
		//     simpleDataPointSelectionModifier.isEnabled = false;
		//     zoomPanModifier.isEnabled = true;
		//     console.log(
		//       "有嗎?",
		//       "這是false=>",
		//       simpleDataPointSelectionModifier,
		//       zoomPanModifier
		//     );
		//     // xAxisDragModifier.isEnabled = false;
		//     document
		//       .getElementById("scichart-root")
		//       .removeAttribute("data-bs-toggle");
		//     document
		//       .getElementById("scichart-root")
		//       .removeAttribute("data-bs-target");
		//   }
		// };
		// tagModeEnable.addEventListener("input", () => {
		//   // isChecked.value = !isChecked.value;
		//   changeSwitch();
		// });
		// document.querySelector("body").addEventListener("keydown", e => {
		//   e.preventDefault();
		//   if (e.keyCode === 32) {
		//     // isChecked.value = !isChecked.value;
		//     changeSwitch();
		//   }
		// });
		// tagModeEnable.addEventListener("change", () => {
		//   if (tagModeEnable.checked === true) {
		//     simpleDataPointSelectionModifier.isEnabled = true;
		//     zoomPanModifier.isEnabled = false;
		//     xAxisDragModifier.isEnabled = true;
		//     scichartRoot.setAttribute("data-bs-toggle", "modal");
		//     scichartRoot.setAttribute("data-bs-target", "#exampleModal");
		//   } else {
		//     simpleDataPointSelectionModifier.isEnabled = false;
		//     zoomPanModifier.isEnabled = true;
		//     xAxisDragModifier.isEnabled = false;
		//     scichartRoot.removeAttribute("data-bs-toggle");
		//     scichartRoot.removeAttribute("data-bs-target");
		//   }
		// });
		axios
			.get(
				apiUrl.url +
					localStorage.getItem(
						"dbNum"
					) +
					"/notes/" +
					diagnoses.data[0]
						.diagnosis_id,
				{
					headers: {
						Authorization:
							"Bearer " + token.value
					}
				}
			)
			.then((res) => {
				tagListData.data =
					res.data.data;
				res.data.data.forEach(
					(item) => {
						sciChartSurface.annotations.add(
							new BoxAnnotation({
								fill: "#FFE66F33",
								strokeThickness: 0,
								x1: parseInt(item.x1),
								x2: parseInt(item.x2),
								y1:
									parseInt(
										item.channel
									) *
										-1 +
									9 -
									parseInt(
										item.channel
									),
								y2:
									parseInt(
										item.channel
									) *
										-1 +
									11 -
									parseInt(item.channel)
							})
						);
					}
				);
			})
			.catch((err) => {
				console.log(err);
			});

		filterAnomalyData.length = 0;
		if (anomalyData.data.length !== 0) {
			anomalyData.data[0].result.forEach(
				(item1, index1) => {
					item1.forEach(
						(item2, index2) => {
							if (item2 !== 0) {
								filterAnomalyData.push({
									channel: index1,
									x1:
										anomalyData.data[0]
											.start_end_peak[
											index1
										][index2][0],
									x2:
										anomalyData.data[0]
											.start_end_peak[
											index1
										][index2][1]
								});
							}
						}
					);
				}
			);
		}

		filterAnomalyData.forEach(
			(item) => {
				sciChartSurface.annotations.add(
					new BoxAnnotation({
						fill: "#FF333350",
						strokeThickness: 0,
						x1: item.x1,
						x2: item.x2,
						y1:
							item.channel * -1 +
							9 -
							item.channel,
						y2:
							item.channel * -1 +
							11 -
							item.channel
					})
				);
			}
		);

		evaluationData.data.forEach(
			(item) => {
				sciChartSurface.annotations.add(
					new BoxAnnotation({
						fill: "#22770050",
						strokeThickness: 0,
						x1: parseInt(item.x1),
						x2: parseInt(item.x2),
						y1:
							parseInt(item.channel) *
								-1 +
							9 -
							parseInt(item.channel),
						y2:
							parseInt(item.channel) *
								-1 +
							11 -
							parseInt(item.channel)
					})
				);
			}
		);
	};
	return {
		initSciChart,
		anomalyData,
		evaluationData
	};
};
