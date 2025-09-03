<script setup>

</script>

<template>
  <div class="header flex flex-row justify-between items-center bg-black">
    <slot name="left">
      <div class="left">
        <div class="border bg-red rounded-12px p-l-2 p-r-2 p-t-1 p-b-1 m-l-3 c-white">
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

<style scoped></style>
