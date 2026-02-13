import productsFallback from '../assets/images/hero/page-hero.jpg'
import productsMobileAvif from '../assets/images/hero/page-hero-400.avif'
import productsMobileWebp from '../assets/images/hero/page-hero-400.webp'
import productsTabletAvif from '../assets/images/hero/page-hero-768.avif'
import productsTabletWebp from '../assets/images/hero/page-hero-768.webp'
import productsDesktopAvif from '../assets/images/hero/page-hero-1200.avif'
import productsDesktopWebp from '../assets/images/hero/page-hero-1200.webp'

export const heroImages = {
  products: {
    id: 'products',
    alt: 'Photo by Pramod  Tiwari',
    fallback: productsFallback,
    mobile: {
      avif: productsMobileAvif,
      webp: productsMobileWebp
    },
    tablet: {
      avif: productsTabletAvif,
      webp: productsTabletWebp
    },
    desktop: {
      avif: productsDesktopAvif,
      webp: productsDesktopWebp
    }
  }
}
