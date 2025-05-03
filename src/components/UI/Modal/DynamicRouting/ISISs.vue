<script setup lang="ts">
import { computed, ref, type Ref } from "vue";
import MyInput from "../../MyInput.vue";
import MyButton from "../../MyButton.vue";
import { useSettingRouter } from "../../../../store/SettingRouter";
import { isNonNegativeInteger } from "../../../../helpers/IPandMask/isNonNegativeInteger";
import { isValidNetAddress } from "../../../../helpers/IPandMask/isValidNetAddress";
const settingRouter = useSettingRouter();

interface IPortPassive {
  id: number;
  port: number | null;
}
interface IisisConfiguration {
  process_isis: number | null;
  net_ip: string;
  level: "1" | "2" | "1-2" | "";
  array_ports_passive: IPortPassive[];
}
const isisConfiguration: Ref<IisisConfiguration> = ref({
  net_ip: "",
  level: "",
  process_isis: null,
  array_ports_passive: [{ id: Date.now(), port: null }],
});

const emit = defineEmits(["setIsisConfiguration"]);
const setIsisConfiguration = () => {
  settingRouter.isis = isisConfiguration.value;
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

const checkPort = (port: {
  id: number;
  port: number | null | string;
}): boolean => {
  let resOne =
    isisConfiguration.value.array_ports_passive.filter((elem) => {
      if (port.port !== null) {
        return elem.port === port.port;
      }
    }).length > 1
      ? true
      : false;
  let resTwo =
    isisConfiguration.value.array_ports_passive.filter((elem) => {
      if (elem.port === null) {
        return true;
      }
    }).length > 0
      ? true
      : false;
  return resOne || resTwo;
};

const errorIsis = computed(() => {
  let resOne = false;
  let resTwo = false;
  if (
    (isisConfiguration.value.level === "1" ||
      isisConfiguration.value.level === "2" ||
      isisConfiguration.value.level === "1-2") &&
    isValidNetAddress(isisConfiguration.value.net_ip) &&
    (isNonNegativeInteger(isisConfiguration.value.process_isis) ||
      (isisConfiguration.value.process_isis as number) > 999)
  )
    resOne = true;
  isisConfiguration.value.array_ports_passive.forEach((elem) => {
    if (!checkPort(elem)) return (resTwo = true);
    else return (resTwo = false);
  });
  return resOne && resTwo;
});
</script>

<template>
  <div>
    <div class="divContent">
      <p>Номер процесса IS-IS:</p>
      <MyInput
        :class="{ error: !isNonNegativeInteger(isisConfiguration.process_isis) || isisConfiguration.process_isis as number > 999}"
        min="0"
        type="number"
        placeholder="1"
        v-model="isisConfiguration.process_isis"
      />
    </div>
    <div class="divContent">
      <p>Net адрес:</p>
      <MyInput
        :class="{ error: !isValidNetAddress(isisConfiguration.net_ip) }"
        type="text"
        placeholder="49.0001.0000.0000.0001.00"
        v-model="isisConfiguration.net_ip"
      />
    </div>
    <div class="divContent">
      <p>Уровень:</p>
      <MyInput
        :class="{
          error: !(
            isisConfiguration.level === '1' ||
            isisConfiguration.level === '2' ||
            isisConfiguration.level === '1-2'
          ),
        }"
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
          :class="{ error: checkPort(port) }"
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
    <MyButton
      :disabled="!errorIsis"
      :class="{ error: !errorIsis }"
      style="margin-left: auto"
      @click="setIsisConfiguration"
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
.error {
  color: red;
  border: 3px solid red;
}
</style>
