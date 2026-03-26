/**
 * Room definitions
 */

import { actionMatch, type Action } from './action';
import { engine } from './engine';
import { item, type ItemName } from './item';

export interface Room {
  title: string;
  describe(): string;
  handleInput?(action: Action): string | undefined;
  dumpedItems?: ItemName[];
}

export const rooms = {
  isolatedCrypt: {
    title: 'Isolated Crypt',
    describe() {
      return (
        `You find yourself in a small crypt in the middle of a forest.
        It's cold and damp but feels somehow comfortable. ` +
        item('round rock', 'There is a %s in the corner.') +
        `The door of the crypt is to the <a>south</a>.`
      );
    },
    handleInput(a: Action) {
      if (actionMatch(a, 'Go', 'south')) {
        engine.setNextRoom('graveyard');
        return 'You push past the heavy crypt door into the graveyard';
      }
    },
  },
  graveyard: {
    title: 'Graveyard',
    describe() {
      return 'You are in the graveyard.<br>An isolated crypt lies to the <a>north</a>';
    },
    handleInput(a: Action) {
      if (actionMatch(a, 'Go', 'north')) {
        engine.setNextRoom('isolatedCrypt');
        return 'You push past the heavy crypt door';
      }
    },
  },
} satisfies Record<string, Room>;

export type RoomName = keyof typeof rooms;
