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
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col" class="d-none d-lg-table-cell">ID</th>
            <th scope="col">Time</th>
            <th scope="col" class="d-none d-lg-table-cell">HR</th>
            <th scope="col">Gain</th>
            <th scope="col" class="d-none d-lg-table-cell">Device</th>
            <th scope="col" class="d-none d-lg-table-cell">MAC</th>
            <th scope="col" class="d-none d-lg-table-cell">Location-lat</th>
            <th scope="col" class="d-none d-lg-table-cell">Location-lng</th>
            <th scope="col" class="d-none d-md-table-cell">Tags</th>
            <th scope="col">按鈕操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in tableData.data" :key="item.diagnosis_id">
            <th>{{ item.index }}</th>
            <td class="d-none d-lg-table-cell">{{ item.diagnosis_id }}</td>
            <td>{{ item.start_time }}</td>
            <td class="d-none d-lg-table-cell">{{ item.hr_last }}</td>
            <td>{{ item.gain }}</td>
            <td class="d-none d-lg-table-cell">{{ item.device_id }}</td>
            <td class="d-none d-lg-table-cell">{{ item.mac_address }}</td>
            <td class="d-none d-lg-table-cell">{{ item.latitude }}</td>
            <td class="d-none d-lg-table-cell">{{ item.longitude }}</td>
            <td class="d-none d-md-table-cell">
              {{ item.notes }}
            </td>
            <td>
              <router-link
                v-if="dbNum === 'v1'"
                :to="{
                  name: 'diagnosesChart_v1',
                  params: { diagnosesid: item.diagnosis_id }
                }"
                target="_blank"
                class="btn btn-outline-primary btn-sm"
                >顯示 ECG(v1)</router-link
              >
              <router-link
                v-else
                :to="{
                  name: 'diagnosesChart_v2',
                  params: { diagnosesid: item.diagnosis_id }
                }"
                target="_blank"
                class="btn btn-outline-primary btn-sm"
                >顯示 ECG(v2)</router-link
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { useRequestDiagnoses, useShowECGChart } from "@/composition/index";
import { tableData, page } from "@/composition/store";
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
      requestDiagnoses(page.value);
      dataCounts();
    });
    const dbNum = localStorage.getItem("dbNum");
    return {
      tableData,
      getECGChart,
      diagnosesSearch,
      countNumber,
      showECGChart,
      dbNum
    };
  }
};
</script>

<style scoped></style>
