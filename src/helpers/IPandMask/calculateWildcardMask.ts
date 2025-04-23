import { binaryToIp } from "./binaryToIp";
import { ipToBinary } from "./ipToBinary";

export function calculateWildcardMask(subnetMask: string): string {
  const maskBinary = ipToBinary(subnetMask);
  let wildcardBinary = "";

  for (let i = 0; i < maskBinary.length; i++) {
    wildcardBinary += maskBinary[i] === "1" ? "0" : "1";
  }

  return binaryToIp(wildcardBinary);
}
