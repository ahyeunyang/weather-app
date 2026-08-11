import type { WeatherIconName } from '../components/WeatherIcon/weatherIcons'

export type WeatherCondition =
  | 'sunny'
  | 'clearNight'
  | 'partlyCloudyDay'
  | 'partlyCloudyNight'
  | 'cloudy'
  | 'rain'
  | 'snow'
  | 'thunderstorm'
  | 'unknown'

export const weatherConditionIcons: Record<
  WeatherCondition,
  WeatherIconName
> = {
  sunny: 'sunny',
  clearNight: 'clearNight',
  partlyCloudyDay: 'partlyCloudyDay',
  partlyCloudyNight: 'partlyCloudyNight',
  cloudy: 'cloudy',
  rain: 'rainCloud',
  snow: 'snowCloud',
  thunderstorm: 'thunderstorm',
  unknown: 'cloudy',
}

export const mockWeather = {
  dateLabel: '8월 11일',
  location: '마포구 창전동',
  temperature: 29,
  temperatureChange: 2,
  minimumTemperature: 24,
  maximumTemperature: 31,
  condition: 'sunny' as WeatherCondition,
  conditionLabel: '맑음',
  fineDust: '좋음',
  ultraFineDust: '보통',
  updatedAt: '오전 11:06 업데이트',
  message: '햇살 좋은 날, 가벼운 산책은 어때요?',
}
