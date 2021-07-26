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
  <TagListTable />
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
import DeleteEvaluationTagModal from "@/components/modal/DeleteEvaluationTagModal";
import EvaluationMode from "@/components/EvaluationComponent";
import TagInfo from "@/components/TagInfoComponent";
import EvaluationInfo from "@/components/EvaluationInfoComponent";
import ModifyEvaluationTagModal from "@/components/modal/ModifyEvaluationTagModal";
// import Vue
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import {
  // dataInformation,
  // showECGChart,
  isChecked,
  diagnoses,
  diagnosesUpdate,
  // getAnomalyModels,
  // modelName,
  // initSciChart,
  selectedPoints,
  // SimpleDataPointSelectionModifier,
  // noteMode,
  tagMode,
  // showTagList,
  tagListData,
  tagList,
  scichartRoot,
  isActive,
  dbNum
  // saveData,
  // deleteData,
  // modifyData,
  // selectTagData,
  // tagDataShow
} from "@/composition/store";
import { useShowECGChart, useShowTagList, useInitSciChart } from "@/composition/index";

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
    const { showECGChart, showTagRange } = useShowECGChart();
    const { showTagList } = useShowTagList();
    const { initSciChart, changeSwitch, test } = useInitSciChart();
    const router = useRoute();
    const backToDiagnosesList = () => {
      // const router = useRoute();
      // window.setTimeout(() => {
      console.log(router);
      console.log("OK");
      router.push(`Diagnoses_${dbNum}`);
      //   router.push({
      //     // name: "Diagnoses_v2"
      //     name: `Diagnoses_${dbNum}`
      //   });
      // }, 1000);
      // router.push({ name: `Diagnoses_${dbNum}` });
      // router.push(`Diagnoses_${dbNum}`);
    };

    const route = useRoute();
    onMounted(async () => {
      document.querySelector("body").addEventListener("keydown", (e) => {
        e.preventDefault();
        document.querySelector("#tag-mode").focus();
        if (e.keyCode === 32) {
          changeSwitch();
          console.log("keyBoard");
        }
      });
      // document.querySelector("#tag-mode").addEventListener("change", (e) => {
      //   console.log(e);
      //   changeSwitch();
      //   console.log("mouse");
      // });
      await showECGChart(route.params.diagnosesid);
      initSciChart();
      await showTagList();
      await showTagRange();
      console.log("有成功嗎？");
    });
    return {
      // dataInformation,
      initSciChart,
      // modelName,
      diagnoses,
      diagnosesUpdate,
      // selected,
      selectedPoints,
      // noteMode,
      tagMode,
      showTagList,
      tagListData,
      tagList,
      backToDiagnosesList
      // getAnomalyModels
      // saveData,
      // deleteData,
      // modifyData,
      // selectTagData,
      // tagDataShow
    };
  }
};
</script>

<style scoped></style>
