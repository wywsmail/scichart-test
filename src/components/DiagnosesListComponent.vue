/* eslint-disable @typescript-eslint/camelcase */
<template>
  <div class="container">
    <nav class="navbar navbar-light">
      <div class="container-fluid justify-content-between">
        <h4>資料總筆數:{{ countNumber }}</h4>
        <form class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            placeholder="請填入欲搜尋之 ID"
            aria-label="Search"
            v-model="searchID"
          />
          <button
            class="btn btn-outline-success"
            type="submit"
            @click="showECGChart(searchID)"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">ID</th>
          <th scope="col">Time</th>
          <th scope="col">HR</th>
          <th scope="col">Gain</th>
          <th scope="col">Device</th>
          <th scope="col">MAC</th>
          <th scope="col">Location-lat</th>
          <th scope="col">Location-lng</th>
          <th scope="col">Tags</th>
          <th scope="col">按鈕操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tableData.data" :key="item.diagnosis_id">
          <th>{{ item.index }}</th>
          <td>{{ item.diagnosis_id }}</td>
          <td>{{ item.start_time }}</td>
          <td>{{ item.hr_last }}</td>
          <td>{{ item.gain }}</td>
          <td>{{ item.device_id }}</td>
          <td>{{ item.mac_address }}</td>
          <td>{{ item.latitude }}</td>
          <td>{{ item.longitude }}</td>
          <td>
            {{ item.notes }}
          </td>
          <td>
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click="getECGChart(item.diagnosis_id)"
            >
              顯示 ECG
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useRequestDiagnoses, useShowECGChart } from "@/composition/index";
import { tableData } from "@/composition/store";
import { onMounted } from "vue";

export default {
  setup() {
    const {
      requestDiagnoses,
      getECGChart,
      diagnosesSearch,
      dataCounts,
      countNumber
    } = useRequestDiagnoses();
    const { showECGChart } = useShowECGChart();
    onMounted(() => {
      requestDiagnoses();
      dataCounts();
    });
    return {
      tableData,
      getECGChart,
      diagnosesSearch,
      countNumber,
      showECGChart
    };
  }
};
</script>

<style scoped></style>
