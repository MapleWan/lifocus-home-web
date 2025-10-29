<script setup></script>

<template>
  <div class="side-bar h-full flex flex-col justify-between">
    <div class="header">
      <slot name="header"> header </slot>
    </div>
    <div class="content flex flex-col justify-start flex-1 m-t-4 gap-1">
      <slot name="content"> content </slot>
    </div>
    <div class="footer">
      <slot name="footer"> footer </slot>
    </div>
    />
  </div>
</template>

<style scoped></style>
