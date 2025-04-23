import { binaryToIp } from "./binaryToIp";
import { ipToBinary } from "./ipToBinary";

export function calculateNetworkAddress(
  ip: string,
  subnetMask: string
): string {
  const ipBinary = ipToBinary(ip);
  const maskBinary = ipToBinary(subnetMask);

  let networkBinary = "";
  for (let i = 0; i < 32; i++) {
    networkBinary += ipBinary[i] === "1" && maskBinary[i] === "1" ? "1" : "0";
  }

  return binaryToIp(networkBinary);
}
