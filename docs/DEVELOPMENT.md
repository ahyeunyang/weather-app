# Weddddy 개발 가이드

이 문서는 Weddddy를 개발하고 유지보수하는 사람을 위한 내부 가이드입니다. 프로젝트 소개와 일반 실행 방법은 저장소 루트의 [README](../README.md)에서 관리합니다.

## 문서 구분

- `README.md`: 외부에 공개할 프로젝트 소개, 주요 기능, 기술 구성과 기본 실행 방법
- `docs/DEVELOPMENT.md`: 구조, 개발 규칙, 컴포넌트, 빌드와 데이터 연결 계획
- `AGENTS.md`: 저장소를 수정하는 자동화 작업자가 항상 지켜야 할 핵심 규칙

공개 기능이나 사용 방법이 달라지면 `README.md`를 수정합니다. 구조, 의존성, 명령 또는 개발 규칙이 달라지면 이 문서를 수정하고 공개 정보에도 영향이 있으면 두 문서를 함께 수정합니다.

## 개발 방향

웹 화면을 React로 먼저 제작한 뒤 Capacitor로 네이티브 앱과 연결합니다.

```text
네이티브 기본 스플래시
  → React 웹 화면 로딩
  → Weddddy 캐릭터 인트로
  → 날씨 메인 화면
```

API 연결보다 모바일·태블릿 퍼블리싱을 먼저 완성합니다. 화면에는 실제 응답과 유사한 목업 데이터를 전달하고, 퍼블리싱이 끝나면 데이터 공급자만 API로 교체할 수 있게 구성합니다.

프로젝트명 `Weddddy`는 **Weather**와 **Buddy**를 결합해 날씨를 알려주는 친근한 친구라는 의미를 담았습니다. 반복되는 `d`는 캐릭터 브랜드의 장난스럽고 경쾌한 인상을 표현합니다. 사용자에게 노출되는 브랜드 표기는 `Weddddy`, npm 패키지명과 코드 식별자는 소문자 `weddddy`를 사용합니다.

기존 Android 설치 식별자인 `com.weathercharacter.app`은 표시명 변경과 분리해 유지하며, 배포 전에 최종 식별자를 정한 뒤 별도 마이그레이션합니다.

## 기술 구성

| 영역 | 기술 |
| --- | --- |
| 프론트엔드 | React 19 |
| 언어 | TypeScript |
| 개발 및 빌드 | Vite |
| 스타일 | Sass, SCSS Modules |
| 폰트 | Pretendard Variable |
| 캐릭터 | SVG, React/CSS 애니메이션 |
| 임시 3D 검증 | Three.js, React Three Fiber |
| 네이티브 연결 | Capacitor |
| 날씨 데이터 | Open-Meteo 예정 |

실제 SVG 캐릭터 적용이 끝나고 3D 표현이 필요하지 않으면 Three.js, React Three Fiber와 관련 임시 코드를 제거합니다.

## 폴더 구조

```text
src/
├─ components/
│  ├─ AppIcon/
│  ├─ BottomNavigation/
│  ├─ CharacterGroup/
│  ├─ CharacterStage/
│  ├─ RecommendationCard/
│  ├─ WeatherIcon/
│  └─ WeatherLogo/
├─ data/
│  └─ mockWeather.ts
├─ pages/
│  ├─ DiscoverPage/
│  ├─ MyPage/
│  ├─ SplashPage/
│  └─ WeatherPage/
└─ styles/
   ├─ tokens/
   │  ├─ _tokens.scss
   │  └─ _color-tokens.scss
   ├─ globals.scss
   ├─ _mixins.scss
   └─ _reset.scss

public/
├─ characters/
├─ images/
├─ logos/
└─ weather-icons/
```

HTML 파일에 화면 전체를 작성하지 않고 React의 `.tsx` 컴포넌트로 역할을 나눕니다. 컴포넌트 전용 스타일은 같은 폴더의 `ComponentName.module.scss`에서 관리합니다.

## SCSS 관리 원칙

