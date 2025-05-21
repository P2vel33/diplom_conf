<script setup lang="ts">
import { createConfig } from "../helpers/Config/createConfig";
import router from "../router/router";
import SSSSSSSSS from "./SSSSSSSSS.vue";
import MyButton from "./UI/MyButton.vue";

const sendConfiguration = () => {
  createConfig();
};
</script>

<template>
  <div class="navbar">
    <!-- <MyButton @click="router.push('/')">Home</MyButton> -->
    <MyButton @click="router.push('/yaml')">YAML</MyButton>
    <MyButton @click="router.push('/interactive')">Интерактив</MyButton>
    <MyButton @click="sendConfiguration">Отправить конфигурацию</MyButton>
    <SSSSSSSSS />
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: end;
  gap: 10px;
}
</style>
