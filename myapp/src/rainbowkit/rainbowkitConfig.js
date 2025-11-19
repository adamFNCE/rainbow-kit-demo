import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, sepolia } from 'wagmi/chains'
import { defineChain } from 'viem'

// LUKSO Mainnet chain definition
const luksoMainnet = defineChain({
  id: 42,
  name: 'LUKSO Mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'LYX',
    symbol: 'LYX',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.lukso.sigmacore.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'LUKSO Explorer',
      url: 'https://explorer.execution.mainnet.lukso.network',
    },
  },
  testnet: false,
})

export const config = getDefaultConfig({
  appName: 'RainbowKit Demo',
  projectId: 'YOUR_PROJECT_ID', // Get this from https://cloud.walletconnect.com
  chains: [mainnet, sepolia, luksoMainnet],
  ssr: false, // If your dApp uses server-side rendering (SSR)
})

