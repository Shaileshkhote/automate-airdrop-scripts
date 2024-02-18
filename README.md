# Automated Transactions
![X (formerly Twitter) Follow](https://img.shields.io/twitter/follow/0x_Shailesh)
## Build Status
![Static Badge](https://img.shields.io/badge/All%20Ok%20Ser!-8A2BE2)

## Features
#### LayerZero
- Supports Layerzero V2 GasZip message passing
- Origin Chain : Arbitrum
- Destination Chains : CELO, FUSE, KLAYTN, MOONRIVER
- No Of Messages : 4
- Approx Tx Cost : 1$ 

#### ZkSync
- Supports 1inch Swaps
- Supported Tokens : USDC, USDT, ETH
- Supports Amount in Token for Swaps

## Installation

Scripts requires [Node.js](https://nodejs.org/) to run
Install the dependencies and devDependencies and start the server.

```sh
git clone https://github.com/Shaileshkhote/automate-airdrop-scripts.git
cd automate-tx-scripts
pnpm install
```
Env Variables :
```js
//1inch Api Key 
API_KEY:<Value>
```

```js
//PrivateKey
WALLET_KEY:<Value>
```
Run Scripts - Zkysnc
```
pnpm zksync
```

Run Scripts - LayerZero
```
pnpm layerzero
```

Run Scripts - LiFi on ZkSync (On Shot Two Birds)
```
pnpm lifi-zksync
```

Example Inputs - ZkSync
```bash
//Before running this make sure you have approvals on 1inch

Supported Tokens : USDC,USDT,ETH
Please provide token to swap from 🚀USDC
Please provide token to swap to 🚀ETH
Amount to swap in tokens 🚀2
```

Example Inputs - LiFi - ZkSync
```bash
//Before running this make sure you have approvals on 1inch

Supported Tokens : USDC,USDT,ETH
Please provide token to swap from 🚀USDC
Please provide token to swap to 🚀ETH
Amount to swap in tokens 🚀2
```

Example Inputs - LayerZero
```bash
Please provide no of transactions to fire 🚀5
```

## Contribute

Want to contribute? Great!
Add your fav functionality and open a pull request

## License

MIT

**Free Software, Hell Yeah!**
