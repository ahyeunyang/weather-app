import { useEffect, useRef, useState } from 'react'
import { AppIcon } from '../../components/AppIcon/AppIcon'
import { BottomNavigation } from '../../components/BottomNavigation/BottomNavigation'
import styles from './ShoppingPage.module.scss'

type ShoppingTab = 'buy' | 'eat' | 'play'
const tabs: Array<{ id: ShoppingTab; label: string }> = [{ id: 'buy', label: '사러' }, { id: 'eat', label: '먹으러' }, { id: 'play', label: '놀러' }]
const essentials = [
  { eyebrow: '바깥은 더워서 위험하단다!', items: ['시원한 무날개\n선풍기', '힘스터\n캡모자', '아이눈부셔\n선글라스'], cardItems: ['날개 없이 안전한 선풍기', '날개 없이 안전한 선풍기', '날개 없이 안전한 선풍기'] },
  { eyebrow: '가볍게 챙기는 외출 준비,', items: ['포근한 데일리 머플러', '가벼운 미니 크로스백', '매일 신는 컬러 양말'], cardItems: ['포근한 데일리 머플러', '가벼운 미니 크로스백', '매일 신는 컬러 양말'] },
  { eyebrow: '실내에서도 기분 좋게,', items: ['따뜻한 무드 조명', '향기로운 패브릭 미스트', '테이블 미니 화병'], cardItems: ['따뜻한 무드 조명', '향기로운 패브릭 미스트', '테이블 미니 화병'] },
]
const relatedProducts = ['재킷시원한 선풍기', '놀러간다 선풍기', '여행하면 어디든', '휴대전력']
const maskProducts = Array.from({ length: 4 }, (_, index) => `에니쉴드 KF94 미세먼지 황사마스크 ${index + 1}`)
const heroSlides = [
  { name: '선풍기', description: '바람이 슈욱—시원한 선풍기' },
  { name: '휴대용 선풍기', description: '가볍게 챙기는 시원한 바람' },
  { name: '서큘레이터', description: '공기를 멀리 보내는 여름 아이템' },
]

function ProviderMarks({ count = 4, active = 0, onSelect }: { count?: number; active?: number; onSelect?: (index: number) => void }) {
  return <div className={styles.providerMarks} aria-label="판매처">{Array.from({ length: count }, (_, index) => onSelect ? <button key={index} type="button" aria-label={`판매처 ${index + 1}`} aria-pressed={index === active} onClick={() => onSelect(index)} /> : <span key={index} aria-label={`판매처 ${index + 1}`} />)}</div>
}

function SectionHeading({ eyebrow, title, marks = 4 }: { eyebrow: string; title: string; marks?: number }) {
  return <header className={styles.sectionHeading}><div>{marks > 0 && <ProviderMarks count={marks} />}<p>{eyebrow}</p><h2>{title}</h2></div><button className={styles.sectionAction} type="button" aria-label={`${title} 카카오톡 공유`}><AppIcon name="kakao" /></button></header>
}

function RoundTabTitle({ title }: { title: string }) {
  const [description, productType] = title.split('\n')
  return <h3><span>{description}</span>{productType && <strong>{productType}</strong>}</h3>
}

