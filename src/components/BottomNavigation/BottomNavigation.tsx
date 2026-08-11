import { AppIcon } from '../AppIcon/AppIcon'
import { WeatherIcon } from '../WeatherIcon/WeatherIcon'
import type { WeatherIconName } from '../WeatherIcon/weatherIcons'
import { WeatherLogo } from '../WeatherLogo/WeatherLogo'
import styles from './BottomNavigation.module.scss'

export type MainTab = 'weather' | 'discover' | 'my'

type BottomNavigationProps = {
  activeTab: MainTab
  weatherIcon: WeatherIconName
  onChange: (tab: MainTab) => void
}

export function BottomNavigation({
  activeTab,
  weatherIcon,
  onChange,
}: BottomNavigationProps) {
  return (
    <nav className={styles.navigation} aria-label="주요 메뉴">
      <button
        className={styles.item}
        type="button"
        aria-current={activeTab === 'weather' ? 'page' : undefined}
        onClick={() => onChange('weather')}
      >
        <WeatherLogo color="black" size="small" decorative />
        <span>날씨</span>
      </button>

      <button
        className={`${styles.item} ${styles.featured}`}
        type="button"
        aria-current={activeTab === 'discover' ? 'page' : undefined}
        onClick={() => onChange('discover')}
      >
        <span className={styles.weatherIcon} key={weatherIcon}>
          <WeatherIcon name={weatherIcon} size="small" decorative />
        </span>
        <span>추천</span>
      </button>

      <button
        className={styles.item}
        type="button"
        aria-current={activeTab === 'my' ? 'page' : undefined}
        onClick={() => onChange('my')}
      >
        <AppIcon name="face" size="large" decorative />
        <span>마이</span>
      </button>
    </nav>
  )
}
