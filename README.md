# 날씨 앱 프로젝트

## 프로젝트 소개

입체감 있는 SVG 캐릭터와 날씨 정보를 결합한 모바일 날씨 앱입니다.

앱을 실행하면 움직이는 스플래시 화면이 먼저 나타나고, 화면 중앙에는 직접 만든 SVG 캐릭터가 표시됩니다. 스플래시 애니메이션이 끝나면 날씨 메인 화면으로 이동합니다.

## 기술 선택

이 프로젝트는 웹 화면을 먼저 제작한 뒤 Capacitor로 네이티브 앱과 연결하는 방식으로 개발합니다.

| 영역 | 기술 |
| --- | --- |
| 프론트엔드 | React |
| 언어 | TypeScript |
| 개발 및 빌드 도구 | Vite |
| 스타일 | SCSS Modules |
| 캐릭터 | SVG + React/CSS 애니메이션, 현재 임시 화면은 Three.js |
| 네이티브 연결 | Capacitor |
| 날씨 데이터 | 날씨 API |
| Android 결과물 | APK / AAB |

이 구성을 사용하면 React와 TypeScript를 연습하면서 직접 웹 퍼블리싱을 진행할 수 있습니다. 완성된 웹 결과물은 Capacitor를 통해 Android와 iOS 앱으로 패키징하고, 위치 및 알림 같은 기기 기능은 Capacitor 플러그인으로 연결합니다.

## 앱 실행 구조

```text
네이티브 기본 스플래시
  → React 웹 화면 로딩
  → SVG 캐릭터 애니메이션 인트로
  → 날씨 메인 화면
```

네이티브 스플래시는 웹 화면이 준비될 때까지 짧게 표시합니다. 현재 임시 도형은 React Three Fiber로 실행하지만, 실제 캐릭터 SVG가 준비되면 React와 CSS/SVG 애니메이션 기반으로 교체합니다.

## 프론트엔드 작성 방식

HTML 파일에 모든 화면을 직접 작성하지 않고 React의 `.tsx` 컴포넌트로 화면을 나눠서 제작합니다. 화면의 디자인은 각 컴포넌트에 대응하는 `.module.scss` 파일에서 관리합니다.

```tsx
import styles from './WeatherCard.module.scss';

export function WeatherCard() {
  return (
    <section className={styles.card}>
      <h2 className={styles.title}>서울</h2>
      <strong>24°C</strong>
      <p>오늘은 맑아요</p>
    </section>
  );
}
```

```scss
@use '../../styles/tokens/color-tokens' as color;
@use '../../styles/tokens/tokens' as token;

.card {
  padding: token.$space-6;
  border-radius: token.$space-6;
  background: color.$light-main;

  .title {
    font-size: token.$space-6;
  }
}
```

Vite가 React 코드를 브라우저에서 실행할 HTML, CSS, JavaScript 파일로 빌드하고, Capacitor가 이 결과물을 네이티브 앱에 포함합니다.

## SCSS 관리 원칙

- 모든 SCSS 길이 값은 `rem`을 사용하며 `px`은 사용하지 않습니다.
- `0`, `%`, `vw`, `vh`, `svh`, `dvh`, `em` 및 단위 없는 값처럼 의미상 필요한 값은 예외로 사용할 수 있습니다.
- 여백, 크기, 타이포그래피, radius 및 반응형 기준은 일반 토큰인 `src/styles/tokens/_tokens.scss`에서 관리합니다.
- 공통 색상은 컬러 토큰인 `src/styles/tokens/_color-tokens.scss`에서 관리합니다.
- 새로운 스타일은 하드코딩보다 일반 토큰과 컬러 토큰을 먼저 사용합니다.
- 초기화, 기본 폰트 및 공통 스타일은 `globals.scss`에서 관리합니다.
- UI는 컴포넌트 중심으로 제작하고, 컴포넌트 스타일은 같은 폴더의 `ComponentName.module.scss`에서 관리합니다.
- 컴포넌트의 기본 형태와 다르게 페이지에서만 필요한 배치나 변형은 각 페이지의 `PageName.module.scss`에서 관리합니다.
- SCSS 모듈을 불러올 때는 `@import` 대신 `@use`와 `@forward`를 사용합니다.
- 모바일 스타일을 기본값으로 작성하고, `48rem` 이상 태블릿 화면의 확장 스타일은 `tablet-up` mixin으로 관리합니다.
- 날씨 상태나 테마에 따라 실행 중 바뀌는 값이 필요한 경우에도 컬러 토큰을 기본값으로 사용하고 CSS 사용자 정의 속성으로 확장합니다.
- 선택자 중첩은 가급적 2~3단계 이내로 유지합니다.

현재 스타일과 페이지 구조는 다음과 같습니다.

