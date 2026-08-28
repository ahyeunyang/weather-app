import styles from './WeatherLogo.module.scss'

export type WeatherLogoColor = 'black' | 'white'
export type WeatherLogoSize = 'small' | 'medium' | 'large'

const logoSources: Record<WeatherLogoColor, string> = {
  black: '/logos/weddy-logo.svg',
  white: '/logos/weddy-logo.svg',
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
  alt = 'Weddy',
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
