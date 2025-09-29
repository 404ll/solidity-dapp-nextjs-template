import { createConfig, http } from 'wagmi';
import { sepolia,mainnet } from 'wagmi/chains';
import counterArtifact from '@/abi/counter.json';

// 1. Wagmi 配置
export const config = createConfig({
    chains: [sepolia,mainnet],
    transports: {
        [sepolia.id]: http(),
        [mainnet.id]: http(),
    },
});

// 2. 合约配置
export const counterAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;
export const counterAbi = counterArtifact.abi;