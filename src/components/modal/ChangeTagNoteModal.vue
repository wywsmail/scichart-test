<template>
  <div
    class="modal fade"
    id="modifyModal"
    tabindex="-1"
    aria-labelledby="modifyModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modifyModalLabel">請重新選擇一個 Tag Mode</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <select
            class="form-select"
            size="3"
            aria-label="size 3 select example"
            v-model="reSelectedNote"
          >
            <option value="ST-E">ST-E</option>
            <option value="ST-D">ST-D</option>
            <option value="OMI">OMI</option>
            <option value="APC">APC</option>
            <option value="Atrial Fibrillation">Atrial Fibrillation</option>
            <option value="VPC">VPC</option>
            <option value="BBB">BBB</option>
            <option value="Normal Sinus Rhythm">Normal Sinus Rhythm</option>
            <option value="Unknown">Unknown</option>
          </select>
          <h5 class="modal-title text-start" id="modifyModalLabel">
            請重新選擇一個 Channel
          </h5>
          <select
            class="form-select"
            size="3"
            aria-label="size 3 select example"
            v-model="reSelectedChannel"
          >
            <option value="0">LEAD 1</option>
            <option value="1">LEAD 2</option>
            <option value="2">LEAD 3</option>
            <option value="3">aVR</option>
            <option value="4">aVL</option>
            <option value="5">aVF</option>
          </select>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            id="id"
            @click="modifyData(tagDataShow, reSelectedNote, reSelectedChannel)"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useModalFn } from "@/composition/index";
import { tagDataShow } from "@/composition/store";
export default {
  setup() {
    const { modifyData } = useModalFn();
    return { modifyData, tagDataShow };
  }
};
</script>
