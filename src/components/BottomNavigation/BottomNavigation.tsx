import { useEffect, useRef, useState } from 'react'
import styles from './BottomNavigation.module.scss'

export type BottomNavigationItem = 'weather' | 'shopping' | 'mypage'

type BottomNavigationProps = {
  activeItem: BottomNavigationItem
}

const items: Array<{ id: BottomNavigationItem; label: string }> = [
  { id: 'weather', label: '날씨' },
  { id: 'shopping', label: '쇼핑' },
  { id: 'mypage', label: '마이페이지' },
]

export function BottomNavigation({ activeItem }: BottomNavigationProps) {
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollPosition = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY
      const scrollDifference = currentScrollPosition - lastScrollPosition.current

      if (currentScrollPosition <= 0) {
        setIsVisible(true)
      } else if (scrollDifference > 4) {
        setIsVisible(false)
      } else if (scrollDifference < -4) {
        setIsVisible(true)
      }

      lastScrollPosition.current = currentScrollPosition
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`${styles.navigation} ${isVisible ? '' : styles.hidden}`}
      aria-label="주요 메뉴"
    >
      {items.map((item) => {
        const isActive = item.id === activeItem

        return (
          <a
            key={item.id}
            className={isActive ? styles.active : undefined}
            href={`#${item.id}`}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className={styles.iconPlaceholder} aria-hidden="true" />
            <span>{item.label}</span>
          </a>
        )
      })}
    </nav>
  )
}
