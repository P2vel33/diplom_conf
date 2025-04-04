<script setup lang="ts">
import * as vNG from "v-network-graph";
import type { Nodes, Edges, Node } from "v-network-graph";
import { provide, ref, type Ref } from "vue";
import MyButton from "./UI/MyButton.vue";
import ModalNodeAdded from "./UI/Modal/ModalNodeAdded.vue";
import ModalLinkAdded from "./UI/Modal/ModalLinkAdded.vue";
import ModalLinkDeleted from "./UI/Modal/ModalLinkDeleted.vue";
import { useInteractiveVisiable } from "../store/InteractiveVisiable";
import ModalNodeDeleted from "./UI/Modal/ModalNodeDeleted.vue";
import View from "./View.vue";

const interactiveVisiable = useInteractiveVisiable();

const objectNodes: Ref<Nodes> = ref({});
const objectEdges: Ref<Edges> = ref({});

const addObjectNodes = (object: Node) => {
  objectNodes.value[object.name] = {
    ...object,
    face: object.typeOfNetworkHardware === "Switch" ? "Comm.png" : "Router.png",
  };
};
const deleteObjectNodes = (object: Node) => {
  delete objectNodes.value[object.name];
};

const addObjectEdges = (object: vNG.Edge) => {
  const { target, source } = object;
  objectEdges.value[`${source}-${target}`] = { target, source };
};
const deleteObjectEdges = (object: vNG.Edge) => {
  const { target, source } = object;
  delete objectEdges.value[`${source}-${target}`];
};

provide("objectNodes", { addObjectNodes, deleteObjectNodes });
provide("objectEdges", { addObjectEdges, deleteObjectEdges });
</script>

<template>
  <div class="btns">
    <MyButton
      @click="
        () => {
          interactiveVisiable.isVisiableModalNodeAdded = true;
        }
      "
      >Add Node</MyButton
    >
    <MyButton
      @click="
        () => {
          interactiveVisiable.isVisiableModalLinkAdded = true;
        }
      "
      >Add link</MyButton
    >
    <MyButton
      @click="
        () => {
          interactiveVisiable.isVisiableModalLinkDeleted = true;
        }
      "
      >Delete Link</MyButton
    >
    <MyButton
      @click="
        () => {
          interactiveVisiable.isVisiableModalNodeDeleted = true;
        }
      "
      >Delete Node</MyButton
    >
  </div>
  <ModalNodeAdded />
  <ModalLinkAdded />
  <ModalLinkDeleted />
  <ModalNodeDeleted />
  <View :objectEdges :objectNodes :watchObject="objectEdges" />
</template>

<style scoped>
.btns {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
}
</style>
