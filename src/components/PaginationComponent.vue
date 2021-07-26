<template>
  <div class="container">
    <nav class="navbar navbar-light">
      <div class="container-fluid justify-content-between">
        <h4>資料總頁數:{{ pageNumber }}</h4>
        <form class="d-flex">
          <button class="btn btn-secondary me-2" @click="page--">Previous</button>
          <input
            class="form-control me-2"
            type="search"
            placeholder="請填入欲前往之頁數"
            aria-label="Search"
            v-model="page"
            :value="page"
          />
          <button
            class="btn btn-outline-success me-2"
            type="submit"
            @click="requestDiagnoses(page)"
          >
            Submit
          </button>
          <button class="btn btn-secondary" @click="page++">Next</button>
        </form>
      </div>
    </nav>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-end">
        <li class="page-item">
          <a
            class="page-link"
            href="#"
            tabindex="-1"
            aria-disabled="true"
            @click.prevent="previous"
            >Previous</a
          >
        </li>
        <li class="page-item" v-for="n in 10" :key="n">
          <a
            class="page-link"
            href="#"
            @click.prevent="
              requestDiagnoses(n + pageParameter * 10, n + pageParameter * 10)
            "
            >{{ n + pageParameter }}</a
          >
        </li>
        <li class="page-item">
          <a class="page-link" href="#" @click.prevent="next">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useRequestDiagnoses } from "@/composition/index";
import { countNumber, page } from "@/composition/store";
export default {
  setup() {
    const { requestDiagnoses } = useRequestDiagnoses();
    const pageNumber = computed(() => {
      return Math.ceil(countNumber.value / 10);
    });
    const pageParameter = ref(0);
    const next = () => {
      if (pageNumber.value - 10 > pageParameter.value) {
        pageParameter.value++;
      } else {
        return;
      }
    };
    const previous = () => {
      if (pageNumber.value - 10 >= pageParameter.value && pageParameter.value !== 0) {
        pageParameter.value--;
        return;
      } else if (pageParameter.value === 0) {
        return;
        // pageParameter.value--;
      }
    };
    // const page = ref(1);
    console.log(countNumber.value);
    console.log(pageNumber.value);
    return {
      countNumber,
      pageNumber,
      requestDiagnoses,
      next,
      previous,
      pageParameter,
      page
    };
  }
};
</script>

<style></style>
