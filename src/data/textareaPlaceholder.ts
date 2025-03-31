const str: string = `nodes:
  Node 0:
    ip_address: 192.168.1.1
    typeOfNetworkHardware: Switch
    model: Cisco1928R
    vlan: 802
  Node 1:
    ip_address: 192.168.1.2
    typeOfNetworkHardware: Router
    model: Cisco1928R
    vlan: 802
  Node 2:
    ip_address: 192.168.1.3
    typeOfNetworkHardware: Switch
    model: Cisco1928R
    vlan: 802
  Node 3:
    ip_address: 192.168.1.4
    typeOfNetworkHardware: Switch
    model: Cisco1928R
    vlan: 802
  Node 4:
    ip_address: 192.168.1.5
    typeOfNetworkHardware: Switch
    model: Cisco1928R
    vlan: 802
  Node 5:
    ip_address: 192.168.1.6
    typeOfNetworkHardware: Switch
    model: Cisco1928R
    vlan: 802
  Node 6:
    ip_address: 192.168.1.7
    typeOfNetworkHardware: Router
    model: Cisco1928R
    vlan: 802
links:
 Node 0:
 - Node 1
 - Node 2
 - Node 3
 Node 1:
 - Node 2
 Node 2:
 - Node 3
 - Node 4
 - Node 5
 - Node 6
`;

export default str;
