<script setup>
import { onMounted, ref, computed } from 'vue'
import MdEditor from '@/components/MdEditor/index.vue'
import NoteCard from '@/components/NoteCard/index.vue'
import { getAllTags } from '@/api/tag.js'
import { getAllNotes } from '@/api/note'
import MyDialog from '@/components/MyDialog/index.vue'
import useMainStore from '@/stores/main.js'
const tagList = ref([])
const getTags = () => {
  getAllTags().then((res) => {
    tagList.value = res.data.map((tag) => {
      return {
        name: tag.name,
        selected: false,
        selectable: true,
        closeable: false,
      }
    })
  })
}

const getAllArticle = () => {
  getAllNotes().then((res) => {
    noteList.value = res.data.map((note) => {
      return {
        id: note.id,
        title: note?.title || '',
        time: note.updatedAt,
        content: note.content,
        tags: note.tags.split(','),
        type: note.type,
      }
    })
  })
}
const noteList = ref([])

const dialogVisible = ref(false)
const currentNote = ref({
  content: '',
  title: '',
})
const openDialog = (id) => {
  currentNote.value = noteList.value.find((note) => note.id === id) || {
    content: '',
    title: '',
  }
  dialogVisible.value = true
}

const mainStore = useMainStore()
const isPc = computed(() => mainStore.isPc)
onMounted(() => {
  getAllArticle()
  getTags()
})
</script>

<template>
  <div
    class="c-[var(--foreground-color)] p-y-4 overflow-y-auto flex flex-wrap relative"
    style="height: calc(100vh - 60px)"
  >
    <div
      class="note-item h-fit"
      :class="{ 'w-full': !isPc, 'w-50%': isPc }"
      v-for="note in noteList"
      :key="note.id"
    >
      <div
        class="item-container m-1 p-4 glass-effect rounded border-1 border-[var(--foreground-color)] border-dashed h-80"
      >
        <NoteCard v-bind="note" @openDialog="openDialog" />
      </div>
    </div>

    <MyDialog v-model="dialogVisible" width="90vw" height="90vh" :title="currentNote.title">
      <MdEditor :content="currentNote.content" class="glass-effect" isPreview />
    </MyDialog>
  </div>
</template>

<style scoped></style>
