<script setup lang="ts">
import { ref, watch, type Ref } from "vue";
import MyInput from "../../MyInput.vue";

interface IOspfConfiguration {
  number_ospf: number;
  ip_address: string;
  mask_ip_address: string;
  network_ip: string;
  mask_network_ip: string;
  area: number;
}
const ospfConfiguration: Ref<IOspfConfiguration> = ref({
  number_ospf: 1,
  ip_address: "",
  network_ip: "",
  mask_ip_address: "",
  mask_network_ip: "",
  area: 0,
});

function validateIPv4(ip: string) {
  // Регулярное выражение для проверки формата IP-адреса
  const ipPattern =
    /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$/;
  // Проверка соответствия формату
  if (!ipPattern.test(ip)) {
    return false;
  }
  // Разделение IP-адреса на октеты
  const octets = ip.split(".").map(Number);
  // Проверка условий для первого и последнего октетов
  if (
    octets[0] === 0 ||
    octets[0] === 255 ||
    octets[3] === 0 ||
    octets[3] === 255
  ) {
    return false;
  }

  return true;
}

function isValidSubnetMask(mask: string) {
  // Регулярное выражение для проверки формата IP-адреса (маски)
  const maskRegex =
    /^(25[0-5]|(2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9]))(\.(25[0-5]|(2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9]))){3}$/;

  // Проверить, соответствует ли маска формату IP-адреса
  if (!maskRegex.test(mask)) {
    return false; // Неверный формат маски
  }

  // Преобразование маски в двоичный формат
  const maskParts = mask.split(".").map(Number);
  let binary = maskParts
    .map((num) => num.toString(2).padStart(8, "0"))
    .join("");

  // Проверка, чтобы после первой '0' не было '1'
  return !binary.includes("01");
}

function ipToBinary(ip: string): string {
  return ip
    .split(".")
    .map((num) => ("00000000" + Number(num).toString(2)).slice(-8))
    .join("");
}

function binaryToIp(binary: string): string {
  return (
    binary
      .match(/.{1,8}/g)
      ?.map((byte) => parseInt(byte, 2))
      .join(".") || ""
  );
}

function calculateNetworkAddress(ip: string, subnetMask: string): string {
  const ipBinary = ipToBinary(ip);
  const maskBinary = ipToBinary(subnetMask);

  let networkBinary = "";
  for (let i = 0; i < 32; i++) {
    networkBinary += ipBinary[i] === "1" && maskBinary[i] === "1" ? "1" : "0";
  }

  return binaryToIp(networkBinary);
}

function isSameNetwork(
  ip: string,
  subnetMask: string,
  networkAddress: string
): boolean {
  const calculatedNetworkAddress = calculateNetworkAddress(ip, subnetMask);
  return calculatedNetworkAddress === networkAddress;
}

// // Примеры использования
// const ip: string = "192.168.1.10";
// const subnetMask: string = "255.255.255.0";
// const networkAddress: string = "192.168.1.0";

// console.log(isSameNetwork(ip, subnetMask, networkAddress)); // true

// const wrongNetworkAddress: string = "192.168.2.0";
// console.log(isSameNetwork(ip, subnetMask, wrongNetworkAddress)); // false

function calculateWildcardMask(subnetMask: string): string {
  const maskBinary = ipToBinary(subnetMask);
  let wildcardBinary = "";

  for (let i = 0; i < maskBinary.length; i++) {
    wildcardBinary += maskBinary[i] === "1" ? "0" : "1";
  }

  return binaryToIp(wildcardBinary);
}

// // Пример использования
// const subnetMaska: string = "255.255.255.0";
// const wildcardMask: string = calculateWildcardMask(subnetMaska);
// console.log(`Обратная маска подсети для ${subnetMask}: ${wildcardMask}`); // 0.0.0.255

watch(
  ospfConfiguration,
  () => {
    ospfConfiguration.value.network_ip = calculateNetworkAddress(
      ospfConfiguration.value.ip_address,
      ospfConfiguration.value.mask_ip_address
    );
    ospfConfiguration.value.mask_network_ip = calculateWildcardMask(
      ospfConfiguration.value.mask_ip_address
    );
  },
  { deep: true }
);
</script>

<template>
  <div>
    <div class="divContent">
      <p>Уникальный номер процесса OSPF:</p>
      <MyInput
        type="number"
        placeholder="1"
        v-model="ospfConfiguration.number_ospf"
      />
    </div>
    <!-- <p
      v-if="!validateIPv4(portConfiguration.local_ip_address) || checkIP()"
      class="validError"
    >
      Enter correct IP address
    </p> -->
    <div class="divContent">
      <p>IP адрес:</p>
      <MyInput
        type="text"
        placeholder="192.0.0.1"
        v-model="ospfConfiguration.ip_address"
      />
    </div>
    <p v-if="!validateIPv4(ospfConfiguration.ip_address)" class="validError">
      Введите корректный IP адрес
    </p>
    <div class="divContent">
      <p>Маска подсети:</p>
      <MyInput
        type="text"
        placeholder="255.255.0.0"
        v-model="ospfConfiguration.mask_ip_address"
      />
    </div>
    <p
      v-if="!isValidSubnetMask(ospfConfiguration.mask_ip_address)"
      class="validError"
    >
      Введите корректную маску подсети
    </p>
    <div class="divContent">
      <p>IP адрес сети:</p>
      <MyInput
        type="text"
        placeholder="192.0.0.0"
        v-model="ospfConfiguration.network_ip"
      />
    </div>
    <p
      v-if="
        !isSameNetwork(
          ospfConfiguration.ip_address,
          ospfConfiguration.mask_ip_address,
          ospfConfiguration.network_ip
        )
      "
      class="validError"
    >
      Введите корректный IP адрес
    </p>
    <div class="divContent">
      <p>Обратная маска сети:</p>
      <MyInput
        type="text"
        placeholder="255.255.0.0"
        v-model="ospfConfiguration.mask_network_ip"
      />
      <!-- calculateWildcardMask -->
    </div>
    <div class="divContent">
      <p>Номер области (area) OSPF:</p>
      <MyInput type="number" placeholder="0" v-model="ospfConfiguration.area" />
    </div>
    <!-- <p
      v-if="!isValidSubnetMask(portConfiguration.mask_external_ip)"
      class="validError"
    >
    Введите корректную маску подсети
    </p> -->
  </div>
</template>

<style scoped>
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
</style>
