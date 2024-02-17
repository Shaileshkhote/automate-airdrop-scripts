import 'dotenv/config'
import fetch from 'node-fetch'
import tokenContracts from '../../configs/constants'

async function getQuote(
  chainId: number,
  from: string,
  fromToken: string,
  toToken: string,
  amount: number,
) {
  const url = 'https://api.1inch.dev/swap/v5.2/' + chainId + '/swap'
  const apiBaseUrl = 'https://api.1inch.dev/swap/v5.2/' + chainId
  const config = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    params: {
      //@ts-ignore
      src: `${tokenContracts[fromToken][chainId as any].address}`,
      //@ts-ignore
      dst: `${tokenContracts[toToken][chainId as any].address}`,
      //@ts-ignore
      amount: (10 ** tokenContracts[fromToken][chainId as any].decimals * amount).toString(),
      from: from,
      slippage: '0.5',
      fee: '0',
    },
  }

  // Converting params to query string
  const queryParams = new URLSearchParams(config.params).toString()

  try {
    const response = await fetch(`${url}?${queryParams}`, {
      method: config.method,
      headers: config.headers,
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export async function getRouter(chainId: number) {
  const url = 'https://api.1inch.dev/swap/v5.2/' + chainId + '/approve/spender'
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    params: {},
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()
    return data.address
  } catch (error) {
    console.error(error)
  }
}

export default getQuote
