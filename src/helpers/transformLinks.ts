export function transformLinks(
  input: Record<string, { source: string; target: string }>
): Record<string, string[]> {
  const result: Record<string, string[]> = {};

  // Проходим по каждому ключу-объекту связи
  for (const key in input) {
    const { source, target } = input[key];

    // Добавляем target в массив для source
    if (!result[source]) {
      result[source] = [];
    }
    result[source].push(target);

    // Если необходимо, можно добавлять и обратные связи (например, двунаправленные)
    // Но по вашему примеру, похоже, достаточно ориентироваться только на source
  }

  // Можно отсортировать массивы, если нужно
  for (const key in result) {
    result[key].sort();
  }

  return result;
}
