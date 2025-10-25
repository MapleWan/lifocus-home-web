<script setup>
import Header from './components/Header.vue'
import SiderBar from './components/SiderBar.vue'
import BarItem from './components/BarItem.vue'
import { useRouter } from 'vue-router'
import useUserStore from '@/stores/user'
import { ref } from 'vue'

const pageList = ref([
  { code: 'dashboard', title: '主页', routerPath: '/' },
  { code: 'note', title: '笔记', routerPath: '/note' },
  { code: 'daily', title: '日常', routerPath: '/daily' },
  { code: 'album', title: '相册', routerPath: '/album' },
])

const pageCode2TitleDict = pageList.value.reduce((acc, cur) => {
  acc[cur.code] = cur.title
  return acc
}, {})
const currentPage = ref('dashboard')
const router = useRouter()
currentPage.value = router.currentRoute.value.name
const userStore = useUserStore()

const jump = (item) => {
  currentPage.value = item.code
  router.push(item.routerPath)
}
const more = () => {
  console.log('更多')
}
</script>

<template>
  <div class="flex layout-container">
    <SiderBar class="w-220px flex h-full flex-col p-4 glass-effect">
      <template #header>
        <div class="logo flex items-center justify-start">
          <img src="/favicon.jpg" alt="logo" class="w-24px h-24px rounded-2 m-r-4" />
          <div class="c-[var(--foreground-color)] font-700 line-height-6">
            {{ userStore.userInfo?.username || '未登录' }}
          </div>
        </div>
      </template>

      <template #content>
        <template v-for="item in pageList" :key="item.code">
          <bar-item
            :code="item.code"
            :title="item.title"
            :router-path="item.routerPath"
            :is-active="currentPage === item.code"
            @click="jump(item)"
          />
        </template>
      </template>
      <template #footer>
        <bar-item code="more" title="更多" @click="more" />
      </template>
    </SiderBar>
    <div
      class="w-[calc(100%-220px)] p-4 border-[var(--border-color)] border-l-[2px] border-l-solid"
    >
      <Header>
        <template #left>
          <div class="c-[var(--foreground-color)] flex items-center gap-2">
            <div class="w-[4px] h-[16px] bg-[var(--foreground-color)] rounded-xl md:block"></div>
            <div class="flex flex-row items-center gap-1">
              <div class="font-900 font-size-5 select-none">
                {{ pageCode2TitleDict[currentPage] }}
              </div>
            </div>
          </div>
        </template>
        <template #center>
          <div></div>
        </template>
        <template #right>
          <div class="c-[var(--foreground-color)]">【 TODO 】</div>
        </template>
      </Header>
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.layout-container {
  /* background-image: linear-gradient(to right, #434343 0%, black 100%); */
  background: linear-gradient(90deg, #020003, #150022, #291c0d);
  background-size: 300% 300%;
  animation: gradient 6s alternate infinite;
  /* position: absolute;
  top: 0;
  left: 0; */
  height: 100vh;
  /* width: 100%; */
}

@keyframes gradient {
  0% {
    background-position: 0%;
  }

  100% {
    background-position: 100%;
  }
}
</style>
