import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useInteractiveVisiable = defineStore("interactiveVisiable", () => {
  const isVisiableModalNodeDeleted: Ref<Boolean> = ref(false);
  const isVisiableModalLinkDeleted: Ref<Boolean> = ref(false);
  const isVisiableModalNodeAdded: Ref<Boolean> = ref(false);
  const isVisiableModalLinkAdded: Ref<Boolean> = ref(false);
  const toggleIsVisiableModalNodeDeleted = () => {
    isVisiableModalNodeDeleted.value = false;
  };
  const toggleIsVisiableModalLinkDeleted = () => {
    isVisiableModalLinkDeleted.value = false;
  };
  const toggleIsVisiableModalNodeAdded = () => {
    isVisiableModalNodeAdded.value = false;
  };
  const toggleIsVisiableModalLinkAdded = () => {
    isVisiableModalLinkAdded.value = false;
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
