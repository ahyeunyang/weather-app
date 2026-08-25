import { CharacterStage } from '../../components/CharacterStage/CharacterStage'
import { WeatherLogo } from '../../components/WeatherLogo/WeatherLogo'
import styles from './SplashPage.module.scss'

export function SplashPage() {
  return (
    <main className={styles.page}>
      <div className={styles.glow} aria-hidden="true" />

      <header className={styles.header}>
        <span className={styles.badge}>
          <WeatherLogo color="black" size="small" decorative />
          <span>Weather Character</span>
        </span>
        <span className={styles.status}>환경 설정 완료</span>
      </header>

      <section className={styles.intro}>
        <CharacterStage />

        <div className={styles.copy}>
          <p className={styles.eyebrow}>오늘의 날씨를 만나는 새로운 방법</p>
          <h1>3D 캐릭터가 들어갈 준비가 되었어요.</h1>
          <p className={styles.description}>
            이 도형은 임시 캐릭터입니다. 준비한 GLB 파일을
            <code>public/models</code>에 넣고 교체하면 됩니다.
          </p>
        </div>
      </section>
    </main>
  )
}
