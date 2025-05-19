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

// // Пример использования
// const jsonData = {
//   name: "Иван",
//   age: 30,
//   skills: ["TypeScript", "JavaScript", "Node.js"],
//   address: {
//     city: "Москва",
//     street: "Тверская",
//   },
// };

// const yamlResult = jsonToYaml(jsonData);
// console.log(yamlResult);
