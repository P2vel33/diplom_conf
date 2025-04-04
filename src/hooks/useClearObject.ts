import type { Edge, Node } from "v-network-graph";

export default function useClearObject(object: Node | Edge): void {
  for (const [key, value] of Object.entries(object)) {
    object[key as string] = typeof value === "string" ? "" : null;
  }
}
