<template>
  <div class="container">
    <h1>Chart Information</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Time</th>
          <th scope="col">HR</th>
          <th scope="col">Gain</th>
          <th scope="col">Device</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in diagnoses.data" :key="item.diagnosis_id">
          <th scope="row">{{ item.diagnosis_id }}</th>
          <td>{{ item.start_time }}</td>
          <td>{{ item.hr_last }}</td>
          <td>{{ item.gain }}</td>
          <td>{{ item.device_id }}</td>
        </tr>
      </tbody>
    </table>
    <h2>Tag Information</h2>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Note ID</th>
          <th scope="col">Channel Name</th>
          <th scope="col">Time</th>
          <th scope="col">備註</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tagList.data" :key="item.id">
          <th>{{ item.id }}</th>
          <td>{{ item.channel }}</td>
          <td>{{ item.x1 }} ~ {{ item.x2 }}</td>
          <td>{{ item.note }}</td>
          <td>
            <div
              class="btn-toolbar justify-content-around"
              role="toolbar"
              aria-label="Toolbar with button groups"
            >
              <div class="btn-group me-2" role="group" aria-label="First group">
                <button
                  type="button"
                  class="btn btn-primary mr-1"
                  data-bs-toggle="modal"
                  data-bs-target="#modifyModal"
                >
                  編輯
                </button>
              </div>
              <div class="btn-group me-2" role="group" aria-label="Second group">
                <button type="button" class="btn btn-danger" @click="deleteData(item.id)">
                  刪除
                </button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="row">
      <div class="col-3">
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="tag-mode" />
          <label class="form-check-label" for="tag-mode">Enable Tag Mode</label>
        </div>
      </div>
      <div class="col-3">
        <select
          v-model="selected"
          placeholder="請選擇 Model"
          class="form-select"
          aria-label="Default select example"
        >
          <option value="" selected disabled>Select Model</option>
          <option v-for="item in modelName" :key="item.value" :value="item.value">
            {{ item.label }}
          </option>
        </select>
      </div>
      <div class="col-6">
        <div class="card text-start">
          <h5 class="card-header">Tag Information</h5>
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Channel Name</th>
                  <th scope="col">Time</th>
                  <th scope="col">備註</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>LEAD 1</th>
                  <td>500-1000</td>
                  <td>ST-D</td>
                </tr>
              </tbody>
            </table>
            <div class="text-end">
              <a
                href="#"
                class="btn btn-primary me-2"
                data-bs-toggle="modal"
                data-bs-target="#modifyModal"
                >編輯</a
              >
              <a
                href="#"
                class="btn btn-danger me-2"
                data-bs-toggle="modal"
                data-bs-target="#deleteModal"
                >刪除</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="scichart-root" style="width: 100%; height: 800px; margin: auto"></div>
  </div>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    @click="cancelSelectionData()"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">請選擇 Tag Note 類型</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-4">
                <div class="form-check mb-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    checked
                    value="ST-E"
                    v-model="noteMode"
                  />
                  <label class="form-check-label" for="flexRadioDefault2"> ST-E </label>
                </div>
                <div class="form-check mb-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    value="ST-D"
                    v-model="noteMode"
                  />
                  <label class="form-check-label" for="flexRadioDefault2"> ST-D </label>
                </div>
                <div class="form-check mb-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    value="OMI"
                    v-model="noteMode"
                  />
                  <label class="form-check-label" for="flexRadioDefault2"> OMI </label>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-check mb-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    value="APC"
                    v-model="noteMode"
                  />
                  <label class="form-check-label" for="flexRadioDefault2"> APC </label>
                </div>
                <div class="form-check mb-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    value="Atrial Fibrillation"
                    v-model="noteMode"
                  />
                  <label class="form-check-label" for="flexRadioDefault2">
                    Atrial Fibrillation
                  </label>
                </div>
                <div class="form-check mb-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    value="VPC"
                    v-model="noteMode"
                  />
                  <label class="form-check-label" for="flexRadioDefault2"> VPC </label>
                </div>
                <div class="form-check mb-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    value="BBB"
                    v-model="noteMode"
                  />
                  <label class="form-check-label" for="flexRadioDefault2"> BBB </label>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-check mb-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    value="Normal Sinus Rhythm"
                    v-model="noteMode"
                  />
                  <label class="form-check-label" for="flexRadioDefault1">
                    Normal Sinus Rhythm
                  </label>
                </div>
                <div class="form-check mb-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    value="UnKnown"
                    v-model="noteMode"
                  />
                  <label class="form-check-label" for="flexRadioDefault2">
                    Unknown
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="submit"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="cancelSelectionData()"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="saveData(tagMode)"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div
    class="modal fade"
    id="modifyModal"
    tabindex="-1"
    aria-labelledby="modifyModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modifyModalLabel">請選擇一個 Tag Mode</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <select
            class="form-select"
            size="3"
            aria-label="size 3 select example"
            v-model="reSelectedNote"
          >
            <option value="ST-E">ST-E</option>
            <option value="ST-D">ST-D</option>
            <option value="OMI">OMI</option>
            <option value="APC">APC</option>
            <option value="Atrial Fibrillation">Atrial Fibrillation</option>
            <option value="VPC">VPC</option>
            <option value="BBB">BBB</option>
            <option value="Normal Sinus Rhythm">Normal Sinus Rhythm</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="modifyData(reSelectedNote)"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div
    class="modal fade"
    id="deleteModal"
    tabindex="-1"
    aria-labelledby="deleteModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteModalLabel">刪除此段 Tag 資料</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="alert alert-danger" role="alert">
            請確認是否要刪除此段 Tag 資料？
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import SCICHART_LICENSE_KEY =
import { useRoute } from "vue-router";
import { computed, defineComponent, onMounted, ref, reactive, watchEffect } from "vue";
// import SciChart from "@/components/SciChart.vue";
import {
  dataInformation,
  showECGChart,
  diagnoses,
  getAnomalyModels,
  modelName,
  initSciChart,
  selectedPoints,
  SimpleDataPointSelectionModifier,
  noteMode,
  saveData,
  tagMode,
  showTagList,
  tagListData,
  tagList,
  cancelSelectionData,
  deleteData,
  modifyData
} from "@/composition/store";

