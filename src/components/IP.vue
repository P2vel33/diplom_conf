<script lang="ts" setup>
import { ref, watch } from "vue";

interface PortConfig {
  ipAddress: string;
  gateway: string;
}

const ports = Array.from({ length: 32 }, (_, i) => i + 1);
const portConfigurations: Record<number, PortConfig> = {};
const selectedPort = ref(1);
const currentConfig = ref<PortConfig>({ ipAddress: "", gateway: "" });

// Инициализация конфигураций для портов
for (let port of ports) {
  portConfigurations[port] = { ipAddress: "", gateway: "" };
}

const loadConfiguration = () => {
  // Сохраняем текущую конфигурацию перед загрузкой новой
  portConfigurations[selectedPort.value] = { ...currentConfig.value };

  // Очищаем текущую конфигурацию
  currentConfig.value = { ...portConfigurations[selectedPort.value] };
};

const submitForm = () => {
  // Сохраняем текущую конфигурацию
  portConfigurations[selectedPort.value] = { ...currentConfig.value };
  alert(
    `Настройки сохранены для порта ${selectedPort.value}!\nIP: ${currentConfig.value.ipAddress}\nШлюз: ${currentConfig.value.gateway}`
  );
};

// Загружаем конфигурацию при выборе порта
watch(selectedPort, loadConfiguration);

// Загружаем начальную конфигурацию
loadConfiguration();
</script>

<template>
  <div>
    <h1>Настройка сети</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="port">Выберите порт (1-32): </label>
        <select v-model="selectedPort" id="port" @change="loadConfiguration">
          <option v-for="port in ports" :key="port" :value="port">
            {{ port }}
          </option>
        </select>
      </div>

      <div>
        <label for="ipAddress">Введите IP-адрес: </label>
        <input
          type="text"
          v-model="currentConfig.ipAddress"
          id="ipAddress"
          placeholder="192.168.1.1"
        />
      </div>

      <div>
        <label for="gateway">Введите IP-шлюз: </label>
        <input
          type="text"
          v-model="currentConfig.gateway"
          id="gateway"
          placeholder="192.168.1.1"
        />
      </div>

      <button type="submit">Сохранить настройки</button>
    </form>
  </div>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  width: 300px;
}
div {
  margin-bottom: 16px;
}
</style>
