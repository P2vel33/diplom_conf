<script setup lang="ts">
import { computed, inject, ref, watch, type Ref } from "vue";
import MyButton from "../MyButton.vue";
import MyInput from "../MyInput.vue";
import MySelect from "../MySelect.vue";
import { useInteractiveVisiable } from "../../../store/InteractiveVisiable";
import type { Node } from "v-network-graph";
import useClearObject from "../../../hooks/useClearObject";

function validateIPv4(ip: string) {
  const ipv4Pattern =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(0|255|([1-9][0-9]?)|(1[0-9]{2}|2[0-4][0-9]|25[0-4]))$/;
  return ipv4Pattern.test(ip);
}

const interactiveVisiable = useInteractiveVisiable();
const { addObjectNodes } = inject("objectNodes");

const selectedType = ref("");

interface NewNode {
  name: string;
  typeOfNetworkHardware: string;
  local_ip_address: string;
  external_ip_address: string;
  model: string;
  face: string;
  vlan: Number | null;
}

const newNode: Ref<NewNode> = ref({
  name: "",
  typeOfNetworkHardware: "",
  local_ip_address: "",
  external_ip_address: "",
  model: "",
  face: "",
  vlan: null,
});

// watch(
//   newNode,
//   () => {
//     console.log("WORK");
//     console.log(newNode.value.external_ip_address);
//     console.log(validateIPv4(newNode.value.external_ip_address));
//   },
//   { deep: true }
// );

const options: string[] = ["Switch", "Router"];
</script>

<template>
  <div
    class="dialog"
    v-if="interactiveVisiable.isVisiableModalNodeAdded"
    @click="interactiveVisiable.toggleIsVisiableModalNodeAdded"
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
          v-model="newNode.name as string"
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
        :disabled="!validateIPv4(newNode.external_ip_address)"
        @click="
          interactiveVisiable.toggleIsVisiableModalNodeAdded();
          addObjectNodes({
            ...Object.fromEntries(
              Object.entries(newNode).filter((elem) => elem[1])
            ),
            typeOfNetworkHardware: selectedType,
            active: true,
          });
          useClearObject(newNode);
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
