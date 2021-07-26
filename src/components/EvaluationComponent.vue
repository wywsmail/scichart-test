<template>
  <div class="container">
    <div class="row justify-content-end mt-3">
      <div class="col-2">
        <select
          v-model="selectedModelName"
          placeholder="請選擇 Model"
          class="form-select"
          aria-label="Default select example"
        >
          <option value="" selected disabled>Select Model</option>
          <option v-for="item in modelName" :key="item.value" :value="item.value">
            {{ item.label }}
          </option>
        </select>
      </div>
      <div class="col-2">
        <div
          class="btn btn-primary"
          @click="activeEvaluationMode(selectedModelName, diagnoses.data[0].diagnosis_id)"
          tabindex="-1"
        >
          Evaluation Mode
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted } from "vue";
import { diagnoses, selectedModelName } from "@/composition/store";
import { useEvaluationMode } from "@/composition/index";
// import { diagnoses } from "@/composition/store";
// import { ref } from "vue";
export default {
  setup() {
    const {
      modelName,
      activeEvaluationMode,
      getAnomalyModels
    } = useEvaluationMode();
    onMounted(async () => {
      await getAnomalyModels();
    });
    return {
      modelName,
      selectedModelName,
      activeEvaluationMode,
      diagnoses,
      getAnomalyModels
    };
  }
};
</script>
