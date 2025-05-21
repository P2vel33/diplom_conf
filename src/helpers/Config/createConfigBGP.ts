// import { useNodesAndLinks } from "../../store/NodesAndLinks";
import type { IRouter } from "./interfaceNetworkEquipment";
// const routerID = "1.1.1.1";
// const maskRouterID = "255.255.255.255";

export const createConfigBGP = (objectRouter: IRouter): string => {
  // const nodeAndLinks = useNodesAndLinks();
  // console.log(objectRouter.bgp);
  let response = "";
  response += `\nrouter bgp ${objectRouter.bgp.number_bgp}\nbgp router-id ${objectRouter.loopbackArray[0].ip_address_loopback}`;
  for (const neighbor of objectRouter.bgp.array_neighbor) {
    response += `\n neighbor ${neighbor.neighbor} remote-as ${neighbor.remote_as}`;
    response += `\n network ${neighbor.network} mask ${neighbor.mask}`;
  }
  response += `\n network ${objectRouter.loopbackArray[0].ip_address_loopback} mask ${objectRouter.loopbackArray[0].mask_loopback}`;
  for (const network of objectRouter.bgp.array_network) {
    response += `\n network ${network.network} mask ${network.mask}`;
  }
  response += `\nexit\n!`;
  return response;
};
