# 🏆 Sui Workshop Battle - Votejoy dApp

A decentralized NFT voting and interaction platform developed for the Sui Workshop Battle organized by Fırat Blockchain. It is a Web3 application where users can create and upload their own NFTs, vote for other NFTs, and try to climb the real-time leaderboard.

## 🚀 Features
- **NFT Minting:** Users can join the system by minting their own NFTs (Joy).
- **Candidate Registration:** Registering minted NFTs as candidates for the competitive voting.
- **Voting & Leaderboard:** Users can vote for their favorite candidates and compete on a real-time leaderboard.
- **Wallet Integration:** Seamless integration with Sui wallets (`@mysten/dapp-kit`).

## 🛠 Tech Stack
**Frontend:**
- React (TypeScript) + Vite
- TailwindCSS
- `@mysten/dapp-kit` & `@mysten/sui`
- React Query

**Smart Contract (Backend):**
- Sui Move (`votejoy` package)

## 📂 Project Structure
```text
Sui-Workshop-Battle/
├── frontend/             # React application and UI components
│   ├── src/              # React source codes
│   └── package.json      # Frontend dependencies
└── move/                 # Sui Move smart contracts
    ├── sources/          # Move source codes (votejoy.move, etc.)
    └── Move.toml         # Move package configuration
```

## ⚙️ Setup and Running

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [Sui CLI](https://docs.sui.io/guides/developer/getting-started/sui-install) installed and configured.

### 1. Building and Publishing the Smart Contract (Move)
```bash
cd move

# Compile the contract
sui move build

# Publish the contract to the network (e.g., testnet)
sui client publish --gas-budget 100000000
```
*(After the deployment is complete, take note of the Package ID and other important object IDs that appear in the terminal. These IDs will be used on the frontend side in `constants.ts` or the relevant configuration file.)*

### 2. Running the Frontend
```bash
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```