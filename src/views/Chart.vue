<template>
  <h1>Chart</h1>
  <HelloWorld />
</template>

<script lang="ts">
import HelloWorld from "@/components/HelloWorld.vue";
import { tempDiagnoses, requestDiagnoses } from "@/composition/store";
import { onMounted } from "vue";
export default {
  name: "Chart",
  components: {
    HelloWorld,
  },
  setup() {
    onMounted(() => {
      requestDiagnoses();
      //   console.log(tempDiagnoses.data.data);
      //   // console.log(tempDiagnoses.data.data.create_data);
      //   console.log("Chart 頁面");
      //   console.log("有成功嗎？");
    });
    console.log(tempDiagnoses.data.data);
    // console.log(tempDiagnoses.data.data.medical_id);
    // console.log("Chart 頁面");
    // console.log("有成功嗎？");
  },
};
</script>

<style scoped></style>
