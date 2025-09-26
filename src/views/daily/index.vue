<script setup>
import { ref } from 'vue';
import MdEditor from '@/components/MdEditor/index.vue';

const content = ref('')

// setTimeout(() => {
//   content.value = ""
// }, 2000);
</script>

<template>
  <div class="daily c-[var(--foreground-color)] p-y-4">
    <MdEditor v-model="content" class="glass-effect" />
    <div class="p-y-2">
      日常
    </div>
  </div>
</template>

<style scoped></style>
