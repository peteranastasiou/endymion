import { ref, type Ref } from 'vue';
import { rooms, type Room, type RoomName } from './rooms';
import { actionInvalid, type Action } from './action';
import { isItem, itemPickedUp, type ItemName } from './item';

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
    description.value = room.value.describe();
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
    if (inv.value.includes(item)) {
      return 'Its already on your person.';
    }
    inv.value = [...inv.value, item];
    itemPickedUp.add(item);
    return msg ?? `You pick up the ${item}`;
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
    if (action.verb == 'Pick up') {
      const item = action.object?.toLowerCase();
      if (isItem(item)) {
        return addInventory(item);
      }
    }

    // Unhandled:
    return actionInvalid(action);
  }
}
