import { getInverseMask } from "../IPandMask/getInverseMask";
import type { IRouter } from "./interfaceNetworkEquipment";

export const createConfigOSPFEltex = (objectRouter: IRouter): string => {
  let response = "";
  response += `\nrouter ospf ${objectRouter.ospf.number_ospf}\n`;

  for (const neighbor of objectRouter.ospf.array_neighbor) {
    response += ` network ${neighbor.network} ${getInverseMask(
      neighbor.mask
    )} area ${neighbor.area}\n`;
  }

  response += `exit\n!`;
  return response;
};
