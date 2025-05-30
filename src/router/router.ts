import HomePage from "../pages/HomePage.vue";
import YamlNetworkCreationPage from "../pages/YamlNetworkCreationPage.vue";
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import InteractiveNetworkCreationPage from "../pages/InteractiveNetworkCreationPage.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/yaml",
    component: YamlNetworkCreationPage,
  },
  {
    path: "/interactive",
    component: InteractiveNetworkCreationPage,
  },
  {
    path: "/:catchAll(.*)", // Обработка несуществующих маршрутов
    redirect: "/", // Перенаправление на главную страницу
  },
  {
    path: "/auth",
    component: InteractiveNetworkCreationPage,
  },
];

const router = createRouter({ routes, history: createWebHistory() });

export default router;