export default {
  name: "Chart",
  setup() {
    const selected = ref("");
    const route = useRoute();
    const dataAnomalyList = reactive([
      JSON.parse(localStorage.getItem("selectedPoints"))
    ]);
    console.log(selectedPoints);
    // const tagNoteEvent = () => {
    //   // console.log(new SimpleDataPointSelectionModifier().addNote());
    //   new SimpleDataPointSelectionModifier().addNote();
    // };
    onMounted(async () => {
      console.log(`b`);
      await getAnomalyModels();
      await showECGChart(route.params.diagnosesid).catch((err) => {});
      console.log(`c`);
      initSciChart();
      await showTagList();
    });
    // const selectModel = value => {
    //   console.log(value);
    // };
    const selectModel = computed(() => {
      return selected.value;
    });

    // const resetSelectedPoints = computed(() => {
    //   // return selectedPoints;
    //   console.log(selectedPoints);
    // });
    // console.log(selectModel);
    watchEffect(async () => await console.log(selectedPoints));
    return {
      dataInformation,
      initSciChart,
      modelName,
      diagnoses,
      selected,
      selectModel,
      selectedPoints,
      SimpleDataPointSelectionModifier,
      noteMode,
      saveData,
      tagMode,
      showTagList,
      tagListData,
      tagList,
      cancelSelectionData,
      deleteData,
      modifyData
    };
  }
};
</script>

<style scoped>
.el-button + .el-button {
  margin-left: 0px;
}
</style>
