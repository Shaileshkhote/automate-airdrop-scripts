import { ethers, formatEther } from 'ethers'
import ABI from '../../configs/ABIs/MerklyABI.json'
import { layerZeroContracts } from '../../configs/constants'
import { encodeFunctionData } from 'viem'
import { sendTx } from '../sendTx'
import { ChainId } from '../../configs/ChainIds'

async function getDefaultValues() {
  const dstIds = [175] // NOVA
  const amount = '2000000000000000000' //2 $MERKLY
  const refundAddress = '0x0000000000000000000000000000000000000000'
  const zroPaymentAddress = '0x0000000000000000000000000000000000000000'
  const adapterParams = '0x'
  const useZro = false
  return { dstIds, amount, refundAddress, zroPaymentAddress, adapterParams, useZro }
}
async function getEstimatedFees(
  chainId: any,
  client: any,
  dstId: any,
  toAddress: any,
  amount: any,
  useZro: boolean,
  adapterParams: string,
) {
  const data = await client.readContract({
    //@ts-ignore
    address: layerZeroContracts['MERKLY'][chainId],
    abi: ABI,
    functionName: 'estimateSendFee',
    args: [dstId, toAddress, amount, useZro, adapterParams],
  })

  return data
}

async function sendMerkTokens(
  chainId: any,
  publicClient: any,
  client: any,
  from: any,
  dstId: any,
  amount: any,
  toAddress: any,
  refundAddress: string,
  zroPaymentAddress: string,
  adapterParams: string,
  value: any,
) {
  const data = encodeFunctionData({
    abi: ABI,
    functionName: 'sendFrom',
    args: [from, dstId, toAddress, amount, refundAddress, zroPaymentAddress, adapterParams],
  })

  const txData = {
    from: client.account.address,
    to: layerZeroContracts['MERKLY'][ChainId.ZKSYNC],
    data,
  }

  const hash = await sendTx(client, txData, BigInt(value))
  return hash
}

export { getDefaultValues, getEstimatedFees, sendMerkTokens }
