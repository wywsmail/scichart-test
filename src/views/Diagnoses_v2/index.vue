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
// import TagListTable from "@/components/TagListTableComponent";
import SciChart from "@/components/SciChartComponent";
import TagNoteModal from "@/components/modal/TagNoteModal";
import ChangeTagNoteModal from "@/components/modal/ChangeTagNoteModal";
import DeleteTagNoteModal from "@/components/modal/DeleteTagNoteModal";
import DeleteEvaluationTagModal from "@/components/modal/DeleteEvaluationTagModal";
import EvaluationMode from "@/components/EvaluationComponent";
import TagInfo from "@/components/TagInfoComponent";
import EvaluationInfo from "@/components/EvaluationInfoComponent";
import ModifyEvaluationTagModal from "@/components/modal/ModifyEvaluationTagModal";
// import Vue
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import {
  diagnoses,
  selectedPoints,
  tagMode,
  tagListData,
  tagList,
  dbNum,
  isChecked
} from "@/composition/store";
import { useShowECGChart, useInitSciChart } from "@/composition/index";

export default {
  components: {
    ChartInfo,
    // TagListTable,
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
    const { showECGChart, showTagRange } = useShowECGChart();
    const { initSciChart, changeSwitch } = useInitSciChart();
    const router = useRoute();
    const backToDiagnosesList = () => {
      console.log(router);
      router.push(`Diagnoses_${dbNum}`);
    };

    const route = useRoute();
    onMounted(async () => {
      // document.querySelector("body").addEventListener("keydown", (e) => {
      //   e.preventDefault();
      //   document.querySelector("#tag-mode").focus();
      //   if (e.keyCode === 32) {
      //     // changeSwitch();
      //     isChecked.value = !isChecked.value;
      //     console.log(isChecked.value);
      //   }
      // });
      await showECGChart(route.params.diagnosesid);
      initSciChart();
      await showTagRange();
      // document
      //   .querySelector("#tag-mode")
      //   .focus()
      //   .addEventListener("keydown", (e) => {
      //     console.log(e.keyCode);
      //     e.preventDefault();
      //     if (e.keyCode === 32) {
      //       isChecked.value = !isChecked.value;
      //       console.log(isChecked.value);
      //     }
      //   });
    });
    return {
      initSciChart,
      diagnoses,
      selectedPoints,
      tagMode,
      tagListData,
      tagList,
      backToDiagnosesList
    };
  }
};
</script>

<style scoped></style>
