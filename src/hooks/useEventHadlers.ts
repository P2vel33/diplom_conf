import type { StoreState } from "pinia";
import * as vNG from "v-network-graph";
import { ref, type Ref } from "vue";
const coordinateModal: Ref<vNG.Position> = ref({ x: 0, y: 0 });

export default function useEventHadlers(
  objectNodes: vNG.Nodes,
  nodeModal: Object,
  nodeStore: StoreState
) {
  const eventHandlers: vNG.EventHandlers = {
    "node:pointerover": ({ node, event }): void => {
      const nodes: vNG.Nodes = objectNodes;
      coordinateModal.value = { x: event.clientX, y: event.clientY };
      nodeStore.isVisiable = true;
      nodeModal = nodes[node];
      //   console.log(coordinateModal.value);
      //   console.log(nodeStore.isVisiable);
      console.log(objectNodes);
      //   console.log(node);
      //   console.log(objectNodes[node]);
    },
    "node:pointermove": (): void => {
      nodeStore.isVisiable = false;
    },
    "node:pointerout": (): void => {
      nodeStore.isVisiable = false;
    },
    "node:click": ({ node }): void => {
      const nodes: vNG.Nodes = objectNodes;
      nodes[node].active = !nodes[node].active;
    },
    "edge:click": ({ edge }): void => {
      const arr: string[] | undefined = edge?.split("-");
      arr?.forEach((elem) => console.log(objectNodes[elem]));
    },
  };
  return { eventHandlers, coordinateModal };
}
