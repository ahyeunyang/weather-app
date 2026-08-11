import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.weathercharacter.app',
  appName: 'Weddddy',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchShowDuration: 1200,
      launchAutoHide: true,
      backgroundColor: '#EAF6FFFF',
      showSpinner: false,
    },
  },
}

export default config
