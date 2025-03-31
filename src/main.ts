// main.ts
import { createApp } from "vue";
import { createPinia } from "pinia";
import VNetworkGraph from "v-network-graph";
import "v-network-graph/lib/style.css";
import App from "./App.vue";
import directives from "./directives";

const app = createApp(App);

directives.forEach((directive) => app.directive(directive.name, directive));

app.use(createPinia()).use(VNetworkGraph);
app.mount("#app");
