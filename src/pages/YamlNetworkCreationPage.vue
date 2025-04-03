<script setup lang="ts">
import { ref, type Ref } from "vue";
// import ViewNetwork from "../components/YamlViewNetwork.vue";
import str from "../data/textareaPlaceholder";
import YamlViewNetwork from "../components/YamlViewNetwork.vue";

const textFromTextArea: Ref<string> = ref("");
</script>

<template>
  <div>
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
        <YamlViewNetwork :textFromTextArea />
      </div>
    </div>
  </div>
</template>

<style scoped>
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
