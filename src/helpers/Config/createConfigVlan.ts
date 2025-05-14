export const createConfigVlan = (objectSwitch: object) => {
  let response: string = "";
  let end: string = "\nend\nshow running-config";
  if (
    objectSwitch.vendor === "Cisco" &&
    objectSwitch.typeOfNetworkHardware === "Switch"
  ) {
    response += `!
hostname ${objectSwitch.name}
!`;
    for (let elem of Object.keys(objectSwitch.ports)) {
      console.log(objectSwitch.ports[elem].vlan);
      response += `\nvlan ${objectSwitch.ports[elem].vlan}
!`;
      switch (objectSwitch.ports[elem].vlan_mode_port) {
        case "access":
          response += `\ninterface FastEthernet0/${elem}
 switchport mode access
 switchport access vlan ${objectSwitch.ports[elem].vlan}
!`;
          break;
        case "trunk":
          response += `\ninterface FastEthernet0/${elem}
 switchport mode trunk
 switchport trunk allowed vlan all
!`;
          break;
        default:
          console.log("NO VLAN");
          break;
      }
    }
  }
  console.log(response + end);
};
