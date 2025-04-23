export function ipToBinary(ip: string): string {
  return ip
    .split(".")
    .map((num) => ("00000000" + Number(num).toString(2)).slice(-8))
    .join("");
}
