<script setup lang="ts">
import { ref, type Ref } from "vue";
// import ViewNetwork from "../components/YamlViewNetwork.vue";
import str from "../data/textareaPlaceholder";
import YamlViewNetwork from "../components/YamlViewNetwork.vue";
import useJsonToYaml from "../hooks/useJsonToYaml";
import { useNodesAndLinks } from "../store/NodesAndLinks";
import { transformLinks } from "../helpers/transformLinks";
import { formatYamlWithFilename } from "../helpers/formatYaml";
import { updateDevice, updateDeviceSwicth } from "../helpers/updateDevice";
import type {
  IRouter,
  ISwitch,
} from "../helpers/Config/interfaceNetworkEquipment";
import AppTextArea from "../components/AppTextArea.vue";

const nodesAndLinks = useNodesAndLinks();
const textFromTextArea: Ref<string> = ref("");

const obj = ref({});
if (Object.keys(nodesAndLinks.objectNodes).length > 0) {
  for (const key of Object.keys(nodesAndLinks.objectNodes)) {
    if (nodesAndLinks.objectNodes[key].typeOfNetworkHardware === "Router") {
      obj.value[key] = updateDevice(nodesAndLinks.objectNodes[key] as IRouter);
    } else if (
      nodesAndLinks.objectNodes[key].typeOfNetworkHardware === "Switch"
    ) {
      obj.value[key] = updateDeviceSwicth(
        nodesAndLinks.objectNodes[key] as ISwitch
      );
    }
  }
  // console.log(Object.keys(nodesAndLinks.objectEdges).length !== 0);
  // textFromTextArea.value = `${formatYamlWithFilename(
  //   "nodes",
  //   useJsonToYaml(nodesAndLinks.objectNodes)
  // )}${formatYamlWithFilename(
  //   "links",
  //   useJsonToYaml(transformLinks(nodesAndLinks.objectEdges))
  // )}`;
  textFromTextArea.value = `${formatYamlWithFilename(
    "nodes",
    useJsonToYaml(obj.value)
  )}${formatYamlWithFilename(
    "links",
    Object.keys(nodesAndLinks.objectEdges).length !== 0
      ? useJsonToYaml(transformLinks(nodesAndLinks.objectEdges))
      : ""
  )}`;
}
</script>

<template>
  <div>
    <div class="container">
      <div class="left">
        <!-- <textarea
          v-focus
          v-model="textFromTextArea"
          class="textarea"
          :placeholder="str"
        ></textarea> -->
        <AppTextArea v-focus v-model="textFromTextArea" :placeholder="str" />
      </div>
      <div class="right">
        <YamlViewNetwork :textFromTextArea />
      </div>
    </div>
  </div>
</template>

<style scoped>
.textarea {
  width: 100%;
  height: 950px;
  color: white;
  background-color: black;
  border: 3px solid teal;
}
.container {
  width: 100%;
  display: flex;
}

.left {
  margin: 5px;
  width: 50%;
}

.right {
  display: flex;
  flex-direction: column;
  margin: 5px;
  width: 50%;
}
</style>
