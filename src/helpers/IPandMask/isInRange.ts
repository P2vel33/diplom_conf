export function isInRange(value: number | null): boolean {
  if (value === null) return false;
  const lowerBound = 64512;
  const upperBound = 65534;
  if (!Number.isInteger(value)) {
    return false; // Если не целое, сразу возвращаем false
  }
  // Проверяем, что число больше или равно нижней границе И меньше или равно верхней границе
  return value >= lowerBound && value <= upperBound;
}
