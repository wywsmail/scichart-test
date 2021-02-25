<template>
  <h1>Chart</h1>
  <SciChart />
  <!-- <SciChart2 /> -->
</template>

<script lang="ts">
import SciChart from "@/components/SciChart.vue";
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
    return {};
  }
};
</script>

<style scoped></style>
