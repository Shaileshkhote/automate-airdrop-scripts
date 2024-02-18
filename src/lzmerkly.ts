import { Options } from '@layerzerolabs/lz-v2-utilities'
import { getDefaultValues, getEstimatedFees, sendMerkTokens } from './utils/merkly/lz'
import { ChainId } from './configs/ChainIds'
import { viemClient, viemPublicClient } from './configs/viemClient'
import { zkSync } from 'viem/chains'
import { BigNumber } from 'bignumber.js'
import { ethers } from 'ethers'
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
  const publicClient = await viemPublicClient(zkSync)
  const client = await viemClient(zkSync)

  const data = await getDefaultValues()
  //   chainId: any,
  //   client: any,
  //   dstId: any,
  //   toAddress: string,
  //   amount: any,
  //   useZro: bool,
  //   adapterParams: string,
  const accountAddress = await askQuestion('Please provide account address 🚀 :: ')
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
  console.log(`🚀 ~ file: lzmerkly.ts:60 ~ fees:`, fees)
  //       chainId: any,
  //   publicClient: any,
  //   client: any,
  //   from: any,
  //   dstId: any,
  //   amount: any,
  //   toAddress: string,
  //   refundAddress: string,
  //   zroPaymentAddress: string,
  //   adapterParams: string,
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
    console.log(`🚀 ~ file: lzmerkly.ts:90 ~ hash:`, { index, hash })
  }

  //   let accfees = new BigNumber(0)
  //   for (let index = 0; index < fees.length; index++) {
  //     const fee = fees[index]
  //     accfees = accfees.plus(fee)
  //   }

  //   const iterations = await askQuestion('Please provide no of transactions to fire 🚀')

  //   if (iterations) {
  //     let hashes = []
  //     for (let i = 0; i < parseInt(iterations as string); i++) {
  //       console.log('Tx Sent:', i)
  //       const hash = await sendMessages(
  //         ChainId.ARBITRUM,
  //         publicClient,
  //         client,
  //         data.dstIds,
  //         data.messages,
  //         accfees.toString(),
  //       )
  //       hashes.push(hash)
  //       // Wait for 2 seconds before continuing to the next iteration
  //       await new Promise(resolve => setTimeout(resolve, 2000))
  //     }
  //     console.log('All Tx Hashes', hashes)
  //     process.exit(0)
  //   } else {
  //     console.log('Invalid Inputs')
  //     process.exit(1)
  //   }
}

main()
