/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/camelcase */
import { reactive } from "vue";
import { ChartModifierBase2D } from "scichart/Charting/ChartModifiers/ChartModifierBase2D";
import { ModifierMouseArgs } from "scichart/Charting/ChartModifiers/ModifierMouseArgs";
import { Point } from "scichart/Core/Point";
import { BoxAnnotation } from "scichart/Charting/Visuals/Annotations/BoxAnnotation";
import { translateFromCanvasToSeriesViewRect } from "scichart/utils/translate";
import { testIsInBounds } from "scichart/utils/pointUtil";
import { ENearestPointLogic } from "scichart/Charting/Visuals/RenderableSeries/HitTest/IHitTestProvider";
import { ECoordinateMode } from "scichart/Charting/Visuals/Annotations/AnnotationBase";
import { selectedPoints } from "@/composition/store";
// import { ModifierAnnotations } from "scichart/Charting/Visuals/SciChartSurface";
export class SimpleDataPointSelectionModifier extends ChartModifierBase2D {
	private startPoint: Point | undefined;
	private endPoint: Point | undefined;
	selectionAnnotation: BoxAnnotation;
	private isSelecting:
		| boolean
		| undefined;
	config: any = reactive([]);
	y1 = -1;
	y2 = 1;
	y3 = 3;
	y4 = 5;
	y5 = 7;
	y6 = 9;
	y7 = 11;

	// Called when mouse-down on the chart
	public modifierMouseDown(
		args: ModifierMouseArgs
	): void {
		super.modifierMouseDown(args);
		this.selectionAnnotation = new BoxAnnotation(
			{
				// DataValue COORDINATE MODE EXAMPLE
				yCoordinateMode:
					ECoordinateMode.Relative,
				xCoordinateMode:
					ECoordinateMode.DataValue,
				y1: 0,
				y2: 0.1,
				fill: "#FFE66F33",
				strokeThickness: 0
			}
		);

		// Point coordinates relative to series view rectangle.
		const hitTestInfo = this.parentSurface.renderableSeries
			.get(0)
			.hitTestProvider.hitTest(
				args.mousePoint,
				ENearestPointLogic.NearestPoint2D,
				1,
				false
			);
		const yClickDataValue =
			hitTestInfo.hitTestPointValues.y;
		if (
			this.y1 < yClickDataValue &&
			this.y2 > yClickDataValue
		) {
			this.selectionAnnotation.y1 =
				(1 / 6) * 5;
			this.selectionAnnotation.y2 =
				(1 / 6) * 6;
		} else if (
			this.y2 < yClickDataValue &&
			this.y3 > yClickDataValue
		) {
			this.selectionAnnotation.y1 =
				(1 / 6) * 4;
			this.selectionAnnotation.y2 =
				(1 / 6) * 5;
		} else if (
			this.y3 < yClickDataValue &&
			this.y4 > yClickDataValue
		) {
			this.selectionAnnotation.y1 =
				(1 / 6) * 3;
			this.selectionAnnotation.y2 =
				(1 / 6) * 4;
		} else if (
			this.y4 < yClickDataValue &&
			this.y5 > yClickDataValue
		) {
			this.selectionAnnotation.y1 =
				(1 / 6) * 2;
			this.selectionAnnotation.y2 =
				(1 / 6) * 3;
		} else if (
			this.y5 < yClickDataValue &&
			this.y6 > yClickDataValue
		) {
			this.selectionAnnotation.y1 =
				(1 / 6) * 1;
			this.selectionAnnotation.y2 =
				(1 / 6) * 2;
		} else if (
			this.y6 < yClickDataValue &&
			this.y7 > yClickDataValue
		) {
			this.selectionAnnotation.y1 =
				(1 / 6) * 0;
			this.selectionAnnotation.y2 =
				(1 / 6) * 1;
		}

		const translatedPoint = translateFromCanvasToSeriesViewRect(
			args.mousePoint,
			this.parentSurface.seriesViewRect
		);
		if (translatedPoint) {
			this.startPoint = translatedPoint;
			this.endPoint = translatedPoint;

			// DataValue COORDINATE MODE EXAMPLE
			const {
				xCalc,
				yCalc
			} = this.getDefaultCoordCalculators();
			if (!xCalc) {
				return;
			}

			this.selectionAnnotation.x1 = xCalc.getDataValue(
				translatedPoint.x
			);
			this.selectionAnnotation.x2 = xCalc.getDataValue(
				translatedPoint.x
			);
			this.isSelecting = true;

			this.parentSurface.annotations.remove(
				this.selectionAnnotation
			);
			this.parentSurface.annotations.add(
				this.selectionAnnotation
			);
		}
	}

	// Called when mouse-move on the chart
	public modifierMouseMove(
		args: ModifierMouseArgs
	): void {
		super.modifierMouseMove(args);
		const translatedPoint = translateFromCanvasToSeriesViewRect(
			args.mousePoint,
			this.parentSurface.seriesViewRect
		);

		if (
			translatedPoint &&
			this.isSelecting
		) {
			this.endPoint = args.mousePoint;

			// DataValue COORDINATE MODE EXAMPLE
			const {
				xCalc,
				yCalc
			} = this.getDefaultCoordCalculators();
			if (!xCalc) {
				return;
			}
			this.selectionAnnotation.x2 = xCalc.getDataValue(
				translatedPoint.x
			);
		}
	}

