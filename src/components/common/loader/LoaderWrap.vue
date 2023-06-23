<template>
  <router-view v-on:update="updateMountedPercentage" v-on:set="setAsyncCount" />
  <transition name="fade">
    <div class="element loadingWrap" v-if="!loaded">
      <Loader />
    </div>
  </transition>
</template>

<script setup>
import Loader from "./LoaderComp.vue";
import { computed, provide, onMounted, ref } from "vue";

const asyncCount = ref(0);
const completedPercentage = ref(0);
const percentage = computed(() => {
  return Math.ceil(10 / asyncCount.value);
});

const percentCompleted = computed(() => completedPercentage.value === 100);
const animCompleted = ref(false);

const loaded = computed(() => percentCompleted.value && animCompleted.value);

const updateCount = (value, range, speed) => {
  let notCompleted;
  let counter = 0;
  if (notCompleted) return; // Don't allow click if already running.
  notCompleted = setInterval(function () {
    if (counter < value) {
      completedPercentage.value += range;
      counter += range;
    } else {
      clearInterval(notCompleted);
      notCompleted = null;
      counter = 0;
    }
  }, speed);
};

const updateAsyncPercentage = () => {
  updateCount(percentage.value, 1, 5);
};
const updateMountedPercentage = () => {
  asyncCount.value === 0 ? updateCount(100, 10, 50) : updateCount(90, 10, 50);
};

const setAsyncCount = (value) => {
  asyncCount.value = value;
};

provide("updateAsyncPercentage", updateAsyncPercentage);
provide("completedPercentage", completedPercentage);
provide("animCompleted", animCompleted);
</script>
