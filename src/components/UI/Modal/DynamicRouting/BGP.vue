<script setup lang="ts">
import { computed, ref, type Ref } from "vue";
import MyInput from "../../MyInput.vue";
import MyButton from "../../MyButton.vue";
import { useSettingRouter } from "../../../../store/SettingRouter";
import { validateIPv4 } from "../../../../helpers/IPandMask/validateIPv4";
import { isInRange } from "../../../../helpers/IPandMask/isInRange";
const settingRouter = useSettingRouter();
interface IBgpNeighbor {
  id: number;
  neighbor: string;
  remote_as: number | null;
}

interface IbgpConfiguration {
  number_bgp: number | null;
  array_neighbor: IBgpNeighbor[];
}
const bgpConfiguration: Ref<IbgpConfiguration> = ref({
  number_bgp: null,
  array_neighbor: [{ id: Date.now(), neighbor: "", remote_as: null }],
});

const emit = defineEmits(["setBgpConfiguration"]);
const setbgpConfiguration = () => {
  emit("setBgpConfiguration", bgpConfiguration);
  settingRouter.bgp = bgpConfiguration.value;
};

const addNeighbor = () => {
  bgpConfiguration.value.array_neighbor.push({
    id: Date.now(),
    neighbor: "",
    remote_as: null,
  });
};

const deleteNeighbor = (id: number) => {
  bgpConfiguration.value.array_neighbor =
    bgpConfiguration.value.array_neighbor.filter((elem) => elem.id !== id);
};

function hasNoDuplicates<T>(arr: T[]): boolean {
  // Создаем Set из элементов массива. Set автоматически удаляет дубликаты.
  const uniqueElements = new Set(arr);

  // Сравниваем размер исходного массива с размером Set.
  // Если размеры одинаковы, значит, дубликатов не было.
  return arr.length === uniqueElements.size;
}

const errorBgp = computed(() => {
  let resOne = false;
  let resTwo = false;
  if (
    isInRange(bgpConfiguration.value.number_bgp) &&
    !bgpConfiguration.value.array_neighbor.some(
      (el) => el.remote_as === bgpConfiguration.value.number_bgp
    )
  ) {
    resOne = true;
  }

  const arrayIP = bgpConfiguration.value.array_neighbor.map(
    (elem) => elem.neighbor
  );
  resTwo =
    hasNoDuplicates(arrayIP) &&
    bgpConfiguration.value.array_neighbor.every(
      (elem) => elem.neighbor && elem.remote_as
    ) &&
    bgpConfiguration.value.array_neighbor.every((elem) =>
      validateIPv4(elem.neighbor)
    );
  return resOne && resTwo;
});
</script>

<template>
  <div>
    <div class="divContent">
      <p>Номер автономной системы (АС):</p>
      <MyInput
        :class="{ error: !isInRange(bgpConfiguration.number_bgp) }"
        style="width: 100px"
        type="number"
        placeholder="64512-65534"
        min="64512"
        max="65534"
        v-model="bgpConfiguration.number_bgp"
      />
      <MyButton style="margin-left: auto" @click="addNeighbor"
        >Добавить соседнюю сеть</MyButton
      >
    </div>

    <div class="list-neighbor">
      <div
        class="divContent"
        v-for="neighbor of bgpConfiguration.array_neighbor"
        :key="neighbor.id"
      >
        <p>IP адрес:</p>
        <MyInput
          :class="{
            error: !validateIPv4(neighbor.neighbor),
          }"
          style="width: 90px"
          type="text"
          placeholder="192.0.0.1"
          v-model="neighbor.neighbor"
        />
        <p>Номер АС:</p>
        <MyInput
          :class="{
            error:
              !isInRange(neighbor.remote_as) ||
              neighbor.remote_as === bgpConfiguration.number_bgp,
          }"
          style="width: 100px"
          type="number"
          placeholder="64512-65534"
          v-model="neighbor.remote_as"
          min="64512"
          max="65534"
        />
        <MyButton
          style="margin-left: auto; width: 60px; height: 30px"
          @click="deleteNeighbor(neighbor.id)"
          >Удалить</MyButton
        >
      </div>
    </div>
    <MyButton
      :disabled="!errorBgp"
      :class="{ error: !errorBgp }"
      style="margin-left: auto"
      @click="setbgpConfiguration"
      >Сохранить конфигурацию BGP</MyButton
    >
  </div>
</template>

<style scoped>
.error {
  color: red;
  border: 3px solid red;
}
.divContent {
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: flex-start;
  align-items: center;
}
.validError {
  color: red;
  margin-left: auto;
}
.list-neighbor {
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: scroll;
  max-height: 200px;
}
</style>
