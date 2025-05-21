<script setup lang="ts">
// import type { Nodes, Edges } from "v-network-graph";
import { computed, watch } from "vue";
import useYamlToJson from "../hooks/useYamlToJson";
import useNodesAndEdges from "../hooks/useNodesAndEdges";
import View from "./View.vue";
import { useNodesAndLinks } from "../store/NodesAndLinks";
import { isINodes } from "../helpers/isINodes";

const nodesAndLinks = useNodesAndLinks();

const { textFromTextArea } = defineProps({
  textFromTextArea: {
    type: String,
    required: true,
  },
});

// дописать фунцию проверки связей и узлов
const jsonFromTextArea = computed(() => {
  // const obj: object = {};
  // for (const item of Object.keys(
  //   useYamlToJson(textFromTextArea).yamlTransfomToJson.value
  // )) {
  //   if (
  //     isINodes(useYamlToJson(textFromTextArea).yamlTransfomToJson.value[item])
  //   ) {
  //     console.log("Work");
  //     // obj = {...useYamlToJson(textFromTextArea).yamlTransfomToJson.value}
  //     return useYamlToJson(textFromTextArea).yamlTransfomToJson.value;
  //   }
  // }
  // console.log(useYamlToJson(textFromTextArea).yamlTransfomToJson.value);
  return useYamlToJson(textFromTextArea).yamlTransfomToJson.value;
});

watch(jsonFromTextArea, (newjsonFromTextArea) => {
  // console.log(newjsonFromTextArea);

  if (newjsonFromTextArea.links) {
    nodesAndLinks.objectEdges =
      useNodesAndEdges(newjsonFromTextArea).objectEdges.value;
    // console.log("NO work");
  }
  // console.log(nodesAndLinks.objectEdges);

  nodesAndLinks.objectNodes =
    useNodesAndEdges(newjsonFromTextArea).objectNodes.value;
  // console.log(nodesAndLinks.objectNodes);
});
</script>

<template>
  <View
    :objectEdges="nodesAndLinks.objectEdges"
    :objectNodes="nodesAndLinks.objectNodes"
    :watchObject="jsonFromTextArea"
  />
</template>

<style scoped></style>
