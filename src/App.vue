<script setup lang="ts">
import RoomComponent from './components/RoomComponent.vue';
import { restore } from './game/state';

// initialise from previous game:
restore();
</script>

<template>
  <RoomComponent />
</template>
