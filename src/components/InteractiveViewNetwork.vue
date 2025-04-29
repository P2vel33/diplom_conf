<script setup lang="ts">
import * as vNG from "v-network-graph";
import type { Nodes, Edges } from "v-network-graph";
import { provide, ref, type Ref } from "vue";
import MyButton from "./UI/MyButton.vue";
import ModalNodeAdded from "./UI/Modal/ModalNodeAdded.vue";
import ModalLinkAdded from "./UI/Modal/ModalLinkAdded.vue";
import ModalLinkDeleted from "./UI/Modal/ModalLinkDeleted.vue";
import { useInteractiveVisiable } from "../store/InteractiveVisiable";
import ModalNodeDeleted from "./UI/Modal/ModalNodeDeleted.vue";
import View from "./View.vue";
import { useNodesAndLinks } from "../store/NodesAndLinks";

interface myNode {
  name: string;
  [x: string]: any;
}

const nodesAndLinks = useNodesAndLinks();

const interactiveVisiable = useInteractiveVisiable();
// const objectNodes: Ref<Nodes> = ref({});
// const objectEdges: Ref<Edges> = ref({});

// const addObjectNodes = (object: myNode) => {
//   objectNodes.value[object.name] = {
//     ...object,
//     face: object.typeOfNetworkHardware === "Switch" ? "Comm.png" : "Router.png",
//   };
// };
const addObjectNodes = (object: myNode) => {
  nodesAndLinks.objectNodes[object.name] = {
    ...object,
    face: object.typeOfNetworkHardware === "Switch" ? "Comm.png" : "Router.png",
  };
};
const deleteObjectNodes = (object: myNode) => {
  // console.log(Object.keys(nodesAndLinks.objectEdges).forEach(elem => elem.split('-')));
  const arr = Object.keys(nodesAndLinks.objectEdges).filter((elem) => {
    const item = elem.split("-");
    return item.some((obj) => obj === object.name);
  });
  arr.forEach((elem) => delete nodesAndLinks.objectEdges[elem]);
  delete nodesAndLinks.objectNodes[object.name];
};

const addObjectEdges = (object: vNG.Edge) => {
  const { target, source } = object;
  nodesAndLinks.objectEdges[`${source}-${target}`] = { target, source };
};
const deleteObjectEdges = (object: vNG.Edge) => {
  const { target, source } = object;
  delete nodesAndLinks.objectEdges[`${source}-${target}`];
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
      >Добавить узел сети</MyButton
    >
    <MyButton
      @click="
        () => {
          interactiveVisiable.isVisiableModalNodeDeleted = true;
        }
      "
      >Удалить узел сети</MyButton
    >
    <MyButton
      @click="
        () => {
          interactiveVisiable.isVisiableModalLinkAdded = true;
        }
      "
      >Добавить связь</MyButton
    >
    <MyButton
      @click="
        () => {
          interactiveVisiable.isVisiableModalLinkDeleted = true;
        }
      "
      >Удалить связь</MyButton
    >
  </div>
  <ModalNodeAdded />
  <ModalLinkAdded />
  <ModalLinkDeleted />
  <ModalNodeDeleted />
  <View
    :objectEdges="nodesAndLinks.objectEdges"
    :objectNodes="nodesAndLinks.objectNodes"
    :watchObject="nodesAndLinks.objectEdges"
  />
</template>

<style scoped>
.btns {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
}
</style>
