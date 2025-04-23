export function createIsisNetworkAddress(
  afi: number,
  areaId: number,
  ip: string
): string {
  // Проверка корректности формата IP-адреса
  const ipParts = ip.split(".").map(Number);
  if (ipParts.length !== 4 || ipParts.some((part) => part < 0 || part > 255)) {
    throw new Error("Недействительный IP-адрес. Ожидается IPv4-адрес.");
  }

  // Формируем квадранты
  let firstQuadrant: string;
  let secondQuadrant: string;
  let thirdQuadrant: string;

  // Первый квадрант: первые 3 цифры из первого октета и первая цифра из второго
  firstQuadrant = (
    ipParts[0].toString().padStart(3, "0") + ipParts[1].toString().charAt(0)
  ).substring(0, 4);

  // Второй квадрант: оставшиеся цифры второго октета + 00
  const remainingSecondOctet = ipParts[1].toString().substring(1);
  secondQuadrant = (remainingSecondOctet + "00")
    .padStart(4, "0")
    .substring(0, 4);

  // Третий квадрант: последние 4 цифры последнего октета
  thirdQuadrant = ipParts[3].toString().padStart(4, "0");

  // Форматируем адрес IS-IS
  const isisAddress = [
    afi.toString().padStart(2, "0"), // AFI
    areaId.toString().padStart(4, "0"), // Area ID
    firstQuadrant, // Первый квадрант
    secondQuadrant, // Второй квадрант
    thirdQuadrant, // Третий квадрант
  ];

  // Объединяем части в строку и добавляем .00 в конце
  return isisAddress.join(".") + ".00";
}
