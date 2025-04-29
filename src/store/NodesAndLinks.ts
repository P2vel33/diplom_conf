import { defineStore } from "pinia";
import type { Edges, Nodes } from "v-network-graph";
import { ref, type Ref } from "vue";

export const useNodesAndLinks = defineStore("nodesAndLinks", () => {
  const objectNodes: Ref<Nodes> = ref({});
  const objectEdges: Ref<Edges> = ref({});

  return {
    objectNodes,
    objectEdges,
  };
});
