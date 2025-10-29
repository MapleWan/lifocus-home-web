<script setup></script>
<template>
  <div class="header flex flex-row justify-between items-center">
    <slot name="left">
      <div class="left">
        <div class="left-title border rounded-12px p-l-2 p-r-2 p-t-1 p-b-1 m-l-3 c-white">
          LiFocus
        </div>
      </div>
    </slot>
    <slot name="center">
      <div class="center c-white font-700 font-size-8">keep-going</div>
    </slot>
    <slot name="right">
      <div class="right c-white">MapleWan</div>
    </slot>
  </div>
</template>

<style scoped lang="scss">
.left {
  .left-title {
    background-image: linear-gradient(45deg, #874da2 0%, #c43a30 100%);
  }
}
</style>
