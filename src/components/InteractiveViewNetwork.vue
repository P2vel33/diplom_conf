<script setup lang="ts">
import MyButton from "./UI/MyButton.vue";
import ModalNodeAdded from "./UI/Modal/ModalNodeAdded.vue";
import ModalLinkAdded from "./UI/Modal/ModalLinkAdded.vue";
import ModalLinkDeleted from "./UI/Modal/ModalLinkDeleted.vue";
import { useInteractiveVisiable } from "../store/InteractiveVisiable";
import ModalNodeDeleted from "./UI/Modal/ModalNodeDeleted.vue";
import View from "./View.vue";
import { useNodesAndLinks } from "../store/NodesAndLinks";

const nodesAndLinks = useNodesAndLinks();
const interactiveVisiable = useInteractiveVisiable();
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
