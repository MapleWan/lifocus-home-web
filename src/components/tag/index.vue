<template>
  <div class="tag" @click="enableEdit">
    <span v-if="!isEditing">{{ tagText || '点击编辑标签' }}</span>
    <div
      v-else
      ref="editableDivRef"
      contenteditable="true"
      @blur="saveEdit"
      @keydown.enter.exact.prevent="saveEdit"
      @keydown.esc="cancelEdit"
      class="editable-div"
    ></div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const isEditing = ref(false)
const tagText = ref(props.modelValue)
const editableDivRef = ref(null)

function enableEdit() {
  isEditing.value = true
  nextTick(() => {
    editableDivRef.value?.focus()
    // 将光标移到末尾
    const range = document.createRange()
    const sel = window.getSelection()
    range.selectNodeContents(editableDivRef.value)
    range.collapse(false)
    sel.removeAllRanges()
    sel.addRange(range)
  })
}

function saveEdit() {
  const newText = editableDivRef.value.textContent
  tagText.value = newText
  emit('update:modelValue', tagText.value)
  isEditing.value = false
}

function cancelEdit() {
  editableDivRef.value.textContent = tagText.value
  isEditing.value = false
}
</script>

<style scoped>
.tag {
  display: inline-block;
  padding: 4px 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  cursor: pointer;
  min-width: 60px;
  text-align: center;
}

.tag:hover {
  background-color: #e0e0e0;
}

.editable-div {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 2px 6px;
  outline: none;
  width: 100%;
  min-width: 60px;
  text-align: left;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
