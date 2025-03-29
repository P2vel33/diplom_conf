import * as yaml from "js-yaml";
import { ref } from "vue";
import type { Ref } from "vue";

export default function useYamlToJson(text: string | null) {
  const yamlTransfomToJson: Ref = ref({});
  function yamlToJson(yamlText: string | null): string | null {
    try {
      const jsonData = yaml.load(yamlText);
      return JSON.stringify(jsonData, null, 2); // Преобразуем в строку JSON с отступами
    } catch (e) {
      console.error("Ошибка при преобразовании YAML в JSON:", e);
      return null;
    }
  }

  function jsonToObject(jsonString: string | null): object | null {
    try {
      return JSON.parse(jsonString); // Преобразуем строку JSON в объект
    } catch (e) {
      console.error("Ошибка при преобразовании JSON в объект:", e);
      return null;
    }
  }

  yamlTransfomToJson.value = jsonToObject(yamlToJson(text));

  return { yamlTransfomToJson };
}
