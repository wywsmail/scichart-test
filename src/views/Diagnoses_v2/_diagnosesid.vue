<template>
  <EvaluationMode />
  <ChartInfo />
  <TagInfo />
  <SciChart />
  <TagListTable />
  <TagNoteModal />
  <ChangeTagNoteModal />
  <DeleteTagNoteModal />
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
// import Vue
import { useRoute } from "vue-router";
import { onMounted, computed } from "vue";
// import store
// import { store } from "@/composition/index";
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
  isActive
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
    TagInfo
  },
  setup() {
    const { showECGChart, showTagRange } = useShowECGChart();
    const { showTagList } = useShowTagList();
    const { initSciChart, changeSwitch, test } = useInitSciChart();

    const route = useRoute();
    // const switchToggle = (e) => {
    //   e.preventDefault();
    //   if (e.keyCode === 32) {
    //     console.log(e);
    //     isChecked.value = !isChecked.value;
    //     console.log(e.keyCode);
    //     console.log(isActive.value);
    // test();
    // test.test2();
    // initSciChart().changeSwitch();
    //   }
    // };
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
      tagList
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
