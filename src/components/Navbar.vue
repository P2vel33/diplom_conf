<script setup lang="ts">
import router from "../router/router";
import MyButton from "./UI/MyButton.vue";
</script>

<template>
  <div class="navbar">
    <MyButton @click="router.push('/')">Home</MyButton>
    <MyButton @click="router.push('/yaml')">Yaml</MyButton>
    <MyButton @click="router.push('/interactive')">Interactive</MyButton>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: end;
  gap: 10px;
}
</style>
