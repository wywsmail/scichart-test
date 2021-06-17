<template>
  <div class="container">
    <h2 class="text-start">Tag Information</h2>
    <table class="table text-start">
      <thead>
        <tr>
          <th scope="col">Note ID</th>
          <th scope="col">Channel Name</th>
          <th scope="col">Time</th>
          <th scope="col">備註</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tagList.data" :key="item.id">
          <th>{{ item.id }}</th>
          <td>{{ item.channel }}</td>
          <td>{{ item.x1 }} ~ {{ item.x2 }}</td>
          <td>{{ item.note }}</td>
          <td>
            <div
              class="btn-toolbar justify-content-around"
              role="toolbar"
              aria-label="Toolbar with button groups"
            >
              <div class="btn-group me-2" role="group" aria-label="First group">
                <button
                  type="button"
                  class="btn btn-primary mr-1"
                  data-bs-toggle="modal"
                  data-bs-target="#modifyModal"
                >
                  編輯
                </button>
              </div>
              <div class="btn-group me-2" role="group" aria-label="Second group">
                <button type="button" class="btn btn-danger">刪除</button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { onMounted } from "vue";
import { tagList } from "@/composition/store";
import { useShowTagList } from "@/composition/index";
export default {
  setup() {
    const { showTagList } = useShowTagList();
    onMounted(async () => {
      await showTagList();
    });
    return { tagList, showTagList };
  }
};
</script>
