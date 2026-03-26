export function capitalise(s: string): string {
  if (s.length == 0) return s;

  return s[0]?.toUpperCase() + s.slice(1);
}

export function conjunction(list: string[], prefix?: string, suffix?: string): string {
  if (list.length == 0) return '';

  const res = listize_(list);
  return (prefix ?? '') + res + (suffix ?? '');
}

function listize_(list: string[]): string {
  if (list.length == 1) {
    return list[0]!;
  }
  return list.slice(0, -1).join(', ') + ' and ' + list.slice(-1);
}