```text
src/
├─ components/
│  ├─ CharacterStage/
│  │  ├─ CharacterStage.tsx
│  │  └─ CharacterStage.module.scss
│  ├─ WeatherIcon/
│  │  ├─ WeatherIcon.tsx
│  │  ├─ WeatherIcon.module.scss
│  │  └─ weatherIcons.ts
│  └─ WeatherLogo/
│     ├─ WeatherLogo.tsx
│     └─ WeatherLogo.module.scss
├─ pages/
│  └─ SplashPage/
│     ├─ SplashPage.tsx
│     └─ SplashPage.module.scss
└─ styles/
   ├─ tokens/
   │  ├─ _tokens.scss
   │  └─ _color-tokens.scss
   ├─ globals.scss
   ├─ _mixins.scss
   └─ _reset.scss
```

## 로고

앱 로고 SVG는 `public/logos`에 보관합니다. 화면에서는 `WeatherLogo` 컴포넌트를 사용해 색상, 크기와 접근성 문구를 일관되게 관리합니다.

| 파일 | 사용 배경 |
| --- | --- |
| `weather-logo-white-fixed-v2.svg` | 어두운 배경 |
| `weather-logo-black-fixed-v2.svg` | 밝은 배경 |

```tsx
import { WeatherLogo } from './components/WeatherLogo/WeatherLogo';

<WeatherLogo color="black" size="medium" />
<WeatherLogo color="white" size="small" decorative />
```

`color`는 `black` 또는 `white`, `size`는 `small`, `medium`, `large`를 사용합니다. 주변에 동일한 브랜드명이 이미 표시될 때는 `decorative`를 지정해 스크린 리더의 중복 안내를 막습니다. 현재 스플래시 헤더는 검은색 로고 컴포넌트를 사용합니다.

## 날씨 아이콘

날씨 UI에서 사용할 SVG 아이콘은 `public/weather-icons`에 보관합니다. 화면에서는 `WeatherIcon` 컴포넌트를 사용하며 `weatherIcons.ts`가 타입 안전한 아이콘 이름, 정적 에셋 경로와 기본 한글 설명을 관리합니다.

| 파일 | 용도 |
| --- | --- |
| `01_sunny.svg` | 맑은 낮 |
| `02_clear-night.svg` | 맑은 밤 |
| `03_cloudy.svg` | 흐림 |
| `04_snowflake.svg` | 눈 |
| `05_rain.svg` | 비 |
| `06_lightning.svg` | 번개 |
| `07_wind.svg` | 바람 |
| `08_rainbow.svg` | 무지개 |
| `09_partly-cloudy-day.svg` | 구름 조금인 낮 |
| `10_partly-cloudy-night.svg` | 구름 조금인 밤 |
| `11_snow-cloud.svg` | 눈구름 |
| `12_rain-cloud.svg` | 비구름 |
| `13_fog-cloud.svg` | 안개 낀 구름 |
| `14_sleet-cloud.svg` | 진눈깨비 |
| `15_thunderstorm.svg` | 뇌우 |
| `16_snow-wind.svg` | 눈보라 |
| `17_sun-fog.svg` | 햇빛과 안개 |
| `18_sun-shower.svg` | 여우비 |
| `19_sun-lightning.svg` | 햇빛과 번개 |
| `20_moon-rain.svg` | 밤비 |
| `21_sun-snow.svg` | 햇빛과 눈 |
| `22_moon-snow.svg` | 밤눈 |
| `23_umbrella.svg` | 우산 |
| `24_rainy-umbrella.svg` | 비 오는 날의 우산 |
| `25_snowy-umbrella.svg` | 눈 오는 날의 우산 |
| `26_sunny-umbrella.svg` | 맑은 날의 우산 |
| `27_hot-thermometer.svg` | 더운 날씨 |
| `28_cold-thermometer.svg` | 추운 날씨 |
| `29_warm-thermometer.svg` | 따뜻한 날씨 |

React 컴포넌트에서는 다음처럼 사용할 수 있습니다.

```tsx
import { WeatherIcon } from './components/WeatherIcon/WeatherIcon';

<WeatherIcon name="sunny" size="large" />
<WeatherIcon name="rainCloud" alt="오후부터 비" size="medium" />
<WeatherIcon name="rainbow" decorative />
```

`size`는 `small`, `medium`, `large`, `hero`를 사용합니다. `alt`를 생략하면 아이콘별 기본 한글 설명이 적용되며 장식용 아이콘은 `decorative`를 지정합니다. Open-Meteo의 `weather_code`와 주야간 정보는 별도 매핑 계층에서 `sunny`, `clearNight`, `rainCloud` 같은 아이콘 이름으로 변환합니다.

## 문서 관리 원칙

