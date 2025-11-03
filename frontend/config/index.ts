import { createConfig, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import type { Abi } from 'viem';

// 导出 Counter ABI（与 frontend/abi/counter.json 对齐）
import counter from '@/abi/counter.json';

export const counterAbi = counter.abi as Abi;
export const counterBytecode = counter.bytecode as `0x${string}`;

export const counterAddress = (process.env.NEXT_PUBLIC_COUNTER_ADDRESS as `0x${string}`) || '0x0000000000000000000000000000000000000000';

const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;

export const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(rpcUrl),
  },
});


