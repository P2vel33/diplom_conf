import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useInteractiveVisiable = defineStore("interactiveVisiable", () => {
  const isVisiableModalNodeDeleted: Ref<Boolean> = ref(false);
  const isVisiableModalLinkDeleted: Ref<Boolean> = ref(false);
  const isVisiableModalNodeAdded: Ref<Boolean> = ref(false);
  const isVisiableModalLinkAdded: Ref<Boolean> = ref(false);
  return {
    isVisiableModalNodeDeleted,
    isVisiableModalLinkDeleted,
    isVisiableModalLinkAdded,
    isVisiableModalNodeAdded,
  };
});
