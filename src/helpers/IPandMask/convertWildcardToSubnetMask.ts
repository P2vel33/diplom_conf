export function convertWildcardToSubnetMask(
  wildcardMask: string
): string | null {
  // Разбиваем маску на октеты
  const octets = wildcardMask.split(".").map(Number);

  // Проверяем, что маска состоит из 4 октетов
  if (
    octets.length !== 4 ||
    octets.some((octet) => isNaN(octet) || octet < 0 || octet > 255)
  ) {
    return null; // Ошибка, неверный формат
  }

  // Вычисляем стандартную маску
  const subnetMask = octets.map((octet) => 255 - octet);

  // Составляем результат в строку
  return subnetMask.join(".");
}
