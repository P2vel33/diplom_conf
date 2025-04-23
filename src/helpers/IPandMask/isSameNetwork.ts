import { calculateNetworkAddress } from "./calculateNetworkAddress";

export function isSameNetwork(
  ip: string,
  subnetMask: string,
  networkAddress: string
): boolean {
  const calculatedNetworkAddress = calculateNetworkAddress(ip, subnetMask);
  return calculatedNetworkAddress === networkAddress;
}
