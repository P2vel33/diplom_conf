<script setup lang="ts">
import MyButton from "../MyButton.vue";
import MyInput from "../MyInput.vue";
import { useInteractiveVisiable } from "../../../store/InteractiveVisiable";
import type { Edge } from "v-network-graph";
import useClearObject from "../../../hooks/useClearObject";
import { useNodesAndLinks } from "../../../store/NodesAndLinks";
import { computed, ref, watch, type Ref } from "vue";
import { hasPropertyByName } from "../../../helpers/hasPropertyByName";
import MySelect from "../MySelect.vue";
import { networkRouters } from "../../../data/NetworkRouters";

const nodesAndLinks = useNodesAndLinks();

const interactiveVisiable = useInteractiveVisiable();
// const { addObjectEdges } = inject("objectEdges");

const newLink: Ref<Edge> = ref({
  target: "",
  source: "",
});

const correctDeleted = computed(() => {
  // return (
  //   !hasPropertyByName(newLink.value.source) ||
  //   !hasPropertyByName(newLink.value.target)
  // );
  return (
    !hasPropertyByName(newLink.value.source) ||
    !hasPropertyByName(newLink.value.target) ||
    !selectedPortSource.value ||
    !selectedPortTarget.value
  );
});

watch(
  () => interactiveVisiable.isVisiableModalLinkAdded,
  () => {
    if (!interactiveVisiable.isVisiableModalLinkAdded) {
      newLink.value.target = "";
      newLink.value.source = "";
      selectedNodeSource.value = "";
      selectedNodeTarget.value = "";
      selectedPortSource.value = null;
      selectedPortTarget.value = null;
    }
  }
);

const selectedNodeSource: Ref<null | string> = ref(null);
const selectedNodeTarget: Ref<null | string> = ref(null);
const selectedPortSource: Ref<null | number> = ref(null);
const selectedPortTarget: Ref<null | number> = ref(null);
const nameNodesSource = computed(() => {
  return Object.keys(nodesAndLinks.objectNodes)
    .map((node) => nodesAndLinks.objectNodes[node].name)
    .filter((node) => selectedNodeTarget.value !== node);
});
const nameNodesTarget = computed(() => {
  return Object.keys(nodesAndLinks.objectNodes)
    .map((node) => nodesAndLinks.objectNodes[node].name)
    .filter((node) => selectedNodeSource.value !== node);
});
// const nameNodes = computed(() => {
//   return Object.keys(nodesAndLinks.objectNodes).map(
//     (node) => nodesAndLinks.objectNodes[node].name
//   );
// });

// const setSelectedNode = (selectedNode:string | null,node: string): void => {
//   selectedNode = node;
// };
const setSelectedNodeSource = (node: string): void => {
  selectedNodeSource.value = node;
  newLink.value.source = selectedNodeSource.value;
};
const setSelectedNodeTarget = (node: string): void => {
  selectedNodeTarget.value = node;
  newLink.value.target = selectedNodeTarget.value;
};
const setSelectedPortSource = (port: number): void => {
  selectedPortSource.value = port;
};
const setSelectedPortTarget = (port: number): void => {
  selectedPortTarget.value = port;
};
// const setSelectedPort = (port: number): void => {
//   selectedPort.value = port;
// };

const getNodePortsSource = computed(() => {
  const type =
    nodesAndLinks.objectNodes[selectedNodeSource.value].typeOfNetworkHardware;
  const vendor = nodesAndLinks.objectNodes[selectedNodeSource.value].vendor;
  const model = nodesAndLinks.objectNodes[selectedNodeSource.value].model;

  return Array.from(
    {
      length: Number(networkRouters[type][vendor][model]),
    },
    (_, i) => i + 1
  );
});
const getNodePortsTarget = computed(() => {
  const type =
    nodesAndLinks.objectNodes[selectedNodeTarget.value].typeOfNetworkHardware;
  const vendor = nodesAndLinks.objectNodes[selectedNodeTarget.value].vendor;
  const model = nodesAndLinks.objectNodes[selectedNodeTarget.value].model;

  return Array.from(
    {
      length: Number(networkRouters[type][vendor][model]),
    },
    (_, i) => i + 1
  );
});
// const getNodePorts = computed(() => {
//   const type =
//     nodesAndLinks.objectNodes[selectedNode.value].typeOfNetworkHardware;
//   const vendor = nodesAndLinks.objectNodes[selectedNode.value].vendor;
//   const model = nodesAndLinks.objectNodes[selectedNode.value].model;

//   return Array.from(
//     {
//       length: Number(networkRouters[type][vendor][model]),
//     },
//     (_, i) => i + 1
//   );
// });
</script>

<template>
  <div
    class="dialog"
    v-if="interactiveVisiable.isVisiableModalLinkAdded"
    @click="interactiveVisiable.toggleIsVisiableModalLinkAdded()"
  >
    <!-- <div @click.stop class="dialog__content">
      <h1>Add Link</h1>
      <div class="divContent">
        <p>Source:</p>
        <MyInput
          v-focus
          :class="{ error: !hasPropertyByName(newLink.source) }"
          type="text"
          placeholder="Node 1"
          v-model="newLink.source"
        />
      </div>
      <div class="divContent">
        <p>Target:</p>
        <MyInput
          :class="{ error: !hasPropertyByName(newLink.target) }"
          type="text"
          placeholder="Node 2"
          v-model="newLink.target"
        />
      </div>

      <MyButton
        style="margin-left: auto"
        :class="{ error: correctDeleted }"
        :disabled="correctDeleted"
        @click="
          interactiveVisiable.toggleIsVisiableModalLinkAdded();
          nodesAndLinks.addObjectEdges(newLink);
          useClearObject(newLink);
        "
        >Add</MyButton
      >
    </div> -->

    <div @click.stop class="dialog__content">
      <h1>Add Link</h1>
      <div class="divContent">
        <p>Source:</p>
        <MySelect
          :options="nameNodesSource"
          @update:modelValue="(node) => setSelectedNodeSource(node)"
          >Выберите устройство</MySelect
        >
        <MySelect
          v-if="selectedNodeSource"
          :options="getNodePortsSource"
          @update:modelValue="(port) => setSelectedPortSource(port)"
          >Выберите порт</MySelect
        >
      </div>
      <div class="divContent">
        <p>Target:</p>
        <MySelect
          :options="nameNodesTarget"
          @update:modelValue="(node) => setSelectedNodeTarget(node)"
          >Выберите устройство</MySelect
        >
        <MySelect
          v-if="selectedNodeTarget"
          :options="getNodePortsTarget"
          @update:modelValue="(port) => setSelectedPortTarget(port)"
          >Выберите порт</MySelect
        >
      </div>

      <MyButton
        style="margin-left: auto"
        :class="{ error: correctDeleted }"
        :disabled="correctDeleted"
        @click="
          interactiveVisiable.toggleIsVisiableModalLinkAdded();
          nodesAndLinks.addObjectEdges(newLink);
          useClearObject(newLink);
        "
        >Добавить</MyButton
      >
    </div>
  </div>
</template>

<style scoped>
.error {
  color: red;
  border: 3px solid red;
}
.divContent {
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: space-between;
  align-items: center;
}
.dialog {
  top: 0%;
  bottom: 0%;
  right: 0%;
  left: 0%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  gap: 10px;
  z-index: 1;
}

.dialog__content {
  display: flex;
  flex-direction: column;
  margin: auto;
  background: white;
  border-radius: 12px;
  min-height: 100px;
  min-width: 500px;
  padding: 20px;
  gap: 10px;
}
</style>
