<template>
  <div class="parent h-full flex flex-col bg-yellow overflow-hidden relative">
    <div class="bg-blue">
      1234<br />
      1234<br />
      1234<br />
      1234<br />
    </div>

    <div class="child flex-1 overflow-hidden">
      <div class="h-full overflow-y-scroll">
        <div v-for="item in 100" :key="item">这是{{ item }} 行</div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
