// Game State is:
// - room[].dumpedItems
// - inventory
// - items picked up
// - current room name
// - state flags

type SaveKey = 'slot' | 'inv' | 'itemPickedUp' | 'flags' | 'currentRoom' | 'dumped';

export function save(key: SaveKey, value: any) {
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

export function clear() {
  for (const key of ['slot', 'inv', 'itemPickedUp', 'flags', 'currentRoom', 'dumped']) {
    localStorage.removeItem(key);
  }
}
