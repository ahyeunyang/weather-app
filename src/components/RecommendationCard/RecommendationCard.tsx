import { AppIcon } from '../AppIcon/AppIcon'
import { WeatherIcon } from '../WeatherIcon/WeatherIcon'
import type { WeatherIconName } from '../WeatherIcon/weatherIcons'
import styles from './RecommendationCard.module.scss'

export type RecommendationTone = 'shop' | 'eat' | 'play'

export type RecommendationItem = {
  id: string
  icon: WeatherIconName
  brand: string
  title: string
  price: string
  originalPrice?: string
  badge: string
}

type RecommendationCardProps = {
  item: RecommendationItem
  tone: RecommendationTone
  favorite: boolean
  onToggleFavorite: (id: string) => void
}

export function RecommendationCard({
  item,
  tone,
  favorite,
  onToggleFavorite,
}: RecommendationCardProps) {
  return (
    <article className={`${styles.card} ${styles[tone]}`}>
      <div className={styles.thumbnail}>
        <span className={styles.badge}>{item.badge}</span>
        <WeatherIcon name={item.icon} size="large" decorative />
        <button
          type="button"
          className={styles.favorite}
          aria-label={favorite ? `${item.title} 찜 해제` : `${item.title} 찜하기`}
          aria-pressed={favorite}
          onClick={() => onToggleFavorite(item.id)}
        >
          <AppIcon
            name={favorite ? 'favoriteFill' : 'favorite'}
            decorative
          />
        </button>
      </div>

      <div className={styles.content}>
        <span className={styles.brand}>{item.brand}</span>
        <h3>{item.title}</h3>
        {item.originalPrice && (
          <span className={styles.originalPrice}>{item.originalPrice}</span>
        )}
        <strong>{item.price}</strong>
        <span className={styles.arrow} aria-hidden="true">
          <AppIcon name="arrowForward" size="small" decorative />
        </span>
      </div>
    </article>
  )
}
