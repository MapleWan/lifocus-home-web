<script setup>
import { ref } from 'vue'
import MdEditor from '@/components/MdEditor/index.vue'
import Tag from '@/components/Tag/index.vue'
import NoteCard from '@/components/NoteCard/index.vue'
import { getAllTags } from '@/api/tag.js'
import { getAllNotes } from '@/api/note'

const content = ref('')
const tagList = ref([])
getAllTags().then((res) => {
  tagList.value = res.data.map((tag) => {
    return {
      name: tag.name,
      selected: false,
      selectable: true,
    }
  })
})
const deleteTag = (index) => {
  tagList.value.splice(index, 1)
}

const noteList = ref([])
getAllNotes().then((res) => {
  noteList.value = res.data.map((note) => {
    return {
      id: note.id,
      title: note?.title || '测试标题',
      time: note.updatedAt,
      content: note.content,
      tags: note.tags.split(','),
      type: note.type,
    }
  })
})
</script>

<template>
  <div
    class="daily c-[var(--foreground-color)] h-full p-y-4 overflow-hidden flex flex-col relative"
  >
    <div class="edit-form">
      <MdEditor v-model="content" class="glass-effect" />
      <div class="flex flex-wrap items-center gap-x-2 p-y-1">
        <template v-for="(tag, index) in tagList" :key="tag">
          <Tag
            v-model:content="tagList[index].name"
            v-model:selected="tagList[index].selected"
            :closeable="true"
            :selectable="tagList[index].selectable"
            @close="deleteTag(index)"
          ></Tag>
        </template>
      </div>
    </div>

    <div class="note-list flex-1 overflow-hidden">
      <div class="h-full overflow-y-auto flex flex-wrap">
        <div class="note-item w-50%" v-for="note in noteList" :key="note.id">
          <div
            class="item-container m-1 p-2 glass-effect rounded border-1 border-[var(--foreground-color)] border-dashed min-h-40"
          >
            <NoteCard v-bind="note" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
