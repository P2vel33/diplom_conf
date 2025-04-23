export function isValidWildcardMask(wildcardMask: string): boolean {
  // Разбиваем маску на октеты
  const octets = wildcardMask.split(".").map(Number);

  // Проверяем, что маска состоит из 4 октетов
  if (octets.length !== 4) {
    return false; // неверное количество октетов
  }

  // Проверяем каждый октет
  for (const octet of octets) {
    if (isNaN(octet) || octet < 0 || octet > 255) {
      return false; // Неверные значения
    }
  }

  // Проверяем, чтобы в обратной маске не было "разрешающих" значений
  // Чтобы получить допустимые значения обратной маски, нужно вычесть значения из 255
  const standardMask = octets.map((octet) => 255 - octet);

  // Проверяем, не содержится ли в стандартной маске недопустимое значение
  const isValidStdMask = standardMask.every((value) => {
    // Сетевые маски: 0, 128, 192, 224, 240, 248, 252, 254, 255
    const validNetworkMasks = [0, 128, 192, 224, 240, 248, 252, 254, 255];
    return validNetworkMasks.includes(value);
  });

  return isValidStdMask;
}
