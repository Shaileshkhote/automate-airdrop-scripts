import getQuote from './utils/swap'
import { ChainId } from './configs/ChainIds'
import 'dotenv/config'
import { viemClient } from './configs/viemClient'
import { sendTx } from './utils/sendTx'
import { scroll } from 'viem/chains'

async function main() {
  const client = await viemClient(scroll)
  let txHashes = []
  for (let i = 0; i < 5; i++) {
    console.log('🚀 ~ Tx Count:', i)
    const response = await getQuote(ChainId.SCROLL, client.account.address, 'USDC', 'USDT', 10)
    //@ts-ignore
    const txHash = await sendTx(client, response.tx,0)
    txHashes.push(txHash)
  }
  console.log('All Tx Hashes', txHashes)
}

main()
