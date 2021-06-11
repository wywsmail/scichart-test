<template>
  <h1>Diagnoses v2</h1>
  <Diagnoses />
  <Pagination />
</template>

<script>
import Diagnoses from "@/components/DiagnosesListComponent";
import Pagination from "@/components/PaginationComponent";
export default {
  components: {
    Diagnoses,
    Pagination
  }
};
</script>

<style scoped></style>
