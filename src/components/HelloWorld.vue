<template>
  <div class="container">
    <div class="deboss-panel description">
      <div class="deboss-border">
        <h2>{{ msg }}</h2>
        <p>You find yourself in a small crypt in the middle of a forest.</p>
        <p>It's cold and damp but feels somehow comfortable.</p>
        <p>There is a <a @click="rock">round rock</a> in the corner.</p>
        <p>The door of the crypt is to the <a @click="goSouth">south</a>.</p>
      </div>
    </div>
    <div class="deboss-panel output">
      <div class="deboss-border"><p>-</p></div>
    </div>
    <div class="deboss-panel verbs">
      <div class="deboss-border verb-container">
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
    </div>
    <div class="deboss-panel inventory">
      <div class="deboss-border inventory-container">
        <p><a>Shrunken head</a></p>
        <p><a>Dirk</a></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-areas:
    'description description'
    'output output'
    'verbs inventory';
  grid-template-columns: 1fr 1.5fr;
  grid-template-rows: 1.5fr 0fr 1fr;
  gap: 14px;
}

.verb-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.inventory-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

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
</style>

<script setup lang="ts">
defineProps<{
  msg: string;
}>();

const goSouth = () => {
  console.log('South');
};

const rock = () => {
  console.log('Rock');
};
</script>
