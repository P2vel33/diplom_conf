export function getPoolIP(
  ipAddress: string,
  subnetMask: string
): string[] | null {
  // Функция для преобразования IP или маски в массив байтов
  function ipToBytes(ip: string): number[] | null {
    const parts = ip.trim().split(".");
    if (parts.length !== 4) return null;
    const bytes = parts.map((part) => {
      const num = parseInt(part, 10);
      if (isNaN(num) || num < 0 || num > 255) return null;
      return num;
    });
    if (bytes.includes(null as any)) return null;
    return bytes as number[];
  }

  // Получение байтов IP и маски
  const ipBytes = ipToBytes(ipAddress);
  const maskBytes = ipToBytes(subnetMask);

  if (!ipBytes || !maskBytes) {
    return null; // некорректные входные данные
  }

  // Вычисление адреса сети
  const networkBytes = ipBytes.map((byte, i) => byte & maskBytes[i]);

  // Вычисление количества хостов в подсети
  const maskBits = maskBytes.reduce(
    (acc, byte) => acc + (byte.toString(2).match(/1/g) || []).length,
    0
  );
  const hostBits = 32 - maskBits;
  const hostCount = Math.pow(2, hostBits);

  // Определение минимального и максимального адресов
  const networkNumber =
    ((networkBytes[0] << 24) |
      (networkBytes[1] << 16) |
      (networkBytes[2] << 8) |
      networkBytes[3]) >>>
    0; // без знака

  const firstHostNumber = networkNumber + 1; // исключая адрес сети
  const lastHostNumber = networkNumber + hostCount - 2; // исключая широковещательный адрес

  const ipPool: string[] = [];

  for (let addr = firstHostNumber; addr <= lastHostNumber; addr++) {
    const bytes = [
      (addr >> 24) & 0xff,
      (addr >> 16) & 0xff,
      (addr >> 8) & 0xff,
      addr & 0xff,
    ];
    ipPool.push(bytes.join("."));
  }

  return ipPool;
}
