<!-- <script setup lang="ts">
const nodes = {
  node1: { name: "Node 1" },
  node2: { name: "Node 2" },
  node3: { name: "Node 3" },
  node4: { name: "Node 4" },
};

const edges = {
  edge1: { source: "node1", target: "node2" },
  edge2: { source: "node2", target: "node3" },
  edge3: { source: "node3", target: "node4" },
};
</script>

<template>
  <v-network-graph class="graph" :nodes="nodes" :edges="edges" />
</template>

<style>
.graph {
  width: 800px;
  height: 600px;
  border: 1px solid #000;
}
</style> -->

<script setup lang="ts">
import * as vNG from "v-network-graph";
import {
  ForceLayout,
  ForceNodeDatum,
  ForceEdgeDatum,
} from "v-network-graph/lib/force-layout";
import { useNodeStore } from "../store/NodeStore";
// import type { Node, Edge } from "v-network-graph";

const nodeStore = useNodeStore();

// interface File {
//   node16: Node;
//   "edge16-15": Edge;
// }
// const file: File = {
//   node16: { name: "Node 17", face: "Comm.png" },
//   "edge16-15": {
//     source: "node16",
//     target: "node15",
//   },
// };

// const addNode = (file: File): void => {
//   nodeStore.data.nodes[Object.keys(file)[0]] = file.node16;
//   nodeStore.data.edges[Object.keys(file)[1]] = file["edge16-15"];
//   // console.log(nodeStore.data.edges);
//   // console.log(Object.keys(file)[0]);
// };

// console.log(JSON.parse(JSON.stringify(nodeStore.yaml)));

// console.log(JSON.parse(nodeStore.yaml));

// console.log(new Object(nodeStore.yaml.split("\n").join("").trim()));
// import data from "../data/data.ts";

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
  <v-network-graph
    :nodes="nodeStore.data.nodes"
    :edges="nodeStore.data.edges"
    :configs="configs"
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
        :xlink:href="`/${nodeStore.data.nodes[nodeId].face}`"
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
