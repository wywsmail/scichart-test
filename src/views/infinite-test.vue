<template>
  <div class="container">
    <div v-for="(item, $index) in list" :key="$index" class="post-item">
      <h3>{{ item.title }}</h3>
      <p>by {{ item.author }}</p>
    </div>
  </div>
  <InfiniteLoading @infinite="infiniteHandler" />
</template>

<script>
import { defineComponent, ref } from "vue";
import InfiniteLoading from "vue-infinite-loading";
import axios from "axios";
// Interop vue 2 component to vue 3
import toVue3 from "vue-2-3/to-vue-3";
import Vue2 from "vue2";
import * as Vue3 from "vue";
toVue3.register(Vue2, Vue3);
const api = "//hn.algolia.com/api/v1/search_by_date?tags=story";
export default defineComponent({
  components: {
    InfiniteLoading: toVue3(InfiniteLoading)
  },
  setup() {
    const page = ref(1);
    const list = ref([]);
    const infiniteHandler = async ($state) => {
      const { data } = await axios.get(api, {
        params: {
          page: page.value
        }
      });
      console.log(data);
      if (data.hits.length) {
        page.value += 1;
        list.value.push(...data.hits);
        $state.loaded();
      } else {
        $state.complete();
      }
    };
    return {
      infiniteHandler,
      list
    };
  }
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.post-item {
  min-height: 100px;
  width: 800px;
  background-color: #f6f6ef;
  margin-top: 20px;
}
</style>
