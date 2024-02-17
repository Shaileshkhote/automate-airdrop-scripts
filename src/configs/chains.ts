import { defineChain } from 'viem'
 
export const arbitrum = defineChain({
  id: 42161,
  name: 'Arbitrum',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'AETH',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.zora.energy'],
      webSocket: ['wss://rpc.zora.energy'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer.zora.energy' },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 5882,
    },
  },
})