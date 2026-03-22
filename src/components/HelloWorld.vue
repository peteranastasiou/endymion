<template>
  <div class="deboss-panel">
    <div class="deboss-border-bl"></div>
    <div class="deboss-border-br"></div>
    <h2>{{ msg }}</h2>
    <p>You find yourself in a small crypt in the middle of a forest.</p>
    <p>It's cold and damp but feels somehow comfortable.</p>
    <p>The door of the crypt is to the south.</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>
