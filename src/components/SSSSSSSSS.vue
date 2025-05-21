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

// Функция сохранения файла
// async function saveFile() {
//   if (!directoryHandle.value) {
//     alert("Пожалуйста, сначала выберите папку.");
//     return;
//   }

//   // Проверка имени файла
//   if (!isValidFileName(filename)) {
//     alert(
//       'Недопустимое имя файла. Оно не должно содержать символы <>:"/\\|?* и не должно быть пустым.'
//     );
//     return;
//   }

//   const content = `
//   # Конфигурационный файл
//   parameter1=value1
//   parameter2=value2
//   `;

//   try {
//     const fileHandle = await directoryHandle.value.getFileHandle(filename, {
//       create: true,
//     });
//     const writable = await fileHandle.createWritable();
//     await writable.write(content);
//     await writable.close();
//     alert("Файл успешно сохранен!");
//   } catch (err) {
//     console.error("Ошибка при сохранении файла:", err);
//     alert("Произошла ошибка при сохранении файла: " + err.message);
//   }
// }
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
