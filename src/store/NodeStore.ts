import { defineStore } from "pinia";
import { ref } from "vue";
import type { Ref } from "vue";
import data from "../data/data";
export const useNodeStore = defineStore("nodeStore", () => {
  const yaml: Ref<string> = ref(`		{
	  "node0": { "name": "Node 1", "face": "Comm.png" },
	  "edge0-4": { "source": "node0", "target": "node4" },
	}`);
  return {
    yaml,
    data,
  };
});
