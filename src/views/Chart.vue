<template>
  <h1>Chart</h1>
  <HelloWorld />
</template>

<script lang="ts">
import HelloWorld from "@/components/HelloWorld.vue";
import { tempDiagnoses, apiRequestDiagnoses } from "@/composition/store";
import { onMounted } from "vue";
export default {
  name: "Chart",
  components: {
    HelloWorld,
  },
  setup() {
    onMounted(() => {
      apiRequestDiagnoses();
      console.log(tempDiagnoses);
    });
  },
};
</script>

<style scoped></style>
