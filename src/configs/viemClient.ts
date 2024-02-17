import { createWalletClient, createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import 'dotenv/config'

export async function viemClient(chain: any) {
  const account = privateKeyToAccount(process.env.WALLET_KEY as any)
  const client = createWalletClient({
    account,
    chain,
    transport: http(),
  })
  return client
}

export async function viemPublicClient(chain: any) {
  const publicClient = createPublicClient({
    chain,
    transport: http(),
  })
  return publicClient
}
