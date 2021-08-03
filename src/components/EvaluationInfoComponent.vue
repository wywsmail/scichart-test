<template>
  <div class="col-12 col-md-6">
    <div class="card">
      <h5 class="card-header">Evaluation Information</h5>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Channel Name</th>
              <th scope="col">Time</th>
              <th scope="col">Evaluator</th>
              <th scope="col">Note</th>
              <th scope="col" class="d-none d-xl-table-cell">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in evaluationTagDataShow" :key="i">
              <th v-if="item.channel === '5'">avF</th>
              <th v-else-if="item.channel === '4'">aVL</th>
              <th v-else-if="item.channel === '3'">aVR</th>
              <th v-else-if="item.channel === '2'">LEAD 3</th>
              <th v-else-if="item.channel === '1'">LEAD 2</th>
              <th v-else-if="item.channel === '0'">LEAD 1</th>
              <th v-else></th>
              <td v-if="item.x1">
                {{ (item.x1 / 250).toFixed(2) }}s ~ {{ (item.x2 / 250).toFixed(2) }}s
              </td>
              <td v-else></td>
              <td>{{ item.evaluator }}</td>
              <td>{{ item.evaluation }}</td>
              <td class="d-none d-xl-table-cell">
                <a
                  href="#"
                  class="btn btn-primary me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#modifyEvaluationDataModal"
                  data-bs-whatever="id"
                  >編輯</a
                >
                <a
                  href="#"
                  class="btn btn-danger me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteEvaluationModal"
                  >刪除(停用)</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { evaluationTagDataShow } from "@/composition/store";
export default {
  setup() {
    return { evaluationTagDataShow };
  }
};
</script>
