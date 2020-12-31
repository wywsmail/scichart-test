<template>
  <h1>Chart</h1>
  <HelloWorld />
</template>

<script lang="ts">
import HelloWorld from "@/components/HelloWorld.vue";
import { apiRequestDiagnoses } from "@/composition/store";
import { onMounted } from "vue";
export default {
  name: "Chart",
  components: {
    HelloWorld,
  },
  setup() {
    onMounted(() => {
      apiRequestDiagnoses();
    });
  },
};
</script>

<style scoped></style>
