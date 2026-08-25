import { appIcons } from './icons'
import type { AppIconName } from './icons'
import styles from './AppIcon.module.scss'

type AppIconProps = {
  name: AppIconName
  label?: string
  className?: string
}

export function AppIcon({ name, label, className }: AppIconProps) {
  const classNames = className ? `${styles.icon} ${className}` : styles.icon

  return <img className={classNames} src={appIcons[name]} alt={label ?? ''} />
}
