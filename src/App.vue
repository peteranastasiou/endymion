<script setup lang="ts">
import RoomComponent from './components/RoomComponent.vue';
import { engine } from './game/engine';
import { restoreInventoryState } from './game/inventory';
import { restoreItemState } from './game/item';
import { clear, load, save } from './game/persistence';

// Restore previously stored state
if (load('slot')) {
  console.info('Restoring...');
  engine.restoreRoomState();
  restoreItemState();
  restoreInventoryState();
} else {
  // New game
  save('slot', { version: 1, slotNum: 1 });
}

function restart() {
  // Discard saved game
  clear();
  // Dirty hack to re-init:
  window.location.reload();
}
</script>

<template>
  <RoomComponent />
  <div class="menubar"><a @click="restart">Restart</a></div>
</template>

<style lang="scss">
.menubar {
  display: grid;
  position: absolute;
  left: 5px;
  top: 5px;

  a {
    padding: 1px 5px;
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