- 모든 SCSS 길이 값은 `rem`을 사용하며 `px`은 사용하지 않습니다.
- `0`, `%`, `vw`, `vh`, `svh`, `dvh`, `em` 및 단위 없는 값처럼 의미상 필요한 값은 사용할 수 있습니다.
- 공통 크기, 여백, 타이포그래피와 반응형 값은 `src/styles/tokens/_tokens.scss`에서 관리합니다.
- 공통 색상은 `src/styles/tokens/_color-tokens.scss`에서 관리합니다.
- 새로운 스타일은 하드코딩보다 토큰을 먼저 사용합니다.
- 초기화와 공통 스타일은 `src/styles/globals.scss`에서 관리합니다.
- 컴포넌트 전용 스타일은 해당 컴포넌트의 SCSS Module에서 관리합니다.
- 페이지에서만 필요한 배치와 변형은 해당 페이지의 SCSS Module에서 관리합니다.
- `@import` 대신 `@use`와 `@forward`를 사용합니다.
- 모바일 스타일을 기본으로 작성하고 `48rem` 이상 태블릿 확장은 `tablet-up` mixin으로 관리합니다.
- 실행 중 변하는 테마 값은 컬러 토큰을 기본값으로 두고 CSS 사용자 정의 속성으로 확장합니다.
- 선택자 중첩은 가급적 2~3단계 이내로 유지합니다.

작업을 마치기 전에 SCSS의 `px` 사용 여부, 린트와 프로덕션 빌드를 확인합니다.

## Pretendard Variable

`pretendard` npm 패키지의 동적 서브셋 가변 웹폰트를 앱 번들에 포함합니다. 외부 CDN을 사용하지 않기 때문에 네트워크 연결 여부와 관계없이 앱에서 동일한 글꼴을 사용할 수 있습니다.

폰트 스타일시트는 앱 진입점에서 전역 스타일보다 먼저 불러옵니다.

```ts
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css'
import './styles/globals.scss'
```

기본 폰트 스택은 토큰에서 관리합니다.

```scss
$font-family-sans: 'Pretendard Variable', Pretendard, -apple-system,
  BlinkMacSystemFont, system-ui, 'Noto Sans KR', 'Segoe UI', sans-serif;
```

권장 굵기는 큰 온도와 날짜 `300`, 본문 `400`, 버튼과 강조 문구 `500` 또는 `600`입니다. 특별한 이유가 없으면 화면별로 다른 기본 폰트를 추가하지 않습니다.

## 컴포넌트 작성 예시

```tsx
import styles from './WeatherCard.module.scss'

export function WeatherCard() {
  return (
    <section className={styles.card}>
      <h2 className={styles.title}>서울</h2>
      <strong>24°C</strong>
      <p>오늘은 맑아요</p>
    </section>
  )
}
```

```scss
@use '../../styles/tokens/color-tokens' as color;
@use '../../styles/tokens/tokens' as token;

.card {
  padding: token.$space-6;
  border-radius: token.$space-6;
  background: color.$light-main;
}
```

## 스플래시 화면

스플래시는 구름이 보이는 하늘 사진을 화면 전체 배경으로 사용하고, 정중앙에 완전히 불투명한 흰색 `WeatherLogo`를 표시합니다. 캐릭터는 스플래시에서 제외하고 향후 메인 날씨 화면에서 사용합니다.

첨부된 `3670×4893` PNG 배경은 모바일과 태블릿 스플래시에 맞춰 `1440×1920` JPEG로 최적화하고 `public/images/weddddy-splash-sky.jpg`로 이름을 변경했습니다. 파일 크기는 약 `2.17MB`에서 `0.13MB`로 줄였습니다.

배경은 `cover`로 모바일과 태블릿 화면을 채웁니다. 흰색 로고는 처음에만 투명하고 살짝 흐린 상태에서 시작해 `opacity: 1`인 완전 불투명 상태로 부드럽게 나타납니다. 운영체제에서 모션 감소를 설정하면 진입 애니메이션을 실행하지 않습니다.

스플래시는 약 `2.2초` 동안 표시한 후 목업 데이터 기반 날씨 메인 화면으로 전환합니다. 실제 데이터 초기화 흐름이 추가되면 고정 시간 대신 앱 준비 상태를 기준으로 전환하도록 교체합니다.

## 메인 날씨 화면

