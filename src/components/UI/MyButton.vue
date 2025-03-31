<script setup lang="ts"></script>

<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<style scoped>
.btn {
  width: 100px;
  height: 50px;
  background-color: white;
  color: teal;
  border-radius: 10px;
  border: 3px solid teal;
  cursor: pointer;
  margin: 10px;
  position: relative;
  /* margin-left: auto; */
}

.btn:hover {
  transform: scale(1.1);
  transition: transform 0.1s;
}
</style>
