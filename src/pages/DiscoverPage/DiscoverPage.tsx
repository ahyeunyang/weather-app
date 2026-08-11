import { useState } from 'react'
import { AppIcon } from '../../components/AppIcon/AppIcon'
import { RecommendationCard } from '../../components/RecommendationCard/RecommendationCard'
import type {
  RecommendationItem,
  RecommendationTone,
} from '../../components/RecommendationCard/RecommendationCard'
import { WeatherIcon } from '../../components/WeatherIcon/WeatherIcon'
import type { WeatherIconName } from '../../components/WeatherIcon/weatherIcons'
import { mockWeather } from '../../data/mockWeather'
import styles from './DiscoverPage.module.scss'

type DiscoverCategory = RecommendationTone

type CategoryContent = {
  promo: string
  quickLinks: Array<{ label: string; icon: WeatherIconName }>
  products: RecommendationItem[]
}

const categories: Array<{ id: DiscoverCategory; label: string }> = [
  { id: 'shop', label: '사러' },
  { id: 'eat', label: '먹으러' },
  { id: 'play', label: '놀러' },
]

const categoryContent: Record<DiscoverCategory, CategoryContent> = {
  shop: {
    promo: '맑은 날 준비물, 지금 한 번에 살펴보세요.',
    quickLinks: [
      { label: '햇빛 차단', icon: 'sunnyUmbrella' },
      { label: '비 준비', icon: 'rainyUmbrella' },
      { label: '더위 대비', icon: 'hotThermometer' },
      { label: '간절기', icon: 'warmThermometer' },
    ],
    products: [
      {
        id: 'shop-hat',
        icon: 'sunnyUmbrella',
        brand: 'WEDDDY SELECT',
        title: '가볍게 챙기는 자외선 차단 모자',
        originalPrice: '32,000원',
        price: '24,900원',
        badge: '오늘 추천',
      },
      {
        id: 'shop-fan',
        icon: 'hotThermometer',
        brand: 'COOL DAY',
        title: '주머니에 쏙 들어가는 휴대용 선풍기',
        price: '19,800원',
        badge: '인기',
      },
      {
        id: 'shop-umbrella',
        icon: 'umbrella',
        brand: 'DAILY WEATHER',
        title: '햇빛과 소나기를 함께 막는 미니 우산',
        originalPrice: '28,000원',
        price: '21,000원',
        badge: '무료배송',
      },
      {
        id: 'shop-bottle',
        icon: 'warmThermometer',
        brand: 'PICNIC CLUB',
        title: '산책할 때 들기 좋은 작은 보냉 텀블러',
        price: '17,500원',
        badge: '신상품',
      },
      {
        id: 'shop-raincoat',
        icon: 'rainyUmbrella',
        brand: 'RAIN READY',
        title: '갑작스러운 비에도 가벼운 레인 재킷',
        price: '39,000원',
        badge: '장마 준비',
      },
      {
        id: 'shop-cold',
        icon: 'coldThermometer',
        brand: 'SEASON BASIC',
        title: '쌀쌀한 저녁을 위한 얇은 바람막이',
        originalPrice: '54,000원',
        price: '45,900원',
        badge: '간절기',
      },
    ],
  },
  eat: {
    promo: '현재 날씨에 잘 어울리는 메뉴를 만나보세요.',
    quickLinks: [
      { label: '시원한 메뉴', icon: 'snowflake' },
      { label: '카페', icon: 'sunShower' },
      { label: '저녁 식사', icon: 'clearNight' },
      { label: '제철 메뉴', icon: 'rainbow' },
    ],
    products: [
      {
        id: 'eat-noodle',
        icon: 'snowflake',
        brand: '오늘의 한 그릇',
        title: '더위를 식혀주는 시원한 메밀국수',
        price: '12,000원',
        badge: '점심 추천',
      },
      {
        id: 'eat-cafe',
        icon: 'sunShower',
        brand: '창가 좋은 카페',
        title: '햇살을 보며 쉬어가는 아이스 음료 세트',
        originalPrice: '14,000원',
        price: '11,500원',
        badge: '가까운 곳',
      },
      {
        id: 'eat-fruit',
        icon: 'rainbow',
        brand: 'SEASON TABLE',
        title: '제철 과일을 가득 담은 산뜻한 디저트',
        price: '9,800원',
        badge: '신메뉴',
      },
      {
        id: 'eat-night',
        icon: 'clearNight',
        brand: '저녁의 식탁',
        title: '선선한 저녁에 즐기는 야외 다이닝',
        price: '29,000원',
        badge: '예약 가능',
      },
      {
        id: 'eat-warm',
        icon: 'warmThermometer',
        brand: 'COMFORT FOOD',
        title: '비 온 뒤 생각나는 따뜻한 수프와 빵',
        price: '13,500원',
        badge: '편안한 메뉴',
      },
      {
        id: 'eat-rain',
        icon: 'rainCloud',
        brand: 'RAINY KITCHEN',
        title: '빗소리와 잘 어울리는 바삭한 전 한 상',
        price: '18,000원',
        badge: '비 오는 날',
      },
    ],
  },
  play: {
    promo: '오늘의 하늘과 어울리는 나들이를 시작해보세요.',
    quickLinks: [
      { label: '야외 산책', icon: 'partlyCloudyDay' },
      { label: '바람 좋은 곳', icon: 'wind' },
      { label: '전시·공연', icon: 'rainbow' },
      { label: '야간 명소', icon: 'clearNight' },
    ],
    products: [
      {
        id: 'play-river',
        icon: 'partlyCloudyDay',
        brand: 'WEDDDY COURSE',
        title: '바람을 따라 걷는 한강 산책 코스',
        price: '무료',
        badge: '야외 활동',
      },
      {
        id: 'play-exhibit',
        icon: 'rainbow',
        brand: '도심 속 전시',
        title: '햇빛이 강한 오후에 즐기는 작은 전시',
        originalPrice: '18,000원',
        price: '15,000원',
        badge: '실내 추천',
      },
      {
        id: 'play-picnic',
        icon: 'sunny',
        brand: 'PICNIC DAY',
        title: '노을이 시작될 때 떠나는 가벼운 피크닉',
        price: '8,000원',
        badge: '오늘 가능',
      },
      {
        id: 'play-night',
        icon: 'clearNight',
        brand: 'NIGHT WALK',
        title: '달빛 아래 천천히 걷는 야간 명소',
        price: '무료',
        badge: '저녁 추천',
      },
      {
        id: 'play-wind',
        icon: 'wind',
        brand: 'WIND CLUB',
        title: '바람 좋은 날 즐기는 자전거 대여권',
        price: '6,000원',
        badge: '활동 추천',
      },
      {
        id: 'play-indoor',
        icon: 'cloudy',
        brand: 'CLOUDY PLAN',
        title: '흐린 날에도 즐거운 실내 체험 공간',
        originalPrice: '25,000원',
        price: '21,000원',
        badge: '날씨 무관',
      },
    ],
  },
}

