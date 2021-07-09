<template>
  <TagInfo />
  <div class="container">
    <div id="scichart-root-test" style="width: 100%; height: 800px; margin: auto"></div>
  </div>
  <TagNoteModal />
  <ChangeTagNoteModal />
  <DeleteTagNoteModal />
</template>

<script>
import TagNoteModal from "@/components/modal/TagNoteModal";
import ChangeTagNoteModal from "@/components/modal/ChangeTagNoteModal";
import DeleteTagNoteModal from "@/components/modal/DeleteTagNoteModal";
import TagInfo from "@/components/TagInfoComponent";
import { onMounted } from "vue";

export default {
  components: {
    TagNoteModal,
    ChangeTagNoteModal,
    DeleteTagNoteModal,
    TagInfo
  },
  setup() {
    onMounted(() => {
      document.querySelector("");
    });
    return {};
  }
};
</script>
