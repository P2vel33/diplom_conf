import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useInteractiveVisiable = defineStore("interactiveVisiable", () => {
  const isVisiableModalNodeDeleted: Ref<Boolean> = ref(false);
  const isVisiableModalLinkDeleted: Ref<Boolean> = ref(false);
  const isVisiableModalNodeAdded: Ref<Boolean> = ref(false);
  const isVisiableModalLinkAdded: Ref<Boolean> = ref(false);
  const toggleIsVisiableModalNodeDeleted = () => {
    isVisiableModalNodeDeleted.value = !isVisiableModalNodeDeleted.value;
  };
  const toggleIsVisiableModalLinkDeleted = () => {
    isVisiableModalLinkDeleted.value = !isVisiableModalLinkDeleted.value;
  };
  const toggleIsVisiableModalNodeAdded = () => {
    isVisiableModalNodeAdded.value = !isVisiableModalNodeAdded.value;
  };
  const toggleIsVisiableModalLinkAdded = () => {
    isVisiableModalLinkAdded.value = !isVisiableModalLinkAdded.value;
  };

  return {
    isVisiableModalNodeDeleted,
    isVisiableModalLinkDeleted,
    isVisiableModalLinkAdded,
    isVisiableModalNodeAdded,
    toggleIsVisiableModalLinkAdded,
    toggleIsVisiableModalLinkDeleted,
    toggleIsVisiableModalNodeAdded,
    toggleIsVisiableModalNodeDeleted,
  };
});
