import { computed, ref, type Ref } from 'vue';
import { rooms, type Room, type RoomName } from './rooms';
import { actionInvalid, type Action } from './action';
import { dumpItem, getDumpedItems, isItem, setItemPickedUp, type ItemName } from './item';
import { conjunction } from './fmt';
import { load, save } from './state';

export namespace engine {
  let roomName: Ref<RoomName> = ref('isolatedCrypt');
  let room: Ref<Room> = computed(() => rooms[roomName.value]);
  let inv: Ref<ItemName[]> = ref(['shrunken head', 'dirk']);
  let nextRoom: Room | null = null;
  let description: Ref<string> = ref('');

  export function update(): void {
    if (nextRoom) {
      room.value = nextRoom;
      nextRoom = null;
    }
    // Refresh the room description every time
    description.value = describeRoom();
  }

  function describeRoom(): string {
    let res = room.value.describe();
    const dumped = getDumpedItems(roomName.value);
    if (dumped.length) {
      res += '<br>Lying on the ground there is ' + conjunction(dumped, '<a>%s</a>') + '.';
    }
    return res;
  }

  export function getRoom(): Room {
    return room.value;
  }

  export function getRoomRef(): Ref<Room> {
    return room;
  }

  export function getDescriptionRef(): Ref<string> {
    return description;
  }

  export function setNextRoom(roomName: RoomName) {
    console.info(`Next room is ${roomName}`);
    nextRoom = rooms[roomName]!;
  }

  export function addInventory(item: ItemName, msg?: string): string {
    if (isInInventory(item)) {
      return 'Its already on your person.';
    }
    inv.value = [...inv.value, item];
    saveInventoryState();

    // Ensure it is marked as picked up
    setItemPickedUp(item, roomName.value);

    return msg ?? `You pick up the ${item}`;
  }

  export function saveInventoryState() {
    save('inv', inv.value);
  }

  export function restoreInventoryState() {
    const value = load('inv');
    if (value !== null) {
      inv.value = value;
    }
  }

  function isInInventory(item: ItemName): boolean {
    return inv.value.includes(item);
  }

  function removeInventory(item: ItemName) {
    inv.value = inv.value.filter((e) => e != item);
    saveInventoryState();
  }

  export function getInventoryRef(): Ref<string[]> {
    return inv;
  }

  export function handleInput(action: Action): string {
    console.info(`${room.value.title} is handling ${JSON.stringify(action)}`);
    const output = inputHandler(action);

    // Step the game. TODO where does this belong!
    update();
    return output;
  }

  function inputHandler(action: Action): string {
    // Room handler:
    const output = room.value.handleInput ? room.value.handleInput(action) : undefined;
    if (output != undefined) {
      return output;
    }

    // Fall through to default handlers:
    const item = action.object?.toLowerCase();
    if (isItem(item)) {
      if (action.verb == 'Pick up') {
        return addInventory(item);
      }
      if (action.verb == 'Drop') {
        if (isInInventory(item)) {
          dumpItem(item, roomName.value);
          removeInventory(item);
          return `You dump the ${item}`;
        } else {
          return "You aren't holding it";
        }
      }
    }
    // Unhandled:
    return actionInvalid(action);
  }
}
