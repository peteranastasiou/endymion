import { ref, type Ref } from 'vue';
import { setItemPickedUp, type ItemName } from './item';
import { load, save } from './persistence';
import { engine } from './engine';

let inv: Ref<ItemName[]> = ref(['shrunken head', 'dirk']);

export function getInventoryRef(): Ref<string[]> {
  return inv;
}

export function addInventory(item: ItemName, msg?: string): string {
  if (isInInventory(item)) {
    return 'Its already on your person.';
  }
  inv.value = [...inv.value, item];
  saveInventoryState();

  // Ensure it is marked as picked up
  setItemPickedUp(item, engine.getRoomName());

  return msg ?? `You pick up the ${item}`;
}

export function isInInventory(item: ItemName): boolean {
  return inv.value.includes(item);
}

export function removeInventory(item: ItemName) {
  inv.value = inv.value.filter((e) => e != item);
  saveInventoryState();
}

function saveInventoryState() {
  save('inv', inv.value);
}

export function restoreInventoryState() {
  const value = load('inv');
  if (value !== null) {
    inv.value = value;
  }
}
