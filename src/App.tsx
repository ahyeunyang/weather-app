import { useEffect, useState } from 'react'
import { BottomNavigation } from './components/BottomNavigation/BottomNavigation'
import type { MainTab } from './components/BottomNavigation/BottomNavigation'
import { mockWeather, weatherConditionIcons } from './data/mockWeather'
import { DiscoverPage } from './pages/DiscoverPage/DiscoverPage'
import { MyPage } from './pages/MyPage/MyPage'
import { SplashPage } from './pages/SplashPage/SplashPage'
import { WeatherPage } from './pages/WeatherPage/WeatherPage'

const splashDuration = 2200

function getInitialTab(): MainTab {
  if (!import.meta.env.DEV) {
    return 'weather'
  }

  const requestedTab = new URLSearchParams(window.location.search).get('tab')

  if (requestedTab === 'discover' || requestedTab === 'my') {
    return requestedTab
  }

  return 'weather'
}

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [activeTab, setActiveTab] = useState<MainTab>(getInitialTab)
  const weatherIcon = weatherConditionIcons[mockWeather.condition]

  useEffect(() => {
    const timer = window.setTimeout(() => setShowSplash(false), splashDuration)

    return () => window.clearTimeout(timer)
  }, [])

  if (showSplash) {
    return <SplashPage />
  }

  return (
    <>
      {activeTab === 'weather' && <WeatherPage weatherIcon={weatherIcon} />}
      {activeTab === 'discover' && (
        <DiscoverPage weatherIcon={weatherIcon} />
      )}
      {activeTab === 'my' && <MyPage />}
      <BottomNavigation
        activeTab={activeTab}
        weatherIcon={weatherIcon}
        onChange={setActiveTab}
      />
    </>
  )
}

export default App
