import { useNodesAndLinks } from "../../store/NodesAndLinks";
import { createConfigBGP } from "./createConfigBGP";
import { createConfigISIS } from "./createConfigISIS";
import { createConfigMPLS } from "./createConfigMPLS";
import { createConfigOSPF } from "./createConfigOSPF";
import { createConfigPort } from "./createConfigPort";
import { createConfigVlan } from "./createConfigVlan";

export const createConfig = () => {
  const nodeAndLinks = useNodesAndLinks();
  for (let item of Object.keys(nodeAndLinks.objectNodes)) {
    // console.log(item);
    // console.log(nodeAndLinks.objectNodes[item]);
    if (nodeAndLinks.objectNodes[item].vendor === "Cisco") {
      if (nodeAndLinks.objectNodes[item].typeOfNetworkHardware === "Switch") {
        // console.log(nodeAndLinks.objectNodes[item]);
        createConfigVlan(nodeAndLinks.objectNodes[item]);
      }
      if (nodeAndLinks.objectNodes[item].typeOfNetworkHardware === "Router") {
        // console.log(nodeAndLinks.objectNodes[item]);
        // createConfigPort(nodeAndLinks.objectNodes[item]);
        // createConfigMPLS(nodeAndLinks.objectNodes[item]);
        // createConfigOSPF(nodeAndLinks.objectNodes[item]);
        if (Object.keys(nodeAndLinks.objectNodes[item].isis).length !== 0) {
          createConfigISIS(nodeAndLinks.objectNodes[item]);
        } else if (
          Object.keys(nodeAndLinks.objectNodes[item].bgp).length !== 0
        ) {
          createConfigBGP(nodeAndLinks.objectNodes[item]);
        }
      }
    }
  }
  // createConfigVlan(nodeAndLinks.objectNodes);
};
