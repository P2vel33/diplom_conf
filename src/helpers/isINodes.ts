import type { INodes } from "./Config/interfaceNetworkEquipment";

export function isINodes(obj: any): obj is INodes {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  // Проверяем, что у объекта есть хотя бы один ключ
  const keys = Object.keys(obj);
  if (keys.length === 0) {
    return false;
  }

  // Проверяем каждый ключ
  return keys.every((key) => {
    const item = obj[key];
    if (typeof item !== "object" || item === null) {
      return false;
    }
    // Проверка по обязательным свойствам для Router или Switch
    const hasRouterProps =
      // 'active' in item &&
      // 'face' in item &&
      "model" in item &&
      "name" in item &&
      "typeOfNetworkHardware" in item &&
      "vendor" in item;

    const hasSwitchProps =
      "name" in item &&
      // 'active' in item &&
      // 'face' in item &&
      "model" in item &&
      "typeOfNetworkHardware" in item &&
      "vendor" in item &&
      "ports" in item;

    // Проверяем, что это либо Router, либо Switch
    if (hasRouterProps && item.typeOfNetworkHardware === "Router") {
      return true;
    }
    if (hasSwitchProps && item.typeOfNetworkHardware === "Switch") {
      return true;
    }
    return false;
  });
}
