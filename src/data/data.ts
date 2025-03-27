import type { Nodes, Edges } from "v-network-graph";
import { ref } from "vue";
import type { Ref } from "vue";

const nodes: Ref<Nodes> = ref({
  node0: { name: "Node 1", face: "Comm.png" },
  node1: { name: "Node 2", face: "Comm.png" },
  node2: { name: "Node 3", face: "Comm.png" },
  node3: { name: "Node 4", face: "Comm.png" },
  node4: { name: "Node 5", face: "Comm.png" },
  node5: { name: "Node 6", face: "Comm.png" },
  node6: { name: "Node 7", face: "Comm.png" },
  node7: { name: "Node 8", face: "Comm.png" },
  node8: { name: "Node 9", face: "Comm.png" },
  node9: { name: "Node 10", face: "Comm.png" },
  node10: { name: "Node 11", face: "Comm.png" },
  node11: { name: "Node 12", face: "Comm.png" },
  node12: { name: "Node 13", face: "Comm.png" },
  node13: { name: "Node 14", face: "Comm.png" },
  node14: { name: "Node 15", face: "Comm.png" },
  node15: { name: "Node 16", face: "Comm.png" },
});

const edges: Ref<Edges> = ref({
  "edge0-4": { source: "node0", target: "node4" },
  "edge1-0": { source: "node1", target: "node0" },
  "edge2-0": { source: "node2", target: "node0" },
  "edge3-0": { source: "node3", target: "node0" },
  "edge4-8": { source: "node4", target: "node8" },
  "edge5-4": { source: "node5", target: "node4" },
  "edge6-4": { source: "node6", target: "node4" },
  "edge7-4": { source: "node7", target: "node4" },
  "edge8-12": { source: "node8", target: "node12" },
  "edge9-8": { source: "node9", target: "node8" },
  "edge10-8": { source: "node10", target: "node8" },
  "edge11-8": { source: "node11", target: "node8" },
  "edge12-0": { source: "node12", target: "node0" },
  "edge13-12": { source: "node13", target: "node12" },
  "edge14-12": { source: "node14", target: "node12" },
  "edge15-12": { source: "node15", target: "node12" },
});

export default { nodes, edges };
