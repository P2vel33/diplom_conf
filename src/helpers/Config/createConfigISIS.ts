import type { IRouter } from "./interfaceNetworkEquipment";

export const createConfigISIS = (objectRouter: IRouter) => {
  let response = "";
  response += `\nrouter isis ${objectRouter.isis.process_isis}
net ${objectRouter.isis.net_ip}
is-type level-${
    objectRouter.isis.level === "1" || objectRouter.isis.level === "2"
      ? objectRouter.isis.level + "-only"
      : "1-2"
  }
metric-style wide
exit
!`;
  for (const port of objectRouter.isis.array_ports_passive) {
    response += `\ninterface GigabitEthernet0/${port.port}
ip router isis ${objectRouter.isis.process_isis}
exit
!`;
  }
  console.log(response);
};
