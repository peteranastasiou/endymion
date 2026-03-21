<template>
  <div class="deboss-panel">
    <div class="deboss-border-tl"></div>
    <div class="deboss-border-tr"></div>
    <div class="deboss-border-bl"></div>
    <div class="deboss-border-br"></div>
    <h1 class="green">{{ msg }}</h1>
    <h3>You’ve successfully created a project</h3>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>
