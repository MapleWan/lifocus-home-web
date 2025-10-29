<script setup>
import dashboard from '@/assets/sideBarIcons/dashboard.svg'
import album from '@/assets/sideBarIcons/album.svg'
import more from '@/assets/sideBarIcons/more.svg'
import todo from '@/assets/sideBarIcons/todo.svg'
import note from '@/assets/sideBarIcons/note.svg'
import daily from '@/assets/sideBarIcons/daily.svg'
import { computed } from 'vue'
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  routerPath: {
    type: String,
    default: '/',
  },
  code: {
    type: String,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  isCollapsed: {
    type: Boolean,
    default: false,
  },
})

const isActive = computed(() => props.isActive)
const dynamicComponent = computed(() => {
  switch (props.code) {
    case 'dashboard':
      return dashboard
    case 'album':
      return album
    case 'more':
      return more
    case 'todo':
      return todo
    case 'note':
      return note
    case 'daily':
      return daily
    default:
      return dashboard
  }
})
</script>

<template>
  <div
    class="c-[var(--foreground-color)] p-y-2 p-2 flex flex-row items-center cursor-pointer gap-2 hover:bg-[var(--hover)] rounded-xl !transition-all gap-1"
    :class="{ active: isActive }"
  >
    <slot name="icon">
      <div
        class="w-6 h-6 flex-shrink-0 transition-all duration-200 ease-in-out"
        :title="props.title"
      >
        <component :is="dynamicComponent" class="w-full h-full" />
      </div>
    </slot>
    <slot name="title">
      <div
        class="m-l-2 font-size-4 font-600 line-height-6 transition-all duration-200 ease-in-out overflow-hidden whitespace-nowrap"
        :class="{ 'w-0 opacity-0': isCollapsed, 'w-auto opacity-100': !isCollapsed }"
      >
        {{ props.title || '主页' }}
      </div>
    </slot>
  </div>
</template>

<style scoped>
.active {
  /* background-color: #141414; */
  /* background-image: linear-gradient(to right, #868f96 0%, #596164 100%); */
  background: var(--foreground-color);
  color: var(--background-color);
}
</style>
