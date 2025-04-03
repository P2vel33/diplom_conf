<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div class="app">
    <div class="nav">
      <h1 style="border: none">Network`s Model</h1>
      <Navbar />
    </div>
    <router-view></router-view>
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
.nav {
  display: flex;
  justify-content: space-between;
  border: 3px solid teal;
  border-radius: 10px;
  align-items: center;
}
</style>
