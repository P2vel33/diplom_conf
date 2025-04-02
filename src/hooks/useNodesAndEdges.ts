import type { Edges, Nodes } from "v-network-graph";
import { ref, type Ref } from "vue";

export default function useNodesAndEdges(newjsonFromTextArea) {
  const objectNodes: Ref<Nodes> = ref({});
  const objectEdges: Ref<Edges> = ref({});

  function processNodes(nodes, obj1) {
    for (let itemOfElement of Object.keys(nodes)) {
      const node = nodes[itemOfElement];
      obj1.value[itemOfElement] = {
        ...node,
        name: itemOfElement,
        active: true,
        face:
          node.typeOfNetworkHardware === "Switch" ? "Comm.png" : "Router.png",
      };
    }
  }

  function processLinks(links, obj2) {
    for (let itemOfElement of Object.keys(links)) {
      links[itemOfElement].forEach((elementsOfJson) => {
        obj2.value[`${itemOfElement}-${elementsOfJson}`] = {
          source: `${itemOfElement}`,
          target: `${elementsOfJson}`,
        };
      });
    }
  }

  function processJson(newjsonFromTextArea, obj1, obj2) {
    Object.keys(newjsonFromTextArea).forEach((elementsOfJson) => {
      if (elementsOfJson === "nodes") {
        processNodes(newjsonFromTextArea[elementsOfJson], obj1);
      } else if (elementsOfJson === "links") {
        processLinks(newjsonFromTextArea[elementsOfJson], obj2);
      }
    });
  }

  processJson(newjsonFromTextArea, objectNodes, objectEdges);

  return { objectNodes, objectEdges };
}
