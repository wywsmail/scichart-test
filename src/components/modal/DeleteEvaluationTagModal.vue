/* eslint-disable vue/no-parsing-error */
<template>
  <div
    class="modal fade"
    id="deleteEvaluationModal"
    tabindex="-1"
    aria-labelledby="deleteEvaluationModal"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteEvaluationModal">刪除此段 Evaluation Tag 資料</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="alert alert-danger" role="alert">
            請確認是否要刪除此段 Evaluation Tag 資料？
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="deleteEvaluationData(evaluationTagDataShow)"
            data-bs-dismiss="modal"
            tabindex="-1"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useModalFn } from "@/composition/index";
import { evaluationTagDataShow } from "@/composition/store";
export default {
  setup() {
    const { deleteEvaluationData } = useModalFn();
    return { deleteEvaluationData, evaluationTagDataShow };
  }
};
</script>
