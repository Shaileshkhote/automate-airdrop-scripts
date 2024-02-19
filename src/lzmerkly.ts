import { getDefaultValues, getEstimatedFees, sendMerkTokens } from './utils/merkly/lz'
import { ChainId } from './configs/ChainIds'
import { viemClient, viemPublicClient } from './configs/viemClient'
import { zkSync } from 'viem/chains'
import { BigNumber } from 'bignumber.js'

const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Generate random no of tokens
function randomIntFromInterval(min: any, max: any) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}
// Function to asynchronously get input from the user
function askQuestion(query: string) {
  return new Promise(resolve => {
    rl.question(query, (answer: any) => {
      resolve(answer)
    })
  })
}

async function main() {
  console.log('START :: Using chain path [ZKSYNC] ===> [NOVA-175] ')
  const publicClient = await viemPublicClient(zkSync)
  const client = await viemClient(zkSync)

  const data = await getDefaultValues()

  const accountAddress = client.account.address
  const numTx = await askQuestion('Enter no of txs 🚀 :: ')

  const fees = await getEstimatedFees(
    ChainId.ZKSYNC, //chainId
    publicClient, // client
    data.dstIds[0], // dstId 0=>Arb NOVA
    accountAddress, // account
    data.amount, // amount
    data.useZro, // useZro
    data.adapterParams, // adapterParams
  )
  const [nativeFee, zroFee] = fees

  for (let index = 0; index < Number(numTx); index++) {
    const randomNumber = randomIntFromInterval(1, 5)
    const amt = new BigNumber(randomNumber).toString()
    const hash = await sendMerkTokens(
      ChainId.ZKSYNC,
      publicClient,
      client,
      accountAddress, // from
      data.dstIds[0], // ARB NOVA
      amt, // amount
      accountAddress, // toAddress
      data.refundAddress,
      data.zroPaymentAddress,
      data.adapterParams,
      new BigNumber(nativeFee).toString(),
    )
    console.log(`🚀 ~ file: lzmerkly :: 66 ~ hash:`, { index, hash })
  }
}

main()
