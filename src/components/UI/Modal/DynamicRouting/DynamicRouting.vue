<script setup lang="ts">
import { ref, watch, type Ref } from "vue";
import OSPF from "./OSPF.vue";
import BGP from "./BGP.vue";
import ISISs from "./ISISs.vue";

const checkDynamicRouting = ref(false);
const pickedDynamicRouting: Ref<string> = ref("");
watch(pickedDynamicRouting, (e) => console.log(e));
watch(checkDynamicRouting, (e) => console.log(e));
const getConfigure = (value: object): void => {
  console.log(value);
};
</script>

<template>
  <div>
    <div class="divContent">
      <p>Динамические протоколы маршрутизации:</p>
      <input
        type="checkbox"
        id="dynamic-protocol"
        v-model="checkDynamicRouting"
      />
      <div v-if="checkDynamicRouting">
        <div class="change-dynamic-routing">
          <input
            type="radio"
            id="is-is"
            value="IS-IS"
            v-model="pickedDynamicRouting"
          />
          <label for="is-is">IS-IS</label>
        </div>
        <div class="change-dynamic-routing">
          <input
            type="radio"
            id="ospf"
            value="OSPF"
            v-model="pickedDynamicRouting"
          />
          <label for="ospf">OSPF</label>
        </div>
        <div class="change-dynamic-routing">
          <input
            type="radio"
            id="bgp"
            value="BGP"
            v-model="pickedDynamicRouting"
          />
          <label for="bgp">BGP</label>
        </div>
      </div>
    </div>
    <div v-if="checkDynamicRouting">
      <OSPF
        v-if="pickedDynamicRouting === 'OSPF'"
        class="port-configure"
        @setOspfConfiguration="(value) => getConfigure(value)"
      />
      <ISISs
        v-if="pickedDynamicRouting === 'IS-IS'"
        class="port-configure"
        @setIsisConfiguration="(value) => getConfigure(value)"
      />
      <BGP
        v-if="pickedDynamicRouting === 'BGP'"
        class="port-configure"
        @setBgpConfiguration="(value) => getConfigure(value)"
      />
    </div>
  </div>
</template>

<style scoped>
.divContent {
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: space-between;
  align-items: center;
}
.port-configure {
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  border: 3px solid teal;
  padding: 5px;
}
.validError {
  color: red;
  margin-left: auto;
}
.change-dynamic-routing {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
}
</style>
