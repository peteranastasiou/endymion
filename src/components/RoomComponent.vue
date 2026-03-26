<script setup lang="ts">
import TextBox from './TextBox.vue';
import type { Action, Verb } from '@/game/action';
import { reactive, computed } from 'vue';
import { engine } from '@/game/engine';
import { capitalise } from '../game/fmt';

// Current room reference and derived state
const room = engine.getRoomRef();
const title = computed(() => room.value.title);
const description = engine.getDescriptionRef();

const inventory = engine.getInventoryRef();

// TODO preview output on hover, clear on hover-off

// UI state
enum InputState {
  VERB = 'verb',
  OBJECT = 'object',
  WITH_OBJECT = 'with-object',
}

interface GameState {
  inputState: InputState;
  output: string;
  action: Action;
}

const state = reactive<GameState>({
  inputState: InputState.VERB,
  output: '',
  action: {},
});

function verbClick(name: string) {
  state.output = '';
  const verb = name as Verb;
  if (state.inputState != InputState.VERB && verb === state.action.verb) {
    // Special case: clear action
    state.action = {};
    state.inputState = InputState.VERB;
    return;
  }

  state.action = { verb };
  if (state.action.verb === 'Use') {
    state.action.with = 'with';
  }
  if (state.action.verb === 'Give') {
    state.action.with = 'to';
  }

  state.inputState = InputState.OBJECT;
}

function nounClick(name: string) {
  if (state.inputState === InputState.OBJECT) {
    if (!state.action.object) {
      state.action.object = name;
      if (!state.action.with) {
        state.output = engine.handleInput(state.action);
        state.inputState = InputState.VERB;
      } else if (state.action.verb == 'Use') {
        // TODO Fire off tentative action here - user may want to "use with"
      }
    } else {
      state.action.withObject = name;
      state.output = engine.handleInput(state.action);
      state.inputState = InputState.VERB;
    }
  }
}

// Initial update
engine.update();

/**
 * TODO split into 4 components for the different parts
 */
</script>

<template>
  <div class="container">
    <TextBox
      class="description"
      :html="description"
      @clicked="nounClick"
      :linkEnabled="state.inputState === 'object'"
    >
      <h2>{{ title }}</h2>
    </TextBox>
    <TextBox class="output">
      <p style="height: 48px">
        ➤ {{ state.action.verb }} {{ state.action.object }}
        {{
          state.action.object && state.action.with
            ? `${state.action.with} ${state.action.withObject ?? ''}`
            : ''
        }}
        <br />
        {{ state.output }}
      </p>
    </TextBox>
    <TextBox class="verbs" @clicked="verbClick" linkEnabled>
      <div class="verb-container">
        <p><a>Give</a></p>
        <p><a>Pick up</a></p>
        <p><a>Use</a></p>
        <p><a>Open</a></p>
        <p><a>Look at</a></p>
        <p><a>Push</a></p>
        <p><a>Close</a></p>
        <p><a>Drop</a></p>
        <p><a>Pull</a></p>
        <p><a>Talk to</a></p>
        <p><a>Go</a></p>
        <p><a>Attack</a></p>
      </div>
    </TextBox>
    <TextBox class="inventory" @clicked="nounClick" :linkEnabled="state.inputState === 'object'">
      <div class="inventory-container">
        <p v-for="item in inventory">
          <a>{{ capitalise(item) }}</a>
        </p>
      </div>
    </TextBox>
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