GIF 레퍼런스의 정보 흐름을 참고해 날짜와 동작 버튼, 큰 현재 온도, 최저·최고 온도, 대기질, 현재 위치와 날씨, 캐릭터 장면, 상세 날씨 순서로 배치합니다. 레퍼런스의 캐릭터와 화면을 복제하지 않고 Weddddy 에셋과 스타일 토큰을 사용합니다.

`WeatherPage`는 `src/data/mockWeather.ts`의 내부 날씨 모델을 사용합니다. `CharacterGroup`은 `public/characters/weddddy-character-group.png`를 표시하며, 실제 SVG 캐릭터가 준비되면 같은 컴포넌트의 구현을 교체합니다.

모바일에서는 화면 너비를 사용하고 태블릿에서는 콘텐츠 최대 너비를 제한합니다. 페이지 아래쪽에는 고정 하단 메뉴와 겹치지 않도록 안전 여백을 둡니다.

## 하단 메뉴와 추천 화면

`BottomNavigation`은 다음 세 메뉴를 제공합니다.

| 메뉴 | 화면 | 역할 |
| --- | --- | --- |
| 날씨 | `WeatherPage` | 현재 날씨와 캐릭터 장면 |
| 추천 | `DiscoverPage` | 날씨에 맞는 사러·먹으러·놀러 추천 |
| 마이 | `MyPage` | 저장 목록, 기본 지역, 알림과 설정 |

앱의 기본 진입 화면과 스플래시 종료 후 첫 화면은 항상 `WeatherPage`입니다. 날씨 메뉴는 Weddddy의 W 로고, 마이 메뉴는 `face` 아이콘으로 고정합니다. 가운데 추천 메뉴의 아이콘은 현재 날씨 상태에 따라 바뀝니다.

| 내부 날씨 상태 | 추천 메뉴 아이콘 |
| --- | --- |
| `sunny` | 해 |
| `clearNight` | 달 |
| `partlyCloudyDay`, `partlyCloudyNight` | 주야간 구름 조금 |
| `cloudy` | 구름 |
| `rain` | 비구름 |
| `snow` | 눈구름 |
| `thunderstorm` | 뇌우 |
| `unknown` | 기본 구름 |

아이콘이 바뀌면 짧은 페이드와 크기 전환 효과를 적용합니다. 버튼의 크기와 `추천` 문구는 유지하며 모션 감소 환경에서는 애니메이션을 생략합니다.

추천 화면 상단에는 `사러·먹으러·놀러` 탭과 검색 버튼을 배치합니다. 탭 글자는 일반 본문보다 큰 `1.125rem`을 사용합니다. 활성 탭은 밑줄을 사용하지 않고 `사러`는 코랄, `먹으러`는 민트, `놀러`는 블루 색상만으로 구분합니다.

상단 날씨 비주얼은 별도의 배경 박스 없이 모든 탭에서 동일한 내용과 형태로 유지합니다. 탭을 변경하면 비주얼 아래의 빠른 분류, 프로모션과 상품·음식·장소 카드 데이터만 변경됩니다.

```text
상단 탭과 검색
  → 날씨 맞춤 메인 배너
  → 원형 빠른 분류
  → 프로모션 안내
  → 2열 추천 카드 목록
```

`RecommendationCard`는 이미지 영역, 배지, 찜 버튼, 제공처, 제목, 기존 가격과 현재 가격을 표시합니다. 찜 버튼을 누르면 `favorite`과 `favoriteFill` 아이콘이 전환됩니다. 모바일은 2열, `48rem` 이상 태블릿은 3열로 표시합니다.

현재 상품, 음식점과 장소 정보는 퍼블리싱 검증용 목업입니다. 실제 추천 데이터 공급원과 상세 화면 이동 방식은 퍼블리싱 완료 후 결정합니다.

개발 환경에서 `?tab=discover` 또는 `?tab=my`를 주소에 붙이면 스플래시 이후 해당 화면을 바로 열어 검수할 수 있습니다. 프로덕션 빌드에서는 이 값과 관계없이 날씨 화면으로 진입합니다.

## 공통 앱 아이콘

