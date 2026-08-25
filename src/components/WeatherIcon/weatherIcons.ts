export const weatherIcons = {
  sunny: {
    src: '/weather-icons/01_sunny.svg',
    label: '맑음',
  },
  clearNight: {
    src: '/weather-icons/02_clear-night.svg',
    label: '맑은 밤',
  },
  cloudy: {
    src: '/weather-icons/03_cloudy.svg',
    label: '흐림',
  },
  snowflake: {
    src: '/weather-icons/04_snowflake.svg',
    label: '눈',
  },
  rain: {
    src: '/weather-icons/05_rain.svg',
    label: '비',
  },
  lightning: {
    src: '/weather-icons/06_lightning.svg',
    label: '번개',
  },
  wind: {
    src: '/weather-icons/07_wind.svg',
    label: '바람',
  },
  rainbow: {
    src: '/weather-icons/08_rainbow.svg',
    label: '무지개',
  },
  partlyCloudyDay: {
    src: '/weather-icons/09_partly-cloudy-day.svg',
    label: '구름 조금인 낮',
  },
  partlyCloudyNight: {
    src: '/weather-icons/10_partly-cloudy-night.svg',
    label: '구름 조금인 밤',
  },
  snowCloud: {
    src: '/weather-icons/11_snow-cloud.svg',
    label: '눈구름',
  },
  rainCloud: {
    src: '/weather-icons/12_rain-cloud.svg',
    label: '비구름',
  },
  fogCloud: {
    src: '/weather-icons/13_fog-cloud.svg',
    label: '안개 낀 구름',
  },
  sleetCloud: {
    src: '/weather-icons/14_sleet-cloud.svg',
    label: '진눈깨비',
  },
  thunderstorm: {
    src: '/weather-icons/15_thunderstorm.svg',
    label: '뇌우',
  },
  snowWind: {
    src: '/weather-icons/16_snow-wind.svg',
    label: '눈보라',
  },
  sunFog: {
    src: '/weather-icons/17_sun-fog.svg',
    label: '햇빛과 안개',
  },
  sunShower: {
    src: '/weather-icons/18_sun-shower.svg',
    label: '여우비',
  },
  sunLightning: {
    src: '/weather-icons/19_sun-lightning.svg',
    label: '햇빛과 번개',
  },
  moonRain: {
    src: '/weather-icons/20_moon-rain.svg',
    label: '밤비',
  },
  sunSnow: {
    src: '/weather-icons/21_sun-snow.svg',
    label: '햇빛과 눈',
  },
  moonSnow: {
    src: '/weather-icons/22_moon-snow.svg',
    label: '밤눈',
  },
  umbrella: {
    src: '/weather-icons/23_umbrella.svg',
    label: '우산',
  },
  rainyUmbrella: {
    src: '/weather-icons/24_rainy-umbrella.svg',
    label: '비 오는 날의 우산',
  },
  snowyUmbrella: {
    src: '/weather-icons/25_snowy-umbrella.svg',
    label: '눈 오는 날의 우산',
  },
  sunnyUmbrella: {
    src: '/weather-icons/26_sunny-umbrella.svg',
    label: '맑은 날의 우산',
  },
  hotThermometer: {
    src: '/weather-icons/27_hot-thermometer.svg',
    label: '더운 날씨',
  },
  coldThermometer: {
    src: '/weather-icons/28_cold-thermometer.svg',
    label: '추운 날씨',
  },
  warmThermometer: {
    src: '/weather-icons/29_warm-thermometer.svg',
    label: '따뜻한 날씨',
  },
} as const

export type WeatherIconName = keyof typeof weatherIcons
