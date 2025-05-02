import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingRouter = defineStore("settingRouter", () => {
  const mpls = ref({});
  const ospf = ref({});
  const isis = ref({});
  const bgp = ref({});
  const l3vpn = ref([]);

  const clearSettingRouter = () => {
    mpls.value = {};
    ospf.value = {};
    isis.value = {};
    bgp.value = {};
    l3vpn.value = [];
  };

  return {
    mpls,
    ospf,
    isis,
    bgp,
    l3vpn,
    clearSettingRouter,
  };
});