일반 UI 아이콘은 외부 SVG 파일로 요청하지 않고 `src/components/AppIcon/appIcons.ts`의 `viewBox`와 `path` 소스로 관리합니다. `AppIcon`은 해당 소스를 인라인 `<svg>`로 렌더링하고 각 경로에 `fill="currentColor"`를 적용합니다.

따라서 사용하는 요소나 전용 클래스에서 CSS `color`를 지정해 아이콘 색상을 자유롭게 변경할 수 있습니다. 여러 색으로 구성된 날씨 아이콘과 로고는 인라인으로 변환하지 않고 기존 외부 SVG 파일 방식을 유지합니다.

| 컴포넌트 이름 | 기존 SVG 이름 | 주요 사용처 |
| --- | --- | --- |
| `add` | `add.svg` | 지역 추가 |
| `arrowBack` | `arrow_back.svg` | 이전 화면 |
| `arrowDown` | `arrow_down.svg` | 날짜와 상세 날씨 펼침 |
| `arrowForward` | `arrow_forward.svg` | 추천 카드와 설정 이동 |
| `arrowOutward` | `arrow_outward.svg` | 날씨 공유 |
| `arrowUp` | `arrow_up.svg` | 온도 상승 표시 |
| `campaign` | `campaign.svg` | 프로모션과 날씨 알림 |
| `face` | `face.svg` | 마이 메뉴와 사용자 정보 |
| `favorite` | `favorite.svg` | 찜하지 않은 상태 |
| `favoriteFill` | `favorite-fill.svg` | 찜한 상태 |
| `help` | `help.svg` | 도움말 |
| `settings` | `settings.svg` | 앱 설정 |

```tsx
import { AppIcon } from './components/AppIcon/AppIcon'

<AppIcon name="arrowOutward" />
<AppIcon name="favoriteFill" decorative />
```

`size`는 `small`, `medium`, `large`를 사용하며 각각 `1rem`, `1.125rem`, `1.25rem`입니다. 의미가 있는 단독 아이콘은 기본 설명 또는 `alt`를 제공하고, 버튼 안에서 버튼의 접근성 이름이 이미 제공되는 경우 `decorative`를 지정합니다.

```scss
.favoriteButton {
  color: color.$ink-soft;

  &[aria-pressed='true'] {
    color: color.$temperature-high;
  }
}
```

날씨 헤더에서는 아이콘 자체의 시각적 무게를 맞추기 위해 공유용 `arrowOutward`는 `small`, 지역 추가용 `add`는 `large`를 사용합니다. 버튼의 터치 영역은 동일하게 유지하고 아이콘 크기만 다르게 적용합니다.

## 로고 컴포넌트

로고 SVG는 `public/logos`에 보관합니다.

| 파일 | 사용 배경 |
| --- | --- |
| `weather-logo-white-fixed-v2.svg` | 어두운 배경 |
| `weather-logo-black-fixed-v2.svg` | 밝은 배경 |

```tsx
import { WeatherLogo } from './components/WeatherLogo/WeatherLogo'

<WeatherLogo color="black" size="medium" />
<WeatherLogo color="white" size="small" decorative />
```

`color`는 `black` 또는 `white`, `size`는 `small`, `medium`, `large`를 사용합니다. 주변에 동일한 브랜드명이 표시될 때는 `decorative`를 지정해 스크린 리더의 중복 안내를 막습니다.

## 날씨 아이콘 컴포넌트

날씨 SVG 아이콘 29종은 `public/weather-icons`에 보관합니다. 화면에서는 `WeatherIcon`을 사용하고 `weatherIcons.ts`에서 타입 안전한 이름, 경로와 기본 한글 설명을 관리합니다.

```tsx
import { WeatherIcon } from './components/WeatherIcon/WeatherIcon'

<WeatherIcon name="sunny" size="large" />
<WeatherIcon name="rainCloud" alt="오후부터 비" size="medium" />
<WeatherIcon name="rainbow" decorative />
```

`size`는 `small`, `medium`, `large`, `hero`를 사용합니다. `alt`를 생략하면 아이콘별 기본 설명이 적용되고, 장식용 아이콘은 `decorative`를 지정합니다.

Open-Meteo의 `weather_code`와 주야간 정보는 화면에서 직접 처리하지 않고 별도 매핑 계층에서 `sunny`, `clearNight`, `rainCloud` 같은 내부 아이콘 이름으로 변환합니다.

