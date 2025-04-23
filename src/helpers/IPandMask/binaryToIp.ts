export function binaryToIp(binary: string): string {
  return (
    binary
      .match(/.{1,8}/g)
      ?.map((byte) => parseInt(byte, 2))
      .join(".") || ""
  );
}
