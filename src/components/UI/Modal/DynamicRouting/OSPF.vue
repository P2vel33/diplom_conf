<script setup lang="ts">
import { computed, ref, type Ref } from "vue";
import MyInput from "../../MyInput.vue";
import MyButton from "../../MyButton.vue";
import { useSettingRouter } from "../../../../store/SettingRouter";
import { isNetworkIpValid } from "../../../../helpers/IPandMask/isNetworkIPValid";
import { isValidSubnetMask } from "../../../../helpers/IPandMask/isValidSubnetMask";
import { isNonNegativeInteger } from "../../../../helpers/IPandMask/isNonNegativeInteger";
const settingRouter = useSettingRouter();

interface IOspfNeighbor {
  id: number;
  network: string;
  reverse_mask: string;
  mask: string;
  area: number | null;
}

interface IOspfConfiguration {
  number_ospf: number;
  array_neighbor: IOspfNeighbor[];
}
const ospfConfiguration: Ref<IOspfConfiguration> = ref({
  number_ospf: 1,
  array_neighbor: [
    { id: Date.now(), network: "", mask: "", reverse_mask: "", area: null },
  ],
});

const emit = defineEmits(["setOspfConfiguration"]);
const setOspfConfiguration = () => {
  emit("setOspfConfiguration", ospfConfiguration);
  settingRouter.ospf = ospfConfiguration.value;
};

const addNeighbor = () => {
  ospfConfiguration.value.array_neighbor.push({
    id: Date.now(),
    network: "",
    reverse_mask: "",
    mask: "",
    area: null,
  });
};

const deleteNeighbor = (id: number) => {
  ospfConfiguration.value.array_neighbor =
    ospfConfiguration.value.array_neighbor.filter((elem) => elem.id !== id);
};

const errorOspf = computed(() => {
  let res = false;
  ospfConfiguration.value.array_neighbor.forEach((elem) => {
    if (
      isNetworkIpValid(elem.network, elem.mask) &&
      isNonNegativeInteger(elem.area) &&
      isValidSubnetMask(elem.mask)
    )
      return (res = true);
    else return (res = false);
  });
  return res;
});

// watch(ospfConfiguration, () => {
//   try {
//     if()
//     errorOspf.value = true
//   } catch (error) {
//     errorOspf.value = false
//   }
// },{deep:true})
</script>

<template>
  <div>
    <div class="divContent">
      <p>Уникальный номер процесса OSPF:</p>
      <MyInput
        style="width: 100px"
        type="number"
        placeholder="1"
        v-model="ospfConfiguration.number_ospf"
      />
      <MyButton style="margin-left: auto" @click="addNeighbor"
        >Добавить соседнюю сеть</MyButton
      >
    </div>
    <div class="list-neighbor">
      <div
        class="divContent"
        v-for="neighbor of ospfConfiguration.array_neighbor"
        :key="neighbor.id"
      >
        <p>IP адрес сети:</p>
        <MyInput
          :class="{ error: !isNetworkIpValid(neighbor.network, neighbor.mask) }"
          style="width: 90px"
          type="text"
          placeholder="192.0.0.0"
          v-model="neighbor.network"
        />
        <p>Маска сети:</p>
        <MyInput
          :class="{ error: !isValidSubnetMask(neighbor.mask) }"
          style="width: 90px"
          type="text"
          placeholder="255.255.255.0"
          v-model="neighbor.mask"
        />
        <p>Номер области (area) OSPF:</p>
        <MyInput
          style="width: 50px"
          :class="{ error: !isNonNegativeInteger(neighbor.area) || neighbor.area as number > 999}"
          type="number"
          placeholder="0"
          v-model="neighbor.area"
          min="0"
        />
        <MyButton
          style="width: 60px; height: 30px"
          @click="deleteNeighbor(neighbor.id)"
          >Удалить</MyButton
        >
      </div>
    </div>
    <MyButton
      :disabled="!errorOspf"
      :class="{ error: !errorOspf }"
      style="margin-left: auto"
      @click="setOspfConfiguration"
      >Сохранить конфигурацию OSPF</MyButton
    >
  </div>
</template>

<style scoped>
.error {
  color: red;
  border: 3px solid red;
}

.divContent {
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: flex-start;
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
