<script setup lang="ts">
import { computed, ref, watch, type ComputedRef, type Ref } from "vue";
import MyButton from "../MyButton.vue";
import MyInput from "../MyInput.vue";
import MySelect from "../MySelect.vue";
import { useInteractiveVisiable } from "../../../store/InteractiveVisiable";
import useClearObject from "../../../hooks/useClearObject";
import { networkRouters } from "../../../data/NetworkRouters";
import PortConfiguration from "./PortConfiguration.vue";
import DynamicRouting from "./DynamicRouting/DynamicRouting.vue";
import { useNodesAndLinks } from "../../../store/NodesAndLinks";
import MPLS from "./Settings/MPLS.vue";
import L3VPN from "./Settings/L3VPN.vue";
import { useSettingRouter } from "../../../store/SettingRouter";
import { validateIPv4 } from "../../../helpers/IPandMask/validateIPv4";
import { isValidSubnetMask } from "../../../helpers/IPandMask/isValidSubnetMask";
import { isValidNumberInRange } from "../../../helpers/IPandMask/ss";

const nodesAndLinks = useNodesAndLinks();
const settingRouter = useSettingRouter();
const interactiveVisiable = useInteractiveVisiable();

const selectedMpls: Ref<boolean> = ref(false);
const selectedL3vpn: Ref<boolean> = ref(false);
const selectedType: Ref<string> = ref("");
const selectedPort: Ref<number | undefined> = ref(0);
const selectedVendor: Ref<string> = ref("");
const selectedEquipment: Ref<string> = ref("");

interface Port {
  [num: number]: object;
}
interface NewNode {
  name: string;
  vendor: string;
  typeOfNetworkHardware: string;
  local_ip_address: string;
  external_ip_address: string;
  model: string;
  ports: Port;
  face: string;
  // vlan: number | null;
}

const newNode: Ref<NewNode> = ref({
  name: "",
  vendor: "",
  typeOfNetworkHardware: "",
  local_ip_address: "",
  external_ip_address: "",
  model: "",
  ports: {},
  face: "",
  // vlan: null,
});

const changePort = (num: number) => {};

const updatePorts = (portConfiguration: object) => {
  const obj = Object.fromEntries(
    Object.entries(portConfiguration).filter((elem) => elem[1])
  );
  // console.log(portConfiguration);
  // console.log(obj);
  newNode.value.ports[selectedPort.value] = { ...obj };
  // console.log(newNode.value.ports);
  selectedPort.value = 0;
};

const saveConfiguration = () => {
  selectedMpls.value = false;
  selectedL3vpn.value = false;
  selectedType.value = "";
  selectedPort.value = 0;
  selectedVendor.value = "";
  selectedEquipment.value = "";
  settingRouter.clearSettingRouter();
  console.log(settingRouter);
};

watch(selectedVendor, (elem) => {
  newNode.value.vendor = elem;
});
// watch(selectedMpls, () => {
//   console.log(typeof selectedMpls.value);
// });

const checkLoopbackNumber = (num_loop: number | null | string) => {
  let resOne =
    settingRouter.loopbackArray.filter((elem) => {
      if (elem.number_loopback !== null) {
        return elem.number_loopback === num_loop;
      }
    }).length > 1
      ? true
      : false;
  let resTwo =
    settingRouter.loopbackArray.filter((elem) => {
      if (elem.number_loopback === null || elem.number_loopback === "") {
        return true;
      }
    }).length > 0
      ? true
      : false;
  let resThree = !settingRouter.loopbackArray.every((elem) => {
    return elem.number_loopback >= 0 && elem.number_loopback < 100;
  });
  // console.log(resOne, resTwo, resThree);
  return resOne || resTwo || resThree;
};

const checkLoopbackIP = (ip_address: string) => {
  let resOne =
    settingRouter.loopbackArray.filter((elem) => {
      if (elem.ip_address_loopback !== null) {
        return elem.ip_address_loopback === ip_address;
      }
    }).length > 1
      ? true
      : false;
  let resTwo =
    settingRouter.loopbackArray.filter((elem) => {
      if (
        elem.ip_address_loopback === null ||
        elem.ip_address_loopback === ""
      ) {
        return true;
      }
    }).length > 0
      ? true
      : false;
  let resThree = !settingRouter.loopbackArray.every((elem) => {
    return validateIPv4(elem.ip_address_loopback);
  });
  // console.log(resOne, resTwo, resThree);
  return resOne || resTwo || resThree;
};

