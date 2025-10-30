<template>
  <div class="note-card flex flex-col justify-between h-full">
    <div class="w-full header flex justify-between">
      <div
        class="header-title max-w-60% font-700 font-size-6 cursor-pointer text-ellipsis whitespace-nowrap overflow-hidden"
        :title="title"
        @click="openDialog"
      >
        {{ title }}
      </div>
      <div class="header-actions flex items-center">
        <div
          class="header-time m-r-4 text-ellipsis whitespace-nowrap overflow-hidden"
          :title="time"
          v-if="isPc"
        >
          {{ time }}
        </div>
        <EditIcon
          class="w-4 h-4 c-[var(--foreground-color)] cursor-pointer m-r-2"
          title="编辑"
          @click="editNote"
        />
        <t-popup placement="bottom">
          <MoreIcon class="w-4 h-4 c-[var(--foreground-color)] cursor-pointer" />
          <template #content> 更多操作-敬请期待 </template>
        </t-popup>
      </div>
    </div>

    <div
      ref="contentRef"
      class="content flex-1 m-y-4 overflow-y-hidden overflow-x-hidden cursor-pointer relative"
      @click="openDialog"
      :title="isShowThreeDot ? '点击查看更多' : ''"
    >
      <!-- {{ content.slice(0, 200) }} -->
      <!-- {{ content }} -->
      <!-- <MdEditor :content="content" class="glass-effect" isPreview ref="mdEditorRef" /> -->
      <MdEditor :content="content" class="glass-effect" isPreview ref="mdEditorRef" />
      <div v-if="isShowThreeDot" class="three-dot absolute bottom-0 right-0">···</div>
    </div>
    <div>
      <div class="tags flex flex-wrap gap-x-2">
        <template v-for="(t, index) in tags" :key="index">
          <Tag :content="t" class="border-[var(--primary-color)]"></Tag>
        </template>
      </div>

      <div class="type flex items-center m-t-2">
        <!-- {{ type }} -->
        <template v-if="type === 'note'">
          <NoteIcon class="w-6 h-6 c-[var(--foreground-color)] m-r-2 c-#3B82F6 font-bold" />
          <div class="c-#3B82F6">笔记</div>
        </template>
        <template v-if="type === 'daily'">
          <DailyIcon class="w-6 h-6 c-[var(--foreground-color)] m-r-2 c-#10B981 font-bold" />
          <div class="c-#10B981">日常</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import MoreIcon from '@/assets/commonIcons/more.svg'
import EditIcon from '@/assets/commonIcons/edit.svg'
import NoteIcon from '@/assets/commonIcons/note.svg'
import DailyIcon from '@/assets/commonIcons/daily.svg'
import Tag from '@/components/Tag/index.vue'
import MdEditor from '@/components/MdEditor/index.vue'
import { Popup as TPopup } from 'tdesign-vue-next'
import useMainStore from '@/stores/main.js'
const mainStore = useMainStore()
const isPc = computed(() => mainStore.isPc)
const emit = defineEmits(['openDialog'])

const props = defineProps({
  // id
  id: {
    type: [Number, String],
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

const openDialog = () => {
  emit('openDialog', props.id)
}

const editNote = () => {
  emit('openDialog', props.id)
}

const contentRef = ref()
const mdEditorRef = ref()
const isShowThreeDot = ref(false)
onMounted(() => {
  isShowThreeDot.value = contentRef.value.scrollHeight > contentRef.value.clientHeight
})
</script>

<style scoped></style>
