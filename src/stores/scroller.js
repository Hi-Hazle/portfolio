import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useScrollerStore = defineStore("scroller", () => {
  const scroller = ref(null);
  const markers = ref(0);
  function setScroller(ref) {
    scroller.value = ref;
  }
  function isMarkers(bool) {
    markers.value += 1;
  }

  return { scroller, markers, setScroller, isMarkers };
});
