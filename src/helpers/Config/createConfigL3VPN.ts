import type { IRouter } from "./interfaceNetworkEquipment";

export const createConfigL3VPN = (objectRouter: IRouter): string => {
  let response = "";
  for (const l3vpnitem of objectRouter.l3vpn) {
    response += `ip vrf ${l3vpnitem.vrf_name}
 rd ${l3vpnitem.bgp_id}:${l3vpnitem.rd}
 route-target both ${l3vpnitem.bgp_id}:${l3vpnitem.rd}
 !`;
    for (const port of l3vpnitem.ports_vrf) {
      response += `interface  GigabitEthernet0/${port.port}
 vrf forwarding ${l3vpnitem.vrf_name}
 ip address 10.1.1.1 255.255.255.0
!`;
    }
    response += `router bgp ${l3vpnitem.bgp_id}
 address-family ipv4 vrf ${l3vpnitem.vrf_name}
 redistribute connected
exit-address-family
`;
  }
  return response;
};
