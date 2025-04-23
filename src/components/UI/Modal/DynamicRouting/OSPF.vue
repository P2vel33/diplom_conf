<script setup lang="ts">
import { ref, type Ref } from "vue";
import MyInput from "../../MyInput.vue";
import MyButton from "../../MyButton.vue";

interface IOspfNeighbor {
  id: number;
  network: string;
  mask: string;
  area: number | null;
}

interface IOspfConfiguration {
  number_ospf: number;
  array_neighbor: IOspfNeighbor[];
  //   ip_address: string;
  //   mask_ip_address: string;
  //   network_ip: string;
  //   mask_network_ip: string;
  //   area: number;
}
const ospfConfiguration: Ref<IOspfConfiguration> = ref({
  number_ospf: 1,
  array_neighbor: [{ id: Date.now(), network: "", mask: "", area: null }],
  //   ip_address: "",
  //   network_ip: "",
  //   mask_ip_address: "",
  //   mask_network_ip: "",
  //   area: 0,
});

const emit = defineEmits(["setOspfConfiguration"]);
const setOspfConfiguration = () => {
  emit("setOspfConfiguration", ospfConfiguration);
};

// watch(
//   ospfConfiguration,
//   () => {
//     ospfConfiguration.value.network_ip = calculateNetworkAddress(
//       ospfConfiguration.value.ip_address,
//       ospfConfiguration.value.mask_ip_address
//     );
//     ospfConfiguration.value.mask_network_ip = calculateWildcardMask(
//       ospfConfiguration.value.mask_ip_address
//     );
//   },
//   { deep: true }
// );

const addNeighbor = () => {
  ospfConfiguration.value.array_neighbor.push({
    id: Date.now(),
    network: "",
    mask: "",
    area: null,
  });
};

const deleteNeighbor = (id: number) => {
  ospfConfiguration.value.array_neighbor =
    ospfConfiguration.value.array_neighbor.filter((elem) => elem.id !== id);
};
</script>

<template>
  <div>
    <div class="divContent">
      <p>Уникальный номер процесса OSPF:</p>
      <MyInput
        type="number"
        placeholder="1"
        v-model="ospfConfiguration.number_ospf"
      />
    </div>
    <MyButton @click="addNeighbor">Добавить соседнюю сеть</MyButton>
    <div class="list-neighbor">
      <div
        class="divContent"
        v-for="neighbor of ospfConfiguration.array_neighbor"
        :key="neighbor.id"
      >
        <p>IP адрес сети:</p>
        <MyInput
          type="text"
          placeholder="192.0.0.0"
          v-model="neighbor.network"
        />
        <p>Обратная маска сети:</p>
        <MyInput type="text" placeholder="0.0.0.255" v-model="neighbor.mask" />
        <!-- <p
          v-if="!isValidSubnetMask(convertWildcardToSubnetMask(neighbor.mask))"
          class="validError"
        >
          Введите корректную маску подсети
        </p> -->
        <p>Номер области (area) OSPF:</p>
        <MyInput
          type="number"
          placeholder="0"
          v-model="neighbor.area"
          min="0"
        />
        <MyButton @click="deleteNeighbor(neighbor.id)">Delete</MyButton>
      </div>
    </div>
    <!-- <div class="divContent">
      <p>IP адрес:</p>
      <MyInput
        type="text"
        placeholder="192.0.0.1"
        v-model="ospfConfiguration.ip_address"
      />
    </div>
    <p v-if="!validateIPv4(ospfConfiguration.ip_address)" class="validError">
      Введите корректный IP адрес
    </p> -->
    <!-- <div class="divContent">
      <p>Маска подсети:</p>
      <MyInput
        type="text"
        placeholder="255.255.0.0"
        v-model="ospfConfiguration.mask_ip_address"
      />
    </div>
    <p
      v-if="!isValidSubnetMask(ospfConfiguration.mask_ip_address)"
      class="validError"
    >
      Введите корректную маску подсети
    </p> -->
    <!-- <div class="divContent">
      <p>IP адрес сети:</p>
      <MyInput
        type="text"
        placeholder="192.0.0.0"
        v-model="ospfConfiguration.network_ip"
      />
    </div>
    <p
      v-if="
        !isSameNetwork(
          ospfConfiguration.ip_address,
          ospfConfiguration.mask_ip_address,
          ospfConfiguration.network_ip
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
        v-model="ospfConfiguration.array_neighbor"
      />
    </div> -->
    <!-- <div class="divContent">
      <p>Номер области (area) OSPF:</p>
      <MyInput type="number" placeholder="0" v-model="ospfConfiguration.area" />
    </div> -->
    <MyButton @click="setOspfConfiguration"
      >Сохранить конфигурацию OSPF</MyButton
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
.list-neighbor {
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: scroll;
  max-height: 200px;
}
</style>
