/* eslint-disable @typescript-eslint/camelcase */
<template>
  <div class="container">
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Time</th>
          <th scope="col">HR</th>
          <th scope="col">Gain</th>
          <th scope="col">Device</th>
          <th scope="col">MAC</th>
          <th scope="col">Location-lat</th>
          <th scope="col">Location-lng</th>
          <th scope="col">按鈕操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tableData.data" :key="item.diagnosis_id">
          <th>{{ item.diagnosis_id }}</th>
          <td>{{ item.start_time }}</td>
          <td>{{ item.hr_last }}</td>
          <td>{{ item.gain }}</td>
          <td>{{ item.device_id }}</td>
          <td>{{ item.mac_address }}</td>
          <td>{{ item.latitude }}</td>
          <td>{{ item.longitude }}</td>
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
import { useRequestDiagnoses } from "@/composition/index";
import { tableData } from "@/composition/store";
import { onMounted } from "vue";

export default {
  setup() {
    const { requestDiagnoses, getECGChart } = useRequestDiagnoses();
    onMounted(() => {
      requestDiagnoses();
    });
    return {
      tableData,
      getECGChart
    };
  }
};
</script>

<style scoped></style>
