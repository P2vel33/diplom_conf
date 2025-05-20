<script setup lang="ts">
// const { modelValue } = defineProps({
//   modelValue: {
//     type: String || Number || null,
//     required: true,
//   },
// });

const model = defineModel();
// const emit = defineEmits(["update:modelValue"]);
// const updateInput = (event: Event) => {
//   emit("update:modelValue", event.target.value);
// };
</script>
<!-- :value="modelValue" @input="updateInput" -->
<template>
  <input class="input" v-model="model" />
</template>

<style scoped>
.input {
  background: none;
  border: 3px solid teal;
  border-radius: 5px;
  width: 70%;
  padding: 5px;
  transition: all 0.5s;
}
</style>
