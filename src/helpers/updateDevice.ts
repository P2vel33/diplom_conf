import type { IRouter, ISwitch } from "./Config/interfaceNetworkEquipment";

// interface Loopback {
//   id: number;
//   number_loopback: number;
//   ip_address_loopback: string;
//   mask_loopback: string;
// }

// interface Device {
//   name: string;
//   vendor: string;
//   ports: Record<string, any>;
//   typeOfNetworkHardware: string;
//   loopbackArray: Loopback[];
//   model: string;
//   active?: boolean;
//   mpls: any[];
//   ospf: object;
//   isis: object;
//   bgp: object;
//   l3vpn: any[];
//   face?: string;
// }

export function updateDevice(device: IRouter): Partial<IRouter> {
  // Создаем копию объекта, чтобы не мутировать оригинал
  const updatedDevice: Partial<IRouter> = { ...device };

  // Удаляем свойства "face" и "active"
  delete updatedDevice.face;
  delete updatedDevice.active;
  // Обрабатываем свойства с массивами

  if (Array.isArray(updatedDevice.mpls) && updatedDevice.mpls.length === 0) {
    delete updatedDevice.mpls;
  }

  if (Array.isArray(updatedDevice.l3vpn) && updatedDevice.l3vpn.length === 0) {
    delete updatedDevice.l3vpn;
  }

  // Обрабатываем свойства с объектами
  if (updatedDevice.ospf && Object.keys(updatedDevice.ospf).length === 0) {
    delete updatedDevice.ospf;
  }

  if (updatedDevice.isis && Object.keys(updatedDevice.isis).length === 0) {
    delete updatedDevice.isis;
  }

  if (updatedDevice.bgp && Object.keys(updatedDevice.bgp).length === 0) {
    delete updatedDevice.bgp;
  }

  // Обрабатываем массив loopbackArray
  if (updatedDevice.loopbackArray && updatedDevice.loopbackArray.length > 0) {
    // Можно оставить as есть, если нужно
  } else {
    delete updatedDevice.loopbackArray;
  }

  // Обработка порта ports (если нужно)
  if (updatedDevice.ports && Object.keys(updatedDevice.ports).length === 0) {
    delete updatedDevice.ports;
  }
  // console.log(updatedDevice);
  return updatedDevice;
}

export function updateDeviceSwicth(device: ISwitch): Partial<ISwitch> {
  // Создаем копию объекта, чтобы не мутировать оригинал
  const updatedDevice: Partial<ISwitch> = { ...device };

  // Удаляем свойства "face" и "active"
  delete updatedDevice.face;
  delete updatedDevice.active;
  // Обрабатываем свойства с массивами

  // Обработка порта ports (если нужно)
  if (updatedDevice.ports && Object.keys(updatedDevice.ports).length === 0) {
    delete updatedDevice.ports;
  }
  // console.log(updatedDevice);
  return updatedDevice;
}
