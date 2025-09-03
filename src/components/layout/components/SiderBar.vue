<script setup>

</script>

<template>
  <div class="side-bar h-full flex flex-col justify-between">
    <div class="content flex flex-col justify-start">
      <slot name="content">
        1
      </slot>
    </div>
    <div class="footer">
      <slot name="footer">
        2
      </slot>
    </div>
  </div>
</template>

<style scoped></style>
