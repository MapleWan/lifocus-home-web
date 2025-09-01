<script setup>
import useMainStore from "../../stores/main";
import { Loading as TLoading } from "tdesign-vue-next";
const mainStore = useMainStore()
</script>

<template>
  <div v-if="mainStore.isLoading">
    <t-loading class="loading" :loading="mainStore.isLoading" size="small">
    </t-loading>
  </div>
</template>

<style scoped>
.loading {
  position: fixed;
  z-index: 999;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
