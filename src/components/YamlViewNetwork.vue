<script setup lang="ts">
import type { Nodes, Edges } from "v-network-graph";
import { computed, ref, watch, type Ref } from "vue";
import useYamlToJson from "../hooks/useYamlToJson";
import useNodesAndEdges from "../hooks/useNodesAndEdges";
import View from "./View.vue";

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

const objectNodes: Ref<Nodes> = ref({});
const objectEdges: Ref<Edges> = ref({});
watch(jsonFromTextArea, (newjsonFromTextArea) => {
  objectEdges.value = useNodesAndEdges(newjsonFromTextArea).objectEdges.value;
  objectNodes.value = useNodesAndEdges(newjsonFromTextArea).objectNodes.value;
});
</script>

<template>
  <View :objectEdges :objectNodes :watchObject="jsonFromTextArea" />
</template>

<style scoped></style>
