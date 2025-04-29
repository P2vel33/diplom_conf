<script setup lang="ts">
// import type { Nodes, Edges } from "v-network-graph";
import { computed, ref, watch, type Ref } from "vue";
import useYamlToJson from "../hooks/useYamlToJson";
import useNodesAndEdges from "../hooks/useNodesAndEdges";
import View from "./View.vue";
import { useNodesAndLinks } from "../store/NodesAndLinks";

const nodesAndLinks = useNodesAndLinks();

const { textFromTextArea } = defineProps({
  textFromTextArea: {
    type: String,
    required: true,
  },
});

const jsonFromTextArea = computed(() => {
  console.log(useYamlToJson(textFromTextArea).yamlTransfomToJson.value);
  return useYamlToJson(textFromTextArea).yamlTransfomToJson.value;
});
console.log(jsonFromTextArea.value);

watch(jsonFromTextArea, (newjsonFromTextArea) => {
  nodesAndLinks.objectEdges =
    useNodesAndEdges(newjsonFromTextArea).objectEdges.value;
  nodesAndLinks.objectNodes =
    useNodesAndEdges(newjsonFromTextArea).objectNodes.value;
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
