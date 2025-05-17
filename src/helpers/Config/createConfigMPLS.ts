import type { IRouter } from "./interfaceNetworkEquipment";

export const createConfigMPLS = (objectRouter: IRouter): string => {
  let response = "";
  if (objectRouter.mpls.length > 0) {
    response += `\nmpls ip
mpls label protocol ldp
exit
!`;
    for (let port of objectRouter.mpls) {
      response += `\ninterface GigabitEthernet0/${port.port}
mpls ip
exit
!`;
    }
  }
  return response;
  // console.log(objectRouter.name, objectRouter.mpls);
};
