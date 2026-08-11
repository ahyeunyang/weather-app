# Weddddy

캐릭터와 함께 오늘의 날씨를 쉽고 즐겁게 확인하는 모바일 날씨 앱입니다.

Weddddy는 날씨 정보를 단순한 숫자 목록으로 보여주기보다 자체 캐릭터, 로고와 날씨 아이콘을 활용해 하나의 장면처럼 전달합니다. 모바일 화면을 기본으로 제작하며 태블릿 화면까지 자연스럽게 반응합니다.

## 이름의 의미

`Weddddy`는 날씨를 뜻하는 **Weather**와 곁에서 함께하는 친구를 뜻하는 **Buddy**를 결합한 이름입니다. 날씨를 알려주는 친근한 친구라는 의미를 담았으며, 반복되는 `d`는 캐릭터 브랜드다운 장난스럽고 경쾌한 리듬감을 표현합니다.

브랜드 표기는 첫 글자를 대문자로 한 `Weddddy`, 패키지명과 코드 식별자에는 소문자 `weddddy`를 사용합니다.

## 주요 경험

- 하늘 배경 이미지와 중앙 로고로 구성한 스플래시 화면
- 날씨 상태에 따라 달라지는 자체 SVG 아이콘과 캐릭터 연출
- `날씨·추천·마이`로 이동하는 하단 메뉴
- `사러·먹으러·놀러` 탭별 쇼핑형 날씨 맞춤 추천
- 현재 날씨, 대기질, 특보, 시간별 및 주간 예보
- 모바일·태블릿 반응형 화면
- 위치 권한, 로딩, 오류와 빈 데이터 상태 대응

현재는 실제 API 연결보다 화면과 상호작용을 먼저 완성하는 퍼블리싱 단계입니다. 실제 API 응답과 유사한 목업 데이터를 사용한 뒤 Open-Meteo, 현재 위치와 대기질 데이터를 순서대로 연결할 예정입니다.

## 기술 구성

| 영역 | 기술 |
| --- | --- |
| 프론트엔드 | React, TypeScript |
| 개발 및 빌드 | Vite |
| 스타일 | SCSS Modules |
| 폰트 | Pretendard Variable |
| 캐릭터 | SVG, React/CSS 애니메이션 |
| 네이티브 앱 | Capacitor |
| 날씨 데이터 | Open-Meteo 예정 |
| Android 결과물 | APK / AAB |

완성된 웹 화면은 Capacitor를 통해 Android와 iOS 앱으로 패키징합니다. 위치와 알림 같은 기기 기능도 Capacitor 플러그인으로 연결합니다.

## 시작하기

Node.js와 npm이 필요합니다.

```powershell
npm install
npm run dev
```

프로덕션 결과물을 확인하려면 다음 명령을 사용합니다.

```powershell
npm run lint
npm run build
```

## 프로젝트 에셋

- 로고: `public/logos`
- 인라인 공통 UI 아이콘 12종: `src/components/AppIcon/appIcons.ts`
- 날씨 아이콘 29종: `public/weather-icons`
- 스플래시 배경: `public/images/weddddy-splash-sky.jpg`
- 캐릭터 에셋: `public/characters`

화면에서는 정적 파일 경로를 직접 반복하지 않고 `WeatherLogo`, `WeatherIcon`, `AppIcon`, `CharacterGroup` 같은 전용 컴포넌트를 사용합니다. 캐릭터 그룹은 메인 날씨 장면에서 사용합니다.

## 개발 현황

- [x] React, TypeScript, SCSS Modules 기본 구조
- [x] Capacitor Android 프로젝트 연결
- [x] 로고와 날씨 아이콘 컴포넌트
- [x] 모바일·태블릿 스플래시 화면
- [x] 목업 데이터 기반 날씨 메인 화면
- [x] 날씨·추천·마이 하단 메뉴
- [x] 공통 UI 아이콘 컴포넌트와 화면 적용
- [x] 사러·먹으러·놀러 쇼핑형 추천 화면
- [x] Pretendard Variable 적용
- [ ] 시간별 및 주간 예보
- [ ] 실제 SVG 캐릭터와 날씨별 모션
- [ ] 날씨·대기질·기상특보 API
- [ ] 현재 위치와 행정동 정보
- [ ] 실제 기기 테스트와 배포 설정

## 디자인 방향

[Kakao W: Weather app](https://www.behance.net/gallery/90916115/Kakao-W-Weather-app)의 정보 배치, 캐릭터 중심 연출과 계절감을 참고합니다. 원본 화면이나 카카오 캐릭터를 복제하지 않고 Weddddy의 로고, 캐릭터, 날씨 아이콘과 컬러로 별도의 디자인을 제작합니다.

## 개발 문서

폴더 구조, 스타일 규칙, 컴포넌트 사용법, Android 빌드와 API 연결 계획은 [개발 가이드](docs/DEVELOPMENT.md)에서 확인할 수 있습니다.

## 폰트 라이선스

Weddddy는 [Pretendard](https://github.com/orioncactus/pretendard)를 앱 번들에 포함해 사용합니다. Pretendard는 SIL Open Font License 1.1로 배포됩니다.
