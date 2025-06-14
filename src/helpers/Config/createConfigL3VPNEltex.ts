import type { IRouter } from "./interfaceNetworkEquipment";

export const createConfigL3VPNEltex = (objectRouter: IRouter): string => {
  let response = "";

  for (const l3vpnitem of objectRouter.l3vpn) {
    // Создание VRF
    response += `ip vrf ${l3vpnitem.vrf_name}\n`;
    response += ` rd ${l3vpnitem.bgp_id}:${l3vpnitem.rd}\n`;
    response += ` route-target both ${l3vpnitem.bgp_id}:${l3vpnitem.rd}\n`;
    response += `!\n`;

    // Назначение интерфейсов VRF
    for (const port of l3vpnitem.ports_vrf) {
      response += `interface GigabitEthernet0/${port.port}\n`;
      response += ` vrf forwarding ${l3vpnitem.vrf_name}\n`;
      response += ` ip address 10.1.1.1 255.255.255.0\n`;
      response += `!\n`;
    }

    // Настройка BGP для VRF
    response += `router bgp ${l3vpnitem.bgp_id}\n`;
    response += ` address-family ipv4 vrf ${l3vpnitem.vrf_name}\n`;
    response += `  redistribute connected\n`;
    response += ` exit-address-family\n`;
  }

  return response;
};
