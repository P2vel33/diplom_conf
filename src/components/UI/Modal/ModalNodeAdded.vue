<script setup lang="ts">
import { ref, watch, type Ref } from "vue";
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
        :class="{ error: !newNode.name }"
        style="margin-left: auto"
        :disabled="!newNode.name"
        @click="
          interactiveVisiable.toggleIsVisiableModalNodeAdded();
          selectedType === 'Router'
            ? nodesAndLinks.addObjectNodes({
                ...Object.fromEntries(
                  Object.entries(newNode).filter((elem) => elem[1])
                ),
                typeOfNetworkHardware: selectedType,
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
</style>
