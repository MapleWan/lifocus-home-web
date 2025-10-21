<script setup>
import useMainStore from '@/stores/main';
const mainStore = useMainStore();
</script>

<template>
  <div class="dashboard">
    主页
    {{ mainStore.isPc }}
  </div>
</template>

<style scoped></style>
