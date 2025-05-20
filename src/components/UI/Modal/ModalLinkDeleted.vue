<script setup lang="ts">
import MyButton from "../MyButton.vue";
import MyInput from "../MyInput.vue";
import { useInteractiveVisiable } from "../../../store/InteractiveVisiable";
import type { Edge } from "v-network-graph";
import useClearObject from "../../../hooks/useClearObject";
import { useNodesAndLinks } from "../../../store/NodesAndLinks";
import { computed, ref, watch, type Ref } from "vue";
import { hasPropertyByName } from "../../../helpers/hasPropertyByName";

const nodesAndLinks = useNodesAndLinks();

const interactiveVisiable = useInteractiveVisiable();

const deletedLink: Ref<Edge> = ref({
  target: "",
  source: "",
});

const correctDeleted = computed(() => {
  return (
    !hasPropertyByName(deletedLink.value.source) ||
    !hasPropertyByName(deletedLink.value.target)
  );
});

watch(
  () => interactiveVisiable.isVisiableModalLinkDeleted,
  () => {
    if (!interactiveVisiable.isVisiableModalLinkDeleted) {
      deletedLink.value.target = "";
      deletedLink.value.source = "";
    }
  }
);
</script>

<template>
  <div
    class="dialog"
    v-if="interactiveVisiable.isVisiableModalLinkDeleted"
    @click="interactiveVisiable.toggleIsVisiableModalLinkDeleted"
  >
    <div @click.stop class="dialog__content">
      <h1>Delete link</h1>
      <div class="divContent">
        <p>Source:</p>
        <MyInput
          v-focus
          :class="{ error: !hasPropertyByName(deletedLink.source) }"
          type="text"
          placeholder="Node 1"
          v-model="deletedLink.source"
        />
      </div>
      <div class="divContent">
        <p>Target:</p>
        <MyInput
          type="text"
          :class="{ error: !hasPropertyByName(deletedLink.target) }"
          placeholder="Node 2"
          v-model="deletedLink.target"
        />
      </div>

      <MyButton
        style="margin-left: auto"
        :class="{ error: correctDeleted }"
        :disabled="correctDeleted"
        @click="
          interactiveVisiable.toggleIsVisiableModalLinkDeleted();
          nodesAndLinks.deleteObjectEdges(deletedLink);
          useClearObject(deletedLink);
        "
        >Delete</MyButton
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
  /* padding: 20px; */
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
