import getQuote from './utils/1inch'
import { ChainId } from './configs/ChainIds'
import 'dotenv/config'
import { viemClient } from './configs/viemClient'
import { sendTx } from './utils/sendTx'
import { zkSync } from 'viem/chains'
import getQuoteLiFi from './utils/LIFI'
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Function to asynchronously get input from the user
function askQuestion(query: string) {
  return new Promise(resolve => {
    rl.question(query, (answer: any) => {
      resolve(answer)
    })
  })
}

async function main() {
  const client = await viemClient(zkSync)
  console.log('Supported Tokens : USDC,USDT,ETH')

  let token0 = await askQuestion('Please provide token to swap from 🚀') as string
  let token1 = await askQuestion('Please provide token to swap to 🚀') as string
  const amount = await askQuestion('Amount to swap in tokens 🚀')
  const iterations = await askQuestion('No of iterations to perform eg.(Input 2 swaps 2 times)')

  const allowedTokens = ['ETH', 'USDC', 'USDT']
  token0 = token0.toUpperCase()
  token1 = token1.toUpperCase()

  if (!allowedTokens.includes(token0) || !allowedTokens.includes(token1)) {
    console.log(`Unsupported tokens, Supported tokens ${allowedTokens}`);
    process.exit(1)
    
  }

  if (token0 && token1 && amount && iterations) {
    let txHashes = []
    for (let i = 0; i < parseInt(iterations as string); i++) {
      console.log('Tx Sent:', i)
      const response = await getQuoteLiFi(
        ChainId.ZKSYNC,
        client.account.address,
        token0 as string,
        token1 as string,
        parseInt(amount as string),
      )
      //  @ts-ignore
      const txHash = await sendTx(client, response, response.value)
      txHashes.push(txHash)
    }

    // Wait for 2 seconds before continuing to the next iteration
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('All Tx Hashes', txHashes)
    process.exit(0)
  } else {
    console.log('Invalid Inputs')
    process.exit(1)
  }
}

main()
