<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import str from "./data/textareaPlaceholder.ts";
import { useNodeStore } from "./store/NodeStore.ts";

const nodeStore = useNodeStore();
</script>

<template>
  <!-- <div class="content">
    <textarea class="textarea"></textarea>
    <HelloWorld />
  </div> -->

  <div class="container">
    <div class="left">
      <textarea
        v-model="nodeStore.yaml"
        class="textarea"
        :placeholder="str"
      ></textarea>
    </div>
    <div class="right">
      <HelloWorld />
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
  /* outline: 2px solid orange; */
}

.left {
  margin: 5px;
  width: 50%;
  /* outline: 2px solid red; */
}

.right {
  display: flex;
  flex-direction: column;
  margin: 5px;
  width: 50%;
  /* outline: 2px solid green; */
}
</style>
