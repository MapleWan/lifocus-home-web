<script setup>
import TodoHeader from './components/TodoHeader.vue';
import TodoEditor from './components/TodoEditor.vue';
import TodoContent from './components/TodoContent.vue';
</script>

<template>
  <div class="todo">
    <TodoHeader class="m-b-4" />
    <TodoEditor class="m-b-4" />
    <TodoContent />
  </div>
</template>

<style scoped></style>
