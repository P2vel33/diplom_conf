import type { Edges, Nodes } from "v-network-graph";
import { ref, type Ref } from "vue";

export default function useNodesAndEdges(newjsonFromTextArea) {
  const objectNodes: Ref<Nodes> = ref({});
  const objectEdges: Ref<Edges> = ref({});
  const writeText = () => {
    const obj1: Ref<Nodes> = ref({});
    const obj2: Ref<Edges> = ref({});
    Object.keys(newjsonFromTextArea).forEach((elem: string) => {
      for (let item of Object.keys(newjsonFromTextArea[elem])) {
        if (elem === "nodes") {
          obj1.value[item] = {
            name: newjsonFromTextArea[elem][item].name,
            face: "Comm.png",
          };
        } else if (elem === "links") {
          newjsonFromTextArea[elem][item].forEach((element: number) => {
            obj2.value[`${item}-${element}`] = {
              source: `${item}`,
              target: `node${element}`,
            };
          });
        }
      }
    });
    objectNodes.value = obj1.value;
    objectEdges.value = obj2.value;
    //   console.log(objectEdges.value);
    //   console.log(objectNodes.value);
  };
  writeText();

  return { objectNodes, objectEdges };
}
