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
      <el-table :data="diagnoses.data" id="diagnosesTagList">
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
  <div style="margin: 10px">
    <!-- <input type="checkbox" id="enable-pan" />
    <label for="enable-pan">Enable Tag Mode</label><br /> -->
    <!-- <input type="checkbox" id="enable-zoom" />
    <label for="enable-zoom">Enable Mouse-Drag to Zoom</label><br />
    <input type="checkbox" id="enable-range-select" />
    <label for="enable-range-select">Enable Range Select</label><br />
    <input type="checkbox" id="enable-zoom-to-fit" checked />
    <label for="enable-zoom-to-fit">Enable Double-Click to Zoom to Fit</label><br />
    <input type="checkbox" id="enable-mouse-wheel-zoom" checked />
    <label for="enable-mouse-wheel-zoom">Enable Mousewheel Zoom</label><br /> -->
  </div>
  <el-button-group style="display: none">
    <el-button type="primary" icon="el-icon-arrow-left">上一页</el-button>
    <el-button type="primary"
      >下一页<i class="el-icon-arrow-right el-icon--right"></i
    ></el-button>
  </el-button-group>
  <br />
  <!-- <el-row type="flex" justify="start" align="top">
    <el-col :span="2">
      <button type="button" class="btn btn-primary">標記備註</button>
    </el-col>
    <el-col :span="2">
      <button type="button" class="btn btn-primary">EvaluationMode</button>
    </el-col>
    <el-col :span="6">
      <button type="button" class="btn btn-primary">Change Model / Update</button>
    </el-col>
  </el-row> -->
  <el-row type="flex" justify="center">
    <el-col :span="6">
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="tag-mode" />
        <label class="form-check-label" for="tag-mode">Enable Tag Mode</label>
      </div>
    </el-col>
    <el-col :span="6">
      <select
        v-model="selected"
        placeholder="請選擇 Model"
        class="form-select"
        aria-label="Default select example"
      >
        <option v-for="item in modelName" :key="item.value" :value="item.value">
          {{ item.label }}
        </option>
      </select>
      <span>選項：{{ selected }}</span>
    </el-col>
  </el-row>
  <el-row type="flex" justify="center">
    <el-col :span="16">
      <div id="scichart-root" style="width: 100%; height: 800px; margin: auto"></div>
    </el-col>
  </el-row>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
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
                  />
                  <label class="form-check-label" for="flexRadioDefault2"> ST-E </label>
                </div>
                <div class="form-check mb-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                  />
                  <label class="form-check-label" for="flexRadioDefault2"> ST-D </label>
                </div>
                <div class="form-check mb-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
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
                  />
                  <label class="form-check-label" for="flexRadioDefault2"> APC </label>
                </div>
                <div class="form-check mb-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
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
                  />
                  <label class="form-check-label" for="flexRadioDefault2"> VPC </label>
                </div>
                <div class="form-check mb-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
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
                  />
                  <label class="form-check-label" for="flexRadioDefault2"> Noise </label>
                </div>
                <div class="form-check mb-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
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
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="new SimpleDataPointSelectionModifier().cancelSelectionData()"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
  <!-- <div id="result" style="white-space: pre"></div> -->
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
  login,
  SimpleDataPointSelectionModifier
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
      SimpleDataPointSelectionModifier
      // tagNoteEvent
    };
  }
};
</script>

<style scoped>
.el-button + .el-button {
  margin-left: 0px;
}
</style>
