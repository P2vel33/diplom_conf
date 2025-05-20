import * as yaml from "js-yaml";

// Функция для преобразования JSON в YAML
export default function jsonToYaml(jsonObject: any): string {
  try {
    const yamlString = yaml.dump(jsonObject);
    return yamlString;
  } catch (e) {
    console.error("Ошибка при преобразовании JSON в YAML:", e);
    return "";
  }
}