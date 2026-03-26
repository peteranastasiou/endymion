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
  | 'Pull'
  | 'Close'
  | 'Drop'
  | 'Talk to'
  | 'Go'
  | 'Attack';

export interface Action {
  verb?: Verb;
  object?: string;
  with?: string;
  withObject?: string;
}

export function actionMatch(a: Action, verb: Verb, object?: string, withObject?: string): boolean {
  if (withObject && a.withObject != withObject) {
    return false;
  }
  if (object && a.object != object) {
    return false;
  }
  return a.verb == verb;
}

export function actionInvalid(a: Action): string {
  switch (a.verb) {
    case 'Go':
      return 'How?';
    case 'Pick up':
      return "You can't pick that up.";
    case 'Use':
      return 'It does nothing.';
    case 'Open':
      return "It can't open.";
    case 'Look at':
      return `Its a ${a.object}.`;
    case 'Push':
      return "It can't be pushed.";
    case 'Pull':
      return "It can't be pulled.";
    case 'Close':
      return "It can't be closed.";
    case 'Drop':
      return "That can't be dropped.";
    case 'Give':
    case 'Talk to':
      return "It doesn't respond.";
    case 'Attack':
      return 'You strike and nothing happens.';
    default:
      return 'What?';
  }
}

export function actionDefault(a: Action): string {
  switch (a.verb) {
    case 'Go':
      return `You walk ${a.object}.`;
    case 'Pick up':
      return `You pick up the ${a.object}.`;
    case 'Use':
      return `You use the ${a.object}.`;
    case 'Open':
      return `The ${a.object} opens.`;
    case 'Look at':
      return `Its a ${a.object}.`;
    case 'Push':
      return `You push the ${a.object}.`;
    case 'Pull':
      return `You pull the ${a.object}.`;
    case 'Close':
      return `You close the ${a.object}.`;
    case 'Drop':
      return `You drop the ${a.object}.`;
    case 'Give':
      return `You give the ${a.object} to ${a.withObject}.`;
    case 'Talk to':
      return `${a.object} acknowledges your presence.`;
    case 'Attack':
      return 'You initiate an attack.';
    default:
      return 'Unknown';
  }
}
