/* eslint-disable @typescript-eslint/camelcase */
import axios from "axios";
import apiUrl from "../../api_url.global";
import {
	diagnoses,
	token,
	tagListData,
	tableData
} from "@/composition/store";

export const showECGChartFn = () => {
	const showECGChart = (
		id
	): Promise<any> => {
		return new Promise(
			(resolve, reject) => {
				const config: any = {
					baseURL:
						"https://dev.intelliances.com/broker/medical/v2",
					url:
						"/diagnoses/" +
						"c42ee114-0b83-4497-9501-f9655c91388f",
					headers: {
						"Content-Type":
							"application/json",
						platform: "web"
					},
					method: "get",
					data: {}
				};
				axios(config)
					.then((res) => {
						res.data.data.start_time = new Date(
							res.data.data.start_time
						).toLocaleString();
						diagnoses.data = [
							res.data.data
						];
						tableData.data = [
							res.data.data
						];
						resolve(diagnoses);
					})
					.catch((err) => {
						alert("沒有資料喔");
						reject(err);
					});
			}
		);
	};
	const showTagRange = (): Promise<any> => {
		return new Promise(
			(resolve, reject) => {
				axios
					.get(
						"https://dev.intelliances.com/broker/medical/v2/notes" +
							"c42ee114-0b83-4497-9501-f9655c91388f",
						{
							headers: {
								Authorization:
									"Bearer " +
									token.value
							}
						}
					)
					.then((res) => {
						tagListData.data =
							res.data.data;
					})
					.catch((err) => {
						console.log(err);
					});
			}
		);
	};
	return { showECGChart, showTagRange };
};
