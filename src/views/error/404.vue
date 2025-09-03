<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full px-6 py-8">
      <div class="text-center">
        <!-- 404 数字 -->
        <div class="mb-8">
          <h1 class="text-9xl font-bold text-gray-300 select-none">404</h1>
        </div>

        <!-- 图标 -->
        <div class="mb-6">
          <div class="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
            <svg class="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-1.01-6-2.709V10.5A1.5 1.5 0 007.5 9h9a1.5 1.5 0 011.5 1.5v1.791zM15 10V9a3 3 0 00-3-3v0a3 3 0 00-3 3v1m12 0v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
          </div>
        </div>

        <!-- 标题和描述 -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">页面不存在</h2>
          <p class="text-gray-600 mb-2">抱歉，您访问的页面不存在或已被移除</p>
          <p class="text-sm text-gray-500">请检查网址是否正确，或者返回首页继续浏览</p>
        </div>

        <!-- 操作按钮 -->
        <div class="space-y-4">
          <t-button theme="primary" size="large" block @click="goBack">
            返回上一页
          </t-button>

          <t-button variant="outline" size="large" block @click="goHome">
            回到首页
          </t-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Button as TButton } from 'tdesign-vue-next'
const router = useRouter()

// 返回上一页
const goBack = () => {
  // 如果有历史记录，返回上一页，否则回到首页
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/dashboard')
  }
}

// 回到首页
const goHome = () => {
  router.push('/dashboard')
}
</script>

<style scoped>
/* 添加一些动画效果 */
.fade-in {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 悬停效果 */
.hover-scale {
  transition: transform 0.2s ease;
}

.hover-scale:hover {
  transform: scale(1.05);
}
</style>
