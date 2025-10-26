<template>
  <div
    class="divider m-y-2"
    :class="{
      'divider-horizontal': type === 'horizontal',
      'divider-vertical': type === 'vertical',
      'divider-solid': lineStyle === 'solid',
      'divider-dashed': lineStyle === 'dashed',
    }"
  ></div>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'horizontal', // horizontal, vertical
  },
  lineStyle: {
    type: String,
    default: 'solid', // solid, dashed
  },
})
</script>

<style scoped>
.divider {
  flex-shrink: 0;
}

.divider-horizontal {
  width: 100%;
  height: 1px;
}

.divider-vertical {
  width: 1px;
  height: 100%;
}

.divider-solid {
  background-color: var(--border-color, #e0e0e0);
}

.divider-dashed {
  background: linear-gradient(to right, var(--border-color, #e0e0e0) 50%, transparent 50%);
  background-size: 10px 1px;
  background-repeat: repeat-x;
}

.divider-vertical.divider-dashed {
  background: linear-gradient(to bottom, var(--border-color, #e0e0e0) 50%, transparent 50%);
  background-size: 1px 10px;
  background-repeat: repeat-y;
}
</style>
