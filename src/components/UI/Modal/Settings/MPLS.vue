<script setup lang="ts">
import { computed, ref } from "vue";
import MyButton from "../../MyButton.vue";
import MyInput from "../../MyInput.vue";
import { useSettingRouter } from "../../../../store/SettingRouter";
import { networkRouters } from "../../../../data/NetworkRouters";

const { selectedEquipment, selectedVendor } = defineProps({
  selectedEquipment: {
    type: String,
    required: true,
  },
  selectedVendor: {
    type: String,
    required: true,
  },
});
console.log(selectedEquipment, selectedVendor);
const ports = computed(() => {
  return networkRouters["Router"][selectedVendor][selectedEquipment];
});

console.log(ports.value);
const settingRouter = useSettingRouter();
const ports_mpls = ref([
  {
    id: Date.now(),
    port: null,
  },
]);

const addPort = () => {
  ports_mpls.value.push({
    id: Date.now(),
    port: null,
  });
};
const deletePort = (id: number) => {
  ports_mpls.value = ports_mpls.value.filter((elem) => elem.id !== id);
};
const checkPort = (port: {
  id: number;
  port: number | null | string;
}): boolean => {
  let resOne =
    ports_mpls.value.filter((elem) => {
      if (port.port !== null) {
        return elem.port === port.port;
      }
    }).length > 1
      ? true
      : false;
  let resTwo =
    ports_mpls.value.filter((elem) => {
      if (elem.port === null || elem.port === "") {
        return true;
      }
    }).length > 0
      ? true
      : false;
  let resThree = !ports_mpls.value.every((elem) => {
    return elem.port >= 0 && elem.port < ports.value;
  });
  console.log(resOne, resTwo, resThree);
  return resOne || resTwo || resThree;
};

const saveConfiguration = () => {
  settingRouter.mpls = ports_mpls.value;
  console.log(settingRouter.mpls);
};

const errorMpls = computed(() => {
  let resOne = false;
  ports_mpls.value.forEach((elem) => {
    if (!checkPort(elem)) return (resOne = true);
    else return (resOne = false);
  });

  return resOne;
});
</script>

<template>
  <div class="mpls">
    <div class="divContent">
      <p>Порты MPLS:</p>
      <MyButton style="margin-left: auto" @click="addPort"
        >Добавить порт</MyButton
      >
    </div>
    <div class="divContent">
      <div class="port-list">
        <div class="divContent" v-for="port of ports_mpls" :key="port.id">
          <p>Номер порта MPLS:</p>
          <MyInput
            :class="{ error: checkPort(port) }"
            style="width: 50px"
            type="number"
            placeholder="0"
            min="0"
            v-model="port.port"
          />

          <MyButton
            @click="deletePort(port.id)"
            style="width: 60px; height: 30px"
            >Удалить</MyButton
          >
        </div>
      </div>
    </div>
    <MyButton
      :class="{ error: !errorMpls }"
      style="margin-left: auto"
      @click="saveConfiguration"
      >Сохранить конфигурацию</MyButton
    >
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.mpls {
  border: 3px solid teal;
  border-radius: 15px;
  padding: 5px;
}

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

.port-list {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 100px;
}
.port-mpls {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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
