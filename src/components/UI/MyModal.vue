<script setup lang="ts">
import { useNodeStore } from "../../store/NodeStore";

const nodeStore = useNodeStore();
</script>

<template>
  <div
    id="mypopup"
    :style="`left:${nodeStore.coordinateX};top:${nodeStore.coordinateY}`"
  >
    <h3>Popup title</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
    <p>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </div>
</template>

<style scoped>
#mypopup {
  width: 400px;
  padding: 20px;
  font-family: Arial, sans-serif;
  font-size: 10pt;
  background-color: green;
  border-radius: 6px;
  position: absolute;
  /* display: none; */
}

#mypopup::before {
  content: "";
  width: 12px;
  height: 12px;
  transform: rotate(45deg);
  background-color: green;
  position: absolute;
  left: -6px;
  top: 68px;
}
</style>
