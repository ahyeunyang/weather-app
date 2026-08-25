import { getWeatherBackground, getWeatherBackgroundVideo } from '../../utils/weatherBackground'
import styles from './WeatherBackgroundVideo.module.scss'

type WeatherBackgroundVideoProps = {
  weatherCode: number
  className?: string
}

export function WeatherBackgroundVideo({
  weatherCode,
  className,
}: WeatherBackgroundVideoProps) {
  const background = getWeatherBackground(weatherCode)
  const videoClassName = className ? `${styles.video} ${className}` : styles.video

  return (
    <video
      key={background}
      className={videoClassName}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    >
      <source src={getWeatherBackgroundVideo(weatherCode)} type="video/mp4" />
    </video>
  )
}
