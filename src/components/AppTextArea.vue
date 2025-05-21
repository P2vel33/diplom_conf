<script lang="ts" setup>
import str from "../data/textareaPlaceholder";

// import { ref } from "vue";

//   const text = ref<string>('');
const model = defineModel<string>();

// function handleKeyDown(event: KeyboardEvent): void {
//   if (event.key === "Tab") {
//     event.preventDefault();

//     const target = event.target as HTMLTextAreaElement;
//     const cursorPosition = target.selectionStart;
//     const value = model.value;

//     // Определим текущий строку по позиции курсора
//     const beforeCursor = value.substring(0, cursorPosition);
//     const afterCursor = value.substring(cursorPosition);

//     // Найдём начало текущей строки
//     const lastLineBreakIndex = beforeCursor.lastIndexOf("\n");
//     const lineStartIndex = lastLineBreakIndex + 1;

//     // Получаем текущую строку
//     const currentLine = beforeCursor.substring(lineStartIndex);

//     // Подсчитываем уровень вложенности (например, количество пробелов в начале строки)
//     const indentMatch = currentLine.match(/^(\s*)/);
//     const currentIndent = indentMatch ? indentMatch[1] : "";

//     // Определяем количество пробелов для нового уровня
//     const indentSize = 2; // число пробелов на уровень
//     const newIndent = currentIndent + " ".repeat(indentSize);

//     // Вставляем новые пробелы
//     const newValue = beforeCursor + newIndent + afterCursor;
//     model.value = newValue;

//     // Обновляем позицию курсора — после вставленных пробелов
//     const newCursorPosition = cursorPosition + newIndent.length;
//     setTimeout(() => {
//       target.selectionStart = target.selectionEnd = newCursorPosition;
//     }, 0);
//   }
// }

function handleKeyDown(event: KeyboardEvent): void {
  if (event.key === "Tab") {
    event.preventDefault();

    const target = event.target as HTMLTextAreaElement;
    const start = target.selectionStart;
    const end = target.selectionEnd;

    const value = model.value;

    // Вырезаем текущий текст
    const before = value.substring(0, start);
    const after = value.substring(end);

    // Вставляем 2 пробела
    const indent = "  "; // два пробела
    const newValue = before + indent + after;

    // Обновляем значение
    model.value = newValue;

    // Устанавливаем курсор после вставленных пробелов
    const newPosition = start + indent.length;
    // Используем setTimeout, чтобы убедиться, что DOM обновился
    setTimeout(() => {
      target.setSelectionRange(newPosition, newPosition);
    }, 0);
  }
}
</script>

<template>
  <div>
    <textarea
      class="textarea"
      v-model="model"
      @keydown="handleKeyDown"
      :placeholder="str"
      rows="10"
      cols="50"
    ></textarea>
  </div>
</template>

<style>
.textarea {
  width: 100%;
  height: 950px;
  color: white;
  background-color: black;
  border: 3px solid teal;
}
</style>
