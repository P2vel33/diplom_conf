<script setup lang="ts">
import { ref, type Ref } from "vue";
import MyInput from "../../MyInput.vue";
import MyButton from "../../MyButton.vue";

interface IBgpNeighbor {
  id: number;
  neighbor: string;
  remote_as: number | null;
}

interface IbgpConfiguration {
  number_bgp: number;
  array_neighbor: IBgpNeighbor[];
  //   ip_address: string;
  //   mask_ip_address: string;
  //   network_ip: string;
  //   mask_network_ip: string;
  //   area: number;
}
const bgpConfiguration: Ref<IbgpConfiguration> = ref({
  number_bgp: 65001,
  array_neighbor: [{ id: Date.now(), neighbor: "", remote_as: null }],
  //   ip_address: "",
  //   network_ip: "",
  //   mask_ip_address: "",
  //   mask_network_ip: "",
  //   area: 0,
});

const emit = defineEmits(["setBgpConfiguration"]);
const setbgpConfiguration = () => {
  emit("setBgpConfiguration", bgpConfiguration);
};

// watch(
//   bgpConfiguration,
//   () => {
//     bgpConfiguration.value.network_ip = calculateNetworkAddress(
//       bgpConfiguration.value.ip_address,
//       bgpConfiguration.value.mask_ip_address
//     );
//     bgpConfiguration.value.mask_network_ip = calculateWildcardMask(
//       bgpConfiguration.value.mask_ip_address
//     );
//   },
//   { deep: true }
// );

const addNeighbor = () => {
  bgpConfiguration.value.array_neighbor.push({
    id: Date.now(),
    neighbor: "",
    remote_as: null,
  });
};

const deleteNeighbor = (id: number) => {
  bgpConfiguration.value.array_neighbor =
    bgpConfiguration.value.array_neighbor.filter((elem) => elem.id !== id);
};
</script>

<template>
  <div>
    <div class="divContent">
      <p>Номер автономной системы (АС):</p>
      <MyInput
        type="number"
        placeholder="65001"
        v-model="bgpConfiguration.number_bgp"
      />
    </div>
    <MyButton @click="addNeighbor">Добавить соседнюю сеть</MyButton>
    <div class="list-neighbor">
      <div
        class="divContent"
        v-for="neighbor of bgpConfiguration.array_neighbor"
        :key="neighbor.id"
      >
        <p>IP адрес:</p>
        <MyInput
          type="text"
          placeholder="192.0.0.1"
          v-model="neighbor.neighbor"
        />
        <p>Номер АС:</p>
        <MyInput
          type="number"
          placeholder="65002"
          v-model="neighbor.remote_as"
        />
        <!-- <p
          v-if="!isValidSubnetMask(convertWildcardToSubnetMask(neighbor.mask))"
          class="validError"
        >
          Введите корректную маску подсети
        </p> -->
        <MyButton @click="deleteNeighbor(neighbor.id)">Delete</MyButton>
      </div>
    </div>
    <!-- <div class="divContent">
      <p>IP адрес:</p>
      <MyInput
        type="text"
        placeholder="192.0.0.1"
        v-model="bgpConfiguration.ip_address"
      />
    </div>
    <p v-if="!validateIPv4(bgpConfiguration.ip_address)" class="validError">
      Введите корректный IP адрес
    </p> -->
    <!-- <div class="divContent">
      <p>Маска подсети:</p>
      <MyInput
        type="text"
        placeholder="255.255.0.0"
        v-model="bgpConfiguration.mask_ip_address"
      />
    </div>
    <p
      v-if="!isValidSubnetMask(bgpConfiguration.mask_ip_address)"
      class="validError"
    >
      Введите корректную маску подсети
    </p> -->
    <!-- <div class="divContent">
      <p>IP адрес сети:</p>
      <MyInput
        type="text"
        placeholder="192.0.0.0"
        v-model="bgpConfiguration.network_ip"
      />
    </div>
    <p
      v-if="
        !isSameNetwork(
          bgpConfiguration.ip_address,
          bgpConfiguration.mask_ip_address,
          bgpConfiguration.network_ip
        )
      "
      class="validError"
    >
      Введите корректный IP адрес
    </p> -->
    <!-- <div class="divContent">
      <p>Обратная маска сети:</p>
      <MyInput
        type="text"
        placeholder="255.255.0.0"
        v-model="bgpConfiguration.array_neighbor"
      />
    </div> -->
    <!-- <div class="divContent">
      <p>Номер области (area) OSPF:</p>
      <MyInput type="number" placeholder="0" v-model="bgpConfiguration.area" />
    </div> -->
    <MyButton @click="setbgpConfiguration">Сохранить конфигурацию BGP</MyButton>
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
.list-neighbor {
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: scroll;
  max-height: 200px;
}
</style>
