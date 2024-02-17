import { ChainId } from './ChainIds'

const tokenContracts = {
  ROUTER: {
    [ChainId.ZKSYNC]: "0x6e2b76966cbd9cf4cc2fa0d76d24d5241e0abc2f",
    [ChainId.SCROLL]: "",
  },
  USDT: {
    [ChainId.ZKSYNC]: {
      address: '0x493257fD37EDB34451f62EDf8D2a0C418852bA4C',
      decimals: 6,
    },
    [ChainId.SCROLL]: {
      address: '0xf55BEC9cafDbE8730f096Aa55dad6D22d44099Df',
      decimals: 6,
    },
  },
  USDC: {
    [ChainId.ZKSYNC]: {
      address: '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4',
      decimals: 6,
    },
    [ChainId.SCROLL]: {
      address: '0x06eFdBFf2a14a7c8E15944D1F4A48F9F95F663A4',
      decimals: 6,
    },
  },
  ETH: {
    [ChainId.ZKSYNC]: {
      address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      decimals: 18,
    },
    [ChainId.SCROLL]: {
      address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      decimals: 18,
    },
  },
}

export const layerZeroContracts = {
    GASZIP: {
      [ChainId.ARBITRUM]: "0x26DA582889f59EaaE9dA1f063bE0140CD93E6a4f",
      [ChainId.SCROLL]: "",
    },
  }
export default tokenContracts
