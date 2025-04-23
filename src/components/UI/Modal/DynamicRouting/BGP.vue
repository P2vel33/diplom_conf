<script setup lang="ts">
import { ref, watch, type Ref } from "vue";
import MyInput from "../../MyInput.vue";
import { validateIPv4 } from "../../../../helpers/IPandMask/validateIPv4";
import { isValidSubnetMask } from "../../../../helpers/IPandMask/isValidSubnetMask";
import MyButton from "../../MyButton.vue";
import { createIsisNetworkAddress } from "../../../../helpers/IPandMask/createIsisNetworkAddress";

console.log(createIsisNetworkAddress(49, 1, "192.168.10.1"));
interface IisisConfiguration {
  afi: number;
  area_id: number;
  ip_address: string;
  mask_ip_address: string;
  net_ip: string;
  level: string;
  process_isis: number;
}
const isisConfiguration: Ref<IisisConfiguration> = ref({
  afi: 49,
  area_id: 1,
  ip_address: "",
  net_ip: "",
  mask_ip_address: "",
  level: "",
  process_isis: 0,
});

const emit = defineEmits(["setIsisConfiguration"]);
const setIsisConfigurationt = () => {
  emit("setIsisConfiguration", isisConfiguration);
};

watch(
  isisConfiguration,
  () => {
    if (validateIPv4(isisConfiguration.value.ip_address)) {
      isisConfiguration.value.net_ip = createIsisNetworkAddress(
        isisConfiguration.value.afi,
        isisConfiguration.value.area_id,
        isisConfiguration.value.ip_address
      );
    }
  },
  { deep: true }
);
</script>

<template>
  <div>
    <!-- <div class="divContent">
      <p>Уникальный номер процесса OSPF:</p>
      <MyInput
        type="number"
        placeholder="1"
        v-model="isisConfiguration.number_ospf"
      />
    </div> -->
    <div class="divContent">
      <p>IP адрес:</p>
      <MyInput
        type="text"
        placeholder="192.0.0.1"
        v-model="isisConfiguration.ip_address"
      />
    </div>
    <p v-if="!validateIPv4(isisConfiguration.ip_address)" class="validError">
      Введите корректный IP адрес
    </p>
    <div class="divContent">
      <p>Маска подсети:</p>
      <MyInput
        type="text"
        placeholder="255.255.0.0"
        v-model="isisConfiguration.mask_ip_address"
      />
    </div>
    <p
      v-if="!isValidSubnetMask(isisConfiguration.mask_ip_address)"
      class="validError"
    >
      Введите корректную маску подсети
    </p>
    <div class="divContent">
      <p>AFI (для net адреса):</p>
      <MyInput type="number" placeholder="49" v-model="isisConfiguration.afi" />
    </div>
    <div class="divContent">
      <p>Area ID (для net адреса):</p>
      <MyInput
        min="0"
        max="9999"
        type="number"
        placeholder="1"
        v-model="isisConfiguration.area_id"
      />
    </div>
    <div class="divContent">
      <p>Net адрес:</p>
      <MyInput
        type="text"
        placeholder="192.0.0.0"
        v-model="isisConfiguration.net_ip"
      />
    </div>
    <div class="divContent">
      <p>Номер процесса IS-IS:</p>
      <MyInput
        min="0"
        type="number"
        placeholder="1"
        v-model="isisConfiguration.process_isis"
      />
    </div>
    <MyButton @click="setIsisConfigurationt"
      >Сохранить конфигурацию IS-IS</MyButton
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
.validError {
  color: red;
  margin-left: auto;
}
</style>
