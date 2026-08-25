import styles from './WeatherIcon.module.scss'
import { weatherIcons } from './weatherIcons'
import type { WeatherIconName } from './weatherIcons'

export type WeatherIconSize = 'small' | 'medium' | 'large' | 'hero'

type WeatherIconProps = {
  name: WeatherIconName
  size?: WeatherIconSize
  alt?: string
  decorative?: boolean
  className?: string
}

export function WeatherIcon({
  name,
  size = 'medium',
  alt,
  decorative = false,
  className,
}: WeatherIconProps) {
  const icon = weatherIcons[name]
  const classNames = [styles.icon, styles[size], className]
    .filter(Boolean)
    .join(' ')

  return (
    <img
      className={classNames}
      src={icon.src}
      alt={decorative ? '' : (alt ?? icon.label)}
      aria-hidden={decorative || undefined}
    />
  )
}
