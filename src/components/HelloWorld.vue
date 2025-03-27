<script setup lang="ts">
import * as vNG from "v-network-graph";
import {
  ForceLayout,
  ForceNodeDatum,
  ForceEdgeDatum,
} from "v-network-graph/lib/force-layout";
import { useNodeStore } from "../store/NodeStore";
import type { Nodes, Edges } from "v-network-graph";

import * as yaml from "js-yaml";
import { ref, type Ref } from "vue";
import { idText, isTemplateExpression } from "typescript";

function yamlToJson(yamlText: string): string | null {
  try {
    const jsonData = yaml.load(yamlText);
    return JSON.stringify(jsonData, null, 2); // Преобразуем в строку JSON с отступами
  } catch (e) {
    console.error("Ошибка при преобразовании YAML в JSON:", e);
    return null;
  }
}

function jsonToObject(jsonString: string): object | null {
  try {
    return JSON.parse(jsonString); // Преобразуем строку JSON в объект
  } catch (e) {
    console.error("Ошибка при преобразовании JSON в объект:", e);
    return null;
  }
}

const nodeStore = useNodeStore();

const json: Ref<object | null> = ref({});
if (typeof yamlToJson(nodeStore.yaml) === "string") {
  json.value = jsonToObject(yamlToJson(nodeStore.yaml));
}
// nodeStore.yaml = jsonToObject(yamlToJson(yaml));
console.log(json.value);
const obj1: Nodes = {};
const obj2: Edges = {};
Object.keys(json.value).forEach((elem) => {
  obj1[elem] = { name: `${json.value[elem].name}`, face: "Comm.png" };
  for (let item of json.value[elem].target) {
    obj2[`${elem}-${item}`] = { source: `${elem}`, target: `node${item}` };
  }
});
console.log(obj1);
console.log(obj2);

const configs = vNG.defineConfigs({
  view: {
    autoPanAndZoomOnLoad: "fit-content",
    layoutHandler: new ForceLayout({
      positionFixedByDrag: false,
      positionFixedByClickWithAltKey: false,

      noAutoRestartSimulation: true, // If the line is deleted or set to false,
      // d3-force recalculation will be performed when nodes are dragged or
      // the network changes.

      createSimulation: (d3, nodes, edges) => {
        const forceLink = d3
          .forceLink<ForceNodeDatum, ForceEdgeDatum>(edges)
          .id((d: ForceNodeDatum) => d.id);
        // Specify your own d3-force parameters
        return d3
          .forceSimulation(nodes)
          .force("edge", forceLink.distance(10).strength(1))
          .force("charge", d3.forceManyBody().strength(-2000))
          .force("x", d3.forceX())
          .force("y", d3.forceY())
          .stop() // tick manually
          .tick(100);
      },
    }),
    // layoutHandler: new vNG.GridLayout({ grid: 15 }),
  },
  node: {
    label: {
      visible: true,
    },
  },
});
</script>

<template>
  <!-- <div class="variant">
    <button @click="addNode(file)">Click</button>
  </div> -->

  <!--     :nodes="nodeStore.data.nodes"
    :edges="nodeStore.data.edges" -->
  <v-network-graph :nodes="obj1" :edges="obj2" :configs="configs">
    <defs>
      <!--
        Define the path for clipping the face image.
        To change the size of the applied node as it changes,
        add the `clipPathUnits="objectBoundingBox"` attribute
        and specify the relative size (0.0~1.0).
      -->
      <clipPath id="faceCircle" clipPathUnits="objectBoundingBox">
        <circle cx="0.5" cy="0.5" r="0.5" />
      </clipPath>
    </defs>

    <!-- Replace the node component -->
    <template #override-node="{ nodeId, scale, config, ...slotProps }">
      <!-- circle for filling background -->
      <circle
        class="face-circle"
        :r="config.radius * scale"
        fill="#ffffff"
        v-bind="slotProps"
      />
      <!--
        The base position of the <image /> is top left. The node's
        center should be (0,0), so slide it by specifying x and y.
      -->
      <image
        class="face-picture"
        :x="-config.radius * scale"
        :y="-config.radius * scale"
        :width="config.radius * scale * 2"
        :height="config.radius * scale * 2"
        :xlink:href="`/${obj1[nodeId].face}`"
        clip-path="url(#faceCircle)"
      />
      <!-- circle for drawing stroke -->
      <!-- <circle
        class="face-circle"
        :r="config.radius * scale"
        fill="none"
        stroke="#808080"
        :stroke-width="1 * scale"
        v-bind="slotProps"
      /> -->
    </template>
  </v-network-graph>
</template>

<style scoped>
/* // transitions when scaling on mouseover. */

.face-circle,
.face-picture {
  transition: all 0.1s linear;
  background: none;
}

/* // suppress image events so that mouse events are received */
/* // by the background circle. */
.face-picture {
  pointer-events: none;
}
</style>
