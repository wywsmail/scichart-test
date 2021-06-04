function draw_anomalies(
	out,
	model_name,
	start_end
) {
	const anomalies_pins = [];
	let channel = 0;
	let note = "";
	localStorage.setItem(
		"areaColor",
		"red"
	);
	out.forEach((c, i) => {
		c.forEach((o, j) => {
			if (o === 1) {
				note = "APC";
				if (model_name === "model_a1") {
					note = "PSVT";
				}
			}
			if (o === 2) {
				note = "ST-D";
				if (model_name === "model_a1") {
					note = "BBB";
				}
			}
			if (o === 3) {
				note = "ST-E";
				if (model_name === "model_a1") {
					note = "VPC";
				}
			}
			if (o === 4) {
				note = "VPC";
				if (model_name === "model_a1") {
					note = "Atrial Fibrillation";
				}
			}
			if (o === 5) {
				note = "Atrial Fibrillation";
			}
			if (o !== 0) {
				anomalies_pins.push({
					id: "",
					x1: parseInt(
						start_end[i][j][0]
					),
					x2: parseInt(
						start_end[i][j][1]
					),
					height: channel_height,
					v: note,
					y:
						channel * channel_height +
						margin.top
				});
			}
		});
		channel = channel + 1;
	});

	$(".pin-rect").remove();

	pinLineMap
		.selectAll("path")
		.data(anomalies_pins)
		.enter()
		.append("rect")
		.attrs(pin_rect)
		.attr("class", "pin-rect")
		.style(
			"fill",
			localStorage.getItem("areaColor")
		)
		.style("opacity", 0.2)
		.attrs(function(d) {
			return {
				"data-x1": d.x1,
				"data-x2": d.x2,
				"data-t1":
					Math.round(
						(d.x1 / 250) * 100
					) / 100,
				"data-t2":
					Math.round(
						(d.x2 / 250) * 100
					) / 100,
				"data-note": d.v,
				"data-id": d.id
			};
		});
	updateChannelOnPin();
}
