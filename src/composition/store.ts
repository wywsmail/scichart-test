/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/camelcase */

// About interface

interface Iapidata<T> {
  // length: number;
  data: T;
}

interface TDataPoint {
  // index: number;
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

export const dbNum = ref("v2");
// export const dbNum = ref(JSON.parse(localStorage.getItem("dbNum")));

export const tableData = reactive({
  data: []
});
// export const 
export const role = localStorage.getItem("role") ?? ref("");
export const diagnoses: Iapidata<object> = reactive({
  data: [],
  length
});
export const diagnosesUpdate = computed(() => {
  return diagnoses;
});

export const anomalyData = reactive({ data: [] });

export const countNumber = ref(0);

export const rows = ref([]);
export const colums = ref([
  {
    label: "Patient ID",
    field: "patient_id"
  },
  {
    label: "Time",
    field: "datetime"
  },
  {
    label: "Measure Type",
    field: "measure_type"
  },
  {
    label: "Who measures",
    field: "measure_person"
  },
  {
    label: "Tags",
    field: "tagged"
  },
  {
    label: "",
    field: "delete"
  }
]);

export const scichartRoot = document.getElementById("scichart-root");
export const numberOfElements = ref(0);


export const anomalyMode = ref(false);
export const anomalySequence = ref([]);
export const evaluationTags = ref([]);
export const anomalyModels = ref([]);

export const selectedPoints: TDataPoint[][] = reactive([]);
// export const selectedPoints: any = reactive([]);
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
console.log(selectTagData.data);
export const tagDataShow = computed(() => {
  return selectTagData.data;
});
// export const isEnabled = ref(false);
// export const isChecked = computed(() => isEnabled.value);
export const isChecked = ref(false);
export const isActive = computed(() => {
  return isChecked.value;
});
