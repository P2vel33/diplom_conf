// import { useNodesAndLinks } from "../../store/NodesAndLinks";
import type { IRouter } from "./interfaceNetworkEquipment";
// const routerID = "1.1.1.1";
// const maskRouterID = "255.255.255.255";

export const createConfigBGP = (objectRouter: IRouter): string => {
  // const nodeAndLinks = useNodesAndLinks();
  let response = "";
  response += `\nrouter bgp ${objectRouter.bgp.number_bgp}
bgp router-id ${objectRouter.loopbackArray[0].ip_address_loopback}`;
  for (const neighbor of objectRouter.bgp.array_neighbor) {
    response += `\nneighbor ${neighbor.neighbor} remote-as ${neighbor.remote_as}
exit
!`;
  }
  response += `\naddress-family ipv4
network ${objectRouter.loopbackArray[0].ip_address_loopback} mask ${objectRouter.loopbackArray[0].mask_loopback}`;
  for (const neighbor of objectRouter.bgp.array_neighbor) {
    response += `\nneighbor ${neighbor.neighbor} activate`;
  }
  response += `\nexit-address-family`;
  return response;
};
