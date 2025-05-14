interface IVendorList {
  [item: string]: string;
}

interface IVendor {
  Cisco: IVendorList;
  Alcatel: IVendorList;
  Eltex: IVendorList;
}

interface IType {
  Switch: IVendor;
  Router: IVendor;
}

export const networkRouters: IType = {
  Switch: {
    Cisco: {
      "Cisco Catalyst 2960-X | 48": "48",
      "Cisco Catalyst 2960-X | 24": "24",
      "Cisco Catalyst 9300 | 48": "48",
      "Cisco Catalyst 9300 | 24": "24",
      "Cisco Catalyst 3650 | 48": "48",
      "Cisco Catalyst 3650 | 24": "24",
      "Cisco Catalyst 4500-X Series | 48": "48",
      "Cisco Catalyst 4500-X Series | 24": "24",
      "Cisco Nexus 9000 Series | 48": "48",
      "Cisco Nexus 9000 Series | 24": "24",
    },
    Alcatel: {
      "Alcatel-Lucent OmniSwitch 6900 | 48": "48",
      "Alcatel-Lucent OmniSwitch 6900 | 24": "24",
      "Alcatel-Lucent OmniSwitch 9000 | 48": "48",
      "Alcatel-Lucent OmniSwitch 9000 | 24": "24",
      "Alcatel-Lucent 6850-P48 | 48": "48",
      //   "Alcatel-Lucent 6850-P48": "48 + PoE",
      "Alcatel-Lucent 5620 LAN | 48": "48",
      "Alcatel-Lucent 5620 LAN | 24": "24",
    },
    Eltex: {
      "Eltex S5800-48F | 48": "48",
      "Eltex S5810-24P | 24": "24",
      //   "Eltex S5810-24P": "24 + PoE",
      "Eltex S2924G | 24": "24",
      "Eltex S3024P | 24": "24",
      //   "Eltex S3024P": "24 + PoE",
      "Eltex S4824S | 24": "24",
      //   "Eltex S4824S | 24" : "24 + 4 SFP",
    },
  },
  Router: {
    Cisco: {
      "Cisco ISR 4000 Series | 9": "9",
      "Cisco ISR 4000 Series | 6": "6",
      "Cisco ISR 4000 Series | 3": "3",
      "Cisco Meraki MX Series | 20": "20",
      "Cisco Meraki MX Series | 10": "10",
      "Cisco RV340 | 4": "4",
      "Cisco 8500 Series | 48": "48",
      "Cisco 8500 Series | 24": "24",
      "Cisco ASR 1000 Series | 6": "6",
      "Cisco ASR 1000 Series | 4": "4",
      "Cisco ASR 1000 Series | 2": "2",
    },
    Alcatel: {
      "Alcatel-Lucent 7750 SR | 48": "48",
      "Alcatel-Lucent 7750 SR | 24": "24",
      "Alcatel-Lucent 7705 SAR | 8": "8",
      "Alcatel-Lucent 7705 SAR | 4": "4",
      "Alcatel-Lucent 6210 | 4": "4",
      "Alcatel-Lucent 7705 SAR HLS | 4": "4",
    },
    Eltex: {
      "Eltex ER-4840 | 8": "8",
      "Eltex R10 | 8": "8",
      "Eltex R9 | 6": "6",
      "Eltex ER-2400 | 4": "4",
    },
  },
};

// Вот обновлённый JSON с 20 коммутаторами и 20 маршрутизаторами для каждого вендора:

