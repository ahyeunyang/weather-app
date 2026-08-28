import { useEffect, useRef, useState } from 'react'
import styles from './BottomNavigation.module.scss'

export type BottomNavigationItem = 'weather' | 'shopping' | 'mypage'
type BottomNavigationProps = { activeItem: BottomNavigationItem }
const items: Array<{ id: BottomNavigationItem; label: string }> = [{ id: 'shopping', label: '쇼핑' }, { id: 'weather', label: '날씨' }, { id: 'mypage', label: '마이페이지' }]

export function BottomNavigation({ activeItem }: BottomNavigationProps) {
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    lastScrollY.current = window.scrollY

    const handleScroll = () => {
      const currentScrollY = Math.max(window.scrollY, 0)
      const scrollDifference = currentScrollY - lastScrollY.current

      if (currentScrollY === 0) {
        setIsVisible(true)
      } else if (Math.abs(scrollDifference) >= 4) {
        setIsVisible(scrollDifference < 0)
        lastScrollY.current = currentScrollY
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const className = `${styles.navigation} ${isVisible ? '' : styles.hidden}`.trim()

  return <nav className={className} aria-label="주요 메뉴" aria-hidden={!isVisible}>{items.map((item) => <a key={item.id} className={item.id === activeItem ? styles.active : undefined} href={`#${item.id}`} aria-current={item.id === activeItem ? 'page' : undefined} tabIndex={isVisible ? undefined : -1}><span className={`${styles.icon} ${styles[item.id]}`} aria-hidden="true" /><span className={styles.label}>{item.label}</span></a>)}</nav>
}
