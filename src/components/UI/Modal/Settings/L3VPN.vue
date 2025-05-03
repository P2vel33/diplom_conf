<script setup lang="ts">
import { ref } from "vue";
import MyInput from "../../MyInput.vue";
import MyButton from "../../MyButton.vue";
import { useSettingRouter } from "../../../../store/SettingRouter";
import { isNonNegativeInteger } from "../../../../helpers/IPandMask/isNonNegativeInteger";
import { isInRange } from "../../../../helpers/IPandMask/isInRange";

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

// const checkPort = (port: {
//   id: number;
//   port: number | null | string;
// }): boolean => {
//   let resOne =
//     ports_mpls.value.filter((elem) => {
//       if (port.port !== null) {
//         return elem.port === port.port;
//       }
//     }).length > 1
//       ? true
//       : false;
//   let resTwo =
//     ports_mpls.value.filter((elem) => {
//       if (elem.port === null || elem.port === "") {
//         return true;
//       }
//     }).length > 0
//       ? true
//       : false;
//   let resThree = !ports_mpls.value.every((elem) => {
//     return elem.port >= 0 && elem.port < ports.value;
//   });
//   console.log(resOne, resTwo, resThree);
//   return resOne || resTwo || resThree;
// };

const saveConfiguration = () => {
  settingRouter.l3vpn = l3vpn.value;
  console.log(settingRouter.l3vpn);
};
</script>

<template>
  <div class="l3vpn">
    <div class="list-vrf">
      <div class="header-list-vrf">
        <p>Список VRF:</p>
        <MyButton @click="addL3vpn">Добавить VRF</MyButton>
      </div>
      <div
        v-for="(item_l3vpn, index) of l3vpn"
        :key="item_l3vpn.id"
        class="vrf-item-content"
      >
        <div class="divContent">
          <p>Название VRF:</p>
          <MyInput
            :class="{
              error: item_l3vpn.vrf_name === '',
            }"
            style="width: 115px"
            type="text"
            placeholder="0"
            min="0"
            v-model="item_l3vpn.vrf_name"
          />
          <MyButton
            style="margin-left: auto"
            @click="deleteL3vpn(item_l3vpn.id)"
            >Удалить VRF</MyButton
          >
        </div>
        <div class="divContent">
          <p>Номер АС BGP:</p>
          <MyInput
            :class="{
              error: !isInRange(item_l3vpn.bgp_id),
            }"
            style="width: 115px"
            type="number"
            placeholder="64512-65534"
            min="64512"
            max="65534"
            v-model="item_l3vpn.bgp_id"
          />
          <p>Номер rd:</p>
          <MyInput
            :class="{
              error:
                !isNonNegativeInteger(item_l3vpn.rd) || item_l3vpn.rd > 1000,
            }"
            style="width: 60px"
            type="number"
            placeholder="100"
            min="0"
            v-model="item_l3vpn.rd"
          />
          <MyButton style="margin-left: auto" @click="addPort(index)"
            >Добавить порт</MyButton
          >
        </div>
        <div class="header-port-list">
          <p>Список портов VRF:</p>
          <MyButton style="margin-left: auto" @click="addPort(index)"
            >Добавить порт</MyButton
          >
        </div>
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
    </div>

    <MyButton @click="saveConfiguration">Сохранить конфигурацию</MyButton>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.error {
  color: red;
  border: 3px solid red;
}
.vrf-item-content {
  border: 3px solid teal;
  border-radius: 15px;
  padding: 5px;
}

.header-list-vrf {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.header-port-list {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.list-vrf {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
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
