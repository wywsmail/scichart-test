import axios from "axios";
import apiUrl from "../../api_url.global";
import { useRoute } from "vue-router";
import { tagListData, token } from "@/composition/store";

export const showTagListFn = () => {
  const showTagList = (): Promise<any> => {
    const route = useRoute();
    return new Promise((resolve, reject) => {
      axios
        // .get(apiUrl.url + "notes/" + diagnoses.data[0].diagnosis_id, {
        .get(apiUrl.url + "notes/" + route.params.diagnosesid, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(res => {
          console.log(res);
          tagListData.data = res.data.data;
          resolve(tagListData);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  };
  return {
    showTagList
  }
};
