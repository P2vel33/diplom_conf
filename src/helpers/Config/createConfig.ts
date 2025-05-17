import { useNodesAndLinks } from "../../store/NodesAndLinks";
import { createConfigBGP } from "./createConfigBGP";
import { createConfigISIS } from "./createConfigISIS";
import { createConfigLoopback } from "./createConfigLoopback";
import { createConfigMPLS } from "./createConfigMPLS";
import { createConfigOSPF } from "./createConfigOSPF";
import { createConfigPort } from "./createConfigPort";
import { createConfigVlan } from "./createConfigVlan";
import type { IRouter, ISwitch } from "./interfaceNetworkEquipment";

export const createConfig = () => {
  const nodeAndLinks = useNodesAndLinks();
  let response = "";
  for (let item of Object.keys(nodeAndLinks.objectNodes)) {
    // console.log(item);
    // console.log(nodeAndLinks.objectNodes[item]);
    if (nodeAndLinks.objectNodes[item].vendor === "Cisco") {
      response += `\n!\nhostname ${nodeAndLinks.objectNodes[item].name}\n!`;
      // console.log(nodeAndLinks.objectNodes[item]);
      if (nodeAndLinks.objectNodes[item].typeOfNetworkHardware === "Switch") {
        // console.log(nodeAndLinks.objectNodes[item]);
        response += createConfigVlan(nodeAndLinks.objectNodes[item] as ISwitch);
      }
      if (nodeAndLinks.objectNodes[item].typeOfNetworkHardware === "Router") {
        response += createConfigLoopback(
          nodeAndLinks.objectNodes[item] as IRouter
        );
        if (Object.keys(nodeAndLinks.objectNodes[item].ports).length > 0) {
          response += createConfigPort(
            nodeAndLinks.objectNodes[item] as IRouter
          );
        }
        if (nodeAndLinks.objectNodes[item].mpls.length > 0) {
          response += createConfigMPLS(
            nodeAndLinks.objectNodes[item] as IRouter
          );
        }
        if (Object.keys(nodeAndLinks.objectNodes[item].isis).length > 0) {
          response += createConfigISIS(
            nodeAndLinks.objectNodes[item] as IRouter
          );
        } else if (Object.keys(nodeAndLinks.objectNodes[item].bgp).length > 0) {
          response += createConfigBGP(
            nodeAndLinks.objectNodes[item] as IRouter
          );
        } else if (
          Object.keys(nodeAndLinks.objectNodes[item].ospf).length > 0
        ) {
          response += createConfigOSPF(
            nodeAndLinks.objectNodes[item] as IRouter
          );
        }
      }
    }
    console.log(response + "\nend\nshow running-config");
  }
  // createConfigVlan(nodeAndLinks.objectNodes);
};
