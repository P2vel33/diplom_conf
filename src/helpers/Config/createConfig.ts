import { useNodesAndLinks } from "../../store/NodesAndLinks";
import { createConfigVlan } from "./createConfigVlan";

export const createConfig = () => {
  const nodeAndLinks = useNodesAndLinks();
  for (let item of Object.keys(nodeAndLinks.objectNodes)) {
    // console.log(item);
    // console.log(nodeAndLinks.objectNodes[item]);
    if (
      nodeAndLinks.objectNodes[item].vendor === "Cisco" &&
      nodeAndLinks.objectNodes[item].typeOfNetworkHardware === "Switch"
    ) {
      // console.log(nodeAndLinks.objectNodes[item]);
      createConfigVlan(nodeAndLinks.objectNodes[item]);
    }
  }
  // createConfigVlan(nodeAndLinks.objectNodes);
};
