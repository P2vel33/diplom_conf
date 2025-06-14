import type { IRouter } from "./interfaceNetworkEquipment";

export const createConfigBGPEltex = (objectRouter: IRouter): string => {
  let response = "";
  response += `\nrouter bgp ${objectRouter.bgp.number_bgp}\n`;
  response += ` bgp router-id ${objectRouter.loopbackArray[0].ip_address_loopback}\n`;

  for (const neighbor of objectRouter.bgp.array_neighbor) {
    response += ` neighbor ${neighbor.neighbor} remote-as ${neighbor.remote_as}\n`;
    response += ` neighbor ${neighbor.neighbor} update-source Loopback0\n`; // Если требуется, добавьте
  }

  // Объявление сетей, которые участвуют в BGP
  for (const network of objectRouter.bgp.array_network) {
    response += ` network ${network.network} mask ${network.mask}\n`;
  }

  // Объявление локальной сети (Loopback)
  response += ` network ${objectRouter.loopbackArray[0].ip_address_loopback} mask ${objectRouter.loopbackArray[0].mask_loopback}\n`;

  response += `exit\n!`;

  return response;
};
