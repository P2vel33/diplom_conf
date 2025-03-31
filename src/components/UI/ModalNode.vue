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
    name: {
      type: String,
      required: true,
    },
    ip_address: {
      type: String,
      required: false,
      default: "192.0.0.0",
    },
    typeOfNetworkHardware: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    vlan: {
      type: Number,
      required: false,
    },
  },
});

const isModalMoreWindow: ComputedRef<Object> = computed(() => {
  return {
    x: window.innerWidth > coordinateModal.x + 150 ? "left" : "right",
    y: window.innerHeight > coordinateModal.y + 250 ? "top" : "bottom",
  };
});
const positionModal: ComputedRef<Object> = computed(() => {
  return {
    x:
      window.innerWidth > coordinateModal.x + 150
        ? coordinateModal.x
        : window.innerWidth - coordinateModal.x,
    y:
      window.innerHeight > coordinateModal.y + 250
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
    <h3>Name: {{ nodeModal.name }}</h3>
    <p>IP-address: {{ nodeModal.ip_address }}</p>
    <p>Type: {{ nodeModal.typeOfNetworkHardware }}</p>
    <p>Model: {{ nodeModal.model }}</p>
    <p>Vlan: {{ nodeModal.vlan }}</p>
  </div>
</template>

<style scoped>
#mypopup {
  width: 150px;
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
</style>
