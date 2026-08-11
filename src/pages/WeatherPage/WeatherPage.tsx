import { AppIcon } from '../../components/AppIcon/AppIcon'
import { CharacterGroup } from '../../components/CharacterGroup/CharacterGroup'
import { WeatherIcon } from '../../components/WeatherIcon/WeatherIcon'
import type { WeatherIconName } from '../../components/WeatherIcon/weatherIcons'
import { mockWeather } from '../../data/mockWeather'
import styles from './WeatherPage.module.scss'

type WeatherPageProps = {
  weatherIcon: WeatherIconName
}

export function WeatherPage({ weatherIcon }: WeatherPageProps) {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.date}>
            <strong>오늘</strong>
            <span>{mockWeather.dateLabel}</span>
            <AppIcon name="arrowDown" size="small" decorative />
          </div>

          <div className={styles.actions}>
            <button type="button" aria-label="날씨 공유">
              <AppIcon name="arrowOutward" size="small" decorative />
            </button>
            <button type="button" aria-label="지역 추가">
              <AppIcon name="add" size="large" decorative />
            </button>
          </div>
        </header>

        <section className={styles.summary} aria-labelledby="today-weather">
          <div>
            <div className={styles.temperatureRow}>
              <h1 id="today-weather">{mockWeather.temperature}</h1>
              <span>°</span>
              <small>
                <AppIcon name="arrowUp" size="small" decorative />
                {mockWeather.temperatureChange}°
              </small>
            </div>
            <div className={styles.range}>
              <span>{mockWeather.minimumTemperature}°</span>
              <span>{mockWeather.maximumTemperature}°</span>
            </div>
          </div>

          <div className={styles.airQuality} aria-label="대기질">
            <span>미세 {mockWeather.fineDust}</span>
            <span>초미세 {mockWeather.ultraFineDust}</span>
          </div>
        </section>

        <section className={styles.currentCondition}>
          <WeatherIcon name={weatherIcon} size="medium" decorative />
          <p>
            <span aria-hidden="true">◆</span> {mockWeather.location}{' '}
            <strong>{mockWeather.conditionLabel}</strong>
          </p>
          <time>{mockWeather.updatedAt}</time>
        </section>

        <section className={styles.characterScene} aria-label="오늘의 날씨 이야기">
          <CharacterGroup className={styles.characters} />
          <p>{mockWeather.message}</p>
        </section>

        <a className={styles.moreLink} href="#weather-details">
          날씨 더보기 <AppIcon name="arrowDown" size="small" decorative />
        </a>

        <section
          className={styles.details}
          id="weather-details"
          aria-label="오늘의 상세 날씨"
        >
          <article>
            <span>체감온도</span>
            <strong>30°</strong>
          </article>
          <article>
            <span>강수확률</span>
            <strong>10%</strong>
          </article>
          <article>
            <span>바람</span>
            <strong>2.4m/s</strong>
          </article>
        </section>
      </div>
    </main>
  )
}
