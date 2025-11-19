import { useChainId } from 'wagmi'
import Blockies from 'react-blockies'
import { useUniversalProfile } from '../hooks/useUniversalProfile'

export function CustomAvatar({ address, ensImage, size }) {
  const chainId = useChainId()
  const { currentProfile } = useUniversalProfile(chainId === 42 ? address : null)
  
  // Use Universal Profile image if available on LUKSO
  const profileImage = chainId === 42 && currentProfile?.profileImage 
    ? currentProfile.profileImage 
    : ensImage

  if (profileImage && profileImage.length > 0) {
    return (
      <>
        <img
          src={profileImage}
          alt="Profile"
          width={size}
          height={size}
          style={{
            borderRadius: '50%',
            objectFit: 'cover',
            display: 'block',
          }}
          onError={(e) => {
            e.target.style.display = 'none'
            if (e.target.nextSibling) {
              e.target.nextSibling.style.display = 'block'
            }
          }}
        />
        <div style={{ display: 'none' }}>
          <Blockies
            seed={address || '0x000000'}
            size={9}
            color="#357dc0"
            bgColor="#afe0f5"
            spotColor="#254a87"
            style={{
              width: size,
              height: size,
              borderRadius: '50%',
            }}
          />
        </div>
      </>
    )
  }

  // Fallback to Blockies
  return (
    <Blockies
      seed={address || '0x000000'}
      size={9}
      color="#357dc0"
      bgColor="#afe0f5"
      spotColor="#254a87"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
      }}
    />
  )
}

