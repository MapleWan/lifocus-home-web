<script setup>
import Header from './components/Header.vue';
import SiderBar from './components/SiderBar.vue';
import BarItem from './components/Bar-Item.vue';
import { useRouter } from 'vue-router';
import useUserStore from '@/stores/user';
import { ref } from 'vue';

const pageList = ref([
  { code: "dashboard", title: "主页", routerPath: "/" },
  { code: "todo", title: "TODO", routerPath: "/todo" },
  { code: "album", title: "相册", routerPath: "/album" },
  { code: "markdown", title: "Markdown 编辑器", routerPath: "/markdown" },
  // {code: "dashboard", title: "主页", routerPath: "/"},
])
const currentPage = ref("dashboard")
const router = useRouter()
currentPage.value = router.currentRoute.value.name
const userStore = useUserStore()

const jump = (item) => {
  currentPage.value = item.code
  router.push(item.routerPath)
}
const more = () => {
  console.log("更多")
}
</script>

<template>
  <div class="bg-black h-[calc(100vh-48px)] p-6 flex flex-col justify-start layout-container">
    <Header>
      <template #right>
        <div class="c-white">
          {{ userStore.userInfo?.username || '未登录' }}
        </div>
      </template>
    </Header>
    <div class="flex h-full m-t-3">
      <SiderBar class="w-30% m-r-3 h-full">
        <template #content>
          <template v-for="item in pageList" :key="item.code">
            <bar-item :code="item.code" :title="item.title" :router-path="item.routerPath"
              :is-active="currentPage === item.code" @click="jump(item)" />
          </template>
        </template>
        <template #footer>
          <bar-item code="more" title="更多" @click="more" />
        </template>
      </SiderBar>
      <div class="flex-1">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout-container {
  background-image: linear-gradient(to right, #434343 0%, black 100%);
}
</style>
