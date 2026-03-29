import { engine } from './engine';
import { restoreItemState, saveItemState } from './item';
// Game State is:
// - room[].dumpedItems
// - inventory
// - items picked up
// - current room name
// - state flags

type SaveKey = 'inv' | 'itemPickedUp' | 'flags' | 'currentRoom' | 'dumped';

export function init() {
  // TODO set new game state
}

// Restore previously stored state
export function restore(): void {
  console.info('Restoring...');
  restoreItemState();
  engine.restoreInventoryState();
}

export function save(key: SaveKey, value: object) {
  const str = JSON.stringify(value);
  console.info(`Saving [${key}]: ${str}`);
  localStorage.setItem(key, str);
}

export function load(key: SaveKey) {
  const str = localStorage.getItem(key);
  console.info(`Loading [${key}]: ${str}`);
  if (!str) {
    console.error(`Could not load data for ${key}`);
    return null;
  } else {
    const val = JSON.parse(str);
    console.info(val);
    return val;
  }
}
