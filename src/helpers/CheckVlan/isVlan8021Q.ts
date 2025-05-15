export function isVlan8021Q(
  value: number | null | undefined | string
): boolean {
  if (value === null || value === undefined) {
    return false;
  }

  let num: number;

  if (typeof value === "number") {
    num = value;
  } else if (typeof value === "string") {
    num = parseInt(value, 10);
    if (isNaN(num)) {
      return false;
    }
  } else {
    return false;
  }

  return Number.isInteger(num) && num >= 2 && num <= 999;
}
