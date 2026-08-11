import styles from './WeatherLogo.module.scss'

export type WeatherLogoColor = 'black' | 'white'
export type WeatherLogoSize = 'small' | 'medium' | 'large'

const logoSources: Record<WeatherLogoColor, string> = {
  black: '/logos/weather-logo-black-fixed-v2.svg',
  white: '/logos/weather-logo-white-fixed-v2.svg',
}

type WeatherLogoProps = {
  color?: WeatherLogoColor
  size?: WeatherLogoSize
  alt?: string
  decorative?: boolean
  className?: string
}

export function WeatherLogo({
  color = 'black',
  size = 'medium',
  alt = 'Weddddy',
  decorative = false,
  className,
}: WeatherLogoProps) {
  const classNames = [styles.logo, styles[size], className]
    .filter(Boolean)
    .join(' ')

  return (
    <img
      className={classNames}
      src={logoSources[color]}
      alt={decorative ? '' : alt}
      aria-hidden={decorative || undefined}
    />
  )
}
