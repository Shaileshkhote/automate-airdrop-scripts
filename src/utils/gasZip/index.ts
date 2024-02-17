import { ethers, formatEther } from 'ethers'
import ABI from '../../configs/ABIs/gasZipABI.json'
import { layerZeroContracts } from '../../configs/constants'
import { encodeFunctionData } from 'viem'
import { sendTx } from '../sendTx'
import { ChainId } from '../../configs/ChainIds'

async function getDefaultValues() {
  const dstIds = [30125, 30167, 30138, 30150]
  const messages = [
    '0x68656c6c6f',
    '0x68656c6c6f',
    '0x68656c6c6f',
    '0x68656c6c6f',
  ]
  const options = [
    '0x000301001101000000000000000000000000000f4240',
    '0x000301001101000000000000000000000000000f4240',
    '0x000301001101000000000000000000000000000f4240',
    '0x000301001101000000000000000000000000000f4240',
  ]
  return { dstIds, messages, options }
}
async function getEstimatedFees(
  chainId: any,
  client: any,
  dstIds: any,
  messages: any,
  options: any,
) {
  const data = await client.readContract({
    //@ts-ignore
    address: layerZeroContracts['GASZIP'][chainId],
    abi: ABI,
    functionName: 'estimateFees',
    args: [dstIds, messages, options],
  })

  return data
}

async function sendMessages(
  chainId: any,
  publicClient: any,
  client: any,
  dstIds: any,
  messages: any,
  value: any,
) {
  const data = encodeFunctionData({
    abi: ABI,
    functionName: 'sendMessages',
    args: [dstIds, messages]
  })

  const txData = {
    from: client.account.address,
    to:layerZeroContracts["GASZIP"][ChainId.ARBITRUM],
    data
  }
  const hash = await sendTx(client,txData,BigInt(value))
  return hash;

}

export { getDefaultValues, getEstimatedFees, sendMessages }