export function ShoppingPage() {
  const [activeTab, setActiveTab] = useState<ShoppingTab>('buy')
  const [essentialTab, setEssentialTab] = useState(0)
  const [roundTab, setRoundTab] = useState(0)
  const [activeHeroSlide, setActiveHeroSlide] = useState(0)
  const heroSliderRef = useRef<HTMLDivElement>(null)
  const circleSliderRef = useRef<HTMLDivElement>(null)
  const selectedEssential = essentials[essentialTab]
  const tabProducts = selectedEssential.cardItems.map((_, index) => selectedEssential.cardItems[(roundTab + index) % selectedEssential.cardItems.length])

  useEffect(() => {
    const slider = circleSliderRef.current
    const middleProduct = slider?.children.item(1) as HTMLElement | null
    if (!slider || !middleProduct) return
    slider.scrollLeft = middleProduct.offsetLeft - (slider.clientWidth - middleProduct.clientWidth) / 2
  }, [])

  useEffect(() => {
    setRoundTab(0)
  }, [essentialTab])

  const handleHeroScroll = () => {
    const slider = heroSliderRef.current
    if (!slider) return
    setActiveHeroSlide(Math.round(slider.scrollLeft / slider.clientWidth))
  }

  const showNextHeroSlide = () => {
    const nextIndex = (activeHeroSlide + 1) % heroSlides.length
    heroSliderRef.current?.scrollTo({ left: nextIndex * (heroSliderRef.current?.clientWidth ?? 0), behavior: 'smooth' })
    setActiveHeroSlide(nextIndex)
  }

  return <main className={styles.page} id="shopping">
    <header className={styles.topBar}><nav className={styles.tabs} aria-label="쇼핑 카테고리">{tabs.map((tab) => <button key={tab.id} className={activeTab === tab.id ? styles.activeTab : undefined} type="button" onClick={() => setActiveTab(tab.id)}>{tab.label}</button>)}</nav><button className={styles.iconButton} type="button" aria-label="검색"><AppIcon name="search" /></button></header>
    <section className={styles.weatherHeading}><div><h1><strong>조금만 걸어도 더운</strong><br />지금 날씨엔?</h1><p>11:06 AM 업데이트됨</p></div><div className={styles.refreshArea}><button type="button" aria-label="다음 대표 추천" onClick={showNextHeroSlide}><AppIcon name="refresh" /></button><p><strong>{activeHeroSlide + 1}</strong><span>/{heroSlides.length}</span></p></div></section>
    <div className={styles.heroViewport} ref={heroSliderRef} onScroll={handleHeroScroll} aria-label="오늘의 대표 추천 슬라이드">
      {heroSlides.map((slide) => <section className={styles.hero} key={slide.name}><div className={styles.heroWeatherVisual} aria-label="날씨 이미지 영역" /><div className={styles.heroCopy}><span>WHAT</span><h2>{slide.name}</h2><p>{slide.description}</p><strong>12,000원</strong> <del>15,000원</del></div><div className={styles.heroProduct} aria-label="대표 상품 이미지 영역" /></section>)}
    </div>
    <div className={styles.relatedSlider} aria-label="연관 상품 슬라이드">{relatedProducts.map((product) => <article key={product}><div /><h3>{product}</h3><p>76,500원</p></article>)}</div>
    <section className={styles.adBanner} aria-label="광고"><img className={styles.adImage} src="/characters/puri/puri-bingsu.svg" alt="빙수를 든 푸리 캐릭터" /><h2>푸리가 먹는<br /><strong>빙수는</strong> 어디꺼지?</h2><span>AD</span></section>
    <section className={styles.section}><SectionHeading eyebrow="새로운 시간을 준비하는 법," title="2027 다이어리" /><div className={styles.listProducts}>{essentials[0].items.map((item) => <article key={item}><div aria-label="상품 이미지 영역" /><div><h3>[MAKERS ONLY]<br />{item}</h3><p><strong>76,500원</strong></p></div></article>)}</div><button className={styles.moreButton} type="button">214개 상품 더보기 <span className={styles.moreChevron} aria-hidden="true" /></button></section>
    <section className={styles.section}><header className={styles.tabbedHeading}><div><ProviderMarks count={3} active={essentialTab} onSelect={setEssentialTab} /><p>{selectedEssential.eyebrow}</p><h2>이 아이들 중 하나를 데려가렴</h2></div><button className={styles.sectionAction} type="button" aria-label="추천 카카오톡 공유"><AppIcon name="kakao" /></button></header><div className={styles.roundTabs} role="tablist" aria-label="추천 상품 종류">{selectedEssential.items.map((item, index) => <button key={item} className={roundTab === index ? styles.activeRoundTab : undefined} type="button" role="tab" aria-selected={roundTab === index} aria-controls="recommendation-products" onClick={() => setRoundTab(index)}><span aria-label="상품 이미지 영역" /><RoundTabTitle title={item} /></button>)}</div><div className={styles.tabPanel} id="recommendation-products" role="tabpanel"><div className={styles.cardSlider}>{tabProducts.map((item) => <article key={`card-${item}`}><div /><span>더드림마켓</span><h3>{item}</h3><p><strong>76,500원</strong> <del>79,500원</del></p></article>)}</div><button className={styles.centerMore} type="button">214개 상품 더보기 <span className={styles.moreChevron} aria-hidden="true" /></button></div></section>
    <section className={styles.section}><SectionHeading eyebrow="에어팟 케이스 모음" title="주인님, 저도 따뜻하고 싶어요💕" marks={0} /><div className={styles.circleSlider} ref={circleSliderRef} aria-label="에어팟 케이스 상품 슬라이드">{[1, 2, 3].map((item) => <article key={item}><div /><p>더드림마켓</p><h3>날개 없이 안전한 선풍기</h3><strong>76,500원</strong></article>)}</div></section>
    <section className={styles.section}><SectionHeading eyebrow="앗— 차가!" title="여름엔 쿨팩이지!" marks={0} /><article className={styles.singleProduct}><div><button type="button" aria-label="상품 보기"><AppIcon name="arrowRight" /></button></div><p>앗! 차게 쿨링쿨링 쿨링팩</p><span>포커타임 100매</span><strong>76,500원</strong></article></section>
    <section className={styles.section}><SectionHeading eyebrow="여름철 필수템" title="미세먼지 철통방어 마스크" marks={2} /><div className={styles.productGrid}>{maskProducts.map((product) => <article key={product}><div /><h3>{product}</h3><p><strong>76,500원</strong> <del>79,500원</del></p></article>)}</div></section>
    <BottomNavigation activeItem="shopping" />
  </main>
}
