/* eslint-disable @typescript-eslint/camelcase */
<template>
  <el-row type="flex" justify="center">
    <el-col :span="16">
      <h1>Diagnoses</h1>
      <p>{{ count }}</p>
      <el-table :data="tableData" stripe style="width: 1200px">
        <el-table-column prop="diagnosis_id" label="Diagnosis ID" width="180">
        </el-table-column>
        <el-table-column
          prop="end_time"
          label="Time"
          width="180"
        ></el-table-column>
        <el-table-column prop="measure_type" label="Measure Type">
        </el-table-column>
        <el-table-column
          prop="whomeasure"
          label="Who measures"
        ></el-table-column>
        <el-table-column prop="notes" label="Tags"></el-table-column>
        <el-table-column prop="address" label="Delete">
          <i class="el-icon-delete"> </i>
        </el-table-column>
        <el-table-column label="按鈕操作" width="180">
          <template v-slot="scope">
            <el-button size="mini" type="primary" @click="showECGChart(scope.$index, scope.row)">顯示 ECG</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  <el-row type="flex" justify="end">
    <el-col :span="12">
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>
    </el-col>
  </el-row>
</template>

<script>
import { count, tableData } from "@/composition/store";
import { requestDiagnoses, showECGChart } from "@/composition/store";
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
      showECGChart,
      handleDelete
    };
  }
};
</script>

<style lang="scss" scoped></style>
