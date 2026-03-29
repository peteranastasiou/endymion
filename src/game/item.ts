import { capitalise } from './fmt';
import { type RoomName } from './rooms';
import { load, save } from './state';

/**
 * Define item behaviour here
 */
const items = {
  'round rock': {},
  'shrunken head': {},
  dirk: {},
};

export type ItemName = keyof typeof items;

let itemsPickedUp = new Set<ItemName>();
let itemsDumped = new Map<RoomName, ItemName[]>();

export function isItem(name?: string): name is ItemName {
  if (!name) return false;
  return items.hasOwnProperty(name);
}

export function isItemPickedUp(item: ItemName) {
  return itemsPickedUp.has(item);
}

export function getDumpedItems(roomName: RoomName): ItemName[] {
  return itemsDumped.get(roomName) || [];
}

export function dumpItem(item: ItemName, roomName: RoomName) {
  console.log('dump Item:', item);
  const items = itemsDumped.get(roomName);
  if (items) {
    items.push(item);
  } else {
    itemsDumped.set(roomName, [item]);
  }
  console.log(itemsDumped);

  // State changed, save it
  saveItemState();
}

export function setItemPickedUp(item: ItemName, roomName: RoomName) {
  // Add to picked up set so its no longer shown in original location
  itemsPickedUp.add(item);

  // Remove from dumped list in case it was dumped
  const dumped = itemsDumped.get(roomName);
  if (dumped) {
    itemsDumped.set(
      roomName,
      dumped.filter((e) => e !== item),
    );
  }

  // State changed, save it
  saveItemState();
}

export function saveItemState() {
  save('itemPickedUp', [...itemsPickedUp]);
  save('dumped', [...itemsDumped]);
}

export function restoreItemState() {
  {
    const value = load('itemPickedUp');
    if (value) {
      itemsPickedUp = new Set(value);
    }
  }
  {
    const value = load('dumped');
    if (value) {
      itemsDumped = new Map(value);
    }
  }
}

/**
 * Helper for listing items in rooms
 * @param name name of item
 * @param desc Description of item in place with %s (or %S to capitalise) where item name should be.
 */
export function item(name: ItemName, desc: string): string {
  // First, check if item is still there
  if (isItemPickedUp(name)) {
    return ''; // Don't show the item, it's not here anymore
  }

  // Format
  if (desc.includes('%S')) {
    return '<br>' + desc.replace('%S', `<a>${capitalise(name)}</a>`) + '<br>';
  } else {
    return '<br>' + desc.replace('%s', `<a>${name}</a>`) + '<br>';
  }
}
