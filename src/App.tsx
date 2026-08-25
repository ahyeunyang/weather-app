import { useEffect, useState } from 'react'
import { ShoppingPage } from './pages/ShoppingPage/ShoppingPage'
import { SplashPage } from './pages/SplashPage/SplashPage'

function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true)

  useEffect(() => {
    const splashTimer = window.setTimeout(() => {
      setIsSplashVisible(false)
    }, 2200)

    return () => window.clearTimeout(splashTimer)
  }, [])

  return isSplashVisible ? <SplashPage /> : <ShoppingPage />
}

export default App
