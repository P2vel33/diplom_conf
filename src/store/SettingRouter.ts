import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

interface ILoopback {
  id: number;
  number_loopback: number | null | string;
  ip_address_loopback: string;
  mask_loopback: string;
}

export const useSettingRouter = defineStore("settingRouter", () => {
  const loopbackArray: Ref<ILoopback[]> = ref([
    {
      id: Date.now(),
      number_loopback: 0,
      ip_address_loopback: "",
      mask_loopback: "255.255.255.255",
    },
  ]);
  const mpls = ref([]);
  const ospf = ref({});
  const isis = ref({});
  const bgp = ref({});
  const l3vpn = ref([]);

  const addLoopback = () => {
    loopbackArray.value.push({
      id: Date.now(),
      number_loopback: null,
      ip_address_loopback: "",
      mask_loopback: "255.255.255.255",
    });
  };

  const deleteLoopback = (id: number) => {
    loopbackArray.value = loopbackArray.value.filter((elem) => elem.id !== id);
  };

  const clearSettingRouter = () => {
    loopbackArray.value = [
      {
        id: Date.now(),
        number_loopback: 0,
        ip_address_loopback: "",
        mask_loopback: "255.255.255.255",
      },
    ];
    mpls.value = [];
    ospf.value = {};
    isis.value = {};
    bgp.value = {};
    l3vpn.value = [];
  };

  return {
    loopbackArray,
    mpls,
    ospf,
    isis,
    bgp,
    l3vpn,
    addLoopback,
    deleteLoopback,
    clearSettingRouter,
  };
});