## 목업 우선 개발

화면 컴포넌트에는 다음과 같이 실제 API와 유사한 내부 데이터 모델을 전달합니다.

```ts
const mockWeather = {
  location: '마포구 창전동',
  temperature: 32,
  temperatureDiff: 5,
  minimumTemperature: 24,
  maximumTemperature: 32,
  condition: '맑음',
  fineDust: '좋음',
  ultraFineDust: '보통',
  warning: '폭염주의보',
}
```

퍼블리싱 단계에서는 다음 항목을 우선 검증합니다.

1. 현재 날씨, 대기질과 특보
2. 캐릭터 장면과 날씨별 모션
3. 시간별 및 주간 예보
4. 모바일과 태블릿 반응형 레이아웃
5. 로딩, 오류, 빈 데이터와 위치 권한 거부
6. 낮은 온도, 높은 온도, 긴 지역명과 여러 특보 같은 예외값

## API 연결 계획

퍼블리싱 완료 후 다음 순서로 실제 데이터를 연결합니다.

1. Open-Meteo 현재 날씨와 예보
2. Open-Meteo 대기질
3. Capacitor Geolocation 현재 위치
4. 현재 좌표의 행정동 변환
5. 기상특보 데이터

API 응답은 화면 컴포넌트에서 직접 가공하지 않습니다. 앱 내부의 날씨 데이터 형식으로 정규화한 후 컴포넌트에 전달하고, 날씨 코드와 주야간 정보는 아이콘 및 캐릭터 상태로 변환합니다.

초기 버전은 별도 서버 없이 React 앱에서 Open-Meteo를 직접 호출합니다. 상업 배포, 인증이 필요한 API 또는 서버 전용 비밀 키가 추가되면 백엔드 도입과 각 서비스의 사용 조건을 다시 검토합니다.

## 개발 명령

```powershell
# 개발 서버
npm run dev

# 정적 검사
npm run lint

# 프로덕션 빌드
npm run build

# Android 웹 에셋 동기화
npm run android:sync

# 연결된 Android 기기에서 실행
npm run android:run

# Debug APK 생성
npm run android:apk
```

Debug APK의 기본 생성 위치는 다음과 같습니다.

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

개발 단계에서는 자동 서명된 Debug APK를 사용합니다. 배포 단계에서는 별도의 배포용 키로 서명한 APK 또는 Google Play 등록용 AAB를 생성합니다.

## 현재 개발 순서

- [x] Node.js와 npm 환경 구성
- [x] Vite 기반 React와 TypeScript 프로젝트 생성
- [x] SCSS Modules와 토큰 구조 설정
- [x] Capacitor Android 프로젝트 연결
- [x] Debug APK 빌드와 에뮬레이터 실행 검증
- [x] 로고와 날씨 아이콘 컴포넌트
- [x] 하늘 배경과 중앙 흰색 로고 스플래시
- [x] Pretendard Variable 번들 적용
- [x] 스플래시 종료 후 날씨 메인 화면 전환
- [x] 목업 데이터 기반 날씨 메인 화면
- [x] 날씨·추천·마이 하단 메뉴
- [x] 날씨별 추천 메뉴 아이콘 전환 구조
- [x] 공통 앱 아이콘 컴포넌트와 실제 화면 적용
- [x] 사러·먹으러·놀러 쇼핑형 추천 화면
- [ ] 시간별 및 주간 예보 퍼블리싱
- [ ] 실제 SVG 캐릭터와 날씨별 모션
- [ ] 모바일·태블릿 예외 상태 검증
- [ ] 날씨, 대기질과 기상특보 API
- [ ] 현재 위치와 행정동 정보
- [ ] 실제 휴대폰 테스트
- [ ] 배포용 APK 및 AAB 서명 설정

## 개발 환경 참고

프로젝트는 Windows 환경에서 Node.js 24, npm 11, Java 21, Android SDK Platform 36과 Build-Tools 36으로 Android 빌드를 검증했습니다. 개인 PC의 절대경로는 문서에 고정하지 않고 각 도구의 환경 변수와 표준 설정을 사용합니다.
