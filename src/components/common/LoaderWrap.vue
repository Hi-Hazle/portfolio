<template>
  <router-view v-on:update="updateMountedPercentage" v-on:set="setAsyncCount" />

  <transition name="fade">
    <div class="element loadingWrap" v-if="!state.loaded">
      {{ state.completedPercentage }}%
    </div>
  </transition>
</template>

<style></style>
<script setup>
import { reactive, computed, watch, provide } from "vue";

const state = reactive({
  asyncCount: 0,
  percentage: computed(() => {
    return Math.ceil(10 / state.asyncCount);
  }),
  completedPercentage: 0,
  loaded: computed(() => {
    return state.completedPercentage >= 100;
  }),
});

const updateCount = (value, range, speed) => {
  let notCompleted;
  let counter = 0;
  if (notCompleted) return; // Don't allow click if already running.
  notCompleted = setInterval(function () {
    if (counter < value) {
      state.completedPercentage += range;
      counter += range;
    } else {
      clearInterval(notCompleted);
      notCompleted = null;
      counter = 0;
    }
  }, speed);
};

const updateAsyncPercentage = () => {
  updateCount(state.percentage, 1, 5);
};

const updateMountedPercentage = () => {
  updateCount(90, 10, 50);
};

const setAsyncCount = (value) => {
  state.asyncCount = value;
};
provide("updateAsyncPercentage", updateAsyncPercentage);
</script>
