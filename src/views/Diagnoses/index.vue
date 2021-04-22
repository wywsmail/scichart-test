/* eslint-disable @typescript-eslint/camelcase */
<template>
  <el-row type="flex" justify="center">
    <el-col :span="16">
      <h1>Diagnoses</h1>
      <el-table :data="tableData.data" stripe style="width:100%;">
        <el-table-column prop="diagnosis_id" label="ID"></el-table-column>
        <el-table-column prop="start_time" label="Time"></el-table-column>
        <el-table-column prop="hr_last" label="HR"></el-table-column>
        <el-table-column prop="gain" label="Gain"></el-table-column>
        <el-table-column prop="device_id" label="Device"></el-table-column>
        <el-table-column prop="mac_address" label="MAC"></el-table-column>
        <el-table-column prop="longitude" label="Location">
          <el-table-column prop="latitude" label="lat"></el-table-column>
          <el-table-column prop="longitude" label="lng"></el-table-column>
        </el-table-column>
        <el-table-column label="按鈕操作">
          <template v-slot="scope">
            <el-button
              size="mini"
              type="primary"
              @click="getECGChart(scope.$index, scope.row)"
              >顯示 ECG</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  <el-row type="flex" justify="end">
    <el-col :span="12">
      <el-pagination background layout="prev, pager, next" :total="1000"> </el-pagination>
    </el-col>
  </el-row>
</template>

<script>
import { tableData, requestDiagnoses, getECGChart } from "@/composition/store";
import { onMounted } from "vue";

export default {
  setup() {
    onMounted(() => {
      requestDiagnoses();
    });
    const handleDelete = (index, row) => {
      console.log(index, row.diagnosis_id);
    };
    return {
      tableData,
      getECGChart,
      handleDelete
    };
  }
};
</script>

<style scoped>
*{
  box-sizing: border-box;
}
</style>
