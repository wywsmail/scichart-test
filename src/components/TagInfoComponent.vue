<template>
  <div class="col-12 col-md-6">
    <div class="card">
      <h5 class="card-header">Tag Information</h5>
      <div class="card-body">
        <div class="form-check form-switch d-none d-xl-inline-block">
          <input
            class="form-check-input"
            type="checkbox"
            id="tag-mode"
            v-model="isChecked"
          />
          <label class="form-check-label" for="tag-mode">Enable Tag Mode</label>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Channel Name</th>
              <th scope="col">Time</th>
              <th scope="col">備註</th>
              <th scope="col" class="d-none d-xl-table-cell">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in tagDataShow" :key="i">
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
              <td>{{ item.note }}</td>
              <td class="d-none d-xl-table-cell">
                <a
                  href="#"
                  class="btn btn-primary me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#modifyModal"
                  data-bs-whatever="id"
                  >編輯</a
                >
                <a
                  href="#"
                  class="btn btn-danger me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                  >刪除</a
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
import { tagDataShow, isChecked, isActive } from "@/composition/store";
import { onMounted } from "@vue/runtime-core";
export default {
  setup() {
    onMounted(() => {
      // document
      //   .querySelector("#tag-mode")
      //   .focus()
      //   .addEventListener("keydown", (e) => {
      //     console.log(e.keyCode);
      //     e.preventDefault();
      //     if (e.keyCode === 32) {
      //       isChecked.value = !isChecked.value;
      //       console.log(isChecked.value);
      //     }
      //   });
      // document.querySelector("body").addEventListener("keydown", (e) => {
      //   e.preventDefault();
      //   document.querySelector("#tag-mode").focus();
      //   // .addEventListener("input", (e) => {
      //   if (e.keyCode === 32) {
      //     isChecked.value = !isChecked.value;
      //     console.log(isChecked.value);
      //   }
      //   // });
      // });
      // const isChecked = ref(false);
      // const focus = ref(null);
      // const switchToggle = (e) => {
      //   // e.preventDefault();
      //   focus.value.focus();
      //   isChecked.value = !isChecked.value;
      //   console.log(e.keyCode);
      //   console.log(isChecked.value);
      //   return false;
      // };
      // const tagModeEnable: HTMLInputElement = <HTMLInputElement>(
      //   document.getElementById("tag-mode")
      // );
      // document.body.addEventListener("keydown", (e) => {
      //   console.log(e.keyCode);
      //   e.preventDefault();
      //   switch (e.keyCode) {
      //     case 32:
      //       tagModeEnable.focus();
      //       tagModeEnable.checked = !tagModeEnable.checked;
      //       console.log(tagModeEnable.checked);
      //   }
      // if (tagModeEnable.checked === true) {
      //   simpleDataPointSelectionModifier.isEnabled = true;
      //   zoomPanModifier.isEnabled = false;
      //   xAxisDragModifier.isEnabled = true;
      //   scichartRoot.setAttribute("data-bs-toggle", "modal");
      //   scichartRoot.setAttribute("data-bs-target", "#exampleModal");
      // } else {
      //   simpleDataPointSelectionModifier.isEnabled = false;
      //   zoomPanModifier.isEnabled = true;
      //   xAxisDragModifier.isEnabled = false;
      //   scichartRoot.removeAttribute("data-bs-toggle");
      //   scichartRoot.removeAttribute("data-bs-target");
      // }
      // });
      return {
        tagDataShow,
        isChecked,
        isActive
        // switchToggle,
        // focus
      };
    });
  }
};
</script>
