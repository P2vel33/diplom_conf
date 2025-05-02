<script setup lang="ts">
import { ref, type Ref } from "vue";
import MyInput from "../../MyInput.vue";
import MyButton from "../../MyButton.vue";
import { useSettingRouter } from "../../../../store/SettingRouter";
const settingRouter = useSettingRouter();
interface IOspfNeighbor {
  id: number;
  network: string;
  mask: string;
  area: number | null;
}

interface IOspfConfiguration {
  number_ospf: number;
  array_neighbor: IOspfNeighbor[];
}
const ospfConfiguration: Ref<IOspfConfiguration> = ref({
  number_ospf: 1,
  array_neighbor: [{ id: Date.now(), network: "", mask: "", area: null }],
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
          style="width: 90px"
          type="text"
          placeholder="192.0.0.0"
          v-model="neighbor.network"
        />
        <p>Обратная маска сети:</p>
        <MyInput
          style="width: 90px"
          type="text"
          placeholder="0.0.0.255"
          v-model="neighbor.mask"
        />
        <p>Номер области (area) OSPF:</p>
        <MyInput
          style="width: 50px"
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
    <MyButton style="margin-left: auto" @click="setOspfConfiguration"
      >Сохранить конфигурацию OSPF</MyButton
    >
  </div>
</template>

<style scoped>
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
