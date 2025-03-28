<script setup lang="ts">
import ViewNetwork from "./components/ViewNetwork.vue";
import str from "./data/textareaPlaceholder.ts";
import { useNodeStore } from "./store/NodeStore.ts";

const nodeStore = useNodeStore();
</script>

<template>
  <div class="container">
    <div class="left">
      <!-- <div
        class="textarea"
        contenteditable="true"
        :textContent="nodeStore.text"
        :placeholder="str"
      >
        {{ nodeStore.text }}
      </div> -->

      <textarea
        v-model="nodeStore.text"
        class="textarea"
        :placeholder="str"
      ></textarea>
    </div>
    <div class="right">
      <ViewNetwork />
    </div>
  </div>
</template>

<style>
* {
  padding: 0%;
  margin: 0%;
}

.content {
  max-width: 100%;
  display: flex;
  flex-direction: column;
}

.textarea {
  width: 100%;
  height: 950px;
  color: white;
  background-color: black;
  border: 3px solid teal;
}

.container {
  width: 100%;
  display: flex;
}

.left {
  margin: 5px;
  width: 50%;
}

.right {
  display: flex;
  flex-direction: column;
  margin: 5px;
  width: 50%;
}
</style>
