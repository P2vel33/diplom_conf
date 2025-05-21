import { useNodesAndLinks } from "../../store/NodesAndLinks";
import { createConfigBGP } from "./createConfigBGP";
import { createConfigISIS } from "./createConfigISIS";
import { createConfigLoopback } from "./createConfigLoopback";
import { createConfigMPLS } from "./createConfigMPLS";
import { createConfigOSPF } from "./createConfigOSPF";
import { createConfigPort } from "./createConfigPort";
import { createConfigVlan } from "./createConfigVlan";
import type { IRouter, ISwitch } from "./interfaceNetworkEquipment";

// const filename = "settings.txt"; // имя файла

// Проверка имени файла на недопустимые символы

function isValidFileName(name) {
  const invalidChars = /[<>:"/\\|?*]/;
  return (
    typeof name === "string" && name.trim() !== "" && !invalidChars.test(name)
  );
}

async function saveFile(
  directoryHandle: object,
  filename: string,
  content: string
) {
  console.log(directoryHandle);
  console.log(directoryHandle);
  if (!directoryHandle) {
    alert("Пожалуйста, сначала выберите папку.");
    return;
  }

  // Проверка имени файла
  if (!isValidFileName(filename)) {
    alert(
      'Недопустимое имя файла. Оно не должно содержать символы <>:"/\\|?* и не должно быть пустым.'
    );
    return;
  }

  try {
    const fileHandle = await directoryHandle.getFileHandle(`${filename}.txt`, {
      create: true,
    });
    const writable = await fileHandle.createWritable();
    await writable.write(content);
    await writable.close();
    alert("Файл успешно сохранен!");
  } catch (err) {
    console.error("Ошибка при сохранении файла:", err);
    alert("Произошла ошибка при сохранении файла: " + err.message);
  }
}

function hasPropertyByName1(item: string, propertyName: string): boolean {
  const nodesAndLinks = useNodesAndLinks();
  return nodesAndLinks.objectNodes[item].hasOwnProperty(propertyName);
}

export const createConfig = (directoryHandle): string => {
  const nodeAndLinks = useNodesAndLinks();
  let response = "";
  for (let item of Object.keys(nodeAndLinks.objectNodes)) {
    if (nodeAndLinks.objectNodes[item].vendor === "Cisco") {
      response += `!\nhostname ${nodeAndLinks.objectNodes[item].name}\n!`;
      if (nodeAndLinks.objectNodes[item].typeOfNetworkHardware === "Switch") {
        if (hasPropertyByName1(item, "ports")) {
          response += createConfigVlan(
            nodeAndLinks.objectNodes[item] as ISwitch
          );
        }
      }
      if (nodeAndLinks.objectNodes[item].typeOfNetworkHardware === "Router") {
        response += createConfigLoopback(
          nodeAndLinks.objectNodes[item] as IRouter
        );
        if (hasPropertyByName1(item, "ports")) {
          if (Object.keys(nodeAndLinks.objectNodes[item].ports).length > 0) {
            response += createConfigPort(
              nodeAndLinks.objectNodes[item] as IRouter
            );
          }
        }

        if (hasPropertyByName1(item, "mpls")) {
          if (nodeAndLinks.objectNodes[item].mpls.length > 0) {
            response += createConfigMPLS(
              nodeAndLinks.objectNodes[item] as IRouter
            );
          }
        }

        if (hasPropertyByName1(item, "mpls")) {
          if (nodeAndLinks.objectNodes[item].mpls.length > 0) {
            response += createConfigMPLS(
              nodeAndLinks.objectNodes[item] as IRouter
            );
          }
        }
        if (hasPropertyByName1(item, "isis")) {
          if (Object.keys(nodeAndLinks.objectNodes[item].isis).length > 0) {
            response += createConfigISIS(
              nodeAndLinks.objectNodes[item] as IRouter
            );
          }
        }
        if (hasPropertyByName1(item, "bgp")) {
          if (Object.keys(nodeAndLinks.objectNodes[item].bgp).length > 0) {
            response += createConfigBGP(
              nodeAndLinks.objectNodes[item] as IRouter
            );
          }
        }
        if (hasPropertyByName1(item, "ospf")) {
          if (Object.keys(nodeAndLinks.objectNodes[item].ospf).length > 0) {
            response += createConfigOSPF(
              nodeAndLinks.objectNodes[item] as IRouter
            );
          }
        }
      }
      console.log(response + "\nend\nshow running-config");
      saveFile(directoryHandle, nodeAndLinks.objectNodes[item].name, response);
      response = "";
    }
  }
  return response;
};
