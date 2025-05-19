<script setup lang="ts">
import { computed, ref, type Ref } from "vue";
import MyInput from "../../MyInput.vue";
import MyButton from "../../MyButton.vue";
import { useSettingRouter } from "../../../../store/SettingRouter";
import { validateIPv4 } from "../../../../helpers/IPandMask/validateIPv4";
import { isInRange } from "../../../../helpers/IPandMask/isInRange";
import { isValidSubnetMask } from "../../../../helpers/IPandMask/isValidSubnetMask";
import { isNetworkIpValid } from "../../../../helpers/IPandMask/isNetworkIPValid";
import { calculateNetworkAddress } from "../../../../helpers/IPandMask/calculateNetworkAddress";
import { doNetworksNotOverlap } from "../../../../helpers/IPandMask/doNetworksNotOverlap";
const settingRouter = useSettingRouter();
interface IBgpNeighbor {
  id: number;
  neighbor: string;
  remote_as: number | null;
  network: string;
  mask: string;
}
interface IBgpNetwork {
  id: number;
  network: string;
  mask: string;
}

interface IbgpConfiguration {
  number_bgp: number | null;
  array_neighbor: IBgpNeighbor[];
  array_network: IBgpNetwork[];
}
const bgpConfiguration: Ref<IbgpConfiguration> = ref({
  number_bgp: null,
  array_neighbor: [
    { id: Date.now(), neighbor: "", remote_as: null, network: "", mask: "" },
  ],
  array_network: [{ id: Date.now(), network: "", mask: "" }],
});

const emit = defineEmits(["setBgpConfiguration"]);
const setbgpConfiguration = () => {
  emit("setBgpConfiguration", bgpConfiguration);
  settingRouter.bgp = bgpConfiguration.value;
};

const addNeighbor = () => {
  bgpConfiguration.value.array_neighbor.push({
    id: Date.now(),
    neighbor: "",
    remote_as: null,
    network: "",
    mask: "",
  });
};
const addNetwork = () => {
  bgpConfiguration.value.array_network.push({
    id: Date.now(),
    network: "",
    mask: "",
  });
};

const deleteNeighbor = (id: number) => {
  bgpConfiguration.value.array_neighbor =
    bgpConfiguration.value.array_neighbor.filter((elem) => elem.id !== id);
};
const deleteNetwork = (id: number) => {
  bgpConfiguration.value.array_network =
    bgpConfiguration.value.array_network.filter((elem) => elem.id !== id);
};

const checkNetwork = (network: string): boolean => {
  let resOne =
    bgpConfiguration.value.array_network.filter((elem) => {
      if (network !== null) {
        return elem.network === network;
      }
    }).length > 1
      ? true
      : false;
  let resTwo =
    bgpConfiguration.value.array_network.filter((elem) => {
      if (elem.network === null || elem.network === "") {
        return true;
      }
    }).length > 0
      ? true
      : false;
  // let resThree = !ports_mpls.value.every((elem) => {
  //   return elem.port >= 0 && elem.port < ports.value;
  // });
  // console.log(resOne, resTwo);
  return resOne || resTwo;
};

const checkNumberAS = (bgp_as_number: number | null): boolean => {
  return isInRange(bgp_as_number);
};

const checkIpAddress = (ip_address: string): boolean => {
  const repeatIpAddress: boolean =
    bgpConfiguration.value.array_neighbor.filter(
      (elem) => elem.neighbor === ip_address
    ).length > 1
      ? false
      : true;
  return validateIPv4(ip_address) && repeatIpAddress;
};

const checkNumberASNeighbor = (): boolean => {
  return bgpConfiguration.value.array_neighbor.every(
    (elem) =>
      bgpConfiguration.value.number_bgp !== elem.remote_as &&
      isInRange(elem.remote_as)
  );
};

const checkIpNetwork = (
  network: string,
  ip_address: string,
  mask: string
): boolean => {
  if (validateIPv4(ip_address) && isValidSubnetMask(mask)) {
    return (
      isNetworkIpValid(network, mask) &&
      network === calculateNetworkAddress(ip_address, mask)
    );
  } else {
    return false;
  }
};

const checkIpNetworkNoRepeat = (network: string): boolean => {
  return bgpConfiguration.value.array_network.filter(
    (elem) => elem.network === network
  ).length > 1
    ? false
    : true &&
      bgpConfiguration.value.array_neighbor.filter(
        (elem) => elem.network === network
      ).length > 0
    ? false
    : true;
};

const correctSetting = computed(() => {
  let resOne = false;
  let resTwo = false; // 2 + 4 + 5
  let resThree = false;
  let resFour = false;
  let resFive = false;
  // let resSix = false;
  // let resSeven = false;

  resOne = checkNumberAS(bgpConfiguration.value.number_bgp);
  resTwo = bgpConfiguration.value.array_neighbor.every(
    (elem) =>
      checkIpAddress(elem.neighbor) &&
      checkIpNetwork(elem.network, elem.neighbor, elem.mask) &&
      isValidSubnetMask(elem.mask)
  );
  resThree = checkNumberASNeighbor();
  resFour = bgpConfiguration.value.array_network.every(
    (elem) =>
      isValidSubnetMask(elem.mask) &&
      isNetworkIpValid(elem.network, elem.mask) &&
      checkIpNetworkNoRepeat(elem.network)
  );
  resFive = doNetworksNotOverlap(bgpConfiguration.value.array_network);
  console.log(resOne);
  console.log(resTwo);
  console.log(resThree);
  return resOne && resTwo && resThree && resFour && resFive;
  //   && resSix && resSeven
});
</script>

