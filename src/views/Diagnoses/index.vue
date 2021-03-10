/* eslint-disable @typescript-eslint/camelcase */
<template>
  <el-row type="flex" justify="center">
    <el-col :span="16">
      <h1>Diagnoses</h1>
      <p>{{ count }}</p>
      <el-table :data="tableData.data" stripe style="width: 1200px">
        <el-table-column prop="diagnosis_id" label="ID" width="180"> </el-table-column>
        <el-table-column prop="start_time" label="Time" width="180"> </el-table-column>
        <el-table-column prop="hr_last" label="HR"></el-table-column>
        <el-table-column prop="gain" label="Gain"></el-table-column>
        <el-table-column prop="device_id" label="Device"></el-table-column>
        <el-table-column prop="mac_address" label="MAC"></el-table-column>
        <el-table-column prop="longitude" label="Location">
          <el-table-column prop="latitude" label="lat"></el-table-column>
          <el-table-column prop="longitude" label="lng"></el-table-column>
        </el-table-column>
        <el-table-column label="按鈕操作" width="180">
          <template v-slot="scope">
            <el-button
              size="mini"
              type="primary"
              @click="getECGChart(scope.$index, scope.row)"
              >顯示 ECG</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
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
import { count, tableData, requestDiagnoses, getECGChart } from "@/composition/store";
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
      count,
      tableData,
      getECGChart,
      handleDelete
    };
  }
};
</script>

<style lang="scss" scoped></style>
