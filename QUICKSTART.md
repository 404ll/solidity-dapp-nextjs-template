# 🚀 快速开始指南

## 1. 环境准备

### 安装依赖
```bash
npm install
```

### 配置环境变量
创建 `.env.local` 文件：
```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
```

## 2. 获取 WalletConnect 项目 ID

1. 访问 [WalletConnect Cloud](https://cloud.walletconnect.com)
2. 创建新项目
3. 复制项目 ID 到环境变量

## 3. 部署智能合约

### 使用 Hardhat
```bash
# 安装 Hardhat
npm install --save-dev hardhat

# 初始化项目
npx hardhat init

# 编译合约
npx hardhat compile

# 部署到测试网
npx hardhat run scripts/deploy.js --network sepolia
```

### 使用 Foundry
```bash
# 安装 Foundry
curl -L https://foundry.paradigm.xyz | bash
foundryup

# 编译合约
forge build

# 部署合约
forge script script/Counter.s.sol --rpc-url $SEPOLIA_RPC_URL --broadcast --verify
```

## 4. 更新合约地址

将部署获得的合约地址更新到 `.env.local` 文件中。

## 5. 启动应用

```bash
npm run dev
```

访问 http://localhost:3000 查看应用！

## 6. 测试功能

1. 点击 "Connect Wallet" 连接钱包
2. 查看当前计数器值
3. 点击 "Increment Counter" 增加计数
4. 等待交易确认

## 常见问题

### Q: 钱包连接失败？
A: 检查 WalletConnect 项目 ID 是否正确配置

### Q: 合约调用失败？
A: 确保合约地址正确，且钱包已连接到正确的网络

### Q: 交易一直 pending？
A: 检查网络连接和 gas 费用设置
