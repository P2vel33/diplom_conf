import { useNodesAndLinks } from "../store/NodesAndLinks";

export function hasPropertyByName(propertyName: string): boolean {
  const nodesAndLinks = useNodesAndLinks();
  return nodesAndLinks.objectNodes.hasOwnProperty(propertyName);
}
