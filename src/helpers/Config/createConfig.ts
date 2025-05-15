import { useNodesAndLinks } from "../../store/NodesAndLinks";
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
        createConfigPort(nodeAndLinks.objectNodes[item]);
      }
    }
  }
  // createConfigVlan(nodeAndLinks.objectNodes);
};
