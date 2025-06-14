const str: string = `nodes:
  DEFAULT_ROUTER:
    name: DEFAULT_ROUTER
    vendor: Cisco
    ports:
      '0':
        local_ip_address: 1.1.1.1
        mask_local_ip: 255.255.255.0
      '1':
        enc_802_1q:
          - id: 1749889989915
            vlan: 10
            ip_address_vlan: 10.10.10.10
            mask_vlan: 255.255.255.0
          - id: 1749889998986
            vlan: 20
            ip_address_vlan: 20.20.20.20
            mask_vlan: 255.255.255.0
        local_ip_address: 2.2.2.2
        mask_local_ip: 255.255.0.0
    typeOfNetworkHardware: Router
    loopbackArray:
      - id: 1749889948677
        number_loopback: 0
        ip_address_loopback: 111.111.111.111
        mask_loopback: 255.255.255.255
    model: Cisco ISR 4000 Series | 9
    mpls:
      - id: 1749890152251
        port: 1
      - id: 1749890155442
        port: 2
    ospf:
      number_ospf: 1
      array_neighbor:
        - id: 1749890038714
          network: 3.3.3.0
          mask: 255.255.255.252
          reverse_mask: ''
          area: 0
        - id: 1749890059913
          network: 3.3.4.0
          reverse_mask: ''
          mask: 255.255.255.252
          area: 1
    isis:
      net_ip: 49.0001.0001.0001.0001.00
      level: '1'
      process_isis: 1
      array_ports_passive:
        - id: 1749890071802
          port: 3
        - id: 1749890092993
          port: 2
    bgp:
      number_bgp: 64555
      array_neighbor:
        - id: 1749890108570
          neighbor: 1.1.1.1
          remote_as: 64512
          network: 1.1.1.0
          mask: 255.255.255.0
      array_network:
        - id: 1749890108570
          network: 192.168.0.0
          mask: 255.255.255.0
    l3vpn:
      - id: 1749890158162
        vrf_name: Cust
        bgp_id: 64555
        rd: 100
        ports_vrf:
          - id: 1749890158162
            port: 1
          - id: 1749890178033
            port: 8
      - id: 1749890186321
        vrf_name: VRRRRR
        bgp_id: 64512
        rd: 600
        ports_vrf:
          - id: 1749890186321
            port: 4
          - id: 1749890200145
            port: 5
  DEFAULT_SWITCH:
    name: DEFAULT_SWITCH
    vendor: Cisco
    ports:
      '0': {}
      '1':
        vlan_mode_port: access
        vlan_access: 10
      '2':
        vlan_mode_port: access
        vlan_access: 300
      '3':
        vlan_mode_port: trunk
        vlan_trunk: '10'
      '4':
        vlan_mode_port: trunk
        vlan_trunk: '300'
      '5':
        vlan_mode_port: trunk
        vlan_trunk: all
    typeOfNetworkHardware: Switch
    model: Cisco Catalyst 2960-X | 24
links:
  DEFAULT_ROUTER:
    - DEFAULT_SWITCH
`;

export default str;
