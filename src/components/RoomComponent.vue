<script setup lang="ts">
import DebossFrame from './DebossFrame.vue';
import { rooms, type Room } from '@/game/rooms';
import { reactive, ref } from 'vue';
// defineProps<{
//   msg: string;
// }>();

const state = reactive({
  room: rooms['isolatedCrypt']!,
});

const title = state.room.title;
const description = state.room.describe();

const goSouth = () => {
  console.log('South');
};

const rock = () => {
  console.log('Rock');
};
</script>

<template>
  <div class="container">
    <DebossFrame class="description">
      <h2>{{ title }}</h2>
      <p v-html="description"></p>
    </DebossFrame>
    <DebossFrame class="output">
      <p>-</p>
    </DebossFrame>
    <DebossFrame class="verbs">
      <div class="verb-container">
        <p><a>Give</a></p>
        <p><a>Pick up</a></p>
        <p><a>Use</a></p>
        <p><a>Open</a></p>
        <p><a>Look at</a></p>
        <p><a>Push</a></p>
        <p><a>Close</a></p>
        <p><a>Drop</a></p>
        <p><a>Talk to</a></p>
      </div>
    </DebossFrame>
    <DebossFrame class="inventory">
      <div class="inventory-container">
        <p><a>Shrunken head</a></p>
        <p><a>Dirk</a></p>
      </div>
    </DebossFrame>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: grid;
  grid-template-areas:
    'description description'
    'output output'
    'verbs inventory';
  grid-template-columns: 1fr 1.5fr;
  grid-template-rows: 2fr 0fr 1fr;
  gap: 14px;

  .description {
    grid-area: description;
  }

  .output {
    grid-area: output;
  }

  .verbs {
    grid-area: verbs;
  }

  .inventory {
    grid-area: inventory;
  }
}

.verb-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.inventory-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
