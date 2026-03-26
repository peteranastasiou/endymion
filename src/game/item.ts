import { capitalise } from './fmt';

/**
 * Define item behaviour here
 */
const items = {
  'round rock': {},
  'shrunken head': {},
  dirk: {},
};

export type ItemName = keyof typeof items;

export const itemPickedUp = new Set<ItemName>();

export function isItem(name?: string): name is ItemName {
  if (!name) return false;
  return items.hasOwnProperty(name);
}

/**
 * Helper for listing items in rooms
 * @param name name of item
 * @param desc Description of item in place with %s (or %S to capitalise) where item name should be.
 */
export function item(name: ItemName, desc: string): string {
  // First, check if item is still there
  console.log(JSON.stringify(itemPickedUp));
  if (itemPickedUp.has(name)) {
    return ''; // Don't show the item, it's not here anymore
  }

  // Format
  if (desc.includes('%S')) {
    return '<br>' + desc.replace('%S', `<a>${capitalise(name)}</a>`) + '<br>';
  } else {
    return '<br>' + desc.replace('%s', `<a>${name}</a>`) + '<br>';
  }
}
