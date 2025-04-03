<script setup lang="ts">
import { inject, ref } from "vue";
// import { useNodeStore } from "../../../store/NodeStore";
import MyButton from "../MyButton.vue";
import MyInput from "../MyInput.vue";
import MySelect from "../MySelect.vue";
import { useInteractiveVisiable } from "../../../store/InteractiveVisiable";

// const nodeStore = useNodeStore();
const interactiveVisiable = useInteractiveVisiable();
const { deleteObjectNodes } = inject("objectNodes");

const hideModal = (): void => {
  interactiveVisiable.isVisiableModalNodeDeleted = false;
};

const newNode = {
  name: "",
};

const clearObject = () => {
  for (const [key, value] of Object.entries(newNode)) {
    newNode[key] = typeof value === "string" ? "" : null;
  }
};
</script>

<template>
  <div
    class="dialog"
    v-if="interactiveVisiable.isVisiableModalNodeDeleted"
    @click="hideModal"
  >
    <div @click.stop class="dialog__content">
      <h1>Delete node</h1>
      <div class="divContent">
        <p>Name:</p>
        <MyInput
          v-focus
          type="text"
          placeholder="Node 0"
          v-model="newNode.name"
        />
      </div>

      <MyButton
        style="margin-left: auto"
        @click="
          hideModal();
          deleteObjectNodes(newNode);
          clearObject();
        "
        >Delete</MyButton
      >
    </div>
  </div>
</template>

<style scoped>
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
