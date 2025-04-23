<script setup lang="ts">
import { ref, watch, type Ref } from "vue";
import MyInput from "../../MyInput.vue";
import { validateIPv4 } from "../../../../helpers/IPandMask/validateIPv4";
import { isValidSubnetMask } from "../../../../helpers/IPandMask/isValidSubnetMask";
import { calculateNetworkAddress } from "../../../../helpers/IPandMask/calculateNetworkAddress";
import { calculateWildcardMask } from "../../../../helpers/IPandMask/calculateWildcardMask";
import { isSameNetwork } from "../../../../helpers/IPandMask/isSameNetwork";
import MyButton from "../../MyButton.vue";
import { createIsisNetworkAddress } from "../../../../helpers/IPandMask/createIsisNetworkAddress";

console.log(createIsisNetworkAddress(49, 1, "192.168.10.1"));
interface IisisConfiguration {
  number_ospf: number;
  ip_address: string;
  mask_ip_address: string;
  network_ip: string;
  mask_network_ip: string;
  area: number;
}
const isisConfiguration: Ref<IisisConfiguration> = ref({
  number_ospf: 1,
  ip_address: "",
  network_ip: "",
  mask_ip_address: "",
  mask_network_ip: "",
  area: 0,
});

const emit = defineEmits(["setIsisConfiguration"]);
const setIsisConfigurationt = () => {
  emit("setIsisConfiguration", isisConfiguration);
};

watch(
  isisConfiguration,
  () => {
    isisConfiguration.value.network_ip = calculateNetworkAddress(
      isisConfiguration.value.ip_address,
      isisConfiguration.value.mask_ip_address
    );
    isisConfiguration.value.mask_network_ip = calculateWildcardMask(
      isisConfiguration.value.mask_ip_address
    );
  },
  { deep: true }
);
</script>

<template>
  <div>
    <div class="divContent">
      <p>Уникальный номер процесса OSPF:</p>
      <MyInput
        type="number"
        placeholder="1"
        v-model="isisConfiguration.number_ospf"
      />
    </div>
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
      <p>IP адрес сети:</p>
      <MyInput
        type="text"
        placeholder="192.0.0.0"
        v-model="isisConfiguration.network_ip"
      />
    </div>
    <p
      v-if="
        !isSameNetwork(
          isisConfiguration.ip_address,
          isisConfiguration.mask_ip_address,
          isisConfiguration.network_ip
        )
      "
      class="validError"
    >
      Введите корректный IP адрес
    </p>
    <div class="divContent">
      <p>Обратная маска сети:</p>
      <MyInput
        type="text"
        placeholder="255.255.0.0"
        v-model="isisConfiguration.mask_network_ip"
      />
    </div>
    <div class="divContent">
      <p>Номер области (area) OSPF:</p>
      <MyInput type="number" placeholder="0" v-model="isisConfiguration.area" />
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
