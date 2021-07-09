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
  // getAnomalyModels,
  // modelName,
  // initSciChart,
  selectedPoints,
  // SimpleDataPointSelectionModifier,
  // noteMode,
  tagMode,
  // showTagList,
  tagListData,
  tagList
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
    const { showECGChart } = useShowECGChart();
    const { showTagList } = useShowTagList();
    const { initSciChart } = useInitSciChart();

    const route = useRoute();
    onMounted(async () => {
      await showECGChart(route.params.diagnosesid);
      initSciChart();
      await showTagList();
      window.addEventListener("keydown", (e) => {
        e.preventDefault();
        if (e.keyCode === 32) {
          isChecked.value = !isChecked.value;
          console.log(isChecked.value);
        }
      });
    });
    return {
      // dataInformation,
      initSciChart,
      // modelName,
      diagnoses,
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
