<script setup lang="ts">
import { createConfig } from "../helpers/Config/createConfig";
import router from "../router/router";
// import { useNodesAndLinks } from "../store/NodesAndLinks";
import MyButton from "./UI/MyButton.vue";
// const nodesAndLinks = useNodesAndLinks();
const sendConfiguration = () => {
  // console.log(nodesAndLinks.objectNodes);
  createConfig();
};
</script>

<template>
  <div class="navbar">
    <!-- <MyButton @click="router.push('/')">Home</MyButton> -->
    <MyButton @click="router.push('/yaml')">YAML</MyButton>
    <MyButton @click="router.push('/interactive')">Интерактив</MyButton>
    <MyButton @click="sendConfiguration">Отправить конфигурацию</MyButton>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: end;
  gap: 10px;
}
</style>
