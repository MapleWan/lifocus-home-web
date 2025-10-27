<template>
  <div class="note-card flex flex-col justify-between h-full">
    <div class="header flex justify-between">
      <div class="header-title font-700 font-size-6">
        {{ title }}
      </div>
      <div class="header-actions flex items-center">
        <div class="header-time m-r-4">
          {{ time }}
        </div>
        <EditIcon class="w-4 h-4 c-[var(--foreground-color)] cursor-pointer m-r-2" />
        <t-popup placement="bottom">
          <MoreIcon class="w-4 h-4 c-[var(--foreground-color)] cursor-pointer" />
          <template #content> 更多操作-敬请期待 </template>
        </t-popup>
      </div>
    </div>

    <div class="content flex-1 m-y-4 overflow-y-auto">
      <!-- {{ content.slice(0, 200) }} -->
      {{ content }}
    </div>

    <div>
      <div class="tags flex flex-wrap gap-x-2">
        <template v-for="(t, index) in tags" :key="index">
          <Tag :content="t"></Tag>
        </template>
      </div>

      <div class="type">
        {{ type }}
      </div>
    </div>
  </div>
</template>

<script setup>
import MoreIcon from '@/assets/commonIcons/more.svg'
import EditIcon from '@/assets/commonIcons/edit.svg'
import Tag from '@/components/Tag/index.vue'
import { Popup as TPopup } from 'tdesign-vue-next'
defineProps({
  // id
  id: {
    type: String,
    default: '',
  },
  // 标题
  title: {
    type: String,
    default: '',
  },
  // 时间
  time: {
    type: String,
    default: '',
  },
  // 内容
  content: {
    type: String,
    default: '',
  },
  // 标签
  tags: {
    type: Array,
    default: () => [],
  },
  // 类型
  type: {
    type: String,
    default: '',
  },
})
</script>

<style scoped></style>
