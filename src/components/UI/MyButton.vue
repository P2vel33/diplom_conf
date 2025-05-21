<script setup lang="ts">
defineOptions({
  inheritAttrs: true,
});
</script>

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
  transition: all 0.5s;

  /* margin-left: auto; */
}

.btn:hover {
  transform: scale(1.1);
  background-color: teal;
  color: white;
  transition: all 0.1s;
}

.btn:disabled {
  border: 3px solid red;
  background-color: red;
  color: white;
  transition: all 0.1s;
}
.btn:disabled:hover {
  transform: scale(1);
  border: 3px solid red;
  background-color: red;
  color: white;
  transition: all 0.1s;
}
</style>
