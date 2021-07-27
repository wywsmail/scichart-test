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
          <td>{{ item.measures[0].heart_rate[29] }}</td>
          <td>{{ item.gain }}</td>
          <td>{{ item.device_id }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { diagnoses } from "@/composition/store";

export default {
  setup() {
    return {
      diagnoses
    };
  }
};
</script>
