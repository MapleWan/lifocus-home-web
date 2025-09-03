<script setup>
import dashboard from "@/assets/sideBarIcons/dashboard.svg"
import album from "@/assets/sideBarIcons/album.svg"
import more from "@/assets/sideBarIcons/more.svg"
import todo from "@/assets/sideBarIcons/todo.svg"
import { computed } from "vue"
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
    default: false
  }
});

const isActive = computed(() => props.isActive)
const dynamicComponent = computed(() => {
  switch (props.code) {
    case 'dashboard':
      return dashboard;
    case 'album':
      return album;
    case 'more':
      return more;
    case 'todo':
      return todo;
    default:
      return dashboard;
  }
});

</script>

<template>
  <div class="bar-item flex items-center p-2 p-l-5 p-r-5 m-3 rounded-4 cursor-pointer" :class="{ active: isActive }">
    <slot name="icon">
      <div class="w-6 h-6">
        <component :is="dynamicComponent" class="w-full h-full c-white" />
      </div>
    </slot>
    <slot name="title">
      <div class="m-l-2 font-size-5 c-white font-500">
        {{ props.title || "主页" }}
      </div>
    </slot>
  </div>
</template>

<style scoped>
.active {
  background-color: #141414;
}
</style>