<template>
  <div>
    <div class="divContent">
      <p>Номер АС:</p>
      <MyInput
        :class="{ error: !checkNumberAS(bgpConfiguration.number_bgp) }"
        style="width: 100px"
        type="number"
        placeholder="64512-65534"
        min="64512"
        max="65534"
        v-model="bgpConfiguration.number_bgp"
      />
      <MyButton style="margin-left: auto" @click="addNeighbor"
        >Добавить соседнюю сеть</MyButton
      >
      <MyButton style="margin-left: auto" @click="addNetwork"
        >Добавить локальную сеть</MyButton
      >
    </div>

    <div class="list-neighbor">
      <p>Список соседей:</p>
      <div class="bgp-list-neighbor">
        <div
          class="bgp-neighbor"
          v-for="neighbor of bgpConfiguration.array_neighbor"
          :key="neighbor.id"
        >
          <div class="bgp-neighbor__content">
            <div class="divContent">
              <p>IP адрес:</p>
              <MyInput
                :class="{
                  error: !checkIpAddress(neighbor.neighbor),
                }"
                style="width: 115px"
                type="text"
                placeholder="192.0.0.1"
                v-model="neighbor.neighbor"
              />
              <p>Номер АС:</p>
              <MyInput
                :class="{
                  error: !checkNumberASNeighbor(),
                }"
                style="width: 100px"
                type="number"
                placeholder="64512-65534"
                v-model="neighbor.remote_as"
                min="64512"
                max="65534"
              />
            </div>
            <div class="divContent">
              <p>IP сети:</p>
              <MyInput
                :class="{
                  error:
                    !checkIpNetwork(
                      neighbor.network,
                      neighbor.neighbor,
                      neighbor.mask
                    ) || !doNetworksNotOverlap(bgpConfiguration.array_neighbor),
                }"
                style="width: 115px"
                type="text"
                placeholder="192.0.0.0"
                v-model="neighbor.network"
              />
              <p>Маска:</p>
              <MyInput
                :class="{
                  error: !isValidSubnetMask(neighbor.mask),
                }"
                style="width: 115px"
                type="text"
                placeholder="255.255.255.0"
                v-model="neighbor.mask"
              />
            </div>
          </div>

          <MyButton
            :disabled="bgpConfiguration.array_neighbor.length === 1"
            style="margin-left: auto; width: 60px; height: 60px"
            @click="deleteNeighbor(neighbor.id)"
            >Удалить</MyButton
          >
        </div>
      </div>
      <!--   -->
      <p>Список локальных сетей:</p>
      <div class="bgp-list-network">
        <div
          class="bgp-network"
          v-for="neighbor of bgpConfiguration.array_network"
          :key="neighbor.id"
        >
          <div class="divContent">
            <p>IP сети:</p>
            <MyInput
              :class="{
                error:
                  !isNetworkIpValid(neighbor.network, neighbor.mask) ||
                  checkNetwork(neighbor.network) ||
                  !checkIpNetworkNoRepeat(neighbor.network) ||
                  !doNetworksNotOverlap(bgpConfiguration.array_network),
              }"
              style="width: 115px"
              type="text"
              placeholder="192.0.0.0"
              v-model="neighbor.network"
            />
            <p>Маска:</p>
            <MyInput
              :class="{
                error: !isValidSubnetMask(neighbor.mask),
              }"
              style="width: 115px"
              type="text"
              placeholder="255.255.255.0"
              v-model="neighbor.mask"
            />
            <MyButton
              :disabled="bgpConfiguration.array_network.length === 1"
              style="margin-left: auto; width: 60px; height: 30px"
              @click="deleteNetwork(neighbor.id)"
              >Удалить</MyButton
            >
          </div>
        </div>
      </div>
    </div>
    <MyButton
      :disabled="!correctSetting"
      :class="{ error: !correctSetting }"
      style="margin-left: auto"
      @click="setbgpConfiguration"
      >Сохранить конфигурацию BGP</MyButton
    >
  </div>
</template>

<style scoped>
.bgp-neighbor__content {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.bgp-list-network,
.bgp-list-neighbor {
  border-radius: 15px;
  border: 3px solid teal;
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow-y: auto;

  padding: 5px;
}

.bgp-list-network {
  max-height: 145px;
}
.bgp-list-neighbor {
  max-height: 210px;
}

.bgp-network,
.bgp-neighbor {
  border-radius: 15px;
  border: 3px solid teal;
  display: flex;
  gap: 5px;
  padding: 5px;
  align-items: center;
}
.bgp-network {
  flex-direction: column;
}
.bgp-neighbor {
  flex-direction: row;
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
.validError {
  color: red;
  margin-left: auto;
}
.list-neighbor {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
