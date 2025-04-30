import { defineStore } from "pinia";
import type { Edges, Nodes } from "v-network-graph";
import * as vNG from "v-network-graph";
import { ref, type Ref } from "vue";

interface myNode {
  name: string;
  [x: string]: any;
}

export const useNodesAndLinks = defineStore("nodesAndLinks", () => {
  const objectNodes: Ref<Nodes> = ref({});
  const objectEdges: Ref<Edges> = ref({});

  const addObjectNodes = (object: myNode) => {
    objectNodes.value[object.name] = {
      ...object,
      face:
        object.typeOfNetworkHardware === "Switch" ? "Comm.png" : "Router.png",
    };
  };
  const deleteObjectNodes = (object: myNode) => {
    Object.keys(objectEdges.value).forEach((elem) => {
      const item = elem.split("-");
      item.some((obj) => obj === object.name)
        ? delete objectEdges.value[elem]
        : false;
    });
    delete objectNodes.value[object.name];
  };

  const addObjectEdges = (object: vNG.Edge) => {
    const { target, source } = object;
    objectEdges.value[`${source}-${target}`] = { target, source };
  };
  const deleteObjectEdges = (object: vNG.Edge) => {
    const { target, source } = object;
    delete objectEdges.value[`${source}-${target}`];
  };

  return {
    objectNodes,
    objectEdges,
    addObjectNodes,
    deleteObjectNodes,
    addObjectEdges,
    deleteObjectEdges,
  };
});
