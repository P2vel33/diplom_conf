<script setup>
import { ref } from "vue";
import MyButton from "./UI/MyButton.vue";
import { createConfig } from "../helpers/Config/createConfig";

const directoryHandle = ref(null);

// Проверка имени файла на недопустимые символы
function isValidFileName(name) {
  const invalidChars = /[<>:"/\\|?*]/;
  return (
    typeof name === "string" && name.trim() !== "" && !invalidChars.test(name)
  );
}

// Функция выбора папки
async function selectFolder() {
  try {
    directoryHandle.value = await window.showDirectoryPicker();
    console.log(directoryHandle.value);
  } catch (err) {
    console.error("Ошибка при выборе папки:", err);
    alert("Выбор папки отменен или недоступен в этом браузере.");
  }
}
</script>

<template>
  <div style="display: flex; align-items: center; gap: 10px">
    <MyButton @click="selectFolder">Выбрать папку</MyButton>
    <MyButton
      @click="createConfig(directoryHandle)"
      :disabled="!directoryHandle"
      >Сохранить файл</MyButton
    >
  </div>
</template>
