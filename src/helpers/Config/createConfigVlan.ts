import type { ISwitch } from "./interfaceNetworkEquipment";

export const createConfigVlan = (objectSwitch: ISwitch): string => {
  // const access_array: number[] = [];
  // Object.values(objectSwitch.ports).forEach((elem) => {
  //   if (elem.vlan_access) {
  //     access_array.push(elem.vlan_access);
  //   }
  // });
  // console.log(access_array);
  let response: string = "";
  let end: string = "\nend\nshow running-config";
  response += `!
hostname ${objectSwitch.name}
!`;
  for (let elem of Object.keys(objectSwitch.ports)) {
    //       console.log(objectSwitch.ports[elem].vlan);
    //       response += `\nvlan ${objectSwitch.ports[elem].vlan_access}
    // !`;
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

  // console.log(response + end);
  return response + end;
};
