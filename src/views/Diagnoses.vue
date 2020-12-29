<template>
  <el-row 
    type="flex"
    justify="center">
    <el-col
    :span="16"
    >
      <h1>Diagnoses</h1>
      <el-table
      :data="tableData"
      stripe
      style="width: 1200px">
      <el-table-column
        prop="patientid"
        label="Patient ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="time"
        label="Time"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mesuretype"
        label="Measure Type">
      </el-table-column>
      <el-table-column
        prop="whomeasure"
        label="Who measures">
      </el-table-column>
      <el-table-column
        prop="tags"
        label="Tags">
      </el-table-column>
      <el-table-column
        prop="address"
        label="Delete">
        <i class="el-icon-delete"></i>
      </el-table-column>
    </el-table>
  </el-col>
  </el-row>
  <el-row
  type="flex"
  justify="end"
  >
    <el-col
    :span="12"
    >
      <el-pagination
      background
      layout="prev, pager, next"
      :total="1000">
      </el-pagination>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          patientid: '2466332',
          time: '2020/08/05, 15:18:52',
          mesuretype: 'still',
          whomeasure:'yuan',
          tags:'VPC,ST-E'
        }, {
          patientid: '2466332',
          time: '2020/08/05, 15:18:52',
          mesuretype: 'still',
          whomeasure:'yuan',
          tags:'VPC,ST-E'
        },{
          patientid: '2466332',
          time: '2020/08/05, 15:18:52',
          mesuretype: 'still',
          whomeasure:'yuan',
          tags:'VPC,ST-E'
        }, {
          patientid: '2466332',
          time: '2020/08/05, 15:18:52',
          mesuretype: 'still',
          whomeasure:'yuan',
          tags:'VPC,ST-E'
        },{
          patientid: '2466332',
          time: '2020/08/05, 15:18:52',
          mesuretype: 'still',
          whomeasure:'yuan',
          tags:'VPC,ST-E'
        },{
          patientid: '2466332',
          time: '2020/08/05, 15:18:52',
          mesuretype: 'still',
          whomeasure:'yuan',
          tags:'VPC,ST-E'
        },{
          patientid: '2466332',
          time: '2020/08/05, 15:18:52',
          mesuretype: 'still',
          whomeasure:'yuan',
          tags:'VPC,ST-E'
        },{
          patientid: '2466332',
          time: '2020/08/05, 15:18:52',
          mesuretype: 'still',
          whomeasure:'yuan',
          tags:'VPC,ST-E'
        },{
          patientid: '2466332',
          time: '2020/08/05, 15:18:52',
          mesuretype: 'still',
          whomeasure:'yuan',
          tags:'VPC,ST-E'
        },{
          patientid: '2466332',
          time: '2020/08/05, 15:18:52',
          mesuretype: 'still',
          whomeasure:'yuan',
          tags:'VPC,ST-E'
        }]
      }
    }
  }
</script>

<style lang="scss" scoped>


</style>