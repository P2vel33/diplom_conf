import type { IRouter } from "./interfaceNetworkEquipment";

export const createConfigPortEltex = (objectRouter: IRouter): string => {
  let response = "";
  for (const port of Object.keys(objectRouter.ports)) {
    const portNumber = port; // предполагается, что port — номер порта, например, "1" для GigabitEthernet 0/1
    const portConfig = objectRouter.ports[port];

    // Настройка физического интерфейса
    response += `\ninterface GigabitEthernet 0/${portNumber}\n`;

    if (portConfig.local_ip_address && portConfig.mask_local_ip) {
      response += ` ip address ${portConfig.local_ip_address} ${portConfig.mask_local_ip}\n`;
    }

    response += ` no shutdown\nexit\n!`;

    // Настройка VLAN (dot1Q) на этом порту, если есть
    if (
      portConfig.enc_802_1q &&
      portConfig.enc_802_1q.every((elem) => elem.vlan !== null)
    ) {
      for (const item of portConfig.enc_802_1q) {
        const vlanId = item.vlan;
        // В Eltex обычно для VLAN на маршрутизаторе используют subinterface
        response += `\ninterface GigabitEthernet 0/${portNumber}.${vlanId}\n`;
        response += ` encapsulation dot1Q ${vlanId}\n`;
        if (item.ip_address_vlan && item.mask_vlan) {
          response += ` ip address ${item.ip_address_vlan} ${item.mask_vlan}\n`;
        }
        response += ` no shutdown\nexit\n!`;
      }
    }
  }
  return response;
};
