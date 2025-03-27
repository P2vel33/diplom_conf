import { defineStore } from "pinia";
import { ref } from "vue";
import type { Ref } from "vue";
import data from "../data/data";

export const useNodeStore = defineStore("nodeStore", () => {
  const yaml: Ref<string> = ref(`nodes:
  node0:
    name: Cisco1928R
    ip_address: 192.168.1.1
    type: Switch
    vlan: 802
  node1:
    name: Cisco1928R
    ip_address: 192.168.1.2
    type: Switch
    vlan: 802
  node2:
    name: Cisco1928R
    ip_address: 192.168.1.3
    type: Switch
    vlan: 802
  node3:
    name: Cisco1928R
    ip_address: 192.168.1.4
    type: Switch
    vlan: 802
  node4:
    name: Cisco1928R
    ip_address: 192.168.1.5
    type: Switch
    vlan: 802
  node5:
    name: Cisco1928R
    ip_address: 192.168.1.6
    type: Switch
    vlan: 802
  node6:
    name: Cisco1928R
    ip_address: 192.168.1.7
    type: Switch
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

  //   node0:
  //   name: Node
  //   ip_address: 192.168.1.1
  //   target:
  //     - 1
  //     - 2
  //   type: Switch
  //   vlan: 802
  // node1:
  //   name: Node
  //   ip_address: 192.168.1.2
  //   target:
  //     - 0
  //   type: Switch
  //   vlan: 802
  // node2:
  //   name: Node
  //   ip_address: 192.168.1.3
  //   target:
  //     - 0
  //   type: Switch
  //   vlan: 802
  // node3:
  //   name: Node
  //   ip_address: 192.168.1.4
  //   target:
  //     - 0
  //   type: Switch
  //   vlan: 802
  return {
    yaml,
    data,
  };
});
