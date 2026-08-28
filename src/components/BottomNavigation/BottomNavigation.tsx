import styles from './BottomNavigation.module.scss'

export type BottomNavigationItem = 'weather' | 'shopping' | 'mypage'
type BottomNavigationProps = { activeItem: BottomNavigationItem }
const items: Array<{ id: BottomNavigationItem; label: string }> = [{ id: 'shopping', label: '쇼핑' }, { id: 'weather', label: '날씨' }, { id: 'mypage', label: '마이페이지' }]

export function BottomNavigation({ activeItem }: BottomNavigationProps) {
  return <nav className={styles.navigation} aria-label="주요 메뉴">{items.map((item) => <a key={item.id} className={item.id === activeItem ? styles.active : undefined} href={`#${item.id}`} aria-current={item.id === activeItem ? 'page' : undefined}><span className={`${styles.icon} ${styles[item.id]}`} aria-hidden="true" /><span className={styles.label}>{item.label}</span></a>)}</nav>
}
