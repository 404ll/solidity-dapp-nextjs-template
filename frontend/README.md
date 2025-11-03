# Solidity + Next.js DApp 模板

这是一个现代化的 Solidity 智能合约 + Next.js 前端 DApp 开发模板，集成了 wagmi、ConnectKit 和 Tailwind CSS。

## 🚀 功能特性

- ✅ **Next.js 15** - 最新的 React 框架
- ✅ **TypeScript** - 类型安全的开发体验
- ✅ **Wagmi v2** - 强大的 React Hooks 用于以太坊交互
- ✅ **ConnectKit** - 美观的钱包连接组件
- ✅ **Tailwind CSS** - 现代化的样式框架
- ✅ **React Query** - 数据获取和缓存
- ✅ **Viem** - 轻量级的以太坊库

## 📋 前置要求

- Node.js 18+ 
- npm/yarn/pnpm
- 一个以太坊钱包（MetaMask 等）
- 智能合约已部署到测试网

## 🛠️ 安装和运行

### 1. 克隆项目
```bash
git clone https://github.com/404ll/solidity-dapp-nextjs-template
cd solidity-next-js-template
```

### 2. 安装依赖
```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 3. 环境配置
创建 `.env.local` 文件并配置以下变量：

```env
# WalletConnect 项目 ID (从 https://cloud.walletconnect.com 获取)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id

# 智能合约地址 (部署后获得)
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
```

### 4. 启动开发服务器
```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📁 项目结构

```
solidity-next-js-template/
├── abi/                    # 智能合约 ABI 文件
│   └── counter.json
├── app/                    # Next.js App Router
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 主页面
│   └── provider.tsx       # Web3 提供者
├── config/                 # 配置文件
│   └── index.ts           # Wagmi 和合约配置
├── public/                 # 静态资源
└── package.json
```

## 🔧 配置说明

### 1. 网络配置 (`config/index.ts`)

```typescript
import { sepolia } from 'wagmi/chains';

export const config = createConfig(getDefaultConfig({
    appName: 'Solidity Next.js Template',
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    chains: [sepolia], // 可以添加更多网络
    transports: {
        [sepolia.id]: http(),
    },
}));
```

### 2. 合约配置

```typescript
// 合约地址
export const counterAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

// 合约 ABI
export const counterAbi = counterArtifact.abi;
```

## 💡 使用示例

### 连接钱包
```tsx
import { ConnectKitButton } from 'connectkit';

function App() {
  return <ConnectKitButton />;
}
```

### 读取合约数据
```tsx
import { useReadContract } from 'wagmi';

function Counter() {
  const { data: count } = useReadContract({
    address: counterAddress,
    abi: counterAbi,
    functionName: 'x', // 读取 x 变量
  });

  return <div>Count: {count?.toString()}</div>;
}
```

### 写入合约
```tsx
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

function IncrementButton() {
  const { writeContract, data: hash } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  const handleIncrement = () => {
    writeContract({
      address: counterAddress,
      abi: counterAbi,
      functionName: 'inc', // 调用 inc 函数
    });
  };

  return (
    <button onClick={handleIncrement} disabled={isLoading}>
      {isLoading ? 'Processing...' : 'Increment'}
    </button>
  );
}
```

## 🎨 自定义样式

项目使用 Tailwind CSS，你可以：

1. 修改 `app/globals.css` 添加自定义样式
2. 在组件中使用 Tailwind 类名
3. 配置 `tailwind.config.ts` 添加自定义主题

## 📦 构建和部署

### 构建生产版本
```bash
npm run build
```

### 启动生产服务器
```bash
npm run start
```

### 部署到 Vercel
1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 配置环境变量
4. 部署

## 🔗 相关资源

- [Wagmi 文档](https://wagmi.sh/)
- [ConnectKit 文档](https://docs.family.co/connectkit)
- [Next.js 文档](https://nextjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Viem 文档](https://viem.sh/)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License
