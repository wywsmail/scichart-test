/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/camelcase */

// About interface

interface Iapidata<T> {
  data: T;
}

interface TDataPoint {
  x1Value: number;
  x2Value: number;
  y1Value: number;
  y2Value: number;
}

interface TNote {
  id: string;
  diagnosis_id: string;
  x1: string;
  x2: string;
  channel: string;
  note: string;
}

import { reactive, ref, computed } from "vue";

export const token = localStorage.getItem("token") || ref(null);
export const isLogin = ref(JSON.parse(localStorage.getItem("isLogin")));
export const page = ref(1);
export const dbNum = ref("v2");

export const tableData = reactive({
  data: []
});

export const role = localStorage.getItem("role") ?? ref("");
export const diagnoses: Iapidata<object> = reactive({
  data: [],
  length
});

export const selectedModelName = ref("");

export const anomalyData = reactive({ data: [] });
export const evaluationData = reactive({ data: [] });
export const filterAnomalyData = reactive([]);

export const countNumber = ref(0);

export const anomalyMode = ref(false);
export const anomalySequence = ref([]);
export const evaluationTags = ref([]);
export const anomalyModels = ref([]);

export const selectedPoints: TDataPoint[][] = reactive([]);
export const noteMode = ref("ST-E");
export const tagMode = computed(() => {
  return noteMode.value;
});
export const tagListData: any = reactive({
  data: []
});
export const tagList = computed(() => {
  return tagListData;
});
export const selectTagData: any = reactive({
  data: [
    {
      index: 0,
      channel: "",
      created_at: "",
      diagnosis_id: "",
      note: "",
      x1: "",
      x2: ""
    }
  ]
});
export const tagDataShow = computed(() => {
  return selectTagData.data;
});

export const evaluationTagData: any = reactive({
  data: [
    {
      channel: 0,
      evaluator: "",
      evaluation: "",
      model_name: "",
      x1: 0,
      x2: 0
    }
  ]
});
export const evaluationTagDataShow = computed(() => {
  return evaluationTagData.data;
});

export const isChecked = ref(false);
export const isActive = computed(() => {
  return isChecked.value;
});
