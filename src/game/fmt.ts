export function capitalise(s: string): string {
  if (s.length == 0) return s;

  return s[0]?.toUpperCase() + s.slice(1);
}

export function conjunction(list: string[], format?: string): string {
  if (list.length == 0) return '';

  if (format) {
    list = list.map((e) => format.replace('%s', e));
  }

  if (list.length == 1) {
    return 'a ' + list[0];
  }
  return 'a ' + list.slice(0, -1).join(', a ') + ' and a ' + list.slice(-1);
}