// ```json
// {
//     "Коммутаторы": {
//         "Cisco": {
//             "Cisco Catalyst 2960-X": "24 или 48",
//             "Cisco Catalyst 9300": "24 или 48",
//             "Cisco Catalyst 3650": "24 или 48",
//             "Cisco Catalyst 4500-X Series": "24 или 48",
//             "Cisco Nexus 9000 Series": "24, 48 или больше",
//             "Cisco Catalyst 9500": "24 или 48",
//             "Cisco Catalyst 9200": "24 или 48",
//             "Cisco Nexus 2232TM": "32",
//             "Cisco Catalyst 6800": "24 или 48",
//             "Cisco Catalyst 3850": "24 или 48",
//             "Cisco Catalyst 3560-CX": "8-24",
//             "Cisco Catalyst 3550": "24 или 48",
//             "Cisco Catalyst 4950": "24 или 48",
//             "Cisco Catalyst 6000": "24 или 48",
//             "Cisco Catalyst 9300L": "24 или 48",
//             "Cisco Meraki MS Series": "8 до 48",
//             "Cisco Catalyst 9120AX": "8-24",
//             "Cisco Catalyst 2960-S": "24 или 48",
//             "Cisco Catalyst 3850-12X": "12",
//             "Cisco Catalyst 9200L": "24 или 48"
//         },
//         "Alcatel": {
//             "Alcatel-Lucent OmniSwitch 6900": "24 или 48",
//             "Alcatel-Lucent OmniSwitch 6850": "24 или 48",
//             "Alcatel-Lucent OmniSwitch 9000": "24 или 48",
//             "Alcatel-Lucent 7705 SAR": "4 или 8",
//             "Alcatel-Lucent 7750 SR": "до 48",
//             "Alcatel-Lucent 6210": "4",
//             "Alcatel-Lucent 6850-P48": "48 + PoE",
//             "Alcatel-Lucent 5620 LAN": "24 или 48",
//             "Alcatel-Lucent 6850-X48": "48",
//             "Alcatel-Lucent OmniSwitch 6465": "24 или 48",
//             "Alcatel-Lucent 9600": "24 или 48",
//             "Alcatel-Lucent 6730": "16",
//             "Alcatel-Lucent 8660": "8 до 48",
//             "Alcatel-Lucent 8900": "24 или 48",
//             "Alcatel-Lucent 6700": "4-48",
//             "Alcatel-Lucent OmniSwitch 5200": "24",
//             "Alcatel-Lucent 6845": "48",
//             "Alcatel-Lucent OmniSwitch 6865": "24 или 48",
//             "Alcatel-Lucent 7870": "12",
//             "Alcatel-Lucent 6920": "24"
//         },
//         "Eltex": {
//             "Eltex S5810-24P": "24 + PoE",
//             "Eltex S5800-48F": "48",
//             "Eltex S2924G": "24",
//             "Eltex S3024P": "24 + PoE",
//             "Eltex S4824S": "24 + 4 SFP",
//             "Eltex S1900": "24",
//             "Eltex S5810-48P": "48 + PoE",
//             "Eltex S4800": "48",
//             "Eltex S2928G": "28",
//             "Eltex S4810-24G": "24",
//             "Eltex S3800-24P": "24 + PoE",
//             "Eltex S3000": "48",
//             "Eltex S2800": "24",
//             "Eltex S5810-12": "12",
//             "Eltex S4828G": "28",
//             "Eltex S5900": "48",
//             "Eltex S4840G": "40",
//             "Eltex S6424": "24",
//             "Eltex S5830-48": "48",
//             "Eltex S4100": "24"
//         }
//     },
//     "Маршрутизаторы": {
//         "Cisco": {
//             "Cisco ISR 4000 Series": "3-9",
//             "Cisco Meraki MX Series": "10-20",
//             "Cisco RV340": "4",
//             "Cisco 8500 Series": "до 48",
//             "Cisco ASR 1000 Series": "2-6",
//             "Cisco ISR 1000 Series": "1-8",
//             "Cisco ASR 9000 Series": "2-32",
//             "Cisco 800 Series": "1-4",
//             "Cisco NCS 5500 Series": "12-48",
//             "Cisco AX 1000": "1-12",
//             "Cisco 4000 Series": "3-9",
//             "Cisco 4400 Series": "4",
//             "Cisco 7200 Series": "2-8",
//             "Cisco ASR 920 Series": "1-8",
//             "Cisco 8910 Series": "1",
//             "Cisco 8865 Series": "1",
//             "Cisco 8310 Series": "1",
//             "Cisco ISR 1100 Series": "1-4",
//             "Cisco 5900 Series": "2-12",
//             "Cisco 7800 Series": "1-8"
//         },
//         "Alcatel": {
//             "Alcatel-Lucent 7705 SAR": "4 или 8",
//             "Alcatel-Lucent 7750 SR": "до 48",
//             "Alcatel-Lucent 6210": "4",
//             "Alcatel-Lucent 7705 SAR HLS": "4",
//             "Alcatel-Lucent 8800": "1-8",
//             "Alcatel-Lucent 3725": "8",
//             "Alcatel-Lucent 5570": "1-4",
//             "Alcatel-Lucent 5570 LSR": "1-12",
//             "Alcatel-Lucent 9700": "2",
//             "Alcatel-Lucent 6500": "2-16",
//             "Alcatel-Lucent 1510": "8-32",
//             "Alcatel-Lucent 6800": "2-64",
//             "Alcatel-Lucent 7500": "1-4",
//             "Alcatel-Lucent 8050": "1-8",
//             "Alcatel-Lucent 8000 Series": "8",
//             "Alcatel-Lucent 8670": "16-48",
//             "Alcatel-Lucent 1780": "2-6",
//             "Alcatel-Lucent 7705 SAR G": "4",
//             "Alcatel-Lucent 6900": "4",
//             "Alcatel-Lucent 8600": "1-48"
//         },
//         "Eltex": {
//             "Eltex R9": "6",
//             "Eltex ER-2400": "4",
//             "Eltex R10": "8",
//             "Eltex ER-4840": "8",
//             "Eltex R3": "4",
//             "Eltex R4": "4",
//             "Eltex ER-1300": "2",
//             "Eltex R12": "12",
//             "Eltex R20": "20",
//             "Eltex R7": "8",
//             "Eltex R8": "8",
//             "Eltex R15": "15",
//             "Eltex R16": "16",
//             "Eltex R14": "14",
//             "Eltex R13": "13",
//             "Eltex R11": "11",
//             "Eltex R19": "19",
//             "Eltex ER-840": "8",
//             "Eltex R18": "18",
//             "Eltex R17": "17",
//             "Eltex R6": "6"
//         }
//     }
// }
// ```

// В этой версии JSON представлено по 20 коммутаторов и маршрутизаторов для каждого из вендоров.
