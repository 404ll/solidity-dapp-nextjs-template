import { createConfig, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { getDefaultConfig } from 'connectkit';
import counterArtifact from '@/abi/counter.json';

// 1. Wagmi 配置
export const config = createConfig(getDefaultConfig({
    appName: 'Solidity Next.js Template',
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
    chains: [sepolia],
    transports: {
        [sepolia.id]: http(),
    },
}));

// 2. 合约配置
export const counterAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `${string}`;
export const counterAbi = counterArtifact.abi;