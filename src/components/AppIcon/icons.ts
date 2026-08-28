export const appIcons = {
  arrowDown: '/icons/ui/arrow-down.svg',
  arrowLeft: '/icons/ui/arrow-left.svg',
  arrowRight: '/icons/ui/arrow-right.svg?v=20260829',
  arrowUp: '/icons/ui/arrow-up.svg',
  bag: '/icons/ui/bag.svg',
  calendar: '/icons/ui/calendar.svg',
  checkmark: '/icons/ui/checkmark.svg',
  chevronDown: '/icons/ui/chevron-down.svg',
  chevronLeft: '/icons/ui/chevron-left.svg',
  chevronRight: '/icons/ui/chevron-right.svg?v=20260829',
  chevronUp: '/icons/ui/chevron-up.svg',
  clock: '/icons/ui/clock.svg',
  close: '/icons/ui/close.svg',
  kakao: '/icons/ui/jt-kakao.svg',
  more: '/icons/ui/more.svg',
  plus: '/icons/ui/plus.svg',
  refresh: '/icons/ui/refresh.svg?v=20260813',
  search: '/icons/ui/search.svg?v=20260829',
} as const

export type AppIconName = keyof typeof appIcons
