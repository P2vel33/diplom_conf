import type { IRouter } from "./interfaceNetworkEquipment";

export const createConfigISISEltex = (objectRouter: IRouter): string => {
  let response = "";
  response += `\nrouter isis ${objectRouter.isis.process_isis}\n`;
  response += ` net ${objectRouter.isis.net_ip}\n`;
  response += ` is-type level-${
    ["1", "2"].includes(objectRouter.isis.level)
      ? `${objectRouter.isis.level}-only`
      : "1-2"
  }\n`;
  response += ` metric-style wide\n`;
  response += `exit\n!\n`;

  for (const port of objectRouter.isis.array_ports_passive) {
    response += `\ninterface GigabitEthernet 0/${port.port}\n`;
    response += ` ip router isis ${objectRouter.isis.process_isis}\n`;
    response += ` exit\n!\n`;
  }

  return response;
};
