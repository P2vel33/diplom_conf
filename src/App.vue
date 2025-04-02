<script setup lang="ts">
import { ref, type Ref } from "vue";
import ViewNetwork from "./components/ViewNetwork.vue";
import str from "./data/textareaPlaceholder.ts";
import MyButton from "./components/UI/MyButton.vue";
import { useNodeStore } from "./store/NodeStore.ts";
import ModalNodeAdded from "./components/UI/ModalNodeAdded.vue";
const textFromTextArea: Ref<string> = ref("");
const nodeStore = useNodeStore();
</script>

<template>
  <h1>Network`s Model</h1>
  <ModalNodeAdded />
  <div class="container">
    <div class="left">
      <textarea
        v-focus
        v-model="textFromTextArea"
        class="textarea"
        :placeholder="str"
      ></textarea>
    </div>
    <div class="right">
      <div class="btns">
        <MyButton
          @click="
            () => {
              nodeStore.isVisiableModalNodeAdded = true;
              console.log(nodeStore.isVisiableModalNodeAdded);
            }
          "
          >Add Node</MyButton
        >
        <MyButton>Delete Node</MyButton>
      </div>
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
  padding: 10px;
  margin: 10px 5px;
  background-color: white;
  color: teal;
  text-align: center;
  border: 3px solid teal;
  border-radius: 10px;
}

.btns {
  display: flex;
  flex-direction: row;
  justify-content: end;
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
