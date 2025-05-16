import type { IRouter } from "./interfaceNetworkEquipment";

export const createConfigMPLS = (objectRouter: IRouter) => {
  let response = "";
  if (objectRouter.mpls.length > 0) {
    response += `\nmpls ip
mpls label protocol ldp
exit
!`;
    for (let port of objectRouter.mpls) {
      console.log(port);
      response += `\ninterface GigabitEthernet0/${port.port}
mpls ip
exit
!`;
    }
  }

  console.log(response);
  // console.log(objectRouter.name, objectRouter.mpls);
};
