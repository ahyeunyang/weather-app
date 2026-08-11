import styles from './AppIcon.module.scss'
import { appIcons } from './appIcons'
import type { AppIconName } from './appIcons'

export type AppIconSize = 'small' | 'medium' | 'large'

type AppIconProps = {
  name: AppIconName
  size?: AppIconSize
  alt?: string
  decorative?: boolean
  className?: string
}

export function AppIcon({
  name,
  size = 'medium',
  alt,
  decorative = false,
  className,
}: AppIconProps) {
  const icon = appIcons[name]
  const classNames = [styles.icon, styles[size], className]
    .filter(Boolean)
    .join(' ')

  return (
    <svg
      className={classNames}
      viewBox={icon.viewBox}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : (alt ?? icon.label)}
      aria-hidden={decorative || undefined}
      focusable="false"
    >
      <path d={icon.path} fill="currentColor" />
    </svg>
  )
}
