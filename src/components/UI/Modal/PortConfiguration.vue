<script setup lang="ts">
import { ref, watch, type Ref } from "vue";
import MyButton from "../MyButton.vue";
import MyInput from "../MyInput.vue";
import DynamicRouting from "./DynamicRouting/DynamicRouting.vue";

interface IPortConfiguration {
  vlan: null | number;
  local_ip_address: string;
  mask_local_ip: string;
  external_ip_address: string;
  mask_external_ip: string;
}

const emit = defineEmits(["updatePorts"]);
const updatePorts = (object: IPortConfiguration): void => {
  emit("updatePorts", object);
};
const { selectedType } = defineProps({
  selectedType: {
    type: String,
    required: true,
  },
});

const portConfiguration: Ref<IPortConfiguration> = ref({
  vlan: null,
  local_ip_address: "",
  external_ip_address: "",
  mask_local_ip: "",
  mask_external_ip: "",
});
const pickedDynamicRouting: Ref<string> = ref("");

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

function isValidSubnetMask(mask: string) {
  // Регулярное выражение для проверки формата IP-адреса (маски)
  const maskRegex =
    /^(25[0-5]|(2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9]))(\.(25[0-5]|(2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9]))){3}$/;

  // Проверить, соответствует ли маска формату IP-адреса
  if (!maskRegex.test(mask)) {
    return false; // Неверный формат маски
  }

  // Преобразование маски в двоичный формат
  const maskParts = mask.split(".").map(Number);
  let binary = maskParts
    .map((num) => num.toString(2).padStart(8, "0"))
    .join("");

  // Проверка, чтобы после первой '0' не было '1'
  return !binary.includes("01");
}

const checkIP = (): Boolean => {
  return (
    portConfiguration.value.external_ip_address ===
    portConfiguration.value.local_ip_address
  );
};

const saveConfigure = () => {
  updatePorts(portConfiguration.value);
  portConfiguration.value.vlan = null;
  portConfiguration.value.local_ip_address = "";
  portConfiguration.value.external_ip_address = "";
  portConfiguration.value.mask_external_ip = "";
  portConfiguration.value.mask_local_ip = "";
};

watch(pickedDynamicRouting, (e) => console.log(e));
</script>

<template>
  <div class="port-configure">
    <div
      style="display: flex; flex-direction: column; gap: 10px"
      v-if="selectedType === 'Switch'"
    >
      <div class="divContent">
        <p>Vlan:</p>
        <MyInput
          type="number"
          placeholder="802"
          v-model="portConfiguration.vlan"
        />
      </div>
    </div>
    <div
      style="display: flex; flex-direction: column; gap: 10px"
      v-if="selectedType === 'Router'"
    >
      <DynamicRouting />
      <div class="divContent">
        <p>Local IP address:</p>
        <MyInput
          type="text"
          placeholder="192.0.0.0"
          v-model="portConfiguration.local_ip_address"
        />
      </div>
      <p
        v-if="!validateIPv4(portConfiguration.local_ip_address) || checkIP()"
        class="validError"
      >
        Enter correct IP address
      </p>
      <div class="divContent">
        <p>Mask:</p>
        <MyInput
          type="text"
          placeholder="255.255.0.0"
          v-model="portConfiguration.mask_local_ip"
        />
      </div>
      <p
        v-if="!isValidSubnetMask(portConfiguration.mask_local_ip)"
        class="validError"
      >
        Enter correct Mask
      </p>
      <div class="divContent">
        <p>External IP address:</p>
        <MyInput
          type="text"
          placeholder="192.0.0.0"
          v-model="portConfiguration.external_ip_address"
        />
      </div>
      <p
        v-if="!validateIPv4(portConfiguration.external_ip_address) || checkIP()"
        class="validError"
      >
        Enter correct IP address
      </p>
      <div class="divContent">
        <p>Mask:</p>
        <MyInput
          type="text"
          placeholder="255.255.0.0"
          v-model="portConfiguration.mask_external_ip"
        />
      </div>
      <p
        v-if="!isValidSubnetMask(portConfiguration.mask_external_ip)"
        class="validError"
      >
        Enter correct Mask
      </p>
    </div>
    <MyButton
      :disabled="
        selectedType === 'Router'
          ? !validateIPv4(portConfiguration.external_ip_address) &&
            !validateIPv4(portConfiguration.local_ip_address)
          : false
      "
      style="margin-left: auto"
      @click="saveConfigure"
      >Save configure</MyButton
    >
  </div>
</template>

<!-- 
          selectedType === 'Router'
            ? !validateIPv4(newNode.external_ip_address) &&
              !validateIPv4(newNode.local_ip_address)
            : false -->
<style scoped>
.divContent {
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: space-between;
  align-items: center;
}
.port-configure {
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  border: 3px solid teal;
  padding: 5px;
}
.validError {
  color: red;
  margin-left: auto;
}
.change-dynamic-routing {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
}
/* .dialog {
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
} */
</style>
