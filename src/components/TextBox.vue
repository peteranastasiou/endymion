<script setup lang="ts">
import { computed } from 'vue';
import DebossFrame from './DebossFrame.vue';

const props = defineProps<{
  html?: string;
  linkEnabled?: boolean;
}>();

const emit = defineEmits(['clicked']);

function clicked(e: Event) {
  const t = e.target;
  if (props.linkEnabled && t instanceof HTMLAnchorElement) {
    emit('clicked', t.textContent);
  }
}

const linkClass = computed(() => {
  return props.linkEnabled ? 'linkEnabled' : '';
});
</script>

<template>
  <DebossFrame @click="clicked" :class="linkClass">
    <slot></slot>
    <div v-html="html"></div>
  </DebossFrame>
</template>

<style lang="scss">
a {
  padding: 1px;
}
.linkEnabled {
  a {
    background: rgb(151, 209, 133);
    cursor: pointer;
  }

  @media (hover: hover) {
    a:hover {
      background-color: rgb(163, 223, 144);
    }
  }
}
</style>
