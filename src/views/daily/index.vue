<script setup>
import { ref } from 'vue'
import MdEditor from '@/components/MdEditor/index.vue'
import Tag from '@/components/Tag/index.vue'
const content = ref('')
const tagList = ref(['1', '2'])

// setTimeout(() => {
//   content.value = ""
// }, 2000);
</script>

<template>
  <div class="daily c-[var(--foreground-color)] p-y-4">
    <MdEditor v-model="content" class="glass-effect" />
    <div class="flex flex-wrap items-center gap-x-2 p-y-1">
      <template v-for="(tag, index) in tagList" :key="tag">
        <Tag v-model="tagList[index]" :closeable="true"></Tag>
      </template>
    </div>

    <!-- <div class="p-y-2">日常</div> -->
  </div>
</template>

<style scoped></style>