	// Called when mouse-up on the chart
	public modifierMouseUp(
		args: ModifierMouseArgs
	) {
		super.modifierMouseUp(args);
		this.isSelecting = false;
		this.performSelection();
		this.startPoint = undefined;
		this.endPoint = undefined;
		this.cancelSelectionData();
		document
			.getElementById("scichart-root")
			.setAttribute(
				"data-bs-toggle",
				"modal"
			);
		document
			.getElementById("scichart-root")
			.setAttribute(
				"data-bs-target",
				"#exampleModal"
			);
	}

	private performSelection() {
		selectedPoints.length = 0;
		if (
			!(
				this.startPoint && this.endPoint
			)
		) {
			return;
		}
		this.parentSurface.renderableSeries
			.asArray()
			.filter((rs) => rs.isVisible)
			.forEach((rs, index) => {
				selectedPoints[index] = [];
				const dataSeries =
					rs.dataSeries;
				if (!dataSeries) {
					return;
				}
				const xCalc = rs.xAxis.getCurrentCoordinateCalculator();
				const yCalc = rs.yAxis.getCurrentCoordinateCalculator();

				// Find the bounds of the data inside the rectangle

				let leftXData, rightXData;

				if (
					xCalc.getDataValue(
						this.startPoint.x
					) <=
					xCalc.getDataValue(
						this.endPoint.x
					)
				) {
					leftXData = xCalc.getDataValue(
						this.startPoint.x
					);
					rightXData = xCalc.getDataValue(
						this.endPoint.x
					);
				} else {
					leftXData = xCalc.getDataValue(
						this.endPoint.x
					);
					rightXData = xCalc.getDataValue(
						this.startPoint.x
					);
				}

				let bottomYData, topYData;

				if (
					yCalc.getDataValue(
						this.startPoint.y
					) > this.y6 &&
					yCalc.getDataValue(
						this.endPoint.y
					) < this.y7
				) {
					bottomYData = this.y6;
					topYData = this.y7;
				} else if (
					yCalc.getDataValue(
						this.startPoint.y
					) > this.y5 &&
					yCalc.getDataValue(
						this.endPoint.y
					) < this.y6
				) {
					bottomYData = this.y5;
					topYData = this.y6;
				} else if (
					yCalc.getDataValue(
						this.startPoint.y
					) > this.y4 &&
					yCalc.getDataValue(
						this.endPoint.y
					) < this.y5
				) {
					bottomYData = this.y4;
					topYData = this.y5;
				} else if (
					yCalc.getDataValue(
						this.startPoint.y
					) > this.y3 &&
					yCalc.getDataValue(
						this.endPoint.y
					) < this.y4
				) {
					bottomYData = this.y3;
					topYData = this.y4;
				} else if (
					yCalc.getDataValue(
						this.startPoint.y
					) > this.y2 &&
					yCalc.getDataValue(
						this.endPoint.y
					) < this.y3
				) {
					bottomYData = this.y2;
					topYData = this.y3;
				} else if (
					yCalc.getDataValue(
						this.startPoint.y
					) > this.y1 &&
					yCalc.getDataValue(
						this.endPoint.y
					) < this.y2
				) {
					bottomYData = this.y1;
					topYData = this.y2;
				}
				for (
					let i = 0;
					i < dataSeries.count();
					i++
				) {
					const x = dataSeries
						.getNativeXValues()
						.get(i);
					const y = dataSeries
						.getNativeYValues()
						.get(i);
					if (
						testIsInBounds(
							x,
							y,
							leftXData,
							topYData,
							rightXData,
							bottomYData
						)
					) {
						selectedPoints[index].push({
							x1Value: leftXData,
							x2Value: rightXData,
							y1Value: bottomYData,
							y2Value: topYData
						});
					}
				}
			});
		console.log(selectedPoints);
		// document
		// 	.getElementById("scichart-root")
		// 	.setAttribute(
		// 		"data-bs-toggle",
		// 		"modal"
		// 	);
		// document
		// 	.getElementById("scichart-root")
		// 	.setAttribute(
		// 		"data-bs-target",
		// 		"#exampleModal"
		// 	);
	}

	private getDefaultCoordCalculators() {
		const xAxis = this.parentSurface.xAxes.get(
			0
		);
		const yAxis = this.parentSurface.yAxes.get(
			0
		);
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

	private cancelSelectionData() {
		const cancelSelectButton_1 = document.getElementById(
			"cancelSelectButton-1"
		);
		const cancelSelectButton_2 = document.getElementById(
			"cancelSelectButton-2"
		);
		cancelSelectButton_1.addEventListener(
			"click",
			() => {
				this.parentSurface.annotations.remove(
					this.selectionAnnotation
				);
			}
		);
		cancelSelectButton_2.addEventListener(
			"click",
			() => {
				this.parentSurface.annotations.remove(
					this.selectionAnnotation
				);
			}
		);
	}
	// private annotations(
	// 	args: ModifierAnnotations
	// ): void {
	//   super.annotations(args);
	// 	console.log(args);
	// }
}
