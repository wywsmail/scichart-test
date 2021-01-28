<template>
  <h1>Chart</h1>
  <input
    type="button"
    @click.prevent="getSingleDiagnoses"
    value="getSingleDiagnoses"
  />
  <HelloWorld />
</template>

<script lang="ts">
import HelloWorld from "@/components/HelloWorld.vue";
import { getSingleDiagnoses } from "@/composition/store";
// import { onMounted } from "vue";
export default {
  name: "Chart",
  components: {
    HelloWorld
  },
  setup() {
    // onMounted(() => {
    //   getSingleDiagnoses();
    //   //   console.log(tempDiagnoses.data.data);
    //   //   // console.log(tempDiagnoses.data.data.create_data);
    //   //   console.log("Chart 頁面");
    //   //   console.log("有成功嗎？");
    // });
    // console.log(tempDiagnoses.data.data);
    // console.log(tempDiagnoses.data.data.medical_id);
    // console.log("Chart 頁面");
    // console.log("有成功嗎？");
    return { getSingleDiagnoses };
  }
};
</script>

<style scoped></style>
