<script setup lang="ts">
// import type { Nodes, Edges } from "v-network-graph";
import { computed, watch } from "vue";
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
  return useYamlToJson(textFromTextArea).yamlTransfomToJson.value;
});

watch(jsonFromTextArea, (newjsonFromTextArea) => {
  // console.log(jsonFromTextArea.value);
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
