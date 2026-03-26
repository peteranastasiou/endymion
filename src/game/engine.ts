import { ref, type Ref } from 'vue';
import { rooms, type Room, type RoomName } from './rooms';
import { actionInvalid, type Action } from './action';
import { isItem, itemPickedUp, type ItemName } from './item';
import { conjunction } from './fmt';

export namespace engine {
  let room: Ref<Room> = ref(rooms['isolatedCrypt']!);
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
    if (room.value.dumpedItems?.length) {
      res +=
        '<br>Dumped on the ground there is ' +
        conjunction(room.value.dumpedItems, '<a>%s</a>') +
        '.';
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

    // Ensure it is marked as picked up
    itemPickedUp.add(item);

    // If it was a dumped item, ensure that is removed too:
    if (room.value.dumpedItems?.includes(item)) {
      room.value.dumpedItems = room.value.dumpedItems.filter((e) => e != item);
    }

    return msg ?? `You pick up the ${item}`;
  }

  function isInInventory(item: ItemName): boolean {
    return inv.value.includes(item);
  }

  function removeInventory(item: ItemName) {
    inv.value = inv.value.filter((e) => e != item);
  }

  function dumpItem(item: ItemName) {
    if (!room.value.dumpedItems) {
      room.value.dumpedItems = [];
    }
    room.value.dumpedItems.push(item);
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
          dumpItem(item);
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
