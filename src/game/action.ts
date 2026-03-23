/**
 * Action defines a user input as:
 *     <verb>;
 *     <verb> <object>;
 * or  'use' <object> 'with' <withObject>
 */

export type Verb =
  | 'Give'
  | 'Pick up'
  | 'Use'
  | 'Open'
  | 'Look at'
  | 'Push'
  | 'Close'
  | 'Drop'
  | 'Talk to'
  | 'North'
  | 'East'
  | 'South'
  | 'West';

export interface Action {
  verb: Verb;
  object?: string;
  withObject?: string;
}
