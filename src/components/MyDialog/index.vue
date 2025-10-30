<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

// 使用 defineModel 替换 modelValue prop 和 update:modelValue 事件
const model = defineModel({ type: Boolean, default: false })

const props = defineProps({
  // 挂载点选择器
  mountTo: {
    type: String,
    default: 'body',
  },
  // 对话框宽度
  width: {
    type: String,
    default: '500px',
  },
  // 对话框高度
  height: {
    type: String,
    default: '400px',
  },
  // 对话框标题
  title: {
    type: String,
    default: '',
  },
})

// 对话框是否可见
const visible = ref(false)
// 挂载点元素
const mountElement = ref(null)
// 对话框元素
const dialogElement = ref(null)

// 关闭对话框
const closeDialog = () => {
  visible.value = false
  model.value = false
}

// 点击遮罩层关闭
const onMaskClick = (e) => {
  if (e.target === dialogElement.value) {
    closeDialog()
  }
}

// 监听 modelValue 变化
onMounted(() => {
  // 查找挂载点
  mountElement.value = document.querySelector(props.mountTo) || document.body
})

// 监听 value 变化
watch(
  () => model.value,
  (newVal) => {
    visible.value = newVal
  },
  { immediate: true }
)

// 监听 ESC 键关闭弹窗
const handleKeydown = (e) => {
  if (e.key === 'Escape' && visible.value) {
    closeDialog()
  }
}

// 添加和移除键盘事件监听
watch(visible, (newVal) => {
  if (newVal) {
    document.addEventListener('keydown', handleKeydown)
  } else {
    document.removeEventListener('keydown', handleKeydown)
  }
})

// 组件卸载时清理事件监听器
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport :to="mountTo" :disabled="!mountTo">
    <div v-if="visible" ref="dialogElement" class="my-dialog glass-effect" @click="onMaskClick">
      <div class="my-dialog__wrapper" :style="{ width, height }">
        <div v-if="title" class="my-dialog__title">{{ title }}</div>
        <div class="my-dialog__close" @click="closeDialog">×</div>
        <div class="my-dialog__body">
          <slot></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.my-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
}

.my-dialog__wrapper {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: dialog-fade-in 0.3s ease-out;
  position: relative;
  padding: 4px;
  border-radius: 8px;
  border: 1px solid var(--foreground-color);
  background-color: rgba(0, 0, 0, 0.7);
}

@keyframes dialog-fade-in {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.my-dialog__title {
  position: absolute;
  top: 16px;
  left: 16px;
  right: 48px; /* 为关闭按钮留出空间 */
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  z-index: 10;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--foreground-color);
}

.my-dialog__close {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 24px;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
  z-index: 10;
  color: var(--foreground-color);
}

.my-dialog__close:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.my-dialog__body {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  margin-top: 48px;
}
</style>
