<script setup lang="ts">
import { ref } from "vue";
import MyButton from "../components/UI/MyButton.vue";
import router from "../router/router";

const selectYaml = ref(false);
const selectInteractive = ref(false);
const isVisiableSelectFormat = ref(true);
const selectChangeYaml = (): void => {
  selectYaml.value = true;
  selectInteractive.value = false;
  isVisiableSelectFormat.value = false;
};
const selectChangeInteractive = (): void => {
  selectInteractive.value = true;
  selectYaml.value = false;
  isVisiableSelectFormat.value = false;
};
</script>

<template>
  <div>
    <div class="selectFormat" v-if="isVisiableSelectFormat">
      <MyButton
        style="width: 45%; height: 80%; font-size: 50px"
        @click="
          selectChangeYaml();
          router.push('/yaml');
        "
        >Создание сети с помощью YAML-файла</MyButton
      >
      <MyButton
        style="width: 45%; height: 80%; font-size: 50px"
        @click="
          selectChangeInteractive();
          router.push('/interactive');
        "
        >Интерактивное создание сети</MyButton
      >
    </div>
  </div>
</template>

<style scoped>
.selectFormat {
  width: 100%;
  display: flex;
  height: 950px;
  justify-content: space-around;
  align-items: center;
}
</style>
