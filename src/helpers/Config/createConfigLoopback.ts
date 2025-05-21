import type { IRouter } from "./interfaceNetworkEquipment";

export const createConfigLoopback = (objectRouter: IRouter): string => {
  let response = "";
  for (const loopback of objectRouter.loopbackArray) {
    response += `\ninterface loopback ${loopback.number_loopback}
 ip address ${loopback.ip_address_loopback} ${loopback.mask_loopback}
exit`;
  }
  response += `\n!`;
  // console.log(response);
  return response;
};
