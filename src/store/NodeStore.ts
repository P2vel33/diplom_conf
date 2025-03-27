import { defineStore } from "pinia";
import { ref } from "vue";
import type { Ref } from "vue";
import data from "../data/data";

export const useNodeStore = defineStore("nodeStore", () => {
  const yaml: Ref<string> = ref(`node0:
  name: Cisco1920
  ip_address: 192.168.1.1
  target:
    - 1
    - 2
  type: Commutator
  vlan: 802
node1:
  name: Cisco1920
  ip_address: 192.168.1.2
  target:
    - 0
  type: Commutator
  vlan: 802
node2:
  name: Cisco1920
  ip_address: 192.168.1.3
  target:
    - 0
  type: Commutator
  vlan: 802
node3:
  name: Cisco1920
  ip_address: 192.168.1.4
  target:
    - 0
  type: Commutator
  vlan: 802`);

  // function yamlToJson(yamlText: string): string | null {
  //   try {
  //     const jsonData = yaml.load(yamlText);
  //     return JSON.stringify(jsonData, null, 2); // Преобразуем в строку JSON с отступами
  //   } catch (e) {
  //     console.error("Ошибка при преобразовании YAML в JSON:", e);
  //     return null;
  //   }
  // }

  // function jsonToObject(jsonString: string): object | null {
  //   try {
  //     return JSON.parse(jsonString); // Преобразуем строку JSON в объект
  //   } catch (e) {
  //     console.error("Ошибка при преобразовании JSON в объект:", e);
  //     return null;
  //   }
  // }
  // if (jsonToObject(yamlToJson(yaml))) {
  //   yaml.value = jsonToObject(yamlToJson(yaml));
  // }

  //   name: John Doe
  // age: 30
  // skills:
  //   - JavaScript
  //   - Python
  //   - Go
  // data: |
  //    Это
  //    Отдельные
  //    Строки
  // datas: >
  //    Это
  //    один параграф
  //    текста
  return {
    yaml,
    data,
  };
});
