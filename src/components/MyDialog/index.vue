<script setup>
import { ref, watch, onMounted } from 'vue'

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
</script>

<template>
  <Teleport :to="mountTo" :disabled="!mountTo">
    <div v-if="visible" ref="dialogElement" class="my-dialog" @click="onMaskClick">
      <div class="my-dialog__wrapper glass-effect" :style="{ width, height }">
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
  border-radius: 8px;
  overflow: hidden;
  animation: dialog-fade-in 0.3s ease-out;
  position: relative;
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
}

.my-dialog__close:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.my-dialog__body {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  padding-top: 40px;
}
</style>
