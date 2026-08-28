# 공통 UI 아이콘

검색, 장바구니, 내비게이션과 화면 조작에 사용하는 공통 SVG 아이콘을 이 폴더에 넣습니다.

현재 추가된 아이콘:

- `search.svg`: 검색
- `refresh.svg`: 새로고침
- `weather-nav.svg`: 하단 날씨 메뉴
- `shopping-nav.svg`: 하단 쇼핑 메뉴
- `mypage-nav.svg`: 하단 마이페이지 메뉴
- `weather-nav-active.svg`: 활성 날씨 메뉴 채움 상태
- `shopping-nav-active.svg`: 활성 쇼핑 메뉴 채움 상태
- `mypage-nav-active.svg`: 활성 마이페이지 머리 채움 상태
- `bag.svg`: 장바구니 또는 쇼핑백
- `calendar.svg`, `clock.svg`: 날짜와 시간
- `plus.svg`, `close.svg`, `checkmark.svg`, `more.svg`: 공통 조작
- `jt-kakao.svg`: 큐레이션 섹션의 카카오톡 공유 버튼
- `arrow-*.svg`: 이동 화살표
- `chevron-*.svg`: 펼침과 단계 이동

추가로 필요한 아이콘:

- `share.svg`: 공유
- `heart.svg`: 찜

하단 내비게이션 SVG는 CSS `mask-image`로 출력합니다. 비활성 상태는 검은색 아웃라인, 활성 상태는 메뉴별 지정 영역을 채운 SVG로 교체합니다. 원본 SVG의 서로 다른 `viewBox` 비율은 `mask-size: contain`으로 유지합니다.

화면에서는 공통 `AppIcon` 컴포넌트를 사용합니다.

쇼핑 화면의 원형 새로고침 버튼 내부에는 이 폴더의 `refresh.svg`를 직접 사용합니다. 아이콘 파일을 교체했는데 이전 모양이 남으면 `ShoppingPage.tsx`에 작성된 파일 경로의 쿼리 버전을 변경해 브라우저 캐시를 갱신합니다.

```tsx
<AppIcon name="search" />
<AppIcon name="refresh" label="새로고침" />
```

파일명은 영문 소문자와 하이픈을 사용합니다. 새 파일을 추가하면 `src/components/AppIcon/icons.ts`에도 등록합니다. 같은 의미의 아이콘을 화면별로 중복 생성하지 않고 이 폴더의 공통 파일을 사용합니다.

아이콘은 가능하면 동일한 `viewBox`와 선 굵기를 사용하고, 의미가 있는 아이콘 버튼에는 반드시 접근 가능한 한글 이름을 제공합니다.
