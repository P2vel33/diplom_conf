export function isValidSubnetMask(mask: string) {
  // Регулярное выражение для проверки формата IP-адреса (маски)
  const maskRegex =
    /^(25[0-5]|(2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9]))(\.(25[0-5]|(2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9]))){3}$/;

  // Проверить, соответствует ли маска формату IP-адреса
  if (!maskRegex.test(mask)) {
    return false; // Неверный формат маски
  }

  // Преобразование маски в двоичный формат
  const maskParts = mask.split(".").map(Number);
  let binary = maskParts
    .map((num) => num.toString(2).padStart(8, "0"))
    .join("");

  // Проверка, чтобы после первой '0' не было '1'
  return !binary.includes("01");
}
