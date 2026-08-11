import { WeatherLogo } from '../../components/WeatherLogo/WeatherLogo'
import styles from './SplashPage.module.scss'

export function SplashPage() {
  return (
    <main className={styles.page}>
      <WeatherLogo className={styles.logo} color="white" size="large" />
    </main>
  )
}
