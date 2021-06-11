<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">請選擇 Tag Note 類型</h5>
          <button
            id="cancelSelectButton-1"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-4">
                <div class="form-check mb-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    checked
                    value="ST-E"
                    v-model="noteMode"
                  />
                  <label class="form-check-label" for="flexRadioDefault2"> ST-E </label>
                </div>
                <div class="form-check mb-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    value="ST-D"
                    v-model="noteMode"
                  />
                  <label class="form-check-label" for="flexRadioDefault2"> ST-D </label>
                </div>
                <div class="form-check mb-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    value="OMI"
                    v-model="noteMode"
                  />
                  <label class="form-check-label" for="flexRadioDefault2"> OMI </label>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-check mb-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    value="APC"
                    v-model="noteMode"
                  />
                  <label class="form-check-label" for="flexRadioDefault2"> APC </label>
                </div>
                <div class="form-check mb-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    value="Atrial Fibrillation"
                    v-model="noteMode"
                  />
                  <label class="form-check-label" for="flexRadioDefault2">
                    Atrial Fibrillation
                  </label>
                </div>
                <div class="form-check mb-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    value="VPC"
                    v-model="noteMode"
                  />
                  <label class="form-check-label" for="flexRadioDefault2"> VPC </label>
                </div>
                <div class="form-check mb-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    value="BBB"
                    v-model="noteMode"
                  />
                  <label class="form-check-label" for="flexRadioDefault2"> BBB </label>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-check mb-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    value="Normal Sinus Rhythm"
                    v-model="noteMode"
                  />
                  <label class="form-check-label" for="flexRadioDefault1">
                    Normal Sinus Rhythm
                  </label>
                </div>
                <div class="form-check mb-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    value="UnKnown"
                    v-model="noteMode"
                  />
                  <label class="form-check-label" for="flexRadioDefault2">
                    Unknown
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="submit"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            id="cancelSelectButton-2"
          >
            Cancel
          </button>
          <button
            id="saveSelectButton"
            type="submit"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="saveData(noteMode)"
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
import { noteMode } from "@/composition/store";
export default {
  setup() {
    const { saveData } = useModalFn();
    return { noteMode, saveData };
  }
};
</script>
