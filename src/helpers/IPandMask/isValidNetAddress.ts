export function isValidNetAddress(address: string): boolean {
  // Регулярное выражение для проверки
  const regex = /^49(\.\d{4}){4}\.00$/;

  return regex.test(address);
}
