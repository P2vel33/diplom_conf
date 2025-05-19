interface IBgpNeighbor {
  id: number;
  neighbor: string;
  remote_as: number | null;
  network: string;
  mask: string;
}

type NetworkObject = {
  id: number;
  network: string;
  mask: string;
};

/**
 * Преобразует IP-адрес или маску из строкового вида в число.
 */
function ipToNumber(ip: string): number {
  return ip
    .split(".")
    .reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0);
}

/**
 * Получает диапазон IP-адресов сети: start и end.
 */
function getNetworkRange(
  networkIp: string,
  mask: string
): { start: number; end: number } {
  const ipNum = ipToNumber(networkIp);
  const maskNum = ipToNumber(mask);
  const networkStart = ipNum & maskNum;
  const networkEnd = networkStart | (~maskNum >>> 0);
  return { start: networkStart, end: networkEnd };
}

/**
 * Проверяет, пересекаются ли две сети.
 * Возвращает true, если сети пересекаются, иначе false.
 */
function networksOverlap(net1: NetworkObject, net2: NetworkObject): boolean {
  const range1 = getNetworkRange(net1.network, net1.mask);
  const range2 = getNetworkRange(net2.network, net2.mask);

  // Проверка пересечения диапазонов
  return !(range1.end < range2.start || range2.end < range1.start);
}

/**
 * Основная функция: возвращает true, если сети **не пересекаются**.
 */
export function doNetworksNotOverlap(
  networks: NetworkObject[] | IBgpNeighbor[]
): boolean {
  // Перебираем все пары сетей
  for (let i = 0; i < networks.length; i++) {
    for (let j = i + 1; j < networks.length; j++) {
      if (networksOverlap(networks[i], networks[j])) {
        // Есть пересечение
        return false;
      }
    }
  }
  // Нет ни одного пересечения
  return true;
}
