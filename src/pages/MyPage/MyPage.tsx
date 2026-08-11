import { AppIcon } from '../../components/AppIcon/AppIcon'
import type { AppIconName } from '../../components/AppIcon/appIcons'
import { WeatherLogo } from '../../components/WeatherLogo/WeatherLogo'
import styles from './MyPage.module.scss'

const settings: Array<{ label: string; value: string; icon: AppIconName }> = [
  { label: '저장한 추천', value: '3개', icon: 'favorite' },
  { label: '기본 지역', value: '마포구 창전동', icon: 'face' },
  { label: '날씨 알림', value: '켜짐', icon: 'campaign' },
  { label: '앱 설정', value: '', icon: 'settings' },
  { label: '도움말', value: '', icon: 'help' },
]

export function MyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <header>
          <span>MY WEDDDDY</span>
          <h1>마이페이지</h1>
        </header>

        <section className={styles.profile} aria-label="사용자 정보">
          <div className={styles.avatar}>
            <WeatherLogo color="white" size="medium" decorative />
          </div>
          <div>
            <h2>오늘도 반가워요</h2>
            <p>나에게 꼭 맞는 날씨와 추천을 모아볼게요.</p>
          </div>
        </section>

        <section className={styles.settings} aria-label="마이 메뉴">
          {settings.map((setting) => (
            <button key={setting.label} type="button">
              <span className={styles.settingLabel}>
                <AppIcon name={setting.icon} decorative />
                {setting.label}
              </span>
              <span className={styles.settingValue}>
                {setting.value}
                <AppIcon name="arrowForward" size="small" decorative />
              </span>
            </button>
          ))}
        </section>
      </div>
    </main>
  )
}