- 기능, 화면, 컴포넌트, 폴더 구조, 의존성, 실행 명령 또는 개발 규칙이 변경되거나 추가되면 같은 작업에서 이 `README.md`도 반드시 수정합니다.
- 실제 코드와 README의 설명이 다르면 코드를 기준으로 README를 즉시 갱신합니다.
- 이 규칙은 저장소의 `AGENTS.md`에도 기록해 이후 작업에서도 자동으로 확인할 수 있게 합니다.

## 개발 환경

2026년 8월 11일 기준으로 Windows 개발 환경 설정을 완료했습니다.

| 도구 | 설치 버전 또는 상태 |
| --- | --- |
| Node.js | 24.13.0 |
| npm | 11.6.2 |
| React | 19.2.8 |
| TypeScript | 6.0.3 |
| Vite | 8.2.1 |
| Sass | 1.102.0 |
| Capacitor | 8.5.0 |
| Java | Temurin OpenJDK 21.0.12 |
| Android SDK | Platform 36 / Build-Tools 36.0.0 |
| Android Emulator | 37.1.11.0 |
| 테스트 가상 기기 | `weather_app_pixel` |

주요 설치 경로는 다음과 같습니다.

```text
Java 21:    C:\Users\Administrator\development\jdk-21
Android SDK: C:\Users\Administrator\AppData\Local\Android\Sdk
```

Node.js, npm, Java와 Android SDK는 사용자 환경 변수와 `PATH`에 등록되어 있습니다. PowerShell에서 `npm`을 바로 사용할 수 있도록 사용자 실행 정책도 설정했습니다. Android SDK 라이선스 승인과 에뮬레이터 부팅 및 ADB 연결 검증도 완료했습니다.

Vite, React, TypeScript, Sass, Three.js, React Three Fiber와 Capacitor 패키지 설치를 완료했습니다. Capacitor Android 프로젝트를 생성했으며, Debug APK 빌드와 에뮬레이터 설치 및 앱 실행까지 검증했습니다.

기존 Flutter SDK와 Java 17은 이 프로젝트에서 사용하지 않지만 다른 Flutter 프로젝트를 위해 그대로 유지합니다. Flutter는 별도로 지정된 Java 17 경로를 계속 사용합니다.

## 첫 번째 개발 목표

가장 먼저 앱의 스플래시 화면을 제작합니다.

1. 움직이는 인트로 화면의 디자인과 애니메이션 제작
2. 임시 3D 도형을 실제 SVG 캐릭터로 교체
3. 캐릭터 로딩 및 오류 상태 처리
4. 인트로가 끝나면 날씨 메인 화면으로 전환
5. Capacitor 네이티브 스플래시와 React 인트로 연결

SVG 캐릭터 파일이 준비되기 전에는 임시 이미지나 영역을 사용하고, 파일이 준비되면 파츠 구조를 확인해 전체 모션과 눈, 팔, 표정 등의 개별 모션을 적용합니다. 실제 SVG 적용이 끝나면 필요하지 않은 Three.js 관련 코드와 의존성을 제거합니다.

## 퍼블리싱 우선 개발 원칙

