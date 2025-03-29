<script setup lang="ts">
import { ref, type Ref } from "vue";
import ViewNetwork from "./components/ViewNetwork.vue";
import str from "./data/textareaPlaceholder.ts";
// import { useNodeStore } from "./store/NodeStore.ts";

// const nodeStore = useNodeStore();
const textFromTextArea: Ref<string> = ref("");
</script>

<template>
  <h1>Model Network</h1>
  <!-- <input type="text" v-model="inputValue" /> -->
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
        v-model="textFromTextArea"
        class="textarea"
        :placeholder="str"
      ></textarea>
    </div>
    <div class="right">
      <ViewNetwork :textFromTextArea />
    </div>
  </div>
</template>

<style>
* {
  padding: 0%;
  margin: 0%;
}

h1 {
  width: 100%;
  padding: 0px 10px;
  background-color: teal;
  color: white;
  text-align: center;
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
