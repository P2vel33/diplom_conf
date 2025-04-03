<script setup lang="ts">
import { inject, ref } from "vue";
// import { useNodeStore } from "../../../store/NodeStore";
import MyButton from "../MyButton.vue";
import MyInput from "../MyInput.vue";
import MySelect from "../MySelect.vue";
import { useInteractiveVisiable } from "../../../store/InteractiveVisiable";

// const nodeStore = useNodeStore();
const interactiveVisiable = useInteractiveVisiable();
const { addObjectNodes } = inject("objectNodes");

const hideModal = (): void => {
  interactiveVisiable.isVisiableModalNodeAdded = false;
};

const selectedType = ref("");

const newNode = {
  name: "",
  typeOfNetworkHardware: "",
  local_ip_address: "",
  external_ip_address: "",
  model: "",
  face: "",
  vlan: null,
};

const options: string[] = ["Switch", "Router"];
const clearObject = () => {
  // const newNewNode = {
  //   ...Object.fromEntries(Object.entries(newNode).filter((elem) => elem[1])),
  //   typeOfNetworkHardware: selectedType.value,
  //   // face: selectedType.value === "Switch" ? "Comm.png" : "Router.png",
  // };
  for (const [key, value] of Object.entries(newNode)) {
    newNode[key] = typeof value === "string" ? "" : null;
  }
};
</script>

<template>
  <div
    class="dialog"
    v-if="interactiveVisiable.isVisiableModalNodeAdded"
    @click="hideModal"
  >
    <div @click.stop class="dialog__content">
      <h1>Add node</h1>
      <div class="divContent">
        <p>Type:</p>
        <MySelect :options v-model="selectedType" />
      </div>
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
        <p>Model:</p>
        <MyInput
          type="text"
          placeholder="Cisco 1928R"
          v-model="newNode.model"
        />
      </div>
      <div
        style="display: flex; flex-direction: column; gap: 10px"
        v-if="selectedType === 'Switch'"
      >
        <div class="divContent">
          <p>Vlan:</p>
          <MyInput type="number" placeholder="802" v-model="newNode.vlan" />
        </div>
      </div>
      <div
        style="display: flex; flex-direction: column; gap: 10px"
        v-if="selectedType === 'Router'"
      >
        <div class="divContent">
          <p>Local IP address:</p>
          <MyInput
            type="text"
            placeholder="192.0.0.0"
            v-model="newNode.local_ip_address"
          />
        </div>
        <div class="divContent">
          <p>External IP address:</p>
          <MyInput
            type="text"
            placeholder="192.0.0.0"
            v-model="newNode.external_ip_address"
          />
        </div>
      </div>

      <MyButton
        style="margin-left: auto"
        @click="
          hideModal();
          // aasd();
          addObjectNodes({
            ...Object.fromEntries(
              Object.entries(newNode).filter((elem) => elem[1])
            ),
            typeOfNetworkHardware: selectedType,
            active: true,
          });
          clearObject();
        "
        >Add</MyButton
      >
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
