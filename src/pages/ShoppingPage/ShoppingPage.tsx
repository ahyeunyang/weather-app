import { useState } from 'react'
import { AppIcon } from '../../components/AppIcon/AppIcon'
import { BottomNavigation } from '../../components/BottomNavigation/BottomNavigation'
import styles from './ShoppingPage.module.scss'

type ShoppingTab = 'buy' | 'eat' | 'play'

const tabs: Array<{ id: ShoppingTab; label: string }> = [
  { id: 'buy', label: '사러' },
  { id: 'eat', label: '먹으러' },
  { id: 'play', label: '놀러' },
]

const pageCopy: Record<ShoppingTab, { strong: string; question: string; category: string }> = {
  buy: { strong: '미세먼지 많은', question: '지금 날씨엔?', category: 'WHAT' },
  eat: { strong: '기분 좋은 오늘', question: '무엇을 먹을까?', category: 'EAT' },
  play: { strong: '하늘이 맑은 오늘', question: '어디로 놀러 갈까?', category: 'PLAY' },
}

const relatedProducts = [1, 2, 3, 4]

export function ShoppingPage() {
  const [activeTab, setActiveTab] = useState<ShoppingTab>('eat')
  const copy = pageCopy[activeTab]

  return (
    <main className={styles.page} id="shopping">
      <header className={styles.header}>
        <nav className={styles.tabs} aria-label="쇼핑 카테고리">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? styles.activeTab : undefined}
              type="button"
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <button className={styles.searchButton} type="button" aria-label="검색">
          <AppIcon name="search" />
        </button>
      </header>

      <section className={styles.weatherHeading}>
        <div>
          <h1><strong>{copy.strong}</strong><br />{copy.question}</h1>
          <p>11:06 AM 업데이트됨</p>
        </div>
        <div className={styles.refreshArea}>
          <button type="button" aria-label="추천 새로고침">
            <img src="/icons/ui/refresh.svg?v=20260813-2" alt="" />
          </button>
          <p>1 / 3</p>
        </div>
      </section>

      <section className={styles.feature}>
        <div
          className={`${styles.mainVisual} ${activeTab === 'eat' ? styles.eatMainVisual : ''}`}
          role={activeTab === 'eat' ? 'img' : undefined}
          aria-label={activeTab === 'eat' ? '맑은 하늘 W 로고와 망고 빙수 대표 상품' : '날씨와 대표 상품 이미지 영역'}
        />
        <div className={`${styles.featureProduct} ${activeTab === 'eat' ? styles.eatFeatureProduct : ''}`}>
          <div>
            <span>{copy.category}</span>
            <h2>대표 상품 카테고리</h2>
            <p>상품명이 들어갈 자리</p>
            <div className={styles.priceRow}>
              <strong>246,200원</strong>
              <del>299,000원</del>
            </div>
          </div>
          <div
            className={`${styles.productCutout} ${activeTab === 'buy' ? styles.buyProductCutout : ''} ${activeTab === 'eat' ? styles.eatProductCutout : ''}`}
            role={activeTab === 'buy' || activeTab === 'eat' ? 'img' : undefined}
            aria-label={
              activeTab === 'buy'
                ? '오렌지 반소매 티셔츠 대표 상품'
                : activeTab === 'eat'
                  ? '망고 빙수 대표 상품'
                  : '대표 상품 이미지 영역'
            }
          />
        </div>
      </section>

      <section className={styles.related} aria-label="연관 상품">
        {relatedProducts.map((item) => (
          <article key={`${activeTab}-${item}`}>
            <div aria-label="상품 이미지 영역" />
            <h3>상품명 자리</h3>
            <p>가격 정보</p>
          </article>
        ))}
      </section>

      <section className={styles.adBanner} aria-label="광고 배너">
        <div className={styles.adImage} aria-label="광고 이미지 영역" />
        <div>
          <p>프로모션 문구</p>
          <h2>광고 배너 제목</h2>
        </div>
        <span>AD</span>
      </section>

      <section className={styles.collectionSection}>
        <div className={styles.collectionMarks} aria-label="상품 분류">
          <span aria-label="분류 아이콘 영역" />
          <span aria-label="분류 아이콘 영역" />
          <span aria-label="분류 아이콘 영역" />
        </div>

        <header className={styles.collectionHeading}>
          <p>새로운 시간을 준비하는 법,</p>
          <h2>오늘의 큐레이션</h2>
        </header>

        <div className={styles.collectionList}>
          {[1, 2, 3].map((item) => (
            <article key={`collection-${item}`}>
              <div className={styles.collectionImage} aria-label="상품 이미지 영역" />
              <div className={styles.collectionProductCopy}>
                <h3>{item === 1 ? '[기획 상품] 대표 상품명' : '상품명이 들어갈 자리'}</h3>
                <p>
                  <strong>{item === 1 ? '33,000원' : item === 2 ? '8,330원' : '17,230원'}</strong>
                  {item !== 1 && <del>{item === 2 ? '9,800원' : '19,800원'}</del>}
                </p>
              </div>
            </article>
          ))}
        </div>

        <button className={styles.moreProducts} type="button">
          214개 상품 더보기 <AppIcon name="chevronRight" />
        </button>
      </section>

      <section className={`${styles.storyCard} ${styles.essentialsCard}`}>
        <header className={styles.storyHeading}>
          <div>
            <div className={styles.storyMarks}><span /><span /><span /></div>
            <p>바깥은 추워서 위험하단다!</p>
            <h2>이 아이템 중 하나를 데려가렴</h2>
          </div>
          <span className={styles.commentPlaceholder} aria-label="댓글 아이콘 영역" />
        </header>

        <div className={styles.essentialItems}>
          {['따뜻한 목도리', '포근한 비니', '보송한 장갑'].map((name) => (
            <article key={name}>
              <div aria-label="상품 이미지 영역" />
              <h3>{name}</h3>
            </article>
          ))}
        </div>

        <div className={styles.threeColumnProducts}>
          {[1, 2, 3].map((item) => (
            <article key={`winter-${item}`}>
              <div aria-label="상품 이미지 영역" />
              <span>브랜드명</span>
              <h3>겨울 아이템 상품명</h3>
              <p><strong>{item === 1 ? '13,900원' : item === 2 ? '11,010원' : '14,500원'}</strong></p>
            </article>
          ))}
        </div>
        <button className={styles.storyMore} type="button">62개 상품 더보기 <AppIcon name="chevronRight" /></button>
      </section>

      <section className={`${styles.storyCard} ${styles.focusCard}`}>
        <header className={styles.storyHeading}>
          <div><p>에어팟 케이스 모음</p><h2>주인님, 저도 따뜻하고 싶어요</h2></div>
          <span className={styles.commentPlaceholder} aria-label="댓글 아이콘 영역" />
        </header>
        <div className={styles.focusVisual} aria-label="대표 상품 이미지 영역" />
        <div className={styles.focusCopy}>
          <span>브랜드명</span>
          <h3>대표 상품명이 들어갈 자리</h3>
          <strong>12,000원</strong>
        </div>
      </section>

      <section className={`${styles.storyCard} ${styles.singleProductCard}`}>
        <header className={styles.storyHeading}>
          <div><p>앗— 뜨거!</p><h2>겨울엔 핫팩이지!</h2></div>
          <span className={styles.commentPlaceholder} aria-label="댓글 아이콘 영역" />
        </header>
        <div className={styles.singleVisual} aria-label="대표 상품 이미지 영역" />
        <div className={styles.focusCopy}>
          <h3>오래오래 따뜻한 대표 상품</h3>
          <span>상품 상세 정보</span>
          <strong>35,000원</strong>
        </div>
      </section>

      <section className={`${styles.storyCard} ${styles.gridCard}`}>
        <header className={styles.storyHeading}>
          <div>
            <div className={styles.storyMarks}><span /><span /></div>
            <p>겨울철 필수템</p>
            <h2>미세먼지 철통방어 아이템</h2>
          </div>
        </header>
        <div className={styles.twoColumnGrid}>
          {[1, 2, 3, 4].map((item) => (
            <article key={`dust-${item}`}>
              <div aria-label="상품 이미지 영역" />
              <h3>미세먼지 방어 상품명</h3>
              <p><strong>13,900원</strong> <del>25,000원</del></p>
            </article>
          ))}
        </div>
      </section>

      <BottomNavigation activeItem="shopping" />
    </main>
  )
}
