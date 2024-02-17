import { Options } from '@layerzerolabs/lz-v2-utilities'
import { getDefaultValues, getEstimatedFees, sendMessages } from './utils/gasZip'
import { ChainId } from './configs/ChainIds'
import { viemClient, viemPublicClient } from './configs/viemClient'
import { arbitrum } from 'viem/chains'
import { BigNumber } from 'bignumber.js'
import { ethers } from 'ethers'
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
  const publicClient = await viemPublicClient(arbitrum)
  const client = await viemClient(arbitrum)

  const data = await getDefaultValues()

  const fees = await getEstimatedFees(
    ChainId.ARBITRUM,
    publicClient,
    data.dstIds,
    data.messages,
    data.options,
  )
  let accfees = new BigNumber(0)
  for (let index = 0; index < fees.length; index++) {
    const fee = fees[index]
    accfees = accfees.plus(fee)
  }

  const iterations = await askQuestion('Please provide no of transactions to fire 🚀')

  if (iterations) {
    let hashes = []
    for (let i = 0; i < parseInt(iterations as string); i++) {
      console.log('Tx Sent:', i)
      const hash = await sendMessages(
        ChainId.ARBITRUM,
        publicClient,
        client,
        data.dstIds,
        data.messages,
        accfees.toString(),
      )
      hashes.push(hash)
      // Wait for 2 seconds before continuing to the next iteration
      await new Promise(resolve => setTimeout(resolve, 2000))
    }
    console.log('All Tx Hashes', hashes)
    process.exit(0)
  } else {
    console.log('Invalid Inputs')
    process.exit(1)
  }
}

main()
