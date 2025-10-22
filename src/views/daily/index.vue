<script setup>
import { ref } from 'vue'
import MdEditor from '@/components/MdEditor/index.vue'
import Tag from '@/components/Tag/index.vue'
import { getAllTags } from '@/api/tag.js'

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
</script>

<template>
  <div class="daily c-[var(--foreground-color)] p-y-4">
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

    <div
      class="p-y-2"
      @click="
        () => {
          console.log(tagList)
        }
      "
    >
      日常
    </div>
  </div>
</template>

<style scoped></style>
