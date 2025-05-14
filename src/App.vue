<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div class="app">
    <div class="nav">
      <h1 style="border: none">Модель сети</h1>
      <Navbar />
    </div>
    <router-view></router-view>
  </div>
</template>

<style>
* {
  padding: 0%;
  margin: 0%;
  box-sizing: border-box;
}

button:disabled {
  background-color: #cccccc;
  color: #666666;
  cursor: not-allowed;
  box-shadow: none;
  opacity: 0.6;
}

h1 {
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

input[type="checkbox"],
input[type="radio"] {
  accent-color: teal;
}
</style>
