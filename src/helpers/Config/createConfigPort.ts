import type { IRouter } from "./interfaceNetworkEquipment";

export const createConfigPort = (objectRouter: IRouter) => {
  let response = "";
  for (const port of Object.keys(objectRouter.ports)) {
    console.log(objectRouter.ports[port]);
    response += `\ninterface GigabitEthernet0/${port} ${
      objectRouter.ports[port].local_ip_address &&
      objectRouter.ports[port].mask_local_ip
        ? `\nip address ${objectRouter.ports[port].local_ip_address} ${objectRouter.ports[port].mask_local_ip}`
        : ""
    }
no shutdown 
exit
!`;
    for (const item of objectRouter.ports[port].enc_802_1q) {
      response += `\ninterface GigabitEthernet0/${port}.${item.vlan}
encapsulation dot1Q ${item.vlan}
ip address ${item.ip_address_vlan} ${item.mask_vlan}
no shutdown 
exit
!`;
    }
  }
  console.log(response);
};
