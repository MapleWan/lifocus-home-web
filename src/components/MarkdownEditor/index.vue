<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import Vditor from 'vditor'
import 'vditor/dist/index.css'

// Props 定义
const props = defineProps({
  // 编辑器内容
  modelValue: {
    type: String,
    default: ''
  },
  // 编辑器高度
  height: {
    type: [String, Number],
    default: 400
  },
  // 编辑器最小高度
  minHeight: {
    type: [String, Number],
    default: 200
  },
  // 编辑器模式：wysiwyg（所见即所得）、ir（即时渲染）、sv（分屏预览）
  mode: {
    type: String,
    default: 'ir',
    validator: (value) => ['wysiwyg', 'ir', 'sv'].includes(value)
  },
  // 主题：classic、dark
  theme: {
    type: String,
    default: 'dark',
    validator: (value) => ['classic', 'dark'].includes(value)
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 占位符文本
  placeholder: {
    type: String,
    default: '请输入内容...'
  },
  // 工具栏配置
  toolbar: {
    type: Array,
    default: () => [
      'emoji',
      'headings',
      'bold',
      'italic',
      'strike',
      '|',
      'line',
      'quote',
      '|',
      'list',
      'ordered-list',
      'check',
      '|',
      'code',
      'inline-code',
      '|',
      'upload',
      'link',
      'table',
      '|',
      'undo',
      'redo',
      '|',
      'fullscreen',
      'edit-mode',
      '|',
      'outline',
      'preview',
      'help'
    ]
  },
  // 缓存配置
  cache: {
    type: [Boolean, Object],
    default: false
  },
  // 上传图片配置
  upload: {
    type: Object,
    default: () => ({})
  }
})

// Emits 定义
const emit = defineEmits(['update:modelValue', 'change', 'focus', 'blur', 'input'])

// 响应式数据
const editorContainer = ref(null)
let vditor = null

// 监听内容变化
watch(
  () => props.modelValue,
  (newValue) => {
    if (vditor && vditor.getValue() !== newValue) {
      vditor.setValue(newValue || '')
    }
  }
)

// 监听禁用状态
watch(
  () => props.disabled,
  (newValue) => {
    if (vditor) {
      vditor.disabled(newValue)
    }
  }
)

// 初始化编辑器
const initEditor = () => {
  if (!editorContainer.value) return

  const options = {
    element: editorContainer.value,
    height: typeof props.height === 'number' ? props.height : parseInt(props.height),
    minHeight: typeof props.minHeight === 'number' ? props.minHeight : parseInt(props.minHeight),
    mode: props.mode,
    theme: props.theme,
    placeholder: props.placeholder,
    toolbar: props.toolbar,
    cache: props.cache,
    value: props.modelValue || '',

    // 预览配置
    preview: {
      theme: {
        current: 'ant-design',
        path: 'https://cdn.jsdelivr.net/npm/vditor/dist/css/content-theme'
      },
      hljs: {
        style: 'github'
      }
    },

    // 上传配置
    upload: props.upload.url ? {
      url: props.upload.url,
      linkToImgUrl: props.upload.linkToImgUrl || '',
      filename: props.upload.filename || ((name) => name.replace(/[^(a-zA-Z0-9Chinese)]/g, '')),
      ...props.upload
    } : undefined,

    // 事件回调
    input: (value) => {
      emit('update:modelValue', value)
      emit('input', value)
      emit('change', value)
    },

    focus: () => {
      emit('focus')
    },

    blur: () => {
      emit('blur')
    },

    after: () => {
      // 编辑器初始化完成后
      if (props.disabled) {
        vditor.disabled(props.disabled)
      }
    }
  }

  // 移除空的配置项以避免错误
  if (!options.upload) {
    delete options.upload
  }

  vditor = new Vditor(editorContainer.value, options)
}

// 销毁编辑器
const destroyEditor = () => {
  if (vditor) {
    vditor.destroy()
    vditor = null
  }
}

// 获取编辑器实例（供父组件使用）
const getVditor = () => {
  return vditor
}

// 获取内容
const getValue = () => {
  return vditor ? vditor.getValue() : ''
}

// 设置内容
const setValue = (value) => {
  if (vditor) {
    vditor.setValue(value || '')
  }
}

// 插入内容
const insertValue = (value) => {
  if (vditor) {
    vditor.insertValue(value || '')
  }
}

// 获取选中的文本
const getSelection = () => {
  return vditor ? vditor.getSelection() : ''
}

// 清空内容
const clear = () => {
  if (vditor) {
    vditor.setValue('')
  }
}

// 聚焦
const focus = () => {
  if (vditor) {
    vditor.focus()
  }
}

// 失焦
const blur = () => {
  if (vditor) {
    vditor.blur()
  }
}

// 暴露方法给父组件
defineExpose({
  getVditor,
  getValue,
  setValue,
  insertValue,
  getSelection,
  clear,
  focus,
  blur
})

// 生命周期
onMounted(() => {
  initEditor()
})

onBeforeUnmount(() => {
  destroyEditor()
})
</script>

<template>
  <div class="markdown-editor">
    <div ref="editorContainer" class="vditor-container"></div>
  </div>
</template>

<style scoped>
.markdown-editor {
  width: 100%;
}

.vditor-container {
  width: 100%;
}

/* 自定义样式调整 */
:deep(.vditor) {
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

:deep(.vditor--fullscreen) {
  z-index: 9999;
}

/* 暗色主题适配 */
:deep(.vditor--dark) {
  border-color: #374151;
  color: #f3f4f6;
}

:deep(.vditor--dark .vditor-content) {
  color: #f3f4f6;
}

:deep(.vditor--dark .vditor-ir) {
  color: #f3f4f6;
}

:deep(.vditor--dark .vditor-wysiwyg) {
  color: #f3f4f6;
}

:deep(.vditor--dark .vditor-sv) {
  color: #f3f4f6;
}

:deep(.vditor--dark .vditor-textarea) {
  color: #f3f4f6;
  background-color: #1f2937;
}

:deep(.vditor--dark .vditor-ir pre.vditor-reset) {
  color: #f3f4f6;
  padding: 16px !important;
}

:deep(.vditor--dark .vditor-wysiwyg .vditor-reset) {
  color: #f3f4f6;
}

/* 暗色主题下的编辑区域 */
:deep(.vditor--dark .vditor-ir .vditor-reset) {
  color: #f3f4f6 !important;
  background-color: #1f2937;
  padding: 16px !important;
}

:deep(.vditor--dark .vditor-wysiwyg .vditor-reset) {
  color: #f3f4f6 !important;
  background-color: #1f2937;
}

/* 暗色主题下的 placeholder */
:deep(.vditor--dark .vditor-reset::placeholder) {
  color: #9ca3af;
}

/* 暗色主题下的选中文本 */
:deep(.vditor--dark .vditor-reset::selection) {
  background-color: #3730a3;
  color: #f3f4f6;
}

/* 工具栏样式优化 */
:deep(.vditor-toolbar) {
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  border-radius: 8px 8px 0 0;
  padding-left: 8px !important;
}

:deep(.vditor--dark .vditor-toolbar) {
  background-color: #1f2937;
  border-bottom-color: #374151;
}

/* 内容区域样式 */
:deep(.vditor-content) {
  border-radius: 8px;
}

/* 响应式处理 */
@media (max-width: 768px) {
  :deep(.vditor-toolbar) {
    flex-wrap: wrap;
  }

  :deep(.vditor-toolbar__item) {
    margin: 2px;
  }
}
</style>
