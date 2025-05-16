// import { useNodesAndLinks } from "../../store/NodesAndLinks";
import type { IRouter } from "./interfaceNetworkEquipment";
const routerID = "1.1.1.1";
const maskRouterID = "255.255.255.255";

export const createConfigBGP = (objectRouter: IRouter) => {
  // const nodeAndLinks = useNodesAndLinks();
  let response = "";
  response += `\nrouter bgp ${objectRouter.bgp.number_bgp}
bgp router-id ${routerID}`;
  for (const neighbor of objectRouter.bgp.array_neighbor) {
    response += `\nneighbor ${neighbor.neighbor} remote-as ${neighbor.remote_as}
exit
!`;
  }
  response += `\naddress-family ipv4
network ${routerID} mask ${maskRouterID}`;
  for (const neighbor of objectRouter.bgp.array_neighbor) {
    response += `\nneighbor ${neighbor.neighbor} activate`;
  }
  response += `\nexit-address-family`;
};
