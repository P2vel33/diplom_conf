<script setup lang="ts">
import { computed, type ComputedRef } from "vue";

const { coordinateModal, nodeModal } = defineProps({
  coordinateModal: {
    type: Object,
    required: true,
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
  },
  nodeModal: {
    type: Object,
    required: true,
  },
});

const isModalMoreWindow: ComputedRef<Object> = computed(() => {
  return {
    x: window.innerWidth > coordinateModal.x + 200 ? "left" : "right",
    y: window.innerHeight > coordinateModal.y + 150 ? "top" : "bottom",
  };
});
const positionModal: ComputedRef<Object> = computed(() => {
  return {
    x:
      window.innerWidth > coordinateModal.x + 200
        ? coordinateModal.x
        : window.innerWidth - coordinateModal.x,
    y:
      window.innerHeight > coordinateModal.y + 150
        ? coordinateModal.y
        : window.innerHeight - coordinateModal.y,
  };
});
</script>

<template>
  <div
    ref="mypopup"
    id="mypopup"
    :style="`${isModalMoreWindow.x}:${positionModal.x}px;${isModalMoreWindow.y}:${positionModal.y}px;`"
  >
    <h3>
      Name:
      <strong class="str">{{ nodeModal.name }}</strong>
    </h3>
    <p
      v-for="[key, value] in Object.entries(nodeModal).filter(
        (elem) => elem[0] !== 'face' && elem[0] !== 'name'
      )"
    >
      {{ key }}:
      <strong class="str">{{ value }}</strong>
    </p>
  </div>
</template>

<style scoped>
#mypopup {
  width: 200px;
  padding: 20px;
  font-family: Arial, sans-serif;
  font-size: 10pt;
  background-color: teal;
  border-radius: 6px;
  position: absolute;
  z-index: 2;
  /* display: none; */
}

/* #mypopup::before {
  content: "";
  width: 12px;
  height: 12px;
  transform: rotate(45deg);
  background-color: green;
  position: absolute;
  left: -6px;
  top: 10px;
} */

.str {
  color: white;
}
</style>
