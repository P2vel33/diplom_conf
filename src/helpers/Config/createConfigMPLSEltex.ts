import type { IRouter } from "./interfaceNetworkEquipment";

export const createConfigMPLSEltex = (objectRouter: IRouter): string => {
  let response = "";
  if (objectRouter.mpls && objectRouter.mpls.length > 0) {
    response += `\nmpls ip\n`;
    response += ` mpls label protocol ldp\n`;
    response += `exit\n!\n`;

    for (const port of objectRouter.mpls) {
      response += `\ninterface GigabitEthernet 0/${port.port}\n`;
      response += ` mpls ip\n`;
      response += `exit\n!\n`;
    }
  }
  return response;
};
