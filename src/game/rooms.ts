/**
 * Room definitions
 */

import type { Action } from './action';

export interface Room {
  title: string;
  describe(): string;
  describeExit?(): string;
  handleInput?(action: Action): string;
}

export const rooms: Record<string, Room> = {
  isolatedCrypt: {
    title: 'Isolated Crypt',
    describe() {
      return `You find yourself in a small crypt in the middle of a forest.
        It's cold and damp but feels somehow comfortable. <br>
        There is a <a>round rock</a> in the corner. <br>
        The door of the crypt is to the <a>south</a>.`;
    },
    handleInput(action: Action) {
      return '';
    },
  },
  graveyard: {
    title: 'Graveyard',
    describe() {
      return '';
    },
    handleInput(action: Action) {
      return '';
    },
  },
};
