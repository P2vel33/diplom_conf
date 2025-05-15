<script setup lang="ts">
import { computed, ref, type Ref } from "vue";
import MyButton from "../MyButton.vue";
import MyInput from "../MyInput.vue";
import { validateIPv4 } from "../../../helpers/IPandMask/validateIPv4";
import { isValidSubnetMask } from "../../../helpers/IPandMask/isValidSubnetMask";
import { isVlanValid } from "../../../helpers/CheckVlan/isVlanValid";
import { isVlan8021Q } from "../../../helpers/CheckVlan/isVlan8021Q";
import { calculateNetworkAddress } from "../../../helpers/IPandMask/calculateNetworkAddress";
import { getPoolIP } from "../../../helpers/IPandMask/getPoolIP";

interface Ienc8021Q {
  id: number;
  vlan: number | null;
  ip_address_vlan: string;
  mask_vlan: string;
}

interface IPortConfiguration {
  vlan_access: null | number;
  vlan_trunk: string;
  vlan_mode_port: string;
  local_ip_address: string;
  mask_local_ip: string;
  external_ip_address: string;
  mask_external_ip: string;
  enc_802_1q: Ienc8021Q[];
}

const { selectedType } = defineProps({
  selectedType: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["updatePorts"]);
const updatePorts = (object: IPortConfiguration): void => {
  emit("updatePorts", object);
};

const selectedENC8021Q: Ref<boolean> = ref(false);
const portConfiguration: Ref<IPortConfiguration> = ref({
  vlan_access: null,
  vlan_trunk: "",
  vlan_mode_port: "access",
  local_ip_address: "",
  external_ip_address: "",
  mask_local_ip: "",
  mask_external_ip: "",
  enc_802_1q: [
    {
      id: Date.now(),
      vlan: null,
      ip_address_vlan: "",
      mask_vlan: "",
    },
  ],
});

// const checkIP = (): Boolean => {
//   return (
//     portConfiguration.value.external_ip_address ===
//     portConfiguration.value.local_ip_address
//   );
// };

const addItem8021q = () => {
  portConfiguration.value.enc_802_1q.push({
    id: Date.now(),
    vlan: null,
    ip_address_vlan: "",
    mask_vlan: "",
  });
};

const deleteItem8021q = (item_id: number): void => {
  portConfiguration.value.enc_802_1q =
    portConfiguration.value.enc_802_1q.filter((elem) => elem.id !== item_id);
};

const check8021Qvlan = (vlan: number | null | string): boolean => {
  let resOne =
    portConfiguration.value.enc_802_1q.filter((elem) => {
      if (vlan !== null) {
        return elem.vlan === vlan;
      }
    }).length > 1
      ? true
      : false;
  let resTwo =
    portConfiguration.value.enc_802_1q.filter((elem) => {
      if (elem.vlan === null || elem.vlan === "") {
        return true;
      }
    }).length > 0
      ? true
      : false;
  // console.log(resOne, resTwo);
  let resThree = !isVlan8021Q(vlan);
  return resOne || resTwo || resThree;
};

const check8021QipAddress = (ip_address: string, mask: string): boolean => {
  // calculateNetworkAddress(ip_address, mask);
  // const ipPoolArray: string[] | null = [];
  // let resThree = ipPoolArray.includes(ip_address);
  // console.log(resThree);

  // portConfiguration.value.enc_802_1q.forEach((elem) => {
  //   if (
  //     isValidSubnetMask(elem.mask_vlan) &&
  //     validateIPv4(elem.ip_address_vlan)
  //   ) {
  //     // console.log(getPoolIP(ip_address, mask));
  //     ipPoolArray.push(...getPoolIP(elem.ip_address_vlan, elem.mask_vlan));
  //     console.log(ipPoolArray);
  //   }
  // });

  let resOne =
    portConfiguration.value.enc_802_1q.filter((elem) => {
      if (ip_address !== null) {
        return (
          calculateNetworkAddress(elem.ip_address_vlan, elem.mask_vlan) ===
          calculateNetworkAddress(ip_address, mask)
        );
      }
    }).length > 1
      ? true
      : false;
  let resThree =
    portConfiguration.value.enc_802_1q.filter((elem) => {
      if (ip_address !== null) {
        return elem.ip_address_vlan === ip_address;
      }
    }).length > 1
      ? true
      : false;
  let resTwo =
    portConfiguration.value.enc_802_1q.filter((elem) => {
      if (
        elem.ip_address_vlan === null ||
        elem.ip_address_vlan === "" ||
        elem.ip_address_vlan ===
          calculateNetworkAddress(elem.ip_address_vlan, elem.mask_vlan)
      ) {
        return true;
      }
    }).length > 0
      ? true
      : false;
  let resFour = !(isValidSubnetMask(mask) && validateIPv4(ip_address));

  // console.log(resOne, resTwo);
  return resOne || resTwo || resThree || resFour;
};

const error8021Q = computed(() => {
  let resOne = false;
  portConfiguration.value.enc_802_1q.forEach((elem) => {
    if (
      !check8021QipAddress(elem.ip_address_vlan, elem.mask_vlan) &&
      !check8021Qvlan(elem.vlan)
    )
      return (resOne = true);
    else return (resOne = false);
  });

  return resOne;
});

const saveConfigure = () => {
  updatePorts(portConfiguration.value);
  portConfiguration.value.vlan_access = null;
  portConfiguration.value.vlan_trunk = "";
  portConfiguration.value.local_ip_address = "";
  portConfiguration.value.vlan_mode_port = "access";
  portConfiguration.value.external_ip_address = "";
  portConfiguration.value.mask_external_ip = "";
  portConfiguration.value.mask_local_ip = "";
};
</script>

<template>
  <div class="port-configure">
    <div
      style="display: flex; flex-direction: column; gap: 10px"
      v-if="selectedType === 'Switch'"
    >
      <div class="divContent">
        <input
          checked
          type="radio"
          id="access"
          value="access"
          v-model="portConfiguration.vlan_mode_port"
        />
        <label for="access">Access</label>

        <input
          type="radio"
          id="trunk"
          value="trunk"
          v-model="portConfiguration.vlan_mode_port"
        />
        <label for="trunk">Trunk</label>
      </div>
      <div
        class="divContent"
        v-if="portConfiguration.vlan_mode_port === 'access'"
      >
        <p>Vlan:</p>
        <MyInput
          type="number"
          placeholder="2-999"
          v-model="portConfiguration.vlan_access"
        />
      </div>
      <div
        class="divContent"
        v-if="portConfiguration.vlan_mode_port === 'trunk'"
      >
        <p>Vlan:</p>
        <MyInput
          :class="{ error: !isVlanValid(portConfiguration.vlan_trunk) }"
          type="text"
          placeholder="2-999"
          v-model="portConfiguration.vlan_trunk"
        />
      </div>
    </div>
    <div
      style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px"
      v-if="selectedType === 'Router'"
    >
      <div class="divContent">
        <p>IP адрес:</p>
        <MyInput
          style="width: 115px"
          :class="{
            error: !validateIPv4(portConfiguration.local_ip_address),
          }"
          type="text"
          placeholder="192.168.1.1"
          v-model="portConfiguration.local_ip_address"
        />
        <p>Маска подсети:</p>
        <MyInput
          style="width: 115px"
          :class="{
            error: !isValidSubnetMask(portConfiguration.mask_local_ip),
          }"
          type="text"
          placeholder="255.255.0.0"
          v-model="portConfiguration.mask_local_ip"
        />
      </div>

      <div class="divContent">
        <label for="enc8021q">802.1Q</label>
        <input
          type="checkbox"
          name="enc8021q"
          id="enc8021q"
          v-model="selectedENC8021Q"
        />
      </div>
      <div v-if="selectedENC8021Q" class="list-enc8021q">
        <div class="list-enc8021q-header">
          <h3>Настройка 802.1Q</h3>
          <MyButton @click="addItem8021q">Добавить vlan</MyButton>
        </div>

        <div class="list-enc8021q-items">
          <div
            class="divContent"
            v-for="item_8021q of portConfiguration.enc_802_1q"
            :key="item_8021q.id"
          >
            <p>Vlan:</p>
            <MyInput
              style="width: 70px"
              :class="{
                error:
                  !isVlan8021Q(item_8021q.vlan) ||
                  check8021Qvlan(item_8021q.vlan),
              }"
              type="number"
              placeholder="2-999"
              v-model="item_8021q.vlan"
            />
            <p>IP адрес:</p>
            <MyInput
              style="width: 115px"
              :class="{
                error:
                  !validateIPv4(item_8021q.ip_address_vlan) ||
                  check8021QipAddress(
                    item_8021q.ip_address_vlan,
                    item_8021q.mask_vlan
                  ),
              }"
              type="text"
              placeholder="192.0.0.1"
              v-model="item_8021q.ip_address_vlan"
            />
            <p>Маска подсети:</p>
            <MyInput
              style="width: 115px"
              :class="{
                error: !isValidSubnetMask(item_8021q.mask_vlan),
              }"
              type="text"
              placeholder="255.255.0.0"
              v-model="item_8021q.mask_vlan"
            />

            <MyButton
              :disabled="portConfiguration.enc_802_1q.length === 1"
              @click="deleteItem8021q(item_8021q.id)"
              style="width: 60px; height: 30px"
              >Удалить</MyButton
            >
          </div>
        </div>
      </div>

      <!-- <p
        v-if="!validateIPv4(portConfiguration.local_ip_address) || checkIP()"
        class="validError"
      >
        Введите корректный IP адрес
      </p> -->
      <!-- <div class="divContent">
        <p>Маска подсети:</p>
        <MyInput
          style="width: 115px"
          :class="{
            error: !isValidSubnetMask(portConfiguration.mask_local_ip),
          }"
          type="text"
          placeholder="255.255.0.0"
          v-model="portConfiguration.mask_local_ip"
        />
      </div> -->
      <!-- <p
        v-if="!isValidSubnetMask(portConfiguration.mask_local_ip)"
        class="validError"
      >
        Введите корректную маску подсети
      </p> -->
    </div>
    <MyButton
      :class="{
        error:
          selectedType === 'Router'
            ? ((!isValidSubnetMask(portConfiguration.mask_local_ip) ||
                !validateIPv4(portConfiguration.local_ip_address)) &&
                !selectedENC8021Q) ||
              !error8021Q
            : false,
      }"
      :disabled="
        selectedType === 'Router'
          ? ((!isValidSubnetMask(portConfiguration.mask_local_ip) ||
              !validateIPv4(portConfiguration.local_ip_address)) &&
              !selectedENC8021Q) ||
            !error8021Q
          : false
      "
      style="margin-left: auto"
      @click="saveConfigure"
      >Сохранить конфигурацию</MyButton
    >
  </div>
</template>

<style scoped>
.list-enc8021q-items {
  overflow-y: auto;
  max-height: 150px;
}

.list-enc8021q-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.list-enc8021q {
  border: 3px solid teal;
  border-radius: 15px;
  padding: 5px;
  gap: 10px;
}

.error {
  color: red;
  border: 3px solid red;
}
.divContent {
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: space-between;
  align-items: center;
}
.port-configure {
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  border: 3px solid teal;
  padding: 5px;
}
.validError {
  color: red;
  margin-left: auto;
}
.change-dynamic-routing {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
}
</style>
