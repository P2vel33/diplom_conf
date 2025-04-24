<script setup lang="ts">
import { ref, watch, type Ref } from "vue";
import MyButton from "../MyButton.vue";
import MyInput from "../MyInput.vue";
import { validateIPv4 } from "../../../helpers/IPandMask/validateIPv4";
import { isValidSubnetMask } from "../../../helpers/IPandMask/isValidSubnetMask";
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
      <div class="divContent">
        <p>IP адрес:</p>
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
        Введите корректный IP адрес
      </p>
      <div class="divContent">
        <p>Маска подсети:</p>
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
        Введите корректную маску подсети
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
      >Сохранить конфигурацию</MyButton
    >
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
</style>
