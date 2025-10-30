<script setup>
import { onMounted, ref, computed } from 'vue'
import MdEditor from '@/components/MdEditor/index.vue'
import Tag from '@/components/Tag/index.vue'
import NoteCard from '@/components/NoteCard/index.vue'
import { getAllTags } from '@/api/tag.js'
import { getNotesByCondition, addNote } from '@/api/note'
import { Input as TInput } from 'tdesign-vue-next'
import { MessagePlugin } from 'tdesign-vue-next'
import SendIcon from '@/assets/commonIcons/send.svg'
import Divider from '@/components/Divider/index.vue'
import MyDialog from '@/components/MyDialog/index.vue'
import useMainStore from '@/stores/main.js'
const content = ref('')
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
const deleteTag = (index) => {
  tagList.value.splice(index, 1)
}

const getAllDaily = () => {
  getNotesByCondition({ type: 'daily' }).then((res) => {
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
const noteTitle = ref('')
const onTitleClear = () => {
  noteTitle.value = ''
}

const newTag = ref('')
const onTagClear = () => {
  newTag.value = ''
}
const addNewTag = () => {
  if (newTag.value) {
    const index = tagList.value.findIndex((tag) => tag.name === newTag.value)
    if (index !== -1) {
      MessagePlugin.warning('标签已存在，已为您自动选中')
      tagList.value[index].selected = true
      newTag.value = ''
      return
    }
    tagList.value.push({
      name: newTag.value,
      selected: true,
      selectable: true,
      closeable: true,
    })
    newTag.value = ''
  }
}

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
const submitAddNote = () => {
  if (!noteTitle.value) {
    MessagePlugin.warning('请输入标题')
    return
  }
  if (!content.value) {
    MessagePlugin.warning('请输入内容')
    return
  }
  const tags = tagList.value
    .filter((tag) => tag.selected)
    .map((tag) => tag.name)
    .join(',')

  if (!tags) {
    MessagePlugin.warning('请选择至少一个标签')
    return
  }
  addNote({
    type: 'daily',
    title: noteTitle.value,
    content: content.value,
    tags,
  }).then((res) => {
    if (res.success) {
      getAllDaily()
      getTags()
      content.value = ''
      noteTitle.value = ''
      tagList.value.forEach((tag) => (tag.selected = false))
      MessagePlugin.success('日常创建成功')
    }
  })
}

const mainStore = useMainStore()
const isPc = computed(() => mainStore.isPc)
onMounted(() => {
  getAllDaily()
  getTags()
})
</script>

<template>
  <div
    class="daily c-[var(--foreground-color)] h-full p-y-4 overflow-auto flex flex-col relative"
    style="height: calc(100vh - 60px)"
  >
    <div class="edit-form">
      <t-input
        class="p-y-2 p-x-1"
        v-model="noteTitle"
        clearable
        placeholder="标题"
        size="small"
        @clear="onTitleClear"
      />
      <MdEditor
        v-model="content"
        :editorConfig="{ autoFocus: isPc }"
        class="glass-effect"
        style="height: 40vh"
      />
      <div class="flex flex-wrap items-center gap-x-2 p-y-1">
        <template v-for="(tag, index) in tagList" :key="tag">
          <Tag
            v-model:content="tagList[index].name"
            v-model:selected="tagList[index].selected"
            :closeable="tagList[index].closeable"
            :selectable="tagList[index].selectable"
            @close="deleteTag(index)"
          ></Tag>
        </template>
        <t-input
          class="p-y-2"
          v-model="newTag"
          auto-width
          clearable
          placeholder="新增标签"
          size="small"
          @clear="onTagClear"
          @enter="addNewTag"
        />
      </div>
      <div class="btn-container flex justify-end">
        <div
          class="send-btn flex items-center p-1 cursor-pointer rounded-2 border-1 border-solid border-[var(--foreground-color)] w-fit h-fit"
          @click="submitAddNote"
        >
          <SendIcon class="c-[var(--foreground-color)] w-12 h-6 hover:rotate-30" />
        </div>
      </div>
    </div>

    <!-- 虚线水平分割线 -->
    <Divider lineStyle="dashed" />

    <div class="daily-list flex flex-wrap">
      <div
        class="note-item"
        :class="{ 'w-full': !isPc, 'w-50%': isPc }"
        v-for="note in noteList"
        :key="note.id"
      >
        <div
          class="item-container m-1 p-4 glass-effect rounded border-1 border-[var(--foreground-color)] border-dashed h-60"
        >
          <NoteCard v-bind="note" @openDialog="openDialog" />
        </div>
      </div>
    </div>

    <MyDialog v-model="dialogVisible" width="90vw" height="90vh" :title="currentNote.title">
      <MdEditor :content="currentNote.content" class="glass-effect" isPreview />
    </MyDialog>
  </div>
</template>

<style scoped>
:deep(.t-input) {
  /* height: 48px;
  border-radius: 12px; */
  background-color: inherit;
}

:deep(.t-input__inner) {
  color: var(--foreground-color);
}

:deep(.t-input__inner::placeholder) {
  color: var(--placehoder-color);
}

:deep(.t-input__inner:focus) {
  color: var(--foreground-color);
}
</style>
