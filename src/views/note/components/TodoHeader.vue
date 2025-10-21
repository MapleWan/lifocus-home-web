<script setup>
import refresh from "../assets/refresh.svg"

</script>

<template>
  <div class="todo-header flex justify-between">
    <div class="left w-1/2 flex justify-start ">
      <div class="bg-#7133ea h100% w6px b-rounded m-r-1"></div>
      <slot name="left">
        <div class="c-white font-700">TODO</div>
      </slot>
    </div>
    <div class="right w-1/2 flex justify-end">
      <slot name="right">
        <refresh class="c-white w16px h15px hover:c-#7133ea cursor-pointer" />
      </slot>
    </div>
  </div>
</template>

<style scoped></style>
