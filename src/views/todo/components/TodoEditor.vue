<script setup>
import MarkdownEditor from '@/components/MarkdownEditor/index.vue';
import { ref } from 'vue';

const content = ref("")
const editorRef = ref(null)
// 编辑器配置
const editorConfig = {
  height: 200,
  mode: 'ir',
  theme: 'dark',
  placeholder: '输入内容...',
  upload: {
    // 如果有图片上传需求，可以在这里配置上传接口
    // url: '/api/upload/image'
  },
  toolbar: [
    'undo',
    'redo',
    '|',
    'list',
    'ordered-list',
    'check',
    'link',
    'strike',
    'outdent',
    'indent',
    'fullscreen',
    '|',
    'outline',
    'preview',
  ]
}

// 处理内容变化
const handleContentChange = (value) => {
  console.log('内容已更改:', value)
}

</script>

<template>
  <div class="todo-editor">
    <MarkdownEditor ref="editorRef" v-model="content" :height="editorConfig.height" :mode="editorConfig.mode"
      :theme="editorConfig.theme" :placeholder="editorConfig.placeholder" :upload="editorConfig.upload"
      :toolbar="editorConfig.toolbar" @change="handleContentChange" />
  </div>
</template>

<style scoped></style>
