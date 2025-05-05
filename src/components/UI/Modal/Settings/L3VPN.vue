<script setup lang="ts">
import { computed, ref, type Ref } from "vue";
import MyInput from "../../MyInput.vue";
import MyButton from "../../MyButton.vue";
import { useSettingRouter } from "../../../../store/SettingRouter";
import { isNonNegativeInteger } from "../../../../helpers/IPandMask/isNonNegativeInteger";
import { isInRange } from "../../../../helpers/IPandMask/isInRange";
import { networkRouters } from "../../../../data/NetworkRouters";

const settingRouter = useSettingRouter();

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

interface IPortVRF {
  id: number;
  port: null | number | string;
}

interface IL3vpn {
  id: number;
  vrf_name: string;
  bgp_id: null | number;
  rd: null | number;
  ports_vrf: IPortVRF[];
}

const l3vpn: Ref<IL3vpn[]> = ref([
  {
    id: Date.now(),
    vrf_name: "",
    bgp_id: null,
    rd: null,
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
    vrf_name: "",
    bgp_id: null,
    rd: null,
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

const checkPort = (index_item_l3vpn: number, port: IPortVRF): boolean => {
  console.log(l3vpn.value[index_item_l3vpn].ports_vrf);
  console.log(index_item_l3vpn);
  let resOne =
    l3vpn.value[index_item_l3vpn].ports_vrf.filter((elem) => {
      if (port.port !== null) {
        return elem.port === port.port;
      }
    }).length > 1
      ? true
      : false;
  let resTwo =
    l3vpn.value[index_item_l3vpn].ports_vrf.filter((elem) => {
      if (elem.port === null || elem.port === "") {
        return true;
      }
    }).length > 0
      ? true
      : false;
  let resThree = !l3vpn.value[index_item_l3vpn].ports_vrf.every((elem) => {
    return elem.port >= 0 && elem.port < ports.value;
  });
  return resOne || resTwo || resThree;
};

const saveConfiguration = () => {
  settingRouter.l3vpn = l3vpn.value;
  console.log(settingRouter.l3vpn);
};

const errorL3VPN = computed(() => {
  let resOne = false; // port
  let resTwo = false; // name vrf
  let resThree = false; // number AS
  let resFour = false; // number rd
  for (let i = 0; i < l3vpn.value.length; i++) {
    for (let port of l3vpn.value[i].ports_vrf) {
      if (checkPort(i, port)) {
        resOne = true; // Если хотя бы один порт не прошел проверку
        break; // Нет смысла проверять остальные порты для этого L3VPN, если один уже невалиден
      }
    }
    !l3vpn.value[i].vrf_name ? (resTwo = true) : false;
    !isInRange(l3vpn.value[i].bgp_id) ? (resThree = true) : false;
    !l3vpn.value[i].rd ? (resFour = true) : false;
  }
  return resOne || resTwo || resThree || resFour;
});
</script>

<template>
  <div class="l3vpn">
    <div class="list-vrf">
      <div class="header-list-vrf">
        <p>Список VRF:</p>
        <MyButton @click="addL3vpn">Добавить VRF</MyButton>
      </div>
      <div class="vrf-list">
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
              :disabled="l3vpn.length === 1"
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
            <!-- <MyButton style="margin-left: auto" @click="addPort(index)"
            >Добавить порт</MyButton
          > -->
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
              <p>Номер порта VRF: {{ item_l3vpn.vrf_name }}</p>
              <MyInput
                :class="{ error: checkPort(index, port) }"
                style="width: 50px"
                type="number"
                placeholder="0"
                min="0"
                v-model="port.port"
              />
              <MyButton
                :disabled="item_l3vpn.ports_vrf.length === 1"
                style="width: 60px; height: 30px"
                @click="deletePort(index, port.id)"
                >Удалить</MyButton
              >

              <!-- :class="{ error: checkPort(item_l3vpn.id, port) }" -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="divContent">
      <MyButton
        :disabled="errorL3VPN"
        :class="{ error: errorL3VPN }"
        style="margin-left: auto"
        @click="saveConfiguration"
        >Сохранить конфигурацию</MyButton
      >
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.vrf-list {
  max-height: 300px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.error {
  color: red;
  border: 3px solid red;
}
.vrf-item-content {
  border: 3px solid teal;
  border-radius: 15px;
  padding: 5px;
  /* max-height: 200px; */
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
