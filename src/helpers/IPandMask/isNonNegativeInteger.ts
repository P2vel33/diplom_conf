export function isNonNegativeInteger(value: number | null): boolean {
  if (value === null) return false;
  return Number.isInteger(value) && value >= 0;
}