const errorAdd: ComputedRef<boolean> = computed(() => {
  let resOne = !newNode.value.name;
  let resTwo = false;
  let resThree = false;
  let resFour = false;
  if (selectedType.value === "Router") {
    settingRouter.loopbackArray.forEach((elem) => {
      if (checkLoopbackNumber(elem.number_loopback)) {
        resTwo = true;
      }
      if (checkLoopbackIP(elem.ip_address_loopback)) {
        resThree = true;
      }
    });
  }
  resFour =
    !selectedType.value || !selectedVendor.value || !selectedEquipment.value;
  // console.log(resOne, resTwo, resThree);
  return resOne || resTwo || resThree || resFour;
});
</script>

<template>
  <div
    class="dialog"
    v-if="interactiveVisiable.isVisiableModalNodeAdded"
    @click="interactiveVisiable.toggleIsVisiableModalNodeAdded"
  >
    <div @click.stop class="dialog__content">
      <h1>Добавление узла сети</h1>
      <div class="panel">
        <div class="left-panel">
          <div class="divContent">
            <p>Тип:</p>
            <MySelect
              :options="Object.keys(networkRouters)"
              v-model="selectedType"
              >Выберите тип сетевого оборудования</MySelect
            >
          </div>
          <div class="divContent" v-if="selectedType">
            <p>Производитель:</p>
            <MySelect
              :options="Object.keys(networkRouters[selectedType])"
              v-model="selectedVendor"
              >Выберите производителя</MySelect
            >
          </div>
          <div class="divContent" v-if="selectedVendor && selectedType">
            <p>
              {{ selectedType === "Switch" ? "Коммутатор" : "Маршрутизатор" }}:
            </p>
            <MySelect
              :options="
                Object.keys(networkRouters[selectedType][selectedVendor])
              "
              v-model="selectedEquipment"
              >Веберите сетевое оборудование</MySelect
            >
          </div>
          <div class="divContent">
            <p>Наименование узла сети:</p>
            <MyInput
              v-focus
              :class="{ error: !newNode.name }"
              type="text"
              placeholder="Node 0"
              v-model="newNode.name as string"
            />
          </div>

          <div v-if="selectedType === 'Router'" class="setting-loopback">
            <div class="divContent">
              <p>Список loopback:</p>
              <MyButton @click="settingRouter.addLoopback"
                >Добавить loopback</MyButton
              >
            </div>
            <div class="list-loopback">
              <div
                v-for="loopback of settingRouter.loopbackArray"
                :key="loopback.id"
                class="list-loopback__item"
              >
                <div
                  class="divContent"
                  style="justify-content: flex-start; gap: 10px"
                >
                  <p>Loopback:</p>
                  <!-- checkLoopbackNumber -->
                  <!--                     :class="{
                      error: !isValidNumberInRange(loopback.number_loopback),
                    }" -->
                  <MyInput
                    :class="{
                      error: checkLoopbackNumber(loopback.number_loopback),
                    }"
                    style="width: 60px"
                    type="number"
                    min="0"
                    max="99"
                    placeholder="0-99"
                    v-model="loopback.number_loopback"
                  />
                </div>
                <div class="divContent">
                  <p>IP-адрес:</p>
                  <MyInput
                    :class="{
                      error: checkLoopbackIP(loopback.ip_address_loopback),
                    }"
                    type="text"
                    style="width: 115px"
                    placeholder="1.1.1.1"
                    v-model="loopback.ip_address_loopback"
                  />
                  <p>Маска:</p>
                  <MyInput
                    :class="{
                      error: !isValidSubnetMask(loopback.mask_loopback),
                    }"
                    type="text"
                    style="width: 115px"
                    placeholder="255.255.255.255"
                    v-model="loopback.mask_loopback"
                  />
                  <MyButton
                    :disabled="settingRouter.loopbackArray.length === 1"
                    style="width: 60px; height: 30px"
                    @click="settingRouter.deleteLoopback(loopback.id)"
                    >Удалить</MyButton
                  >
                </div>
              </div>
            </div>
          </div>
          <DynamicRouting v-if="selectedType === 'Router'" />
          <div class="divContent" v-if="selectedEquipment">
            <p>Порт:</p>
            <MySelect
              v-if="selectedType === 'Router'"
              :options="
                Array.from(
                  {
                    length: Number(
                      networkRouters[selectedType][selectedVendor][
                        selectedEquipment
                      ]
                    ),
                  },
                  (_, i) => i
                )
              "
              v-model="selectedPort"
              @change="changePort(selectedPort)"
              >Выберите порт</MySelect
            >
            <MySelect
              v-if="selectedType === 'Switch'"
              :options="
                Array.from(
                  {
                    length: Number(
                      networkRouters[selectedType][selectedVendor][
                        selectedEquipment
                      ]
                    ),
                  },
                  (_, i) => i + 1
                )
              "
              v-model="selectedPort"
              @change="changePort(selectedPort)"
              >Выберите порт</MySelect
            >
          </div>
          <PortConfiguration
            v-if="selectedPort"
            v-model="selectedPort"
            @updatePorts="(e) => updatePorts(e)"
            :selectedType
          />
        </div>

        <div class="rigth-panel" v-if="selectedType === 'Router'">
          <div class="divContent" v-if="selectedType === 'Router'">
            <p>MPLS:</p>
            <input type="checkbox" v-model="selectedMpls" value="true" />
          </div>
          <MPLS
            v-if="
              selectedEquipment && selectedMpls && selectedType === 'Router'
            "
            :selectedEquipment="selectedEquipment"
            :selectedVendor="selectedVendor"
          />
          <div class="divContent" v-if="selectedType === 'Router'">
            <p>L3VPN:</p>
            <input type="checkbox" v-model="selectedL3vpn" value="true" />
          </div>
          <L3VPN
            v-if="
              selectedEquipment && selectedL3vpn && selectedType === 'Router'
            "
            :selectedEquipment="selectedEquipment"
            :selectedVendor="selectedVendor"
          />
        </div>
      </div>

      <MyButton
        :class="{ error: errorAdd }"
        style="margin-left: auto"
        :disabled="errorAdd"
        @click="
          interactiveVisiable.toggleIsVisiableModalNodeAdded();
          selectedType === 'Router'
            ? nodesAndLinks.addObjectNodes({
                ...Object.fromEntries(
                  Object.entries(newNode).filter((elem) => elem[1])
                ),
                typeOfNetworkHardware: selectedType,
                loopbackArray: settingRouter.loopbackArray,
                model: selectedEquipment,
                active: true,
                mpls: settingRouter.mpls,
                ospf: settingRouter.ospf,
                isis: settingRouter.isis,
                bgp: settingRouter.bgp,
                l3vpn: settingRouter.l3vpn,
              })
            : nodesAndLinks.addObjectNodes({
                ...Object.fromEntries(
                  Object.entries(newNode).filter((elem) => elem[1])
                ),
                typeOfNetworkHardware: selectedType,
                model: selectedEquipment,
                active: true,
              });
          saveConfiguration();
          useClearObject(newNode);
        "
        >Добавить</MyButton
      >
    </div>
  </div>
</template>

<style scoped>
.setting-loopback {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border-radius: 15px;
  border: 3px solid teal;
  /* overflow-y: auto; */
  /* max-height: 100px; */
}
.list-loopback {
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* padding: 10px; */
  /* border-radius: 15px; */
  /* border: 3px solid teal; */
  overflow-y: auto;
  max-height: 180px;
}

.list-loopback__item {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.error {
  color: red;
  border: 3px solid red;
}
.divContent {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.dialog {
  top: 0%;
  bottom: 0%;
  right: 0%;
  left: 0%;
  background: rgba(0, 0, 0, 0.5);
  overflow-y: scroll;
  position: fixed;
  display: flex;
  gap: 10px;
  z-index: 1;
}

.dialog__content {
  display: flex;
  flex-direction: column;
  margin: auto;
  background: white;
  border-radius: 12px;
  min-height: 100px;
  min-width: 500px;
  padding: 20px;
  gap: 10px;
}

.ports {
  color: teal;
}

.panel {
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-height: 100px;
  min-width: 500px;
  padding: 20px;
  gap: 10px;
}

.left-panel,
.rigth-panel {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 20px;
}

.left-panel {
  min-width: 500px;
}
</style>
