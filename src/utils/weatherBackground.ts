export type WeatherBackground = 'sunny' | 'cloudy' | 'rain' | 'snow'

const weatherBackgroundVideos: Record<WeatherBackground, string> = {
  sunny: '/videos/auth/sunny.mp4',
  cloudy: '/videos/auth/cloudy.mp4',
  rain: '/videos/auth/rain.mp4',
  snow: '/videos/auth/snow.mp4',
}

export function getWeatherBackground(weatherCode: number): WeatherBackground {
  if (weatherCode === 0) {
    return 'sunny'
  }

  if ([1, 2, 3, 45, 48].includes(weatherCode)) {
    return 'cloudy'
  }

  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
    return 'snow'
  }

  if (
    ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99] as number[]).includes(
      weatherCode,
    )
  ) {
    return 'rain'
  }

  return 'cloudy'
}

export function getWeatherBackgroundVideo(weatherCode: number) {
  return weatherBackgroundVideos[getWeatherBackground(weatherCode)]
}
