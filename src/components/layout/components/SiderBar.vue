<script setup>
import { computed } from 'vue'
import useMainStore from '@/stores/main.js'
const mainStore = useMainStore()
const isPc = computed(() => mainStore.isPc)
</script>

<template>
  <div class="side-bar h-full flex flex-col justify-between">
    <div class="header">
      <slot name="header"> header </slot>
    </div>
    <div
      class="content flex flex-col flex-1 m-t-4 gap-1"
      :class="{ 'justify-end': !isPc, 'm-b-8': !isPc, 'justify-start': isPc }"
    >
      <slot name="content"> content </slot>
    </div>
    <div class="footer">
      <slot name="footer"> footer </slot>
    </div>
  </div>
</template>

<style scoped></style>
