<script setup lang="ts">
import * as vNG from "v-network-graph";
import {
  ForceLayout,
  ForceNodeDatum,
  ForceEdgeDatum,
} from "v-network-graph/lib/force-layout";
import { useNodeStore } from "../store/NodeStore";
import type { Nodes, Edges, Position, Node } from "v-network-graph";
// import { type Position } from "v-network-graph";

import * as yaml from "js-yaml";
import { ref, watch, type Ref } from "vue";
import ModalNode from "./UI/ModalNode.vue";

const coordinateModal: Ref<Position> = ref({
  x: 0,
  y: 0,
});
const nodeModal: Ref<Node> = ref({});

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

const json: Ref<Object | null> = ref({});
if (typeof yamlToJson(nodeStore.text) === null) {
  json.value = "";
} else if (typeof yamlToJson(nodeStore.text) === "string") {
  json.value = jsonToObject(yamlToJson(nodeStore.text));
}
// console.log(nodeStore.text);
// console.log(json.value);
const objectNodes: Nodes = {};
const objectEdges: Edges = {};

Object.keys(json.value).forEach((elem: string) => {
  for (let item of Object.keys(json.value[elem])) {
    if (elem === "nodes") {
      objectNodes[item] = {
        name: json.value[elem][item].name,
        face: "Comm.png",
      };
    } else if (elem === "links") {
      json.value[elem][item].forEach((element: number) => {
        objectEdges[`${item}-${element}`] = {
          source: `${item}`,
          target: `node${element}`,
        };
      });
    }
  }
});

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

const eventHandlers: vNG.EventHandlers = {
  "node:pointerover": ({ node, event }): void => {
    const nodes: Object = json.value.nodes;
    coordinateModal.value = { x: event.clientX, y: event.clientY };
    console.log(coordinateModal.value);
    nodeStore.isVisiable = true;
    for (const [key, value] of Object.entries(nodes[node])) {
      console.log(key, value);
    }

    // console.log(Object.entries(nodes[node]));
    nodeModal.value = nodes[node];
    // console.log(nodeModal.value);
  },
  "node:pointerout": (): void => {
    nodeStore.isVisiable = false;
  },
};

watch(coordinateModal, (e) => {
  // console.log("WORK", e);
});
</script>

<template>
  <ModalNode v-show="nodeStore.isVisiable" :coordinateModal :nodeModal />

  <v-network-graph
    :nodes="objectNodes"
    :edges="objectEdges"
    :configs="configs"
    :event-handlers="eventHandlers"
  >
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
        :xlink:href="`/${objectNodes[nodeId].face}`"
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
