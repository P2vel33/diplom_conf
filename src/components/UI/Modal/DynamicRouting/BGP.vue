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
}
const bgpConfiguration: Ref<IbgpConfiguration> = ref({
  number_bgp: 65001,
  array_neighbor: [{ id: Date.now(), neighbor: "", remote_as: null }],
});

const emit = defineEmits(["setBgpConfiguration"]);
const setbgpConfiguration = () => {
  emit("setBgpConfiguration", bgpConfiguration);
};

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
        style="width: 60px"
        type="number"
        placeholder="65001"
        v-model="bgpConfiguration.number_bgp"
      />
    </div>
    <MyButton style="margin-left: auto" @click="addNeighbor"
      >Добавить соседнюю сеть</MyButton
    >
    <div class="list-neighbor">
      <div
        class="divContent"
        v-for="neighbor of bgpConfiguration.array_neighbor"
        :key="neighbor.id"
      >
        <p>IP адрес:</p>
        <MyInput
          style="width: 90px"
          type="text"
          placeholder="192.0.0.1"
          v-model="neighbor.neighbor"
        />
        <p>Номер АС:</p>
        <MyInput
          style="width: 60px"
          type="number"
          placeholder="65002"
          v-model="neighbor.remote_as"
        />
        <MyButton
          style="margin-left: auto; width: 60px; height: 30px"
          @click="deleteNeighbor(neighbor.id)"
          >Удалить</MyButton
        >
      </div>
    </div>
    <MyButton style="margin-left: auto" @click="setbgpConfiguration"
      >Сохранить конфигурацию BGP</MyButton
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
