import placeholderFallback from '../assets/images/placeholder/placeholder.jpg'
import placeholderMobileAvif from '../assets/images/placeholder/placeholder-400.avif'
import placeholderMobileWebp from '../assets/images/placeholder/placeholder-400.webp'
import placeholderTabletAvif from '../assets/images/placeholder/placeholder-768.avif'
import placeholderTabletWebp from '../assets/images/placeholder/placeholder-768.webp'
import placeholderDesktopAvif from '../assets/images/placeholder/placeholder-1200.avif'
import placeholderDesktopWebp from '../assets/images/placeholder/placeholder-1200.webp'

export const placeholderImages = {
  placeholder: {
    id: 'placeholder',
    alt: 'Photo by Pachon in Motion',
    fallback: placeholderFallback,
    mobile: {
      avif: placeholderMobileAvif,
      webp: placeholderMobileWebp
    },
    tablet: {
      avif: placeholderTabletAvif,
      webp: placeholderTabletWebp
    },
    desktop: {
      avif: placeholderDesktopAvif,
      webp: placeholderDesktopWebp
    }
  }
}
