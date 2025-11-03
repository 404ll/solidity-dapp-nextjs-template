
# 🧩 Solidity + Next.js 模板（Monorepo）

一个包含智能合约与前端的 DApp 模板：
- 合约端：Hardhat + Solidity（示例合约 `Counter`）
- 前端：Next.js 15 + TypeScript + wagmi + ConnectKit + Tailwind

---

## 📁 项目结构

```
solidity-next-js-template/
├── contracts/                         # Hardhat 合约项目（ESM）
│   ├── contracts/Counter.sol          # 示例计数器合约
│   ├── scripts/deploy.js              # 部署脚本（ESM）
│   ├── artifacts/contracts/.../Counter.json  # 编译产物（ABI/bytecode）
│   └── hardhat.config.js              # 网络配置（支持 dotenv）
└── frontend/                          # Next.js 前端
    ├── abi/counter.json               # 前端使用的 ABI（需从 contracts 同步）
    ├── config/index.ts                # 合约地址/ABI/RPC 配置
    ├── app/ ...                       # UI 代码
    └── package.json
```

---

## 🚀 环境要求

- Node.js ≥ 18
- pnpm 或 npm
- 浏览器钱包（MetaMask 等）

---

## ⚙️ 安装依赖

分别在两个子目录安装依赖：

```bash
cd contracts && pnpm install   # 或 npm install
cd ../frontend && pnpm install # 或 npm install
```

---

## 🔨 合约开发与部署

```bash
cd contracts

# 编译
pnpm compile      # 等价 npx hardhat compile

# 运行测试（已适配 ESM）
pnpm test         # 等价 npx hardhat test

# 启动本地节点
pnpm node         # 等价 npx hardhat node
```

部署（脚本方式）：

- 本地网络（推荐本地调试）：
  ```bash
  # 先在一个终端启动本地节点
  pnpm node
  # 再在另一个终端部署
  pnpm deploy:localhost
  ```

- 测试网（Sepolia）：在 `contracts/.env` 配置：
  ```env
  SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/<your_key>
  SEPOLIA_PRIVATE_KEY=0x<your_private_key>
  ```
  然后执行：
  ```bash
  pnpm deploy:sepolia
  ```

部署成功后，记录控制台输出的合约地址（形如 `0x...`）。

同步 ABI 到前端（每次合约变更/重新编译后都建议同步）：

```bash
cp ./artifacts/contracts/Counter.sol/Counter.json ../frontend/abi/counter.json
```

---

## 💻 前端开发

在 `frontend/.env.local` 中设置：

```env
NEXT_PUBLIC_RPC_URL=http://127.0.0.1:8545                 # 本地节点 或 你的 Infura/Alchemy RPC
NEXT_PUBLIC_COUNTER_ADDRESS=0x你的Counter合约地址
```

启动前端：

```bash
cd frontend
pnpm dev   # 或 npm run dev
```

访问 `http://localhost:3000` 与合约交互（读取 `x`、调用 `inc`/`incBy`）。

> 注意：前端不再发起部署交易；请使用上面的 Hardhat 部署脚本，部署后把地址写入环境变量。

---

## 🧰 常用命令速查

| 操作 | 命令 |
| --- | --- |
| 编译合约 | `cd contracts && pnpm compile` |
| 运行测试 | `cd contracts && pnpm test` |
| 本地节点 | `cd contracts && pnpm node` |
| 本地部署 | `cd contracts && pnpm deploy:localhost` |
| Sepolia 部署 | `cd contracts && pnpm deploy:sepolia` |
| 同步 ABI 到前端 | `cp contracts/artifacts/contracts/Counter.sol/Counter.json frontend/abi/counter.json` |
| 启动前端 | `cd frontend && pnpm dev` |

---

## 📝 说明与排错

- ESM 注意：`contracts/package.json` 中启用了 `"type": "module"`。在测试和脚本中使用默认导入 Hardhat：

  ```js
  import hardhat from "hardhat";
  const { ethers } = hardhat;
  ```

- RPC 断路器/代理问题：若前端或部署出现公共 RPC 熔断或 `ERR_PROXY_CONNECTION_FAILED`，请：
  - 在前端改用你自己的稳定 RPC：`NEXT_PUBLIC_RPC_URL=...`
  - 在合约侧设置有效的 `SEPOLIA_RPC_URL`（Infura/Alchemy），避免被限流/禁用端点
  - 本地调试优先使用 `http://127.0.0.1:8545`

- 若前端报合约 ABI 不匹配，请重新从 `contracts/artifacts/.../Counter.json` 复制到 `frontend/abi/counter.json`。

