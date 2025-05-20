import type { ISwitch } from "./interfaceNetworkEquipment";

export const createConfigVlan = (objectSwitch: ISwitch): string => {
  let response: string = "";
  // let end: string = "\nend\nshow running-config";
  for (let elem of Object.keys(objectSwitch.ports)) {
    switch (objectSwitch.ports[elem].vlan_mode_port) {
      case "access":
        response += `\nvlan ${objectSwitch.ports[elem].vlan_access}
!`;
        response += `\ninterface FastEthernet0/${elem}
 switchport mode access
 switchport access vlan ${objectSwitch.ports[elem].vlan_access}
!`;
        break;
      case "trunk":
        response += `\ninterface FastEthernet0/${elem}
 switchport mode trunk
 switchport trunk allowed vlan ${objectSwitch.ports[elem].vlan_trunk}
!`;
        break;
      default:
        console.log("NO VLAN");
        break;
    }
  }
  return response;
};
