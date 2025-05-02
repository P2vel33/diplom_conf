<script setup lang="ts">
import { ref } from "vue";
import MyInput from "../../MyInput.vue";
import MyButton from "../../MyButton.vue";
import { useSettingRouter } from "../../../../store/SettingRouter";

const settingRouter = useSettingRouter();

const l3vpn = ref([
  {
    id: Date.now(),
    vrf_name: "VRF 1",
    bgp_id: 65001,
    rd: 100,
    ports_vrf: [{ id: Date.now(), port: null }],
  },
]);

const addPort = (id_l3vpn: number) => {
  console.log(id_l3vpn);
  console.log(l3vpn.value[id_l3vpn]);
  l3vpn.value[id_l3vpn].ports_vrf.push({
    id: Date.now(),
    port: null,
  });
};
const addL3vpn = () => {
  l3vpn.value.push({
    id: Date.now(),
    vrf_name: "VRF 1",
    bgp_id: 65001,
    rd: 100,
    ports_vrf: [{ id: Date.now(), port: null }],
  });
};
const deletePort = (id_l3vpn: number, id_port: number) => {
  l3vpn.value[id_l3vpn].ports_vrf = l3vpn.value[id_l3vpn].ports_vrf.filter(
    (elem) => elem.id !== id_port
  );
};
const deleteL3vpn = (id: number) => {
  l3vpn.value = l3vpn.value.filter((elem) => elem.id !== id);
};
// const checkPort = (
//   id_l3vpn: number,
//   port: { id: number; port: number | null }
// ): boolean => {
//   const res =
//     l3vpn.value[id_l3vpn].ports_vrf.filter((elem) => {
//       if (port.port !== null) {
//         return elem.port === port.port;
//       }
//     }).length > 1
//       ? true
//       : false;
//   return res;
// };

const saveConfiguration = () => {
  settingRouter.l3vpn = l3vpn.value;
  console.log(settingRouter.l3vpn);
};
</script>

<template>
  <div class="l3vpn">
    <div v-for="(item_l3vpn, index) of l3vpn" :key="item_l3vpn.id">
      <div class="divContent">
        <p>Название VRF:</p>
        <MyInput
          style="width: 50px"
          type="text"
          placeholder="0"
          min="0"
          v-model="item_l3vpn.vrf_name"
        />
      </div>
      <div class="divContent">
        <p>Номер АС BGP:</p>
        <MyInput
          style="width: 50px"
          type="number"
          placeholder="65001"
          min="0"
          v-model="item_l3vpn.bgp_id"
        />
      </div>
      <div class="divContent">
        <p>Номер rd:</p>
        <MyInput
          style="width: 50px"
          type="number"
          placeholder="100"
          min="0"
          v-model="item_l3vpn.rd"
        />
      </div>
      <MyButton @click="addPort(index)">Добавить порт</MyButton>
      <div class="port-list">
        <div
          class="divContent"
          v-for="port of item_l3vpn.ports_vrf"
          :key="port.id"
        >
          <p>Номер порта VRF:</p>
          <MyInput
            style="width: 50px"
            type="number"
            placeholder="0"
            min="0"
            v-model="port.port"
          />
          <MyButton
            style="width: 60px; height: 30px"
            @click="deletePort(index, port.id)"
            >Удалить</MyButton
          >

          <!-- :class="{ error: checkPort(item_l3vpn.id, port) }" -->
        </div>
      </div>
    </div>
    <MyButton @click="saveConfiguration">Сохранить конфигурацию</MyButton>
  </div>
</template>

<style scoped>
.port-list {
  overflow-y: auto;
  max-height: 100px;
}
.l3vpn {
  border: 3px solid teal;
  border-radius: 15px;
  padding: 5px;
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

.error {
  border: 3px solid red;
}
</style>
