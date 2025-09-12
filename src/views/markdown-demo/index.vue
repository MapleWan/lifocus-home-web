<script setup>
import { ref } from 'vue'
import MarkdownEditor from '@/components/markdownEditor/index.vue'

const content = ref(`# Markdown 编辑器示例

这是一个基于 **Vditor** 实现的 Vue 3 Markdown 编辑器组件。

## 功能特性

- ✅ 所见即所得编辑
- ✅ 即时渲染模式
- ✅ 分屏预览模式
- ✅ 支持多种主题
- ✅ 丰富的工具栏
- ✅ 图片上传
- ✅ 数学公式支持
- ✅ 流程图支持

## 代码示例

\`\`\`javascript
const message = 'Hello Vditor!'
console.log(message)
\`\`\`

## 表格示例

| 功能 | 支持情况 | 备注 |
|------|----------|------|
| 基础编辑 | ✅ | 支持所有 Markdown 语法 |
| 实时预览 | ✅ | 三种模式可选 |
| 主题切换 | ✅ | 明亮/暗色主题 |
| 图片上传 | ✅ | 可配置上传接口 |

> 这是一个引用块示例

欢迎使用这个 Markdown 编辑器！`)

const editorRef = ref(null)

// 编辑器配置
const editorConfig = {
  height: 500,
  mode: 'ir', // 即时渲染模式
  theme: 'classic',
  placeholder: '开始编写你的 Markdown 内容...',
  upload: {
    // 如果有图片上传需求，可以在这里配置上传接口
    // url: '/api/upload/image'
  }
}

// 处理内容变化
const handleContentChange = (value) => {
  console.log('内容已更改:', value)
}

// 获取编辑器内容
const getContent = () => {
  if (editorRef.value) {
    const content = editorRef.value.getValue()
    console.log('当前内容:', content)
    alert(`内容长度: ${content.length} 字符`)
  }
}

// 设置编辑器内容
const setContent = () => {
  if (editorRef.value) {
    editorRef.value.setValue('# 新内容\n\n这是通过方法设置的内容。')
  }
}

// 插入内容
const insertContent = () => {
  if (editorRef.value) {
    editorRef.value.insertValue('\n\n**插入的内容**\n\n')
  }
}

// 清空内容
const clearContent = () => {
  if (editorRef.value) {
    editorRef.value.clear()
  }
}
</script>

<template>
  <div class="markdown-demo-container p-6 max-w-6xl mx-auto">
    <div class="mb-6">
      <h1 class="text-3xl font-bold mb-4">Markdown 编辑器演示</h1>
      <p class="text-gray-600 mb-4">
        这是一个基于 Vditor 实现的通用 Markdown 编辑器组件，支持多种编辑模式和丰富的功能。
      </p>

      <!-- 操作按钮 -->
      <div class="flex flex-wrap gap-3 mb-6">
        <t-button theme="primary" @click="getContent">
          获取内容
        </t-button>
        <t-button theme="default" @click="setContent">
          设置内容
        </t-button>
        <t-button theme="default" @click="insertContent">
          插入内容
        </t-button>
        <t-button theme="warning" @click="clearContent">
          清空内容
        </t-button>
      </div>
    </div>

    <!-- Markdown 编辑器 -->
    <div class="editor-section">
      <MarkdownEditor ref="editorRef" v-model="content" :height="editorConfig.height" :mode="editorConfig.mode"
        :theme="editorConfig.theme" :placeholder="editorConfig.placeholder" :upload="editorConfig.upload"
        @change="handleContentChange" />
    </div>

    <!-- 使用说明 -->
    <div class="mt-8 p-4 bg-blue-50 rounded-lg">
      <h3 class="text-lg font-semibold mb-2">使用说明：</h3>
      <ul class="text-sm text-gray-700 space-y-1">
        <li>• 支持三种编辑模式：所见即所得(wysiwyg)、即时渲染(ir)、分屏预览(sv)</li>
        <li>• 支持明亮和暗色两种主题</li>
        <li>• 提供丰富的工具栏功能，包括格式化、插入表格、上传图片等</li>
        <li>• 支持数学公式、流程图、时序图等高级功能</li>
        <li>• 完全响应式设计，适配移动端设备</li>
      </ul>
    </div>

    <!-- 组件用法示例 -->
    <div class="mt-8 p-4 bg-gray-50 rounded-lg">
      <h3 class="text-lg font-semibold mb-2">组件用法示例：</h3>
      <pre class="text-sm text-gray-800 whitespace-pre-wrap font-mono"><code>&lt;template&gt;
  &lt;MarkdownEditor
    v-model="content"
    :height="500"
    mode="sv"
    theme="classic"
    placeholder="请输入内容..."
    @change="handleChange"
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'
import MarkdownEditor from '@/components/markdownEditor/index.vue'

const content = ref('')
const handleChange = (value) => {
  console.log('内容变化:', value)
}
&lt;/script&gt;</code></pre>
    </div>
  </div>
</template>

<style scoped>
.markdown-demo-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.editor-section {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .markdown-demo-container {
    padding: 1rem;
  }

  .editor-section {
    padding: 1rem;
  }
}
</style>