메인 화면은 [Kakao W: Weather app](https://www.behance.net/gallery/90916115/Kakao-W-Weather-app)의 정보 배치, 캐릭터 중심 연출과 계절감만 참고합니다. 카카오 캐릭터와 원본 화면을 복제하지 않고 프로젝트의 로고, SVG 캐릭터, 날씨 아이콘과 컬러를 사용해 별도의 디자인으로 제작합니다.

API 연결보다 모바일·태블릿 퍼블리싱을 먼저 완성합니다. 화면에 값을 직접 고정하지 않고 실제 API 응답과 유사한 목업 데이터를 컴포넌트에 전달해, 이후 데이터 공급원만 교체할 수 있도록 구성합니다.

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
};
```

퍼블리싱 단계에서는 다음 항목을 먼저 제작하고 검증합니다.

1. 현재 날씨, 대기질과 특보 영역
2. SVG 캐릭터 장면과 날씨별 모션
3. 시간별 및 주간 예보
4. 모바일과 태블릿 반응형 레이아웃
5. 로딩, 오류, 빈 데이터와 위치 권한 거부 상태
6. `-12°C`, `38°C`, 긴 지역명, 특보 없음과 여러 특보 같은 예외값

퍼블리싱이 완료된 뒤 Open-Meteo 날씨 및 대기질, 현재 위치, 행정동 변환과 기상특보 순서로 실제 데이터를 연결합니다. API 응답은 화면 컴포넌트에서 직접 처리하지 않고 앱 내부 날씨 데이터 형식으로 정규화하며, `weather_code`와 주야간 정보는 `WeatherIcon` 이름과 SVG 캐릭터 상태로 변환합니다.

## 전체 개발 순서

- [x] Node.js 및 npm 환경 확인
- [x] Vite 기반 React + TypeScript 프로젝트 생성
- [x] SCSS Modules와 기본 폴더 구조 설정
- [x] Three.js 및 React Three Fiber 동작 확인
- [x] Capacitor Android 프로젝트 연결
- [x] Debug APK 빌드와 에뮬레이터 설치 및 실행 검증
- [x] 날씨 아이콘 및 로고 컴포넌트 구성
- [ ] 움직이는 인트로 화면 제작
- [ ] 실제 SVG 캐릭터와 날씨별 모션 적용
- [ ] 목업 데이터 기반 날씨 메인 화면 제작
- [ ] 시간별 및 주간 예보 퍼블리싱
- [ ] 모바일·태블릿 반응형과 예외 상태 검증
- [ ] 날씨 API 연결
- [ ] 대기질 및 기상특보 API 연결
- [ ] 현재 위치 권한 요청 및 위치 정보 사용
- [ ] 현재 좌표의 행정동 정보 연결
- [ ] 실제 휴대폰 테스트
- [ ] 배포용 APK 및 AAB 서명 설정

## 개발 및 Android 빌드 흐름

퍼블리싱 중에는 Vite 개발 서버를 사용해 브라우저에서 빠르게 확인합니다.

```powershell
npm run dev
```

Android 앱에 반영할 때는 웹 결과물을 빌드한 후 Capacitor와 동기화합니다.

```powershell
npm run build
npm run android:sync
```

개발용 APK는 다음 명령 하나로 웹 빌드, Capacitor 동기화와 Gradle 빌드를 모두 실행해 생성합니다.

```powershell
npm run android:apk
```

생성된 APK의 기본 위치는 다음과 같습니다.

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

개발 단계에서는 자동 서명된 Debug APK를 휴대폰에 직접 설치해 확인합니다. 실제 배포 단계에서는 별도의 배포용 키로 서명한 APK 또는 Google Play 등록용 AAB를 생성합니다.

연결된 에뮬레이터나 휴대폰에서 바로 실행하려면 다음 명령을 사용합니다.

```powershell
npm run android:run
```

코드를 올리기 전에는 린트와 프로덕션 빌드를 확인합니다.

```powershell
npm run lint
npm run build
```

## 날씨 API

포트폴리오용 비상업 프로젝트의 날씨 데이터는 **Open-Meteo** 무료 API를 사용합니다.

- 비상업 용도의 무료 API는 회원가입과 API 키가 필요하지 않습니다.
- 현재 날씨, 시간별 예보 및 일별 예보를 JSON으로 받을 수 있습니다.
- Capacitor Geolocation으로 얻은 위도와 경도를 API 요청에 사용합니다.
- 무료 API는 하루 10,000회 요청 제한이 있습니다.
- Open-Meteo와 원본 데이터 출처를 앱의 정보 화면이나 하단 영역에 표기합니다.

API는 온도, 습도, 강수량, 풍속 및 `weather_code` 같은 원본 데이터만 제공합니다. 화면 디자인은 API에 종속되지 않으며 프로젝트에서 자유롭게 커스텀합니다.

| Open-Meteo 날씨 코드 | 앱에서 사용할 표현 예시 |
| --- | --- |
| `0` | 맑음 아이콘, 맑은 배경, 맑음 캐릭터 모션 |
| `1`~`3` | 구름 아이콘, 흐린 배경, 구름 캐릭터 모션 |
| `45`, `48` | 안개 아이콘과 안개 효과 |
| `51`~`67`, `80`~`82` | 비 아이콘과 빗방울 효과 |
| `71`~`77`, `85`, `86` | 눈 아이콘과 눈 효과 |
| `95`, `96`, `99` | 번개 아이콘과 천둥 효과 |

따라서 날씨 아이콘, 한글 문구, 색상 토큰, 배경, SVG 캐릭터 표정과 애니메이션은 모두 직접 제작하고 변경할 수 있습니다. API의 `weather_code`를 앱 내부의 UI 상태로 변환하는 매핑 계층을 별도로 작성합니다.

## 서버가 필요한가요?

초기 버전은 별도의 서버 없이 React 앱에서 Open-Meteo를 직접 호출합니다. API 키가 없으므로 포트폴리오 개발 단계에서 키 노출 문제도 없습니다. 이후 광고, 유료 기능 또는 상업 배포를 추가한다면 Open-Meteo의 상업용 사용 조건과 유료 플랜을 다시 검토합니다.

## 다음 작업

개발 환경 설정은 완료되었습니다. 다음 작업은 목업 데이터로 날씨 메인 화면과 모바일·태블릿 레이아웃을 먼저 퍼블리싱하는 것입니다. 실제 SVG 캐릭터가 준비되면 현재 화면 중앙의 임시 3D 도형을 교체하고 날씨 상태별 모션을 적용합니다. 실제 API와 위치 기능은 화면 및 예외 상태 검증을 마친 뒤 연결합니다.
