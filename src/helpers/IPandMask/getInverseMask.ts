export function getInverseMask(mask: string): string {
  // Преобразуем маску подсети в число
  const ipToNumber = (ip: string): number => {
    return ip.split(".").reduce((acc, octet) => {
      const num = parseInt(octet, 10);
      if (num < 0 || num > 255 || isNaN(num)) {
        throw new Error(`Некорректный октет: ${octet}`);
      }
      return (acc << 8) + num;
    }, 0);
  };

  // Преобразуем число обратно в IP-строку
  const numberToIp = (num: number): string => {
    return [
      (num >> 24) & 0xff,
      (num >> 16) & 0xff,
      (num >> 8) & 0xff,
      num & 0xff,
    ].join(".");
  };

  // Основная логика: инвертируем маску
  const maskNum = ipToNumber(mask);
  const invertedNum = ~maskNum >>> 0; // побитовый NOT и приведение к беззнаковому 32-битному числу
  return numberToIp(invertedNum);
}
