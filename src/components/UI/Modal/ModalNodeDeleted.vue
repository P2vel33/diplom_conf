<script setup lang="ts">
import MyButton from "../MyButton.vue";
import MyInput from "../MyInput.vue";
import { useInteractiveVisiable } from "../../../store/InteractiveVisiable";
import useClearObject from "../../../hooks/useClearObject";
import { useNodesAndLinks } from "../../../store/NodesAndLinks";
import { computed, ref, watch, type Ref } from "vue";
import { hasPropertyByName } from "../../../helpers/hasPropertyByName";
interface myNode {
  name: string;
  [x: string]: any;
}

const interactiveVisiable = useInteractiveVisiable();
const nodesAndLinks = useNodesAndLinks();

const deletedNode: Ref<myNode> = ref({
  name: "",
});

const correctDeleted = computed(() => {
  return !hasPropertyByName(deletedNode.value.name);
});

watch(
  () => interactiveVisiable.isVisiableModalNodeDeleted,
  () => {
    if (!interactiveVisiable.isVisiableModalNodeDeleted) {
      deletedNode.value.name = "";
    }
  }
);
</script>

<template>
  <div
    class="dialog"
    v-if="interactiveVisiable.isVisiableModalNodeDeleted"
    @click="interactiveVisiable.toggleIsVisiableModalNodeDeleted"
  >
    <div @click.stop class="dialog__content">
      <h1>Удаление узла сети</h1>
      <div class="divContent">
        <p>Название узла:</p>
        <MyInput
          v-focus
          :class="{ error: !hasPropertyByName(deletedNode.name) }"
          type="text"
          placeholder="Node 0"
          v-model="deletedNode.name as string"
        />
      </div>

      <MyButton
        style="margin-left: auto"
        :class="{ error: correctDeleted }"
        :disabled="correctDeleted"
        @click="
          interactiveVisiable.toggleIsVisiableModalNodeDeleted();
          nodesAndLinks.deleteObjectNodes(deletedNode);
          useClearObject(deletedNode);
        "
        >Удалить</MyButton
      >
    </div>
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
  justify-content: space-between;
  align-items: center;
}
.dialog {
  top: 0%;
  bottom: 0%;
  right: 0%;
  left: 0%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  gap: 10px;
  z-index: 1;
}

.dialog__content {
  display: flex;
  flex-direction: column;
  margin: auto;
  background: white;
  border-radius: 12px;
  min-height: 100px;
  min-width: 500px;
  padding: 20px;
  gap: 10px;
}
</style>
