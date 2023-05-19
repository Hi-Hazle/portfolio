import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useScrollerStore = defineStore("scroller", () => {
  const scroller = ref(null);
  function setScroller(ref) {
    scroller.value = ref;
  }

  return { scroller, setScroller };
});
