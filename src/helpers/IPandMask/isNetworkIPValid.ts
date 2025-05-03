export function isNetworkIpValid(networkIp: string, netmask: string): boolean {
  const validateIp = (ipStr: string): boolean => {
    const octets = ipStr.split(".");
    if (octets.length !== 4) return false;
    return octets.every((octet, index) => {
      // Проверка, что октет состоит только из цифр
      if (!/^\d+$/.test(octet)) return false;

      const num = parseInt(octet, 10);

      // Проверка диапазона: 0-254 для всех октетов
      if (num < 0 || num > 254) return false;

      return true;
    });
  };
  const validateMask = (ipStr: string): boolean => {
    const octets = ipStr.split(".");
    if (octets.length !== 4) return false;
    return octets.every((octet, index) => {
      // Проверка, что октет состоит только из цифр
      if (!/^\d+$/.test(octet)) return false;

      const num = parseInt(octet, 10);

      // Проверка диапазона: 0-255 для всех октетов
      if (num < 0 || num > 255) return false;

      return true;
    });
  };

  if (!validateIp(networkIp) || !validateMask(netmask)) {
    // console.log("Некорректный формат IP-адреса или маски");
    return false; // или выбросить ошибку, если нужно
  }

  const ipToNumber = (ipStr: string): number => {
    return ipStr.split(".").reduce((acc, octet) => {
      const num = parseInt(octet, 10);
      return (acc << 8) + num;
    }, 0);
  };

  const networkIpNum = ipToNumber(networkIp);
  const maskNum = ipToNumber(netmask);

  // Проверка, что IP сети корректен (например, IP входит в сеть по маске)
  return (networkIpNum & maskNum) === networkIpNum;
}

// Пример:
// console.log(isNetworkIpValid("192.168.1.0", "255.255.255.0")); // должно возвращать true
// console.log(isNetworkIpValid("255.255.255.255", "255.255.255.0")); // зависит от логики, возможно false
// console.log(isNetworkIpValid("256.100.50.25", "255.255.255.0")); // false, потому что 256 недопустим
