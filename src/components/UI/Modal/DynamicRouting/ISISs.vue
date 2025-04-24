<script setup lang="ts">
import { ref, type Ref } from "vue";
import MyInput from "../../MyInput.vue";
import MyButton from "../../MyButton.vue";

interface IPortPassive {
  id: number;
  port: number | null;
}
interface IisisConfiguration {
  process_isis: number;
  net_ip: string;
  level: string;
  array_ports_passive: IPortPassive[];
}
const isisConfiguration: Ref<IisisConfiguration> = ref({
  net_ip: "",
  level: "",
  process_isis: 0,
  array_ports_passive: [{ id: Date.now(), port: null }],
});

const emit = defineEmits(["setIsisConfiguration"]);
const setIsisConfigurationt = () => {
  emit("setIsisConfiguration", isisConfiguration);
};

const addNeighbor = () => {
  isisConfiguration.value.array_ports_passive.push({
    id: Date.now(),
    port: null,
  });
};

const deleteNeighbor = (id: number) => {
  isisConfiguration.value.array_ports_passive =
    isisConfiguration.value.array_ports_passive.filter(
      (elem) => elem.id !== id
    );
};
</script>

<template>
  <div>
    <div class="divContent">
      <p>Номер процесса IS-IS:</p>
      <MyInput
        min="0"
        type="number"
        placeholder="1"
        v-model="isisConfiguration.process_isis"
      />
    </div>
    <div class="divContent">
      <p>Net адрес:</p>
      <MyInput
        type="text"
        placeholder="49.0001.0000.0001.00"
        v-model="isisConfiguration.net_ip"
      />
    </div>
    <div class="divContent">
      <p>Уровень:</p>
      <MyInput
        type="text"
        placeholder="1, 2, 1-2"
        v-model="isisConfiguration.level"
      />
    </div>

    <div class="divContent">
      <p>Номера пассивных портов IS-IS:</p>
      <MyButton style="margin-left: auto" @click="addNeighbor"
        >Добавить порт</MyButton
      >
    </div>
    <div class="list-ports-passive">
      <div
        class="divContent"
        v-for="port of isisConfiguration.array_ports_passive"
        :key="port.id"
      >
        <p>Номер порта:</p>
        <MyInput
          style="width: 50px"
          min="0"
          type="number"
          placeholder="1"
          v-model="port.port"
        />
        <MyButton
          style="margin-left: auto; width: 60px; height: 30px"
          @click="deleteNeighbor(port.id)"
          >Удалить</MyButton
        >
      </div>
    </div>
    <MyButton style="margin-left: auto" @click="setIsisConfigurationt"
      >Сохранить конфигурацию IS-IS</MyButton
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
.list-ports-passive {
  max-height: 150px;
  overflow-y: scroll;
}
</style>
