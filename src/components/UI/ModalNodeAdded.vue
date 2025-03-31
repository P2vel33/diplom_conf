<script setup lang="ts">
import { useNodeStore } from "../../store/NodeStore";
import MyButton from "./MyButton.vue";

const nodeStore = useNodeStore();
</script>

<template>
  <div class="dialog" v-if="nodeStore.isVisiableModalNodeAdded">
    <div @click.stop class="dialog__content">
      <input type="text" />
      <input type="text" />
      <input type="text" />
      <input type="text" />
      <MyButton style="margin-left: auto">Add</MyButton>
    </div>
  </div>
</template>

<style scoped>
.dialog {
  top: 0%;
  bottom: 0%;
  right: 0%;
  left: 0%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  /* padding: 20px; */
}

.dialog__content {
  display: flex;
  flex-direction: column;
  margin: auto;
  background: white;
  border-radius: 12px;
  min-height: 50px;
  min-width: 300px;
  padding: 20px;
}
</style>
