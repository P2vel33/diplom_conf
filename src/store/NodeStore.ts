import { defineStore } from "pinia";
import { ref } from "vue";
import type { Ref } from "vue";
import data from "../data/data";
// import useYamlToJson from "../hooks/useYamlToJson";

export const useNodeStore = defineStore("nodeStore", () => {
  // let timer: number | null = null;
  const isVisiable: Ref<Boolean> = ref(false);
  const coordinateX: Ref<Number> = ref(0);
  const coordinateY: Ref<Number> = ref(0);
  const text: Ref<string> = ref(`nodes:
  node0:
    name: Node 0
    ip_address: 192.168.1.1
    typeOfNetworkHardware: Switch
    model: Cisco1928R
    vlan: 802
  node1:
    name: Node 1
    ip_address: 192.168.1.2
    typeOfNetworkHardware: Switch
    model: Cisco1928R
    vlan: 802
  node2:
    name: Node 2
    ip_address: 192.168.1.3
    typeOfNetworkHardware: Switch
    model: Cisco1928R
    vlan: 802
  node3:
    name: Node 3
    ip_address: 192.168.1.4
    typeOfNetworkHardware: Switch
    model: Cisco1928R
    vlan: 802
  node4:
    name: Node 4
    ip_address: 192.168.1.5
    typeOfNetworkHardware: Switch
    model: Cisco1928R
    vlan: 802
  node5:
    name: Node 5
    ip_address: 192.168.1.6
    typeOfNetworkHardware: Switch
    model: Cisco1928R
    vlan: 802
  node6:
    name: Node 6
    ip_address: 192.168.1.7
    typeOfNetworkHardware: Switch
    model: Cisco1928R
    vlan: 802
links:
 node0:
 - 1
 - 2
 - 3
 node1:
 - 2
 node2:
 - 3
 - 4
 - 5
 - 6
`);
  // const trans: Ref<Object | null> = ref({});
  // const yamlTransfomToJson = computed(() => {
  //   if (timer !== null) clearTimeout(timer);
  //   timer = setTimeout(() => {
  //     console.log(useYamlToJson(text.value).yamlTransfomToJson);
  //     return useYamlToJson(text.value).yamlTransfomToJson;
  //   }, 500);
  // });

  return {
    // yamlTransfomToJson,
    text,
    data,
    isVisiable,
    coordinateX,
    coordinateY,
  };
});
