import { computed, ref, type Ref } from 'vue';
import { rooms, type Room, type RoomName } from './rooms';
import { actionInvalid, type Action } from './action';
import { dumpItem, getDumpedItems, isItem, setItemPickedUp, type ItemName } from './item';
import { conjunction } from './fmt';
import { load, save } from './persistence';
import { addInventory, isInInventory, removeInventory } from './inventory';

export namespace engine {
  let roomName: Ref<RoomName> = ref('isolatedCrypt');
  let room: Ref<Room> = computed(() => rooms[roomName.value]);
  let nextRoom: RoomName | null = null;
  let description: Ref<string> = ref('');

  export function update(): void {
    if (nextRoom) {
      roomName.value = nextRoom;
      console.info(`Move to next room: ${roomName.value} ${room.value.title}`);
      nextRoom = null;
      saveRoomState();
    }
    // Refresh the room description every time
    description.value = describeRoom();
  }

  function describeRoom(): string {
    let res = room.value.describe();
    const dumped = getDumpedItems(roomName.value);
    if (dumped.length) {
      res.push('Lying on the ground there is ' + conjunction(dumped, '<a>%s</a>') + '.');
    }
    return res.filter((s) => s).join('<br>');
  }

  export function getRoomName(): RoomName {
    return roomName.value;
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
    nextRoom = roomName;
  }

  export function saveRoomState() {
    save('currentRoom', roomName.value);
  }

  export function restoreRoomState() {
    const currRoom = load('currentRoom') as RoomName;
    if (currRoom) {
      roomName.value = currRoom;
    }
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
