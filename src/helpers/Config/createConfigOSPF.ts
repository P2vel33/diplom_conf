// import { useNodesAndLinks } from "../../store/NodesAndLinks";
import { getInverseMask } from "../IPandMask/getInverseMask";
import type { IRouter } from "./interfaceNetworkEquipment";

export const createConfigOSPF = (objectRouter: IRouter): string => {
  // const nodeAndLinks = useNodesAndLinks();
  // console.log(objectRouter.ospf);
  let response = "";
  response += `\nrouter ospf ${objectRouter.ospf.number_ospf}`;
  for (const neighbor of objectRouter.ospf.array_neighbor) {
    // console.log(neighbor);
    response += `\nnetwork ${neighbor.network} ${getInverseMask(
      neighbor.mask
    )} area ${neighbor.area}`;
  }
  response += `\nexit\n!`;
  console.log(response);
  return response;
};
