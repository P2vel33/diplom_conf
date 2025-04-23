<script setup lang="ts">
import { inject, ref, type Ref } from "vue";
import MyButton from "../MyButton.vue";
import MyInput from "../MyInput.vue";
import MySelect from "../MySelect.vue";
import { useInteractiveVisiable } from "../../../store/InteractiveVisiable";
import useClearObject from "../../../hooks/useClearObject";
import { networkRouters } from "../../../data/NetworkRouters";
import PortConfiguration from "./PortConfiguration.vue";
import DynamicRouting from "./DynamicRouting/DynamicRouting.vue";

const interactiveVisiable = useInteractiveVisiable();
const { addObjectNodes } = inject("objectNodes");

const selectedType = ref("");
const selectedPort = ref(0);
const selectedVendor = ref("");
const selectedEquipment = ref("");

interface Port {
  [num: number]: object;
}
interface NewNode {
  name: string;
  typeOfNetworkHardware: string;
  local_ip_address: string;
  external_ip_address: string;
  model: string;
  ports: Port;
  face: string;
  vlan: Number | null;
}

const newNode: Ref<NewNode> = ref({
  name: "",
  typeOfNetworkHardware: "",
  local_ip_address: "",
  external_ip_address: "",
  model: "",
  ports: {},
  face: "",
  vlan: null,
});

const changePort = (num: number) => {
  console.log(num);
};

const updatePorts = (portConfiguration: object) => {
  const obj = Object.fromEntries(
    Object.entries(portConfiguration).filter((elem) => elem[1])
  );
  newNode.value.ports[selectedPort.value] = { ...obj };
  selectedPort.value = 0;
};
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
        <MySelect :options="Object.keys(networkRouters)" v-model="selectedType"
          >Select the network equipment</MySelect
        >
      </div>
      <div class="divContent" v-if="selectedType">
        <p>Vendor:</p>
        <MySelect
          :options="Object.keys(networkRouters[selectedType])"
          v-model="selectedVendor"
          >Select the vendor</MySelect
        >
      </div>
      <div class="divContent" v-if="selectedVendor && selectedType">
        <p>{{ selectedType }}:</p>
        <MySelect
          :options="Object.keys(networkRouters[selectedType][selectedVendor])"
          v-model="selectedEquipment"
          >Select the equipment</MySelect
        >
      </div>
      <!-- <div class="divContent" v-if="selectedEquipment">
        <p>Ports:</p>
        <p class="ports">
          {{
            Number(
              networkRouters[selectedType][selectedVendor][selectedEquipment]
            )
          }}
        </p>
      </div> -->

      <div class="divContent">
        <p>Name:</p>
        <MyInput
          v-focus
          type="text"
          placeholder="Node 0"
          v-model="newNode.name as string"
        />
      </div>

      <DynamicRouting v-if="selectedType === 'Router'" />
      <div class="divContent" v-if="selectedEquipment">
        <p>Port:</p>
        <MySelect
          :options="
            Array.from(
              {
                length: Number(
                  networkRouters[selectedType][selectedVendor][
                    selectedEquipment
                  ]
                ),
              },
              (_, i) => i + 1
            )
          "
          v-model="selectedPort"
          @change="changePort(selectedPort)"
          >Select of port</MySelect
        >
      </div>
      <PortConfiguration
        v-if="selectedPort"
        v-model="selectedPort"
        @updatePorts="(e) => updatePorts(e)"
        :selectedType
      />
      <!-- <IP /> -->
      <!-- <MyButton @click="saveConfigure">Save configure</MyButton> -->

      <MyButton
        style="margin-left: auto"
        :disabled="!newNode.name"
        @click="
          interactiveVisiable.toggleIsVisiableModalNodeAdded();
          addObjectNodes({
            ...Object.fromEntries(
              Object.entries(newNode).filter((elem) => elem[1])
            ),
            typeOfNetworkHardware: selectedType,
            model: selectedEquipment,
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
  /* gap: 5px; */
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

.ports {
  color: teal;
}
</style>
