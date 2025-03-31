<script setup lang="ts">
import { ref } from "vue";
import { useNodeStore } from "../../store/NodeStore";
import MyButton from "./MyButton.vue";
import MyInput from "./MyInput.vue";

const nodeStore = useNodeStore();

const hideModal = (): void => {
  nodeStore.isVisiableModalNodeAdded = false;
  console.log(nodeStore.isVisiableModalNodeAdded);
};

const newNode = ref({
  name: "",
  ip_address: "",
  typeOfNetworkHardware: "",
  model: "",
  vlan: null,
});
</script>

<template>
  <div
    class="dialog"
    v-if="nodeStore.isVisiableModalNodeAdded"
    @click="hideModal"
  >
    <div @click.stop class="dialog__content">
      <div class="divContent">
        <p>Name:</p>
        <MyInput
          v-focus
          type="text"
          placeholder="Node 0"
          v-model="newNode.name"
        />
      </div>
      <div class="divContent">
        <p>IP address:</p>
        <MyInput
          type="text"
          placeholder="192.0.0.0"
          v-model="newNode.ip_address"
        />
      </div>
      <div class="divContent">
        <p>Type:</p>
        <MyInput
          type="text"
          placeholder="Switch"
          v-model="newNode.typeOfNetworkHardware"
        />
      </div>
      <div class="divContent">
        <p>Model:</p>
        <MyInput
          type="text"
          placeholder="Cisco 1928R"
          v-model="newNode.model"
        />
      </div>
      <div class="divContent">
        <p>Vlan:</p>
        <MyInput type="number" placeholder="802" v-model="newNode.vlan" />
      </div>
      <MyButton style="margin-left: auto" @click="hideModal">Add</MyButton>
    </div>
  </div>
</template>

<style scoped>
.divContent {
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: space-between;
  align-items: center;
}
.dialog {
  top: 0%;
  bottom: 0%;
  right: 0%;
  left: 0%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  gap: 10px;
  z-index: 1;
  /* padding: 20px; */
}

.dialog__content {
  display: flex;
  flex-direction: column;
  margin: auto;
  background: white;
  border-radius: 12px;
  min-height: 100px;
  min-width: 500px;
  padding: 20px;
  gap: 10px;
}
</style>
