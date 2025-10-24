<template>
  <div
    class="tag rounded flex items-center justify-between w-fit glass-effect min-w-10 p-l-1.5 p-r-1 border-solid border-#252526 border-1 c-[var(--foreground-color)] inline-block"
    :class="{ 'tag-selectable': selectable, 'tag-selected': selected }"
    v-if="content"
  >
    <div class="tag-item flex items-center justify-between" @click="handleSelect">
      <div class="tag-item-icon">
        <slot name="icon"></slot>
      </div>
      <div class="tag-item-text">
        <slot name="text">{{ content }}</slot>
      </div>
    </div>

    <div
      class="close-icon cursor-pointer flex items-center justify-center"
      @click="handleClose"
      v-if="closeable"
    >
      <closeIcon class="c-#bfbfbf w-3 h-3"></closeIcon>
    </div>
  </div>
</template>

<script setup>
import closeIcon from '@/assets/commonIcons/close.svg'
const emit = defineEmits(['close'])
// const model = defineModel({ type: String, default: '' })
const content = defineModel('content', { type: String, default: '' })
const selected = defineModel('selected', { type: Boolean, default: false })
const props = defineProps({
  closeable: {
    type: Boolean,
    default: false,
  },
  selectable: {
    type: Boolean,
    default: false,
  },
})

const handleSelect = () => {
  if (props.selectable) {
    selected.value = !selected.value
  }
}

const handleClose = () => {
  // 检查是否有监听器，如果没有则执行默认行为（这里默认行为是什么可以根据需求调整）
  const hasCloseListener = emit('close')
  if (!hasCloseListener) {
    // 默认行为，例如控制台输出或者什么都不做
    content.value = ''
  } else {
    // 如果有监听器，则执行监听器的行为
    emit('close')
  }
}
</script>

<style scoped>
.tag-selectable {
  cursor: pointer;
}

.tag-selected {
  border: 1px solid var(--primary-color);
  box-shadow: 0 0 8px rgba(124, 58, 237, 0.5);
}

.tag-selected::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
  border-radius: 50%;
}
</style>
