<script setup lang="ts">
import { ref, type Ref } from "vue";
import ViewNetwork from "./components/ViewNetwork.vue";
import str from "./data/textareaPlaceholder.ts";
import MyButton from "./components/UI/MyButton.vue";
const textFromTextArea: Ref<string> = ref("");
const selectYaml = ref(false);
const selectInteractive = ref(false);
const isVisiableSelectFormat = ref(true);
const selectChangeYaml = (): void => {
  selectYaml.value = true;
  selectInteractive.value = false;
  isVisiableSelectFormat.value = false;
};
const selectChangeInteractive = (): void => {
  selectInteractive.value = true;
  selectYaml.value = false;
  isVisiableSelectFormat.value = false;
};
</script>

<template>
  <h1>Network`s Model</h1>
  <div class="selectFormat" v-if="isVisiableSelectFormat">
    <MyButton
      style="width: 45%; height: 80%; font-size: 50px"
      @click="selectChangeYaml"
      >Yaml</MyButton
    >
    <MyButton
      style="width: 45%; height: 80%; font-size: 50px"
      @click="selectChangeInteractive"
      >Interactive</MyButton
    >
  </div>
  <div class="container" v-if="selectYaml">
    <div class="left">
      <textarea
        v-focus
        v-model="textFromTextArea"
        class="textarea"
        :placeholder="str"
      ></textarea>
    </div>
    <div class="right">
      <ViewNetwork :textFromTextArea :selectInteractive />
    </div>
  </div>
  <div class="sss" v-else-if="selectInteractive">
    <ViewNetwork :selectInteractive />
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

.selectFormat {
  width: 100%;
  display: flex;
  height: 950px;
  justify-content: space-around;
  align-items: center;
}

.sss {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  height: 950px;
}
</style>
