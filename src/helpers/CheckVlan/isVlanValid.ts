export function isVlanValid(input: string): boolean {
  const trimmedInput = input.trim().toLowerCase();

  if (trimmedInput === "all") {
    return true;
  } else {
    // Проверяем, что строка содержит только цифры и запятые без пробелов после запятых
    const vlanPattern = /^(\d+)(,\d+)*$/;
    if (vlanPattern.test(trimmedInput)) {
      // Проверяем, что все VLAN > 0
      const vlans = trimmedInput.split(",").map((v) => parseInt(v, 10));
      return vlans.every((vlan) => vlan > 0);
    } else {
      return false;
    }
  }
}
