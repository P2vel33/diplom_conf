export function isValidVlanAccess(vlanNumber: number | null): boolean {
  // Проверка, что параметр — число
  if (typeof vlanNumber !== "number") {
    return false;
  }

  // Проверка, что число целое
  if (!Number.isInteger(vlanNumber)) {
    return false;
  }

  // Проверка диапазона
  if (vlanNumber >= 2 && vlanNumber <= 999) {
    return true;
  }

  return false;
}
