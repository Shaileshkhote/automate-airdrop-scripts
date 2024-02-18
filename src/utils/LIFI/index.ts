import 'dotenv/config'
import fetch from 'node-fetch'
import tokenContracts from '../../configs/constants'
import { LiFiChains } from '../../configs/chains'

async function getQuoteLiFi(
  chainId: number,
  from: string,
  fromToken: string,
  toToken: string,
  amount: number,
) {
  const url = 'https://li.quest/v1/quote'
  const options = { method: 'GET', headers: { accept: 'application/json' } }
  const params = {
    //@ts-ignore
    fromChain: `${LiFiChains['chains'][chainId]}`,
    //@ts-ignore
    toChain: `${LiFiChains['chains'][chainId]}`,
    fromToken: fromToken,
    toToken: toToken,
    fromAddress: from,
    //@ts-ignore
    fromAmount: (10 ** tokenContracts[fromToken][chainId as any].decimals * amount).toString(),
  }

  // Converting params to query string
  const queryParams = new URLSearchParams(params).toString()

  try {
    const response = await fetch(`${url}?${queryParams}`, options)
    const data = await response.json()
    return data.transactionRequest
  } catch (error) {
    console.error(error)
  }
}

export default getQuoteLiFi
