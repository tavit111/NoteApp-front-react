export function toggleArray(items, lastItem) {
  if (!lastItem) return items[0];

  const index = items.indexOf(lastItem);
  const lastIndex = items.length - 1;

  if (index === lastIndex) return items[0];

  return items[index + 1];
}
