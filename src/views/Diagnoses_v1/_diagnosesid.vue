<template>
  <EvaluationMode />
  <ChartInfo />
  <div class="container">
    <div class="row">
      <TagInfo />
      <EvaluationInfo />
    </div>
  </div>
  <SciChart />
  <!-- <TagListTable /> -->
  <TagNoteModal />
  <ChangeTagNoteModal />
  <DeleteTagNoteModal />
  <DeleteEvaluationTagModal />
  <ModifyEvaluationTagModal />
</template>

<script>
// import Components
import ChartInfo from "@/components/ChartInfoComponent";
import TagListTable from "@/components/TagListTableComponent";
import SciChart from "@/components/SciChartComponent";
import TagNoteModal from "@/components/modal/TagNoteModal";
import ChangeTagNoteModal from "@/components/modal/ChangeTagNoteModal";
import DeleteTagNoteModal from "@/components/modal/DeleteTagNoteModal";
import EvaluationMode from "@/components/EvaluationComponent";
import TagInfo from "@/components/TagInfoComponent";
import EvaluationInfo from "@/components/EvaluationInfoComponent";
import DeleteEvaluationTagModal from "@/components/modal/DeleteEvaluationTagModal";
import ModifyEvaluationTagModal from "@/components/modal/ModifyEvaluationTagModal";
// import Vue
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import {
  isChecked,
  diagnoses,
  selectedPoints,
  tagMode,
  tagListData,
  tagList
} from "@/composition/store";
import { useShowECGChart, useInitSciChart } from "@/composition/index";

export default {
  components: {
    ChartInfo,
    TagListTable,
    SciChart,
    TagNoteModal,
    ChangeTagNoteModal,
    DeleteTagNoteModal,
    EvaluationMode,
    TagInfo,
    EvaluationInfo,
    DeleteEvaluationTagModal,
    ModifyEvaluationTagModal
  },
  setup() {
    const { showECGChart } = useShowECGChart();
    const { initSciChart } = useInitSciChart();

    const route = useRoute();
    onMounted(async () => {
      await showECGChart(route.params.diagnosesid);
      initSciChart();
      window.addEventListener("keydown", e => {
        e.preventDefault();
        if (e.keyCode === 32) {
          isChecked.value = !isChecked.value;
          console.log(isChecked.value);
        }
      });
    });
    return {
      initSciChart,
      diagnoses,
      selectedPoints,
      tagMode,
      tagListData,
      tagList
    };
  }
};
</script>

<style scoped></style>