type DiscoverPageProps = {
  weatherIcon: WeatherIconName
}

export function DiscoverPage({ weatherIcon }: DiscoverPageProps) {
  const [activeCategory, setActiveCategory] =
    useState<DiscoverCategory>('shop')
  const [favorites, setFavorites] = useState<Set<string>>(() => new Set())
  const content = categoryContent[activeCategory]

  const toggleFavorite = (id: string) => {
    setFavorites((current) => {
      const next = new Set(current)

      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }

      return next
    })
  }

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.tabs} role="tablist" aria-label="추천 분류">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>

          <button className={styles.search} type="button" aria-label="추천 검색">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="5.5" />
              <path d="m15 15 4.25 4.25" />
            </svg>
          </button>
        </header>

        <section className={styles.hero}>
          <div>
            <span>WEATHER PICK</span>
            <h1>햇살 많은 지금 날씨엔?</h1>
            <p>오늘 날씨와 잘 어울리는 선택을 모았어요.</p>
            <button type="button">
              추천 보기
              <AppIcon name="arrowForward" size="small" decorative />
            </button>
          </div>
          <WeatherIcon name={weatherIcon} size="hero" decorative />
        </section>

        <section className={styles.quickSection} aria-label="빠른 추천 분류">
          <div className={styles.sectionTitle}>
            <div>
              <span>{mockWeather.location}</span>
              <h2>지금 많이 찾는 추천</h2>
            </div>
            <span>{mockWeather.conditionLabel}</span>
          </div>

          <div className={styles.quickLinks}>
            {content.quickLinks.map((link) => (
              <button key={link.label} type="button">
                <span>
                  <WeatherIcon name={link.icon} size="medium" decorative />
                </span>
                {link.label}
              </button>
            ))}
          </div>
        </section>

        <aside className={styles.promotion}>
          <AppIcon name="campaign" decorative />
          <p>{content.promo}</p>
          <AppIcon name="arrowForward" size="small" decorative />
        </aside>

        <section className={styles.productSection}>
          <div className={styles.productHeader}>
            <div>
              <span>FOR TODAY</span>
              <h2>날씨 맞춤 추천</h2>
            </div>
            <span>{content.products.length}개</span>
          </div>

          <div className={styles.productGrid} aria-live="polite">
            {content.products.map((item) => (
              <RecommendationCard
                key={item.id}
                item={item}
                tone={activeCategory}
                favorite={favorites.has(item.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
