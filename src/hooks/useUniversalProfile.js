import { useState, useEffect } from 'react'
import { ERC725 } from '@erc725/erc725.js'
import { isAddress } from 'viem'

// LSP3Profile schema for Universal Profiles
const LSP3ProfileSchema = [
  {
    name: 'LSP3Profile',
    key: '0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5',
    keyType: 'Singleton',
    valueType: 'bytes',
    valueContent: 'VerifiableURI',
  },
]

// Helper function to convert IPFS URLs to HTTP gateway URLs
function convertIpfsUrl(ipfsUrl) {
  if (!ipfsUrl) return null
  if (typeof ipfsUrl !== 'string') return null
  
  if (ipfsUrl.startsWith('ipfs://')) {
    const ipfsHash = ipfsUrl.replace('ipfs://', '')
    return `https://api.universalprofile.cloud/ipfs/${ipfsHash}`
  }
  return ipfsUrl
}

export function useUniversalProfile(address) {
  const [currentProfile, setCurrentProfile] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!address || !isAddress(address)) {
      setCurrentProfile(null)
      setLoading(false)
      return
    }

    async function fetchProfile() {
      try {
        setLoading(true)
        console.log('Fetching Universal Profile for:', address)

        // Use RPC URL string - ERC725 accepts this format
        const rpcUrl = 'https://rpc.lukso.sigmacore.io'
        
        // Create ERC725 instance with RPC URL
        const erc725 = new ERC725(
          LSP3ProfileSchema,
          address,
          rpcUrl,
          {
            ipfsGateway: 'https://api.universalprofile.cloud/ipfs/',
          }
        )

        // Fetch LSP3Profile data - fetchData handles VerifiableURI automatically
        const profileData = await erc725.fetchData('LSP3Profile')
        console.log('Profile data fetched (full):', JSON.stringify(profileData, null, 2))
        console.log('Profile data value:', profileData?.value)
        console.log('Profile data value type:', typeof profileData?.value)

        // fetchData returns the decoded JSON when using VerifiableURI
        // Check if value exists and is not empty
        if (profileData && profileData.value && Object.keys(profileData.value).length > 0) {
          // fetchData automatically decodes VerifiableURI and returns the JSON
          let profileJson = profileData.value
          
          // If value is still a VerifiableURI object, extract the URL
          if (profileJson && typeof profileJson === 'object' && profileJson.url) {
            const url = convertIpfsUrl(profileJson.url) || profileJson.url
            console.log('Fetching profile JSON from:', url)
            
            try {
              const response = await fetch(url)
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
              }
              profileJson = await response.json()
              console.log('Profile JSON:', profileJson)
            } catch (err) {
              console.error('Error fetching profile JSON:', err)
              setCurrentProfile({
                address,
                name: null,
                profileImage: null,
              })
              return
            }
          } else if (typeof profileJson === 'string') {
            // If it's a string URL, fetch it
            const url = convertIpfsUrl(profileJson) || profileJson
            console.log('Fetching profile JSON from:', url)
            
            try {
              const response = await fetch(url)
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
              }
              profileJson = await response.json()
              console.log('Profile JSON:', profileJson)
            } catch (err) {
              console.error('Error fetching profile JSON:', err)
              setCurrentProfile({
                address,
                name: null,
                profileImage: null,
              })
              return
            }
          }
          
          // Handle different profile JSON structures
          const lsp3Profile = profileJson?.LSP3Profile || profileJson
          
          if (lsp3Profile) {
            const name = lsp3Profile.name || null
            
            // Extract profile image - handle multiple formats
            let profileImage = null
            
            if (lsp3Profile.profileImage) {
              if (Array.isArray(lsp3Profile.profileImage) && lsp3Profile.profileImage.length > 0) {
                // Array format: [{ url: '...', width: ..., height: ... }]
                const firstImage = lsp3Profile.profileImage[0]
                profileImage = firstImage?.url || firstImage
              } else if (typeof lsp3Profile.profileImage === 'string') {
                profileImage = lsp3Profile.profileImage
              } else if (lsp3Profile.profileImage?.url) {
                profileImage = lsp3Profile.profileImage.url
              }
            }

            // Convert IPFS image URLs
            profileImage = convertIpfsUrl(profileImage)

            console.log('Extracted profile:', { name, profileImage })

            setCurrentProfile({
              address,
              name,
              profileImage,
            })
          } else {
            console.warn('No LSP3Profile found in JSON:', profileJson)
            setCurrentProfile({
              address,
              name: null,
              profileImage: null,
            })
          }
        } else {
          console.warn('No profile data value found:', profileData)
          setCurrentProfile({
            address,
            name: null,
            profileImage: null,
          })
        }
      } catch (error) {
        console.error('Error fetching Universal Profile:', error)
        setCurrentProfile({
          address,
          name: null,
          profileImage: null,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [address])

  return { currentProfile, loading }
}

