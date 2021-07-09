<template>
  <div class="container">
    <nav class="navbar navbar-light">
      <div class="container-fluid justify-content-between">
        <h4>資料總頁數:{{ pageNumber }}</h4>
        <form class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            placeholder="請填入欲前往之頁數"
            aria-label="Search"
            v-model="page"
          />
          <button
            class="btn btn-outline-success"
            type="submit"
            @click="requestDiagnoses(page * 10 - 9, page * 10)"
          >
            Submit
          </button>
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
              requestDiagnoses(
                n * 10 - 9 + pageParameter * 10,
                n * 10 + pageParameter * 10
              )
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
import { countNumber } from "@/composition/store";
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
    console.log(countNumber.value);
    console.log(pageNumber.value);
    return {
      countNumber,
      pageNumber,
      requestDiagnoses,
      next,
      previous,
      pageParameter
    };
  }
};
</script>

<style></style>
