import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useBalance, useChainId, useBlockNumber } from 'wagmi'
import { formatEther } from 'viem'
import { Copy, Check, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import './App.css'

function App() {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({
    address: address,
  })
  const chainId = useChainId()
  const { data: blockNumber } = useBlockNumber({ watch: true })
  const [copied, setCopied] = useState(false)

  const getChainName = (id) => {
    const chains = {
      1: 'Ethereum Mainnet',
      11155111: 'Sepolia Testnet',
      42: 'LUKSO Mainnet',
    }
    return chains[id] || `Chain ${id}`
  }

  const getChainColor = (id) => {
    if (id === 42) return '#8B5CF6' // Purple for LUKSO
    if (id === 1) return '#627EEA' // Blue for Ethereum
    return '#6B7280' // Gray for others
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatAddress = (addr) => {
    if (!addr) return ''
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const getExplorerUrl = (chainId, address) => {
    if (chainId === 42) {
      return `https://explorer.execution.mainnet.lukso.network/address/${address}`
    }
    if (chainId === 1) {
      return `https://etherscan.io/address/${address}`
    }
    if (chainId === 11155111) {
      return `https://sepolia.etherscan.io/address/${address}`
    }
    return '#'
  }

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <span className="title-icon">🌈</span>
            RainbowKit Demo
          </h1>
          <p className="app-subtitle">Showcasing LUKSO Network Integration</p>
        </div>
        <div className="connect-button-wrapper">
          <ConnectButton />
        </div>
      </header>

      {isConnected ? (
        <div className="dashboard">
          <div className="stats-grid">
            {/* Network Card */}
            <div className="stat-card network-card" style={{ borderColor: getChainColor(chainId) }}>
              <div className="stat-header">
                <span className="stat-label">Network</span>
                <span 
                  className="chain-badge" 
                  style={{ backgroundColor: getChainColor(chainId) }}
                >
                  {chainId === 42 ? '🌟' : '🔗'} {getChainName(chainId)}
                </span>
              </div>
              <div className="stat-value chain-name">{getChainName(chainId)}</div>
              <div className="stat-meta">Chain ID: {chainId}</div>
              {chainId === 42 && (
                <div className="lukso-highlight">
                  <span className="lukso-badge">✨ LUKSO Mainnet</span>
                </div>
              )}
            </div>

            {/* Balance Card */}
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Balance</span>
              </div>
              <div className="stat-value">
                {balance ? parseFloat(formatEther(balance.value)).toFixed(4) : '0.0000'}
              </div>
              <div className="stat-meta">
                {balance?.symbol || 'ETH'}
              </div>
            </div>

            {/* Block Number Card */}
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Current Block</span>
              </div>
              <div className="stat-value block-number">
                {blockNumber ? blockNumber.toString() : '—'}
              </div>
              <div className="stat-meta">Latest block height</div>
            </div>

            {/* Account Card */}
            <div className="stat-card account-card">
              <div className="stat-header">
                <span className="stat-label">Wallet Address</span>
                <button
                  className="copy-button"
                  onClick={() => copyToClipboard(address)}
                  title="Copy address"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
              <div className="stat-value address-value">
                {formatAddress(address)}
              </div>
              <div className="stat-meta full-address">{address}</div>
              <a
                href={getExplorerUrl(chainId, address)}
                target="_blank"
                rel="noopener noreferrer"
                className="explorer-link"
              >
                View on Explorer <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Info Section */}
          <div className="info-section">
            <div className="info-card">
              <h3>🎯 Supported Networks</h3>
              <div className="networks-list">
                <div className="network-item">
                  <span className="network-dot" style={{ backgroundColor: '#627EEA' }}></span>
                  <span>Ethereum Mainnet</span>
                </div>
                <div className="network-item">
                  <span className="network-dot" style={{ backgroundColor: '#6B7280' }}></span>
                  <span>Sepolia Testnet</span>
                </div>
                <div className="network-item highlight">
                  <span className="network-dot" style={{ backgroundColor: '#8B5CF6' }}></span>
                  <span><strong>LUKSO Mainnet</strong> ✨</span>
                </div>
              </div>
            </div>

            <div className="info-card">
              <h3>🔧 Features</h3>
              <ul className="features-list">
                <li>✅ Multi-chain wallet connection</li>
                <li>✅ Real-time balance tracking</li>
                <li>✅ Block number monitoring</li>
                <li>✅ Network switching</li>
                <li>✅ LUKSO (LYX) support</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="welcome-section">
          <div className="welcome-card">
            <h2>Welcome to RainbowKit Demo</h2>
            <p>Connect your wallet to see your account information and explore the LUKSO Network integration.</p>
            <div className="welcome-features">
              <div className="feature-item">
                <span className="feature-icon">🔐</span>
                <span>Secure wallet connection</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🌐</span>
                <span>Multi-chain support</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✨</span>
                <span>LUKSO Mainnet ready</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

