<script setup lang="ts">
const { options } = defineProps({
  options: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
const changeType = (event: Event): void => {
  emit("update:modelValue", event.target.value);
};
</script>

<template>
  <select id="my-select" @change="(e) => changeType(e)">
    <option selected value="">
      <slot></slot>
    </option>
    <option v-for="option of options" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<style scoped>
#my-select {
  width: max-content;
  background: none;
  border-radius: 5px;
  padding: 5px;
  border: 3px solid teal;
}
</style>
