interface ILoopback {
  id: number;
  number_loopback: number | null | string;
  ip_address_loopback: string;
  mask_loopback: string;
}

interface IBgpNeighbor {
  id: number;
  neighbor: string;
  remote_as: number;
  network: string;
  mask: string;
}
interface IBgpNetwork {
  id: number;
  network: string;
  mask: string;
}

interface IBGP {
  array_neighbor: IBgpNeighbor[];
  array_network: IBgpNetwork[];
  number_bgp: number;
}

interface IPort {
  id: number;
  port: number;
}

interface IISISPortPassive extends IPort {}
interface IL3VPNPortVrf extends IPort {}
interface IMPLSPort extends IPort {}

interface IISIS {
  array_ports_passive: IISISPortPassive[];

  level: "1" | "2" | "1-2";
  net_ip: string;
  process_isis: number;
}

interface IL3VPN {
  id: number;
  vrf_name: string;
  bgp_id: number;
  rd: number;
  ports_vrf: IL3VPNPortVrf[];
}

interface IOSPFNeighborItem {
  id: number;
  network: string;
  mask: string;
  reverse_mask: string;
  area: number;
}

interface IOSPF {
  number_ospf: number;
  array_neighbor: IOSPFNeighborItem[];
}

interface IENC8021Q {
  id: number;
  vlan: number;
  ip_address_vlan: string;
  mask_vlan: string;
}

interface IPorts {
  [x: string]: {
    enc_802_1q: IENC8021Q[];
    local_ip_address: string;
    mask_local_ip: string;
    vlan_mode_port: string;
  };
}

export interface IRouter {
  active: boolean;
  face: string;
  model: string;
  name: string;
  typeOfNetworkHardware: string;
  vendor: string;
  bgp: IBGP;
  isis: IISIS;
  l3vpn: IL3VPN[];
  mpls: IMPLSPort[];
  ospf: IOSPF;
  ports: IPorts;
  loopbackArray: ILoopback[];
}

interface ISwitchPort {
  [x: string]: {
    vlan_mode_port: string;
    vlan_access: string;
    vlan_trunk: string;
  };
}

export interface ISwitch {
  name: string;
  typeOfNetworkHardware: "Switch";
  ports: ISwitchPort;
}
