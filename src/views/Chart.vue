<template>
  <h1>Chart</h1>
  <ul>
    <li>{{ dataInformation[0] }}</li>
    <li>{{ dataInformation[1] }}</li>
    <li>{{ dataInformation[2] }}</li>
    <li>{{ dataInformation[3] }}</li>
    <li>{{ dataInformation[4] }}</li>
  </ul>
  <SciChart />
  <!-- <SciChart2 /> -->
</template>

<script lang="ts">
import { onMounted } from "vue";
import SciChart from "@/components/SciChart.vue";
import { dataInformation, diagnoses, showECGChart } from "@/composition/store";
// import test from "@/components/test.vue";
// import SciChart2 from "@/components/SciChart2.vue";
export default {
  name: "Chart",
  components: {
    SciChart
    // test
    // SciChart2
  },
  setup() {
    console.log(dataInformation.value);
    console.log(diagnoses.value);
    onMounted(() => {
      showECGChart();
    });
    return { dataInformation };
  }
};
</script>

<style scoped></style>
