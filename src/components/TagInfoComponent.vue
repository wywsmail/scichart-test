<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-8">
        <div class="card">
          <h5 class="card-header">Tag Information</h5>
          <div class="card-body">
            <div class="form-check form-switch justify-content-end d-flex">
              <input class="form-check-input" type="checkbox" id="tag-mode" />
              <label class="form-check-label" for="tag-mode">Enable Tag Mode</label>
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Channel Name</th>
                  <th scope="col">Time</th>
                  <th scope="col">備註</th>
                  <th scope="col">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in tagDataShow" :key="i">
                  <th v-if="item.channel === '0'">avF</th>
                  <th v-else-if="item.channel === '1'">aVL</th>
                  <th v-else-if="item.channel === '2'">aVR</th>
                  <th v-else-if="item.channel === '3'">LEAD 3</th>
                  <th v-else-if="item.channel === '4'">LEAD 2</th>
                  <th v-else-if="item.channel === '5'">LEAD 1</th>
                  <th v-else></th>
                  <td v-if="item.x1">
                    {{ (item.x1 / 250).toFixed(2) }}s ~ {{ (item.x2 / 250).toFixed(2) }}s
                  </td>
                  <td v-else></td>
                  <td>{{ item.note }}</td>
                  <td>
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
    </div>
  </div>
</template>
<script>
import {tagDataShow } from "@/composition/store";
export default {
  setup() {
    return{
      tagDataShow
    }
  }
}
</script>