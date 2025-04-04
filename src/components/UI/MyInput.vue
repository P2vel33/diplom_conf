<script setup lang="ts">
const { modelValue } = defineProps({
  modelValue: {
    type: String || Number || null,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue"]);
const updateInput = (event: Event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<template>
  <input class="input" :value="modelValue" @input="updateInput" />
</template>

<style scoped>
.input {
  position: relative;
  background: none;
  border: 3px solid teal;
  border-radius: 5px;
  width: 70%;
  padding: 5px;
}
</style>
