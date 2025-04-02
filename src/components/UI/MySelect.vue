<script setup lang="ts">
const { options } = defineProps({
  options: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
const changeType = (event) => {
  emit("update:modelValue", event.target.value);
  console.log(event.target.value);
};
</script>

<template>
  <select id="my-select" @change="(e) => changeType(e)">
    <option disabled selected value="">Select the network equipment</option>
    <option v-for="option of options" :value="option">
      {{ option.charAt(0).toUpperCase() + option.slice(1) }}
    </option>
  </select>
</template>

<style scoped>
#my-select {
  background: none;
  border-radius: 5px;
  padding: 10px;
  border: 3px solid teal;
}
</style>
