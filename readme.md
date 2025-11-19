# 🌈 RainbowKit Demo - LUKSO Network Integration

A beautiful, modern demo application showcasing **RainbowKit** wallet connection with **LUKSO Mainnet** integration. This app demonstrates how to connect wallets, display real-time blockchain data, and interact with multiple networks including the innovative LUKSO blockchain.

![RainbowKit Demo](https://img.shields.io/badge/RainbowKit-2.2.9-blue)
![LUKSO](https://img.shields.io/badge/LUKSO-Mainnet-purple)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-7.2.2-green)

## 📋 Table of Contents

- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Supported Networks](#-supported-networks)
- [Project Structure](#-project-structure)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🔐 Wallet Connection
- **Multi-wallet support** via RainbowKit
- Support for MetaMask, WalletConnect, Coinbase Wallet, and more
- Seamless wallet connection and disconnection
- Network switching capabilities

### 📊 Real-Time Statistics
- **Network Information**: Current network, Chain ID, and network status
- **Balance Display**: Real-time native token balance (LYX for LUKSO, ETH for others)
- **Block Tracking**: Live block number updates
- **Account Details**: Wallet address with copy functionality

### 🌐 Multi-Chain Support
- **Ethereum Mainnet** (Chain ID: 1)
- **Sepolia Testnet** (Chain ID: 11155111)
- **LUKSO Mainnet** (Chain ID: 42) ⭐

### 🎨 Modern UI/UX
- Beautiful gradient design with glassmorphism effects
- Responsive layout for mobile and desktop
- Dark theme with smooth animations
- Interactive cards with hover effects
- LUKSO-specific highlighting and branding

### 🔗 Explorer Integration
- Direct links to block explorers
- Network-specific explorer URLs
- Quick access to transaction history

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 20.19+ or 22.12+ (required for Vite 7.2.2)
  - Check your version: `node --version`
  - If you need to switch versions, use [nvm](https://github.com/nvm-sh/nvm):
    ```bash
    nvm install 20.19.4
    nvm use 20.19.4
    ```
- **npm**: Version 10+ (comes with Node.js)
- **A Web3 Wallet**: MetaMask, WalletConnect, or any RainbowKit-supported wallet
- **WalletConnect Project ID**: Get one for free at [cloud.walletconnect.com](https://cloud.walletconnect.com)

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd rainbow-kit-demo/myapp
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- `@rainbow-me/rainbowkit` - Wallet connection UI
- `wagmi` - React Hooks for Ethereum
- `viem` - TypeScript Ethereum library
- `@tanstack/react-query` - Data fetching
- `lucide-react` - Icon library

### Step 3: Configure WalletConnect Project ID

1. Visit [WalletConnect Cloud](https://cloud.walletconnect.com)
2. Sign up or log in
3. Create a new project
4. Copy your Project ID

5. Open `src/rainbowkit/rainbowkitConfig.js` and replace `'YOUR_PROJECT_ID'`:

```javascript
export const config = getDefaultConfig({
  appName: 'RainbowKit Demo',
  projectId: 'your-actual-project-id-here', // Replace this
  chains: [mainnet, sepolia, luksoMainnet],
  ssr: false,
})
```

### Step 4: Start the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in your terminal).

## ⚙️ Configuration

### Adding Custom Networks

To add additional networks, edit `src/rainbowkit/rainbowkitConfig.js`:

```javascript
import { defineChain } from 'viem'

const customChain = defineChain({
  id: YOUR_CHAIN_ID,
  name: 'Your Chain Name',
  nativeCurrency: {
    decimals: 18,
    name: 'TOKEN',
    symbol: 'TOKEN',
  },
  rpcUrls: {
    default: {
      http: ['https://your-rpc-url.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Explorer Name',
      url: 'https://explorer-url.com',
    },
  },
  testnet: false,
})

// Add to chains array
chains: [mainnet, sepolia, luksoMainnet, customChain],
```

### Customizing the UI

- **Colors**: Edit `src/App.css` to change color schemes
- **Layout**: Modify `src/App.jsx` to adjust component structure
- **Styling**: Update CSS variables in `src/index.css`

## 📖 Usage

### Connecting Your Wallet

1. **Start the app**: Run `npm run dev`
2. **Click "Connect Wallet"**: Located in the top-right corner
3. **Select your wallet**: Choose from the list of supported wallets
4. **Approve connection**: Follow your wallet's prompts
5. **View your dashboard**: See your stats and network information

### Viewing Statistics

Once connected, you'll see:

- **Network Card**: Shows current network with color-coded badge
  - Purple badge for LUKSO Mainnet
  - Blue badge for Ethereum Mainnet
  - Gray badge for testnets

- **Balance Card**: Displays your native token balance
  - LYX for LUKSO Mainnet
  - ETH for Ethereum networks

- **Block Number Card**: Shows the current block height (updates in real-time)

- **Account Card**: 
  - Formatted wallet address
  - Copy button to copy full address
  - Link to view on block explorer

### Switching Networks

1. Click the **ConnectButton** (top-right)
2. Select **"Switch Network"** or use your wallet's network switcher
3. Choose your desired network:
   - Ethereum Mainnet
   - Sepolia Testnet
   - **LUKSO Mainnet** ⭐

### Copying Wallet Address

1. Find your wallet address in the **Account Card**
2. Click the **copy icon** (📋) next to "Wallet Address"
3. The icon will change to a checkmark (✓) when copied
4. Paste anywhere you need it

### Viewing on Block Explorer

1. Click **"View on Explorer"** link in the Account Card
2. Opens in a new tab showing:
   - Your wallet address
   - Transaction history
   - Token balances
   - Network-specific information

### Disconnecting

1. Click the **ConnectButton**
2. Select **"Disconnect"**
3. You'll return to the welcome screen

## 🌍 Supported Networks

### Ethereum Mainnet
- **Chain ID**: 1
- **Native Token**: ETH
- **Explorer**: [Etherscan](https://etherscan.io)
- **RPC**: Public Ethereum RPC

### Sepolia Testnet
- **Chain ID**: 11155111
- **Native Token**: SepoliaETH
- **Explorer**: [Sepolia Etherscan](https://sepolia.etherscan.io)
- **RPC**: Public Sepolia RPC

### LUKSO Mainnet ⭐
- **Chain ID**: 42
- **Native Token**: LYX
- **Explorer**: [LUKSO Explorer](https://explorer.execution.mainnet.lukso.network)
- **RPC**: `https://rpc.lukso.sigmacore.io`
- **Special Features**: 
  - Universal Profiles support
  - LSP (LUKSO Standards Proposals) compatible
  - Digital identity and asset management

## 📁 Project Structure

```
myapp/
├── src/
│   ├── App.jsx                 # Main application component
│   ├── App.css                 # Application styles
│   ├── main.jsx                # Application entry point
│   ├── index.css               # Global styles
│   └── rainbowkit/
│       └── rainbowkitConfig.js # RainbowKit and Wagmi configuration
├── public/                     # Static assets
├── index.html                  # HTML template
├── package.json                # Dependencies and scripts
├── vite.config.js             # Vite configuration
└── README.md                   # This file
```

## 🔧 Available Scripts

### Development

```bash
npm run dev
```
Starts the development server with hot module replacement (HMR).

### Build

```bash
npm run build
```
Creates an optimized production build in the `dist/` folder.

### Preview

```bash
npm run preview
```
Preview the production build locally before deploying.

### Lint

```bash
npm run lint
```
Run ESLint to check code quality and find potential issues.

## 🐛 Troubleshooting

### Node.js Version Issues

**Error**: `Vite requires Node.js version 20.19+ or 22.12+`

**Solution**:
```bash
# Check your Node version
node --version

# If using nvm, switch to compatible version
nvm use 20.19.4

# Or install it
nvm install 20.19.4
nvm use 20.19.4
```

### Wallet Connection Issues

**Problem**: Wallet won't connect

**Solutions**:
1. Ensure you have a valid WalletConnect Project ID configured
2. Check that your wallet extension is unlocked
3. Try refreshing the page
4. Clear browser cache and try again
5. Make sure you're using a supported wallet

### Network Not Found

**Problem**: LUKSO Mainnet doesn't appear in wallet

**Solution**: 
1. Add LUKSO Mainnet manually to your wallet:
   - Network Name: LUKSO Mainnet
   - RPC URL: `https://rpc.lukso.sigmacore.io`
   - Chain ID: 42
   - Currency Symbol: LYX
   - Block Explorer: `https://explorer.execution.mainnet.lukso.network`

### Build Errors

**Problem**: `Build failed` or module errors

**Solutions**:
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Clear Vite cache: `rm -rf node_modules/.vite`
4. Ensure all dependencies are installed correctly

### Balance Not Showing

**Problem**: Balance shows as 0.0000 or doesn't update

**Solutions**:
1. Check that you're connected to the correct network
2. Ensure your wallet has the native token (LYX for LUKSO, ETH for Ethereum)
3. Wait a few seconds for the balance to load
4. Check browser console for errors

## 🎯 Use Cases

This demo is perfect for:

- **Developers** learning RainbowKit integration
- **LUKSO ecosystem** developers building dApps
- **Showcasing** multi-chain wallet connectivity
- **Prototyping** Web3 applications
- **Educational** purposes for blockchain development

## 🔐 Security Notes

- **Never commit** your WalletConnect Project ID to public repositories
- Use environment variables for sensitive configuration
- Always verify network details before connecting
- Be cautious when connecting to unknown networks
- Keep your wallet software updated

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `dist/` folder to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### Environment Variables

For production, use environment variables:

```bash
VITE_WALLETCONNECT_PROJECT_ID=your-project-id
```

Then update `rainbowkitConfig.js`:

```javascript
projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
```

## 📚 Learn More

### Resources

- [RainbowKit Documentation](https://rainbowkit.com)
- [Wagmi Documentation](https://wagmi.sh)
- [Viem Documentation](https://viem.sh)
- [LUKSO Documentation](https://docs.lukso.tech)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)

### Related Projects

- [RainbowKit GitHub](https://github.com/rainbow-me/rainbowkit)
- [Wagmi GitHub](https://github.com/wevm/wagmi)
- [LUKSO Network](https://lukso.network)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- [RainbowKit](https://rainbowkit.com) for the amazing wallet connection UI
- [Wagmi](https://wagmi.sh) for React Hooks for Ethereum
- [LUKSO](https://lukso.network) for the innovative blockchain platform
- [Vite](https://vite.dev) for the blazing fast build tool

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review the [Documentation](#-learn-more)
3. Open an issue on GitHub
4. Check existing issues for solutions

---

**Made with ❤️ for the LUKSO and Web3 community**

For the latest updates and features, check the [GitHub repository](https://github.com/your-username/rainbow-kit-demo).
