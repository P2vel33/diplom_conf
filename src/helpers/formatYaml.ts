import * as yaml from "js-yaml";

export function formatYamlWithFilename(
  fileName: string,
  content: string
): string {
  // Оборачиваем содержимое файла в объект
  const obj = {
    [fileName]: yaml.load(content),
  };
  // Преобразуем обратно в YAML
  return yaml.dump(obj, { indent: 2 });
}
