<script setup lang="ts">
import { inject, ref, watch, type Ref } from "vue";
import MyButton from "../MyButton.vue";
import MyInput from "../MyInput.vue";
import MySelect from "../MySelect.vue";
import { useInteractiveVisiable } from "../../../store/InteractiveVisiable";
import useClearObject from "../../../hooks/useClearObject";
import IP from "../../IP.vue";
import { networkRouters } from "../../../data/NetworkRouters";

function validateIPv4(ip: string) {
  // Регулярное выражение для проверки формата IP-адреса
  const ipPattern =
    /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$/;
  // Проверка соответствия формату
  if (!ipPattern.test(ip)) {
    return false;
  }
  // Разделение IP-адреса на октеты
  const octets = ip.split(".").map(Number);
  // Проверка условий для первого и последнего октетов
  if (
    octets[0] === 0 ||
    octets[0] === 255 ||
    octets[3] === 0 ||
    octets[3] === 255
  ) {
    return false;
  }

  return true;
}
const ports = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
];
const interactiveVisiable = useInteractiveVisiable();
const { addObjectNodes } = inject("objectNodes");
const options: string[] = ["Switch", "Router"];

const selectedType = ref("");
const selectedPort = ref(0);
const selectedVendor = ref("");
const selectedEquipment = ref("");

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

const checkIP = (): Boolean => {
  return newNode.value.external_ip_address === newNode.value.local_ip_address;
};
// watch(
//   newNode,
//   () => {
//     console.log("WORK");
//     console.log(newNode.value.external_ip_address);
//     console.log(validateIPv4(newNode.value.external_ip_address));
//   },
//   { deep: true }
// );
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
      <div class="divContent" v-if="selectedEquipment">
        <p>Ports:</p>
        <p class="ports">
          {{ networkRouters[selectedType][selectedVendor][selectedEquipment] }}
        </p>
      </div>
      <div class="divContent">
        <p>Port:</p>
        <MyButton>Add port</MyButton>
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
      <div class="divContent">
        <p>Port:</p>
        <MySelect :options="ports" v-model="selectedPort"
          >Select of port</MySelect
        >
      </div>
      <!-- <IP /> -->
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
        <p
          v-if="!validateIPv4(newNode.local_ip_address) || checkIP()"
          class="validError"
        >
          Enter correct IP address
        </p>
        <div class="divContent">
          <p>External IP address:</p>
          <MyInput
            type="text"
            placeholder="192.0.0.0"
            v-model="newNode.external_ip_address"
          />
        </div>
        <p
          v-if="!validateIPv4(newNode.external_ip_address) || checkIP()"
          class="validError"
        >
          Enter correct IP address
        </p>
      </div>

      <MyButton
        style="margin-left: auto"
        :disabled="
          selectedType === 'Router'
            ? !validateIPv4(newNode.external_ip_address) &&
              !validateIPv4(newNode.local_ip_address)
            : false
        "
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

.validIP {
  display: flex;
  flex-direction: column;
}
.validError {
  color: red;
  margin-left: auto;
}

.ports {
  color: teal;
}
</style>
