export function isValidNumberInRange(value: unknown): boolean {
  // Проверяем, что значение — число
  if (typeof value !== "number") {
    return false;
  }

  // Проверяем, что число целое
  if (!Number.isInteger(value)) {
    return false;
  }

  // Проверяем, что число в диапазоне от 0 до 99 включительно
  return value >= 0 && value <= 99;
}
